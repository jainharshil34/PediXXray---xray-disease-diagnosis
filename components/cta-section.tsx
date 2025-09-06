import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Transform Your Radiology Practice?</h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Join leading medical institutions already using our AI technology to improve diagnostic accuracy and patient
            outcomes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" variant="secondary" className="group">
              <Link href="/demo">
                Try Free Demo
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/contact">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Consultation
              </Link>
            </Button>
          </div>

          <div className="text-sm opacity-75">No credit card required • HIPAA compliant • 24/7 support</div>
        </div>
      </div>
    </section>
  )
}
