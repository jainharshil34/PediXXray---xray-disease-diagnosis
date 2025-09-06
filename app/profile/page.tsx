import { ProfileHeader } from "@/components/profile-header"
import { ProfileTabs } from "@/components/profile-tabs"
import { ProfileStats } from "@/components/profile-stats"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Privacy Notice:</strong> This profile system maintains complete privacy - no photos or images are
              stored or displayed.
            </p>
          </div>

          <ProfileHeader />
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <ProfileStats />
            </div>
            <div className="lg:col-span-3">
              <ProfileTabs />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
