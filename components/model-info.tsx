import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Layers, Target, Network, Activity } from "lucide-react"

export function ModelInfo() {
  const modelFeatures = [
    {
      icon: <Brain className="h-4 w-4" />,
      title: "ConvNeXt Ensemble",
      description: "ConvNeXt Small + Base models with modern CNN architecture",
    },
    {
      icon: <Layers className="h-4 w-4" />,
      title: "PVT Transformer",
      description: "Pyramid Vision Transformer v2 B0 for hierarchical features",
    },
    {
      icon: <Network className="h-4 w-4" />,
      title: "Swin Transformer",
      description: "Shifted window attention with multi-head mechanism",
    },
    {
      icon: <Target className="h-4 w-4" />,
      title: "CBAM + Graph Layer",
      description: "Convolutional Block Attention + Graph neural networks",
    },
  ]

  const lossComponents = [
    { name: "Focal Loss", weight: "40%", color: "bg-blue-100 text-blue-800" },
    { name: "LDAM Loss", weight: "40%", color: "bg-green-100 text-green-800" },
    { name: "AWBCE Loss", weight: "20%", color: "bg-purple-100 text-purple-800" },
  ]

  const classInfo = [
    { name: "No finding", threshold: "35%", color: "bg-green-100 text-green-800" },
    { name: "Pneumonia", threshold: "50%", color: "bg-red-100 text-red-800" },
    { name: "Other disease", threshold: "50%", color: "bg-yellow-100 text-yellow-800" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ensemble Architecture</CardTitle>
          <CardDescription>Advanced multi-model ensemble for pediatric chest X-ray analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {modelFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">{feature.icon}</div>
              <div>
                <h4 className="font-medium text-sm">{feature.title}</h4>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Composite Loss Function</CardTitle>
          <CardDescription>Advanced loss combination for imbalanced multi-label classification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {lossComponents.map((loss, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium">{loss.name}</span>
              <Badge className={loss.color}>{loss.weight}</Badge>
            </div>
          ))}
          <div className="text-xs text-gray-500 mt-2">
            Focal Loss (γ=2.0) + Label-Distribution-Aware Margin + Adaptive Weighted BCE
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Optimal Thresholds</CardTitle>
          <CardDescription>F1-score optimized thresholds per class</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {classInfo.map((cls, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium">{cls.name}</span>
              <Badge className={cls.color}>{cls.threshold}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Training Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Input Resolution:</span>
            <span className="font-mono">224×224</span>
          </div>
          <div className="flex justify-between">
            <span>Batch Size:</span>
            <span className="font-mono">8</span>
          </div>
          <div className="flex justify-between">
            <span>Optimizer:</span>
            <span className="font-mono">Adam (1e-5)</span>
          </div>
          <div className="flex justify-between">
            <span>Data Augmentation:</span>
            <span className="font-mono">Minority Oversampling</span>
          </div>
          <div className="flex justify-between">
            <span>Ensemble Method:</span>
            <span className="font-mono">Mean Averaging</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
