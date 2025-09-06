import Link from "next/link"
import { Activity, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">PediXray AI</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Advanced AI technology for pediatric chest X-ray analysis, helping medical professionals provide better
              patient care.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@pedixray.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-white transition-colors">
                  Demo
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="hover:text-white transition-colors">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Solutions</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/hospitals" className="hover:text-white transition-colors">
                  For Hospitals
                </Link>
              </li>
              <li>
                <Link href="/clinics" className="hover:text-white transition-colors">
                  For Clinics
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-white transition-colors">
                  For Researchers
                </Link>
              </li>
              <li>
                <Link href="/integration" className="hover:text-white transition-colors">
                  Integration
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 PediXray AI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">HIPAA Compliant</span>
            <span className="text-gray-400 text-sm">FDA 510(k) Pathway</span>
            <span className="text-gray-400 text-sm">SOC 2 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
