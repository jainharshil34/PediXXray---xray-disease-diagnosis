import { XrayUploader } from "@/components/xray-uploader"
import { ModelInfo } from "@/components/model-info"
import { DemoHeader } from "@/components/demo-header"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <DemoHeader />

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <XrayUploader />
            </div>
            <div>
              <ModelInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
