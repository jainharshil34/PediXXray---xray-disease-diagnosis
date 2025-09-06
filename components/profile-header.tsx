import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, MapPin, Mail, Phone, Calendar, Award, Edit, Settings } from "lucide-react"
import { ProfileAvatar } from "@/components/profile-avatar"

export function ProfileHeader() {
  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Avatar - Text Only */}
          <div className="flex-shrink-0">
            <ProfileAvatar firstName="Sarah" lastName="Chen" title="MD" />
          </div>

          {/* Profile Information */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dr. Sarah Chen, MD</h1>
                <p className="text-xl text-gray-600">Chief of Pediatric Radiology</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="default" className="bg-blue-100 text-blue-800">
                Board Certified
              </Badge>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Pediatric Specialist
              </Badge>
              <Badge variant="default" className="bg-purple-100 text-purple-800">
                AI Early Adopter
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Children's Hospital of Philadelphia</p>
                  <p className="text-xs text-gray-500">Primary Institution</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Philadelphia, PA</p>
                  <p className="text-xs text-gray-500">Location</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">15 Years</p>
                  <p className="text-xs text-gray-500">Experience</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">s.chen@chop.edu</p>
                  <p className="text-xs text-gray-500">Email</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">+1 (215) 590-1234</p>
                  <p className="text-xs text-gray-500">Phone</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Board Certified</p>
                  <p className="text-xs text-gray-500">Pediatric Radiology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
