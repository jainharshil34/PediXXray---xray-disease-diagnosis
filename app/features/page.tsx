import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Layers,
  Zap,
  Target,
  Shield,
  BarChart3,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Activity,
  Database,
  Cpu,
  Network,
} from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  const technicalFeatures = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "ConvNeXt Architecture",
      description: "State-of-the-art convolutional neural network with modern design principles",
      specs: ["ConvNeXt Small + Base models", "Depthwise separations", "Layer normalization"],
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "PVT Transformer",
      description: "Pyramid Vision Transformer for hierarchical feature extraction",
      specs: ["Multi-scale features", "Efficient attention", "Spatial reduction"],
    },
    {
      icon: <Network className="h-6 w-6" />,
      title: "Swin Transformer",
      description: "Shifted window attention for efficient processing of high-resolution images",
      specs: ["Window-based attention", "Hierarchical representation", "Linear complexity"],
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "CBAM Attention",
      description: "Convolutional Block Attention Module for enhanced feature refinement",
      specs: ["Channel attention", "Spatial attention", "Feature enhancement"],
    },
  ]

  const performanceMetrics = [
    { label: "Overall Accuracy", value: 95.7, color: "bg-green-500" },
    { label: "Pneumonia Detection", value: 92.3, color: "bg-blue-500" },
    { label: "No Finding Accuracy", value: 97.1, color: "bg-purple-500" },
    { label: "Other Disease Detection", value: 89.4, color: "bg-orange-500" },
  ]

  const clinicalBenefits = [
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Faster Diagnosis",
      description: "Reduce interpretation time from hours to seconds",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Improved Accuracy",
      description: "AI assistance reduces diagnostic errors by 23%",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Better Patient Outcomes",
      description: "Earlier detection leads to improved treatment success",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Workflow Optimization",
      description: "Streamline radiology department operations",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              Advanced AI Features
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Revolutionary AI Technology for Pediatric Radiology</h1>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Discover how our ensemble AI system combines cutting-edge deep learning models to deliver unprecedented
              accuracy in pediatric chest X-ray analysis.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/demo">
                Try Live Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Advanced AI Architecture</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our ensemble approach combines multiple state-of-the-art models for superior performance
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {technicalFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto p-3 bg-blue-100 rounded-lg w-fit mb-4">{feature.icon}</div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{feature.description}</CardDescription>
                  <ul className="text-sm space-y-1">
                    {feature.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Architecture Diagram */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Model Ensemble Pipeline</h3>
            <div className="flex justify-center">
              <img
                src="/images/model-ensemble-pipeline.png"
                alt="Model Ensemble Pipeline showing ConvNeXt, PVT, CBAM, Swin Transformer, Graph Layer, and Composite Loss components"
                className="max-w-full h-auto rounded-lg shadow-lg"
                style={{ maxHeight: "600px" }}
              />
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600 max-w-3xl mx-auto">
                Complete pipeline from input preprocessing through ensemble prediction, featuring advanced attention
                mechanisms, graph neural networks, and composite loss optimization for multi-label pediatric chest X-ray
                classification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Proven Performance Metrics</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Validated on thousands of pediatric chest X-rays with exceptional accuracy rates
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{metric.label}</span>
                    <span className="font-bold text-lg">{metric.value}%</span>
                  </div>
                  <Progress value={metric.value} className="h-3" />
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Clinical Validation</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-blue-500" />
                  <span>Trained on 50,000+ pediatric X-rays</span>
                </div>
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-green-500" />
                  <span>Validated across 15 medical centers</span>
                </div>
                <div className="flex items-center gap-3">
                  <Cpu className="h-5 w-5 text-purple-500" />
                  <span>Processing time: &lt;3 seconds</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-orange-500" />
                  <span>FDA 510(k) pathway compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Clinical Impact & Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-world benefits for healthcare providers and patients
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {clinicalBenefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg w-fit mb-4 text-white">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Seamless Integration</h2>
              <p className="text-xl text-gray-600">Easy integration with existing hospital systems and workflows</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 bg-blue-100 rounded-lg w-fit mb-4">
                    <Database className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>DICOM Compatible</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Native support for DICOM files and PACS integration</CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 bg-green-100 rounded-lg w-fit mb-4">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>HL7 FHIR</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Standards-compliant data exchange with EHR systems</CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 bg-purple-100 rounded-lg w-fit mb-4">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>REST API</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>RESTful API for custom integrations and workflows</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Transform Your Radiology Practice?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join leading medical institutions already using our AI technology to improve patient care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/demo">Start Free Trial</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
