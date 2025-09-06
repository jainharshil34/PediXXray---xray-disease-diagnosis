import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, Shield, BarChart3, Clock, Users } from "lucide-react"

export function FeaturesOverview() {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Ensemble AI Architecture",
      description: "Advanced combination of ConvNeXt, PVT, and Swin Transformer models for superior accuracy",
      badge: "AI-Powered",
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-time Analysis",
      description: "Get instant results with processing times under 3 seconds for critical decision making",
      badge: "Fast",
      color: "bg-yellow-50 text-yellow-600 border-yellow-200",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security ensuring patient data privacy and regulatory compliance",
      badge: "Secure",
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Multi-label Classification",
      description: "Simultaneous detection of multiple conditions: No finding, Pneumonia, and Other diseases",
      badge: "Comprehensive",
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Availability",
      description: "Round-the-clock AI assistance for emergency departments and urgent care facilities",
      badge: "Always On",
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Pediatric Specialized",
      description: "Specifically trained on pediatric chest X-rays for age-appropriate diagnostic accuracy",
      badge: "Specialized",
      color: "bg-pink-50 text-pink-600 border-pink-200",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Core Features
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Cutting-edge AI Technology for Medical Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines the latest advances in computer vision and deep learning to provide radiologists with
            powerful diagnostic assistance.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${feature.color.split(" ")[0]} ${feature.color.split(" ")[1]}`}>
                    {feature.icon}
                  </div>
                  <Badge variant="outline" className={feature.color}>
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
