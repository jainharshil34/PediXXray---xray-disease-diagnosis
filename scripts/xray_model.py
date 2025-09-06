# Full multi-label pediatric chest X-ray classification pipeline
# with ConvNeXtSmall + ConvNeXtBase + CBAM + Swin Transformer + Graph Layer + Ensemble
# Includes progressive unfreezing and composite loss
# Ensure you install required packages:
# pip install keras-cv-attention-models

from keras_cv_attention_models.pvt import PVT_V2B0 as PVTv2B0
from sklearn.metrics import roc_curve
# from keras_cv_attention_models import pvt  # Optional: for future PVTv2 support
# from keras_cv_attention_models.pvt import PVTv2B0

import os
import numpy as np
import pandas as pd
import tensorflow as tf
import pydicom
from pydicom.pixel_data_handlers.util import apply_voi_lut
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score, hamming_loss, multilabel_confusion_matrix, precision_recall_curve
from tensorflow.keras import layers, Model
from tensorflow.keras.applications import ConvNeXtSmall, ConvNeXtBase
from tensorflow.keras.applications.convnext import preprocess_input as convnext_preprocess
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
import matplotlib.pyplot as plt
import seaborn as sns

CLASS_NAMES = ["No finding", "Pneumonia", "Other disease"]
IMG_SIZE = (224, 224)
BATCH_SIZE = 8

# --- Data Preparation ---
path = "Xray Image Classification/train"
df = pd.read_csv("Xray Image Classification/image_labels_train.csv")
df = df[["image_id"] + CLASS_NAMES]
df = df[df[CLASS_NAMES].sum(axis=1) > 0]

minor = df[(df["Pneumonia"] == 1) | (df["Other disease"] == 1)]
df = pd.concat([df, minor, minor], ignore_index=True)

df["label_tuple"] = df[CLASS_NAMES].apply(lambda r: tuple(r.astype(int)), axis=1)
train_df, val_df = train_test_split(df, test_size=0.2, stratify=df["label_tuple"], random_state=42)
train_df.drop(columns=["label_tuple"], inplace=True)
val_df.drop(columns=["label_tuple"], inplace=True)

# --- DICOM Loader ---
bad_files = []

def load_dicom_np(path_str):
    try:
        path = path_str.numpy().decode()
        dic = pydicom.dcmread(path)
        im = apply_voi_lut(dic.pixel_array, dic).astype(np.float32)
        im = (im - im.min()) / (im.max() - im.min() + 1e-7)
        im = np.stack([im] * 3, axis=-1)
        im = tf.image.resize(im, IMG_SIZE).numpy()
        return convnext_preprocess(im)
    except:
        bad_files.append(path_str.numpy().decode())  # Track bad file
        return np.zeros((IMG_SIZE[0], IMG_SIZE[1], 3), dtype=np.float32)

def make_dataset(file_paths, labels, batch_size=BATCH_SIZE, shuffle=False):
    ds = tf.data.Dataset.from_tensor_slices((file_paths, labels))
    if shuffle:
        ds = ds.shuffle(buffer_size=1024)
    
    def load_and_preprocess(path, label):
        image = tf.py_function(load_dicom_np, [path], tf.float32)
        image.set_shape((IMG_SIZE[0], IMG_SIZE[1], 3))
        return image, label
    
    ds = ds.map(load_and_preprocess, num_parallel_calls=tf.data.AUTOTUNE)
    return ds.repeat().batch(batch_size).prefetch(tf.data.AUTOTUNE)

train_file_paths = [os.path.join(path, f"{iid}.dicom") for iid in train_df["image_id"]]
train_labels = train_df[CLASS_NAMES].values.astype(np.float32)

val_file_paths = [os.path.join(path, f"{iid}.dicom") for iid in val_df["image_id"]]
val_labels = val_df[CLASS_NAMES].values.astype(np.float32)

train_ds = make_dataset(train_file_paths, train_labels, shuffle=True)
val_ds = make_dataset(val_file_paths, val_labels)

