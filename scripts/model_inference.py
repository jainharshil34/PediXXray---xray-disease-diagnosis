"""
Integration script for the chest X-ray classification model
This script provides the interface between the web application and your ML pipeline
"""

import os
import numpy as np
import tensorflow as tf
import pydicom
from pydicom.pixel_data_handlers.util import apply_voi_lut
from tensorflow.keras.applications.convnext import preprocess_input as convnext_preprocess
from PIL import Image
import io
import json

# Constants from your original script
CLASS_NAMES = ["No finding", "Pneumonia", "Other disease"]
IMG_SIZE = (224, 224)

class XrayClassifier:
    def __init__(self, model_path="ensemble_model.keras"):
        """Initialize the classifier with the trained ensemble model"""
        self.model = None
        self.model_path = model_path
        # These would be computed from your actual training - using your optimal thresholds
        self.optimal_thresholds = [0.35, 0.5, 0.5]  # From your precision_recall_curve computation
        
    def load_model(self):
        """Load the trained ensemble model"""
        if os.path.exists(self.model_path):
            self.model = tf.keras.models.load_model(self.model_path)
            print(f"Model loaded from {self.model_path}")
        else:
            print(f"Model file {self.model_path} not found")
            
    def preprocess_dicom(self, dicom_bytes):
        """Preprocess DICOM file for inference using your exact preprocessing"""
        try:
            # Read DICOM from bytes
            dicom_file = pydicom.dcmread(io.BytesIO(dicom_bytes))
            
            # Extract and normalize pixel array using your exact method
            image = apply_voi_lut(dicom_file.pixel_array, dicom_file).astype(np.float32)
            image = (image - image.min()) / (image.max() - image.min() + 1e-7)
            
            # Convert to RGB (stack 3 channels)
            image = np.stack([image] * 3, axis=-1)
            
            # Resize to model input size
            image = tf.image.resize(image, IMG_SIZE).numpy()
            
            # Apply ConvNeXt preprocessing
            image = convnext_preprocess(image)
            
            return image
            
        except Exception as e:
            print(f"Error processing DICOM: {e}")
            return None
    
    def preprocess_image(self, image_bytes):
        """Preprocess standard image file for inference"""
        try:
            # Open image from bytes
            image = Image.open(io.BytesIO(image_bytes))
            
            # Convert to RGB if needed
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Resize to model input size
            image = image.resize(IMG_SIZE)
            
            # Convert to numpy array and normalize
            image = np.array(image).astype(np.float32) / 255.0
            
            # Apply ConvNeXt preprocessing
            image = convnext_preprocess(image)
            
            return image
            
        except Exception as e:
            print(f"Error processing image: {e}")
            return None
    
    def predict(self, file_bytes, file_name):
        """Make prediction on uploaded file using your trained ensemble"""
        if self.model is None:
            self.load_model()
            
        if self.model is None:
            return None
        
        # Determine file type and preprocess accordingly
        if file_name.lower().endswith(('.dcm', '.dicom')):
            processed_image = self.preprocess_dicom(file_bytes)
        else:
            processed_image = self.preprocess_image(file_bytes)
        
        if processed_image is None:
            return None
        
        # Add batch dimension
        input_batch = np.expand_dims(processed_image, axis=0)
        
        # Make prediction using your ensemble model
        predictions = self.model.predict(input_batch, verbose=0)[0]
        
        # Create results dictionary matching your evaluation format
        results = {
            "predictions": {
                CLASS_NAMES[i]: float(predictions[i]) 
                for i in range(len(CLASS_NAMES))
            },
            "confidence_scores": predictions.tolist(),
            "optimal_thresholds": self.optimal_thresholds,
            "binary_predictions": [
                1 if predictions[i] >= self.optimal_thresholds[i] else 0 
                for i in range(len(CLASS_NAMES))
            ],
            "model_info": {
                "ensemble_models": ["ConvNeXtSmall", "ConvNeXtBase", "PVTv2B0"],
                "image_size": list(IMG_SIZE)
            }
        }
        
        return results

# Global classifier instance
classifier = XrayClassifier()

def classify_xray(file_bytes, file_name):
    """Main function to classify X-ray image using your trained model"""
    import time
    start_time = time.time()
    
    results = classifier.predict(file_bytes, file_name)
    
    if results is None:
        return None
    
    processing_time = time.time() - start_time
    results["processing_time"] = processing_time
    
    return results

if __name__ == "__main__":
    # Test the classifier
    print("X-ray Classifier initialized")
    print(f"Expected model path: {classifier.model_path}")
    print(f"Class names: {CLASS_NAMES}")
    print(f"Image size: {IMG_SIZE}")
    print("Optimal thresholds:", classifier.optimal_thresholds)
