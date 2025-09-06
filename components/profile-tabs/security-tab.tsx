import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Key, Smartphone, AlertTriangle } from "lucide-react"

export function SecurityTab() {
  const sessions = [
    {
      device: "MacBook Pro",
      location: "Philadelphia, PA",
      lastActive: "Current session",
      ip: "192.168.1.100",
    },
    {
      device: "iPhone 15",
      location: "Philadelphia, PA",
      lastActive: "2 hours ago",
      ip: "192.168.1.101",
    },
    {
      device: "iPad Pro",
      location: "Boston, MA",
      lastActive: "1 day ago",
      ip: "10.0.0.50",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Password & Authentication
          </CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" placeholder="Enter current password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="Enter new password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
            </div>
            <Button>Update Password</Button>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Two-Factor Authentication
                </Label>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Active Sessions
          </CardTitle>
          <CardDescription>Manage devices that are currently signed in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sessions.map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{session.device}</p>
                  {index === 0 && <Badge variant="secondary">Current</Badge>}
                </div>
                <p className="text-sm text-gray-500">{session.location}</p>
                <p className="text-xs text-gray-400">
                  IP: {session.ip} • {session.lastActive}
                </p>
              </div>
              {index !== 0 && (
                <Button variant="outline" size="sm">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>Control how your information is used and shared</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Data Analytics</Label>
              <p className="text-sm text-gray-500">Allow anonymous usage data to improve the platform</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Research Participation</Label>
              <p className="text-sm text-gray-500">Participate in anonymized medical research studies</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Marketing Communications</Label>
              <p className="text-sm text-gray-500">Receive updates about new features and improvements</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>HIPAA Compliance:</strong> All data is encrypted and stored in compliance with HIPAA regulations. Your
          patient information is never shared without explicit consent.
        </AlertDescription>
      </Alert>
    </div>
  )
}
