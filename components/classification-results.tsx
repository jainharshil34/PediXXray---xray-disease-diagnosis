"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Activity, Clock, Brain, TrendingUp } from "lucide-react"

interface ClassificationResultsProps {
  results: {
    predictions: {
      "No finding": number
      Pneumonia: number
      "Other disease": number
    }
    confidence_scores: number[]
    optimal_thresholds: number[]
    binary_predictions: number[]
    processing_time: number
    model_info: {
      ensemble_models: string[]
      image_size: number[]
    }
  }
}

export function ClassificationResults({ results }: ClassificationResultsProps) {
  const classNames = ["No finding", "Pneumonia", "Other disease"]

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600"
    if (confidence >= 0.6) return "text-yellow-600"
    return "text-red-600"
  }

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.8) return "default"
    if (confidence >= 0.6) return "secondary"
    return "destructive"
  }

  const primaryDiagnosis = Object.entries(results.predictions).sort(([, a], [, b]) => b - a)[0]

  const hasCriticalFindings = results.binary_predictions[1] === 1 || results.binary_predictions[2] === 1

  return (
    <div className="space-y-6">
      {/* Primary Result Alert */}
      <Alert className={hasCriticalFindings ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
        <Activity className={`h-4 w-4 ${hasCriticalFindings ? "text-red-600" : "text-green-600"}`} />
        <AlertDescription className={hasCriticalFindings ? "text-red-800" : "text-green-800"}>
          <strong>Primary Classification: {primaryDiagnosis[0]}</strong>
          {hasCriticalFindings && " - Abnormal findings detected. Please consult a radiologist."}
        </AlertDescription>
      </Alert>

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Classification Results
          </CardTitle>
          <CardDescription>Multi-label predictions with confidence scores</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {classNames.map((className, index) => {
            const confidence = results.predictions[className as keyof typeof results.predictions]
            const threshold = results.optimal_thresholds[index]
            const prediction = results.binary_predictions[index]

            return (
              <div key={className} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{className}</span>
                    <Badge variant={prediction === 1 ? "default" : "outline"}>
                      {prediction === 1 ? "Positive" : "Negative"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-mono ${getConfidenceColor(confidence)}`}>
                      {(confidence * 100).toFixed(1)}%
                    </span>
                    <Badge variant={getConfidenceBadge(confidence)} className="text-xs">
                      {confidence >= 0.8 ? "High" : confidence >= 0.6 ? "Medium" : "Low"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1">
                  <Progress value={confidence * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Threshold: {(threshold * 100).toFixed(1)}%</span>
                    <span>Confidence: {(confidence * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Model Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Model Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Ensemble Models</h4>
              <div className="space-y-1">
                {results.model_info.ensemble_models.map((model, index) => (
                  <Badge key={index} variant="outline" className="mr-1">
                    {model}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Processing Details</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Processing Time: {results.processing_time.toFixed(2)}s</span>
                </div>
                <div>
                  <span>Input Size: {results.model_info.image_size.join(" × ")} pixels</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
