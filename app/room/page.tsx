"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

type Roommate = {
  id: string
  name: string
  email: string
  phone: string
  moveInDate: string
}

export default function RoomPage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [messageText, setMessageText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const roommates: Roommate[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "(123) 456-7891",
      moveInDate: "2023-01-15",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@example.com",
      phone: "(123) 456-7892",
      moveInDate: "2023-02-01",
    },
  ]

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false)
      setMessageText("")

      toast({
        title: "Message sent",
        description: "Your message has been sent to all roommates.",
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
          <h2 className="text-3xl font-bold tracking-tight">Room Information</h2>
        </div>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList className="flex w-full overflow-x-auto space-x-2 p-1">
            <TabsTrigger value="details">Room Details</TabsTrigger>
            <TabsTrigger value="roommates">Roommates</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Room 302, Building A</CardTitle>
                <CardDescription>Your current room assignment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Room Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Room Type:</span>
                        <span>Double Occupancy</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Floor:</span>
                        <span>3rd Floor</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Square Footage:</span>
                        <span>350 sq ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bathroom:</span>
                        <span>Shared</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Kitchen:</span>
                        <span>Communal (Floor)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Lease Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Move-in Date:</span>
                        <span>January 15, 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lease End Date:</span>
                        <span>December 31, 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Rent:</span>
                        <span>$350.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Security Deposit:</span>
                        <span>$500.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Due:</span>
                        <span>1st of each month</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Wi-Fi</Badge>
                    <Badge variant="outline">Air Conditioning</Badge>
                    <Badge variant="outline">Heating</Badge>
                    <Badge variant="outline">Desk</Badge>
                    <Badge variant="outline">Bed</Badge>
                    <Badge variant="outline">Closet</Badge>
                    <Badge variant="outline">Window</Badge>
                    <Badge variant="outline">Laundry (Building)</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roommates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Roommates</CardTitle>
                <CardDescription>Information about your current roommates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  {roommates.map((roommate) => (
                    <div key={roommate.id} className="flex items-start space-x-4 p-4 border rounded-md">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder-user.jpg" alt={roommate.name} />
                        <AvatarFallback>
                          {roommate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <h3 className="font-medium">{roommate.name}</h3>
                        <div className="text-sm text-muted-foreground">
                          <p>Email: {roommate.email}</p>
                          <p>Phone: {roommate.phone}</p>
                          <p>Move-in Date: {roommate.moveInDate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Message All Roommates</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send Message to Roommates</DialogTitle>
                      <DialogDescription>This message will be sent to all your roommates</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Textarea
                        placeholder="Type your message here..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        rows={5}
                      />
                    </div>
                    <DialogFooter>
                      <Button onClick={handleSendMessage} disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Room Calendar</CardTitle>
                <CardDescription>Important dates and events for your room</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                  </div>
                  <div className="md:w-1/2 space-y-4">
                    <h3 className="font-medium">Upcoming Events</h3>
                    <div className="space-y-4">
                      <div className="p-3 border rounded-md">
                        <div className="font-medium">Room Inspection</div>
                        <div className="text-sm text-muted-foreground">May 15, 2023 • 10:00 AM</div>
                      </div>
                      <div className="p-3 border rounded-md">
                        <div className="font-medium">Maintenance Visit</div>
                        <div className="text-sm text-muted-foreground">May 20, 2023 • 2:00 PM</div>
                        <div className="text-sm text-muted-foreground">HVAC system check</div>
                      </div>
                      <div className="p-3 border rounded-md">
                        <div className="font-medium">Floor Meeting</div>
                        <div className="text-sm text-muted-foreground">June 1, 2023 • 7:00 PM</div>
                        <div className="text-sm text-muted-foreground">Common room, 3rd floor</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

