"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Mail, Lock, User, Building, Stethoscope } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      toast({
        title: "Login Successful",
        description: "Welcome to PediXray AI Platform",
      })
      router.push("/demo")
      setIsLoading(false)
    }, 1500)
  }

  const handleDemoLogin = () => {
    toast({
      title: "Demo Access Granted",
      description: "Accessing demo environment...",
    })
    router.push("/demo")
  }

  return (
    <Card className="w-full shadow-xl border-0">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>Access your PediXray AI dashboard</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="professional" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="demo">Demo Access</TabsTrigger>
          </TabsList>

          <TabsContent value="professional" className="space-y-4 mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="email" type="email" placeholder="doctor@hospital.com" className="pl-10" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="institution">Medical Institution</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="institution" placeholder="Hospital or Clinic Name" className="pl-10" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Professional Role</Label>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="role" placeholder="e.g., Radiologist, Pediatrician" className="pl-10" required />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600">
                Forgot password?
              </a>
              {" • "}
              <a href="#" className="hover:text-blue-600">
                Request access
              </a>
            </div>
          </TabsContent>

          <TabsContent value="demo" className="space-y-4 mt-6">
            <Alert>
              <User className="h-4 w-4" />
              <AlertDescription>
                <strong>Demo Environment:</strong> Experience our AI platform with sample data. No registration
                required.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h4 className="font-medium text-gray-900">Demo Features Include:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Upload and analyze sample X-ray images</li>
                  <li>• View AI classification results</li>
                  <li>• Explore confidence scores and metrics</li>
                  <li>• Test the user interface</li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">No Registration</Badge>
                <Badge variant="outline">Sample Data Only</Badge>
                <Badge variant="outline">Full UI Access</Badge>
              </div>

              <Button onClick={handleDemoLogin} className="w-full bg-transparent" variant="outline">
                Access Demo Environment
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              Want full access?
              <a href="#" className="text-blue-600 hover:underline ml-1">
                Contact our sales team
              </a>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
