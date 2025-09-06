import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, GraduationCap, Award } from "lucide-react"

export function EducationTab() {
  const education = [
    {
      degree: "Doctor of Medicine (MD)",
      institution: "Harvard Medical School",
      year: "2009",
      location: "Boston, MA",
    },
    {
      degree: "Bachelor of Science in Biology",
      institution: "Stanford University",
      year: "2005",
      location: "Stanford, CA",
    },
  ]

  const training = [
    {
      program: "Pediatric Radiology Fellowship",
      institution: "Boston Children's Hospital",
      year: "2013-2014",
      location: "Boston, MA",
    },
    {
      program: "Diagnostic Radiology Residency",
      institution: "Massachusetts General Hospital",
      year: "2009-2013",
      location: "Boston, MA",
    },
  ]

  const continuing = [
    "AI in Medical Imaging - Stanford Medicine (2024)",
    "Advanced Pediatric Chest Imaging - RSNA (2023)",
    "Machine Learning for Radiologists - MIT (2023)",
    "HIPAA Compliance Training - Annual (2024)",
  ]

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Education
          </CardTitle>
          <CardDescription>Your academic background and degrees</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>

          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-lg">{edu.degree}</h4>
                    <p className="text-blue-600 font-medium">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.location}</p>
                  </div>
                  <Badge variant="outline">{edu.year}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Residency & Fellowship Training</CardTitle>
          <CardDescription>Your post-graduate medical training</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Training
            </Button>
          </div>

          <div className="space-y-4">
            {training.map((train, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-lg">{train.program}</h4>
                    <p className="text-blue-600 font-medium">{train.institution}</p>
                    <p className="text-sm text-gray-500">{train.location}</p>
                  </div>
                  <Badge variant="outline">{train.year}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Continuing Education
          </CardTitle>
          <CardDescription>Recent courses and professional development</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </div>

          <div className="space-y-3">
            {continuing.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <p className="font-medium">{course}</p>
                <Badge variant="secondary">Completed</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
