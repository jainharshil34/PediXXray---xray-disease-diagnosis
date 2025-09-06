import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TechnologyShowcase() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Technology in Action
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">See Our AI Technology at Work</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-world applications of our AI system in leading medical institutions
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">From X-ray to Diagnosis in Seconds</h3>
            <p className="text-gray-600 leading-relaxed">
              Watch how our AI system processes a pediatric chest X-ray, providing instant multi-label classification
              with confidence scores that help radiologists make informed decisions.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">DICOM file upload and preprocessing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Ensemble model inference</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Multi-label classification results</span>
              </div>
            </div>
            <Button className="group">
              Watch Demo Video
              <Play className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            </Button>
          </div>

          <div className="relative">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="AI analysis interface showing chest X-ray classification"
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
              <span className="text-sm font-medium text-gray-900">Live Analysis</span>
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="relative">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Pediatric X-ray procedure"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-semibold text-sm">Patient Care</h4>
                <p className="text-xs opacity-90">Gentle pediatric imaging</p>
              </div>
            </div>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="relative">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Radiologist with AI assistance"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-semibold text-sm">Expert Review</h4>
                <p className="text-xs opacity-90">AI-assisted diagnosis</p>
              </div>
            </div>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="relative">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Medical team collaboration"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-semibold text-sm">Team Collaboration</h4>
                <p className="text-xs opacity-90">Shared decision making</p>
              </div>
            </div>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="relative">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Successful patient outcome"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-semibold text-sm">Better Outcomes</h4>
                <p className="text-xs opacity-90">Improved patient care</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="group bg-transparent">
            <a href="/features">
              Explore All Features
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