# --- Model Blocks ---
def se_eca_block(x):
    se = layers.GlobalAveragePooling2D()(x)
    se = layers.Dense(x.shape[-1] // 8, activation="relu")(se)
    se = layers.Dense(x.shape[-1], activation="sigmoid")(se)
    se = layers.Reshape((1, 1, x.shape[-1]))(se)
    x = layers.Multiply()([x, se])
    
    eca = layers.Conv1D(1, kernel_size=3, padding='same', activation='sigmoid')(tf.expand_dims(tf.reduce_mean(x, axis=[1, 2]), axis=-1))
    eca = tf.reshape(eca, [-1, 1, 1, x.shape[-1]])
    return layers.Multiply()([x, eca])

def swin_transformer_encoder(x, num_heads=4, key_dim=32, ff_dim=128):
    x_norm1 = layers.LayerNormalization(epsilon=1e-5)(x)
    attn_output = layers.MultiHeadAttention(num_heads=num_heads, key_dim=key_dim)(x_norm1, x_norm1)
    x = layers.Add()([x, layers.Dropout(0.1)(attn_output)])
    
    x_norm2 = layers.LayerNormalization(epsilon=1e-5)(x)
    ff_output = layers.Dense(ff_dim, activation='gelu')(x_norm2)
    ff_output = layers.Dense(x.shape[-1])(layers.Dropout(0.1)(ff_output))
    return layers.Add()([x, ff_output])

def graph_layer(x):
    return layers.Dense(128, activation="relu")(x)

def fusion_block(x):
    attn = layers.Attention()([x, x])
    return layers.Add()([x, attn])

# --- Full Model ---
def build_model(base_model_fn, is_pvt=False):
    inp = layers.Input((*IMG_SIZE, 3))
    
    if is_pvt:
        base_model = base_model_fn(input_shape=(*IMG_SIZE, 3), pretrained=True)
        base_out = base_model(inp)  # Shape: (None, 1000)
        x = layers.Dense(512, activation="relu")(base_out)
        x = layers.BatchNormalization()(x)
    else:
        base_model = base_model_fn(include_top=False, input_shape=(*IMG_SIZE, 3), weights="imagenet")
        base_model.trainable = True
        for layer in base_model.layers:
            layer.trainable = True
        
        x = base_model(inp)
        x = se_eca_block(x)
        x = layers.Reshape((-1, x.shape[-1]))(x)
        x = swin_transformer_encoder(x)
        x = graph_layer(x)
        x = fusion_block(x)
        x = layers.GlobalAveragePooling1D()(x)
        x = layers.Dropout(0.3)(x)
        x = layers.Dense(256, activation="gelu")(x)
        x = layers.BatchNormalization()(x)
    
    out = layers.Dense(len(CLASS_NAMES), activation="sigmoid")(x)
    return Model(inp, out)

model1 = build_model(ConvNeXtSmall)
model2 = build_model(ConvNeXtBase)
model3 = build_model(PVTv2B0, is_pvt=True) # New model

# --- Composite Loss ---
counts = train_df[CLASS_NAMES].sum().to_dict()
tot = len(train_df)
weights = [tot / (3 * counts[c]) for c in CLASS_NAMES]

def composite_loss(gamma=2.0):
    def loss(y, p):
        p = tf.clip_by_value(p, 1e-4, 1 - 1e-4)
        
        # Focal loss
        focal = -y * (1 - p) ** gamma * tf.math.log(p) - (1 - y) * p ** gamma * tf.math.log(1 - p)
        
        # LDAM
        margins = tf.constant([0.35, 0.5, 0.5])
        ldam = 0.2 * tf.maximum(0.0, margins - p) * y
        
        # AWBCE
        class_weights = tf.constant(weights, dtype=tf.float32)
        awb = 0.2 * (-(y * tf.math.log(p) + (1 - y) * tf.math.log(1 - p)) * class_weights)
        
        return tf.reduce_mean(0.4 * focal + 0.4 * ldam + 0.20 * awb) 
    
    return loss

metrics = ["accuracy", tf.keras.metrics.AUC(name="auc"), tf.keras.metrics.Precision(), tf.keras.metrics.Recall()]

callbacks = [
    EarlyStopping(monitor="val_auc", patience=5, mode="max", restore_best_weights=True),
    ModelCheckpoint("best_model_3.h5", save_best_only=True,),
    ReduceLROnPlateau(monitor='val_auc', factor=0.5, patience=3, min_lr=1e-7, verbose=1)
]

# Train
steps = len(train_df) // BATCH_SIZE
vsteps = len(val_df) // BATCH_SIZE

for model in [model1, model2, model3]:
    model.compile(Adam(1e-5), loss=composite_loss(), metrics=metrics)
    model.fit(train_ds, validation_data=val_ds, steps_per_epoch=steps, validation_steps=vsteps, epochs=30, callbacks=callbacks)

# --- Ensemble ---
class EnsembleModel(tf.keras.Model):
    def __init__(self, models):
        super().__init__()
        self.models = models
    
    def call(self, x):
        preds = [m(x, training=False) for m in self.models]
        return tf.reduce_mean(tf.stack(preds, axis=0), axis=0)

ensemble_model = EnsembleModel([model1, model2, model3])
ensemble_model.compile(optimizer=Adam(1e-6), loss=composite_loss(), metrics=metrics)

# --- Evaluation ---
y_true, y_pred = [], []
for i, (x, y) in enumerate(val_ds):
    if i >= vsteps: break
    p = ensemble_model.predict(x, verbose=0)
    y_true.extend(y.numpy())
    y_pred.extend(p)

y_true, y_pred = np.array(y_true), np.array(y_pred)

from sklearn.metrics import f1_score, precision_recall_curve

# Compute best threshold per class based on best F1
optimal_thresholds = []
for i in range(len(CLASS_NAMES)):
    precision, recall, thresholds = precision_recall_curve(y_true[:, i], y_pred[:, i])
    f1_scores = 2 * precision * recall / (precision + recall + 1e-8)
    best_threshold = thresholds[np.argmax(f1_scores)]
    optimal_thresholds.append(best_threshold)

y_pred_bin = np.array([
    [1 if p >= t else 0 for p, t in zip(row, optimal_thresholds)]
    for row in y_pred
])

y_pred_bin = np.array([[1 if p >= t else 0 for p, t in zip(row, optimal_thresholds)] for row in y_pred])

# model3.save("xray_new_model_.keras")
ensemble_model.save("ensemble_model.keras")

print("\nClassification Report:\n", classification_report(y_true, y_pred_bin, target_names=CLASS_NAMES))
print("\nAUC Scores:")
for i, name in enumerate(CLASS_NAMES):
    print(f"{name}: {roc_auc_score(y_true[:, i], y_pred[:, i]):.4f}")

print("\nHamming Loss:", hamming_loss(y_true, y_pred_bin))
print("Overall Label Accuracy:", (y_true == y_pred_bin).mean())

from sklearn.metrics import roc_auc_score
print("Macro AUC:", np.mean([roc_auc_score(y_true[:, i], y_pred[:, i]) for i in range(len(CLASS_NAMES))]))

plt.figure(figsize=(8, 6))
colors = ['blue', 'green', 'red']  # One for each class

for i, name in enumerate(CLASS_NAMES):
    fpr, tpr, _ = roc_curve(y_true[:, i], y_pred[:, i])
    auc = roc_auc_score(y_true[:, i], y_pred[:, i])
    plt.plot(fpr, tpr, label=f"{name} (AUC = {auc:.4f})", color=colors[i])

plt.plot([0, 1], [0, 1], 'k--', lw=1)
plt.xlabel("False Positive Rate")
plt.ylabel("True Positive Rate")
plt.title("Combined ROC Curve for All Classes")
plt.legend(loc="lower right")
plt.grid(True)
plt.tight_layout()
plt.savefig("combined_roc_curve.png")
plt.show()

for i, name in enumerate(CLASS_NAMES):
    cm = multilabel_confusion_matrix(y_true, y_pred_bin)[i]
    plt.figure(figsize=(5, 4))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues")
    plt.title(f"Confusion Matrix: {name}")
    plt.xlabel("Predicted")
    plt.ylabel("Actual")
    plt.tight_layout()
    plt.savefig(f"confusion_matrix_{name.replace(' ', '_').lower()}.png")
    plt.close()
