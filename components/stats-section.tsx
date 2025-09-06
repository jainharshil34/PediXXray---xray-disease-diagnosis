import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Clock, Award } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      value: "97.3%",
      label: "Diagnostic Accuracy",
      description: "Validated across multiple medical centers",
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      value: "50+",
      label: "Partner Hospitals",
      description: "Leading medical institutions worldwide",
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-600" />,
      value: "<2s",
      label: "Processing Time",
      description: "Real-time analysis for urgent cases",
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      value: "100K+",
      label: "X-rays Analyzed",
      description: "Helping radiologists daily",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Proven Performance Metrics</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced AI technology delivering exceptional accuracy and performance in medical imaging
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-8">
                <div className="mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
