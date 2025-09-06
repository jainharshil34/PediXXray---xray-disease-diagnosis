import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Shield, Zap, Award } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Award className="h-3 w-3 mr-1" />
                FDA Compliant AI Technology
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Advanced AI for{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Pediatric
                </span>{" "}
                Chest X-ray Analysis
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Revolutionary ensemble AI system combining ConvNeXt, PVT, and Swin Transformer models for accurate
                multi-label classification of pediatric chest conditions.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-green-500" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Real-time Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="h-4 w-4 text-blue-500" />
                <span>97%+ Accuracy</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/demo">
                  Try Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="group bg-transparent">
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Watch Demo Video
              </Button>
            </div>
          </div>

          {/* Hero Image - Professional Radiologist */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/radiologist-workstation.png"
                alt="Radiologist analyzing chest X-rays at computer workstation"
                className="w-full h-auto rounded-2xl"
              />

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Analysis Complete</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Processing time: 1.9s</p>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border">
                <div className="text-sm font-medium text-gray-900">Confidence Score</div>
                <div className="text-2xl font-bold text-blue-600">96.8%</div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -z-10 top-8 right-8 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -z-10 top-8 left-8 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
