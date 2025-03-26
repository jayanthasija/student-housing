"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const { toast } = useToast()

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    push: true,
    maintenance: true,
    payments: true,
    events: false,
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    contactInfoVisibility: false,
    activityTracking: true,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNotificationChange = (setting: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handlePrivacyChange = (setting: string) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const saveSettings = () => {
    setIsSubmitting(true)

    // Simulate saving settings
    setTimeout(() => {
      setIsSubmitting(false)

      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      })
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center">
            <MobileNav />
            <h1 className="text-lg font-semibold md:text-xl">Student Housing Management</h1>
          </div>
          <MainNav className="mx-6 hidden md:flex" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        </div>

        <Tabs defaultValue="notifications" className="space-y-4">
          <TabsList className="flex w-full overflow-x-auto space-x-2 p-1">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={notificationSettings.email}
                        onCheckedChange={() => handleNotificationChange("email")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={notificationSettings.sms}
                        onCheckedChange={() => handleNotificationChange("sms")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications in the app</p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={notificationSettings.push}
                        onCheckedChange={() => handleNotificationChange("push")}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="maintenance-notifications">Maintenance Updates</Label>
                        <p className="text-sm text-muted-foreground">Updates about your maintenance requests</p>
                      </div>
                      <Switch
                        id="maintenance-notifications"
                        checked={notificationSettings.maintenance}
                        onCheckedChange={() => handleNotificationChange("maintenance")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="payment-notifications">Payment Reminders</Label>
                        <p className="text-sm text-muted-foreground">Reminders about upcoming and past-due payments</p>
                      </div>
                      <Switch
                        id="payment-notifications"
                        checked={notificationSettings.payments}
                        onCheckedChange={() => handleNotificationChange("payments")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="event-notifications">Housing Events</Label>
                        <p className="text-sm text-muted-foreground">Updates about housing events and activities</p>
                      </div>
                      <Switch
                        id="event-notifications"
                        checked={notificationSettings.events}
                        onCheckedChange={() => handleNotificationChange("events")}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={saveSettings} disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Manage your privacy preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="profile-visibility">Profile Visibility</Label>
                      <p className="text-sm text-muted-foreground">Allow other residents to see your profile</p>
                    </div>
                    <Switch
                      id="profile-visibility"
                      checked={privacySettings.profileVisibility}
                      onCheckedChange={() => handlePrivacyChange("profileVisibility")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="contact-visibility">Contact Information Visibility</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow other residents to see your contact information
                      </p>
                    </div>
                    <Switch
                      id="contact-visibility"
                      checked={privacySettings.contactInfoVisibility}
                      onCheckedChange={() => handlePrivacyChange("contactInfoVisibility")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="activity-tracking">Activity Tracking</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to collect usage data to improve our services
                      </p>
                    </div>
                    <Switch
                      id="activity-tracking"
                      checked={privacySettings.activityTracking}
                      onCheckedChange={() => handlePrivacyChange("activityTracking")}
                    />
                  </div>
                </div>

                <Button onClick={saveSettings} disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the appearance of the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 cursor-pointer bg-white text-center">
                      <div className="h-20 bg-white border rounded-md mb-2"></div>
                      <p className="text-sm font-medium">Light</p>
                    </div>
                    <div className="border rounded-md p-4 cursor-pointer bg-gray-950 text-white text-center">
                      <div className="h-20 bg-gray-900 border border-gray-800 rounded-md mb-2"></div>
                      <p className="text-sm font-medium">Dark</p>
                    </div>
                    <div className="border rounded-md p-4 cursor-pointer text-center">
                      <div className="h-20 bg-gradient-to-b from-white to-gray-900 rounded-md mb-2"></div>
                      <p className="text-sm font-medium">System</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Font Size</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 cursor-pointer text-center">
                      <p className="text-xs">Aa</p>
                      <p className="text-sm">Small</p>
                    </div>
                    <div className="border rounded-md p-4 cursor-pointer text-center border-primary">
                      <p className="text-sm">Aa</p>
                      <p className="text-sm">Medium</p>
                    </div>
                    <div className="border rounded-md p-4 cursor-pointer text-center">
                      <p className="text-base">Aa</p>
                      <p className="text-sm">Large</p>
                    </div>
                  </div>
                </div>

                <Button onClick={saveSettings} disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

