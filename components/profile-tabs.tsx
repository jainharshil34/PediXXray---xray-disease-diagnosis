"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoTab } from "@/components/profile-tabs/personal-info-tab"
import { ProfessionalTab } from "@/components/profile-tabs/professional-tab"
import { EducationTab } from "@/components/profile-tabs/education-tab"
import { PreferencesTab } from "@/components/profile-tabs/preferences-tab"
import { SecurityTab } from "@/components/profile-tabs/security-tab"

export function ProfileTabs() {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="professional">Professional</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="mt-6">
        <PersonalInfoTab />
      </TabsContent>

      <TabsContent value="professional" className="mt-6">
        <ProfessionalTab />
      </TabsContent>

      <TabsContent value="education" className="mt-6">
        <EducationTab />
      </TabsContent>

      <TabsContent value="preferences" className="mt-6">
        <PreferencesTab />
      </TabsContent>

      <TabsContent value="security" className="mt-6">
        <SecurityTab />
      </TabsContent>
    </Tabs>
  )
}
