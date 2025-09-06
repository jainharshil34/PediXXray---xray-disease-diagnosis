import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, TrendingUp, Clock, CheckCircle, BarChart3, Calendar } from "lucide-react"

export function ProfileStats() {
  const stats = [
    {
      icon: <Activity className="h-5 w-5 text-blue-600" />,
      label: "Cases Analyzed",
      value: "2,847",
      change: "+12% this month",
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      label: "Accuracy Rate",
      value: "97.3%",
      change: "Above average",
    },
    {
      icon: <Clock className="h-5 w-5 text-purple-600" />,
      label: "Avg. Review Time",
      value: "2.4 min",
      change: "-30% with AI",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-orange-600" />,
      label: "AI Agreements",
      value: "94.8%",
      change: "High confidence",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {stat.icon}
                  <span className="text-sm font-medium">{stat.label}</span>
                </div>
                <span className="text-lg font-bold">{stat.value}</span>
              </div>
              <p className="text-xs text-gray-500">{stat.change}</p>
              {index < stats.length - 1 && <div className="border-b border-gray-100 pt-2" />}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Reviewed 23 chest X-rays</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Updated profile information</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Completed AI training module</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
