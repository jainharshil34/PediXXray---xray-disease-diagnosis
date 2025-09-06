"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, FileImage, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { ClassificationResults } from "./classification-results"
import { useToast } from "@/hooks/use-toast"

interface PredictionResult {
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

export function XrayUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [results, setResults] = useState<PredictionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResults(null)
      setError(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/dicom": [".dcm", ".dicom"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
  })

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      const response = await fetch("/api/classify", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Classification failed")
      }

      const result: PredictionResult = await response.json()
      setResults(result)

      toast({
        title: "Classification Complete",
        description: `Processed in ${result.processing_time.toFixed(2)}s`,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      toast({
        title: "Classification Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const resetUpload = () => {
    setFile(null)
    setResults(null)
    setError(null)
    setUploadProgress(0)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileImage className="h-5 w-5" />
            Upload Chest X-ray
          </CardTitle>
          <CardDescription>Upload a DICOM file or standard image format (PNG, JPG) for classification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!file ? (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              {isDragActive ? (
                <p className="text-blue-600">Drop the X-ray file here...</p>
              ) : (
                <div>
                  <p className="text-gray-600 mb-2">Drag and drop an X-ray file here, or click to select</p>
                  <p className="text-sm text-gray-500">
                    Supports DICOM (.dcm, .dicom) and image files (.png, .jpg, .jpeg)
                  </p>
                  <p className="text-xs text-gray-400 mt-2">Max file size: 50MB</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileImage className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
                <Badge variant="outline">{file.type.includes("dicom") ? "DICOM" : "Image"}</Badge>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Processing X-ray...</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={handleUpload} disabled={isUploading} className="flex-1">
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Classifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Classify X-ray
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={resetUpload} disabled={isUploading}>
                  Reset
                </Button>
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {results && <ClassificationResults results={results} />}
    </div>
  )
}
