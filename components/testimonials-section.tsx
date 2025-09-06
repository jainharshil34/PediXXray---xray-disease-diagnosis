import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, User } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief of Pediatric Radiology",
      hospital: "Children's Hospital of Philadelphia",
      quote:
        "PediXray AI has revolutionized our workflow. The accuracy is remarkable, and it helps us catch subtle findings we might have missed.",
      rating: 5,
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Emergency Medicine Physician",
      hospital: "Boston Children's Hospital",
      quote:
        "In the emergency department, speed is crucial. This AI system gives us confidence in our diagnoses within seconds.",
      rating: 5,
    },
    {
      name: "Dr. Emily Watson",
      role: "Pediatric Radiologist",
      hospital: "Seattle Children's Hospital",
      quote:
        "The multi-label classification is incredibly useful. It helps prioritize cases and ensures we don't miss critical findings.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Medical Professionals Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from radiologists and physicians who use our AI platform daily
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-gray-700 mb-6 leading-relaxed">"{testimonial.quote}"</blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-blue-600">{testimonial.hospital}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
