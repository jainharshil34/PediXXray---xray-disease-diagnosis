import { LoginForm } from "@/components/login-form"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Activity } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid gap-8 lg:grid-cols-2 items-center">
        {/* Left Side - Branding */}
        <div className="space-y-8">
          <div>
            <Badge variant="outline" className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
              Medical AI Platform
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PediXray AI
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Advanced AI-powered pediatric chest X-ray analysis platform trusted by leading medical institutions
              worldwide.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">HIPAA Compliant</h3>
                <p className="text-sm text-gray-600">Enterprise-grade security and privacy</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Real-time Analysis</h3>
                <p className="text-sm text-gray-600">Instant results in under 3 seconds</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Trusted by Experts</h3>
                <p className="text-sm text-gray-600">Used by radiologists at 50+ hospitals</p>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Modern radiology department"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
