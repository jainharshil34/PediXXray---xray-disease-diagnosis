import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function DemoHeader() {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
            Live Demo
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Try Our AI Chest X-ray Classifier</h1>
          <p className="text-lg text-gray-600 mb-6">
            Upload a pediatric chest X-ray image and see our AI system in action. Get instant multi-label classification
            results with confidence scores.
          </p>

          <Alert className="max-w-2xl mx-auto">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Demo Notice:</strong> This is a demonstration system. Do not upload real patient data. Use only
              de-identified or synthetic images for testing purposes.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
