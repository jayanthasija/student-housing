"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

type MaintenanceRequest = {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  date: string
  location: string
}

export default function MaintenancePage() {
  const { toast } = useToast()
  const [requests, setRequests] = useState<MaintenanceRequest[]>([
    {
      id: "1",
      title: "Leaking faucet in bathroom",
      description:
        "The bathroom sink faucet is constantly dripping, even when turned off completely. It's wasting water and making noise at night.",
      status: "in-progress",
      priority: "medium",
      date: "2023-04-15",
      location: "Room 302, Building A",
    },
    {
      id: "2",
      title: "Broken light fixture in bedroom",
      description:
        "The ceiling light fixture in the bedroom doesn't work. I've tried changing the bulb but it still doesn't turn on.",
      status: "pending",
      priority: "low",
      date: "2023-04-20",
      location: "Room 302, Building A",
    },
  ])

  const [filter, setFilter] = useState<string>("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null)
  const [deletedRequest, setDeletedRequest] = useState<MaintenanceRequest | null>(null)

  const filteredRequests = filter === "all" ? requests : requests.filter((request) => request.status === filter)

  const handleDelete = (request: MaintenanceRequest) => {
    setSelectedRequest(request)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedRequest) {
      setDeletedRequest(selectedRequest)
      setRequests(requests.filter((r) => r.id !== selectedRequest.id))
      setDeleteDialogOpen(false)

      toast({
        title: "Request deleted",
        description: "Maintenance request has been deleted.",
        action: (
          <Button
            variant="outline"
            onClick={() => {
              if (deletedRequest) {
                setRequests((prev) => [...prev, deletedRequest])
                setDeletedRequest(null)
                toast({
                  title: "Request restored",
                  description: "Maintenance request has been restored.",
                })
              }
            }}
          >
            Undo
          </Button>
        ),
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "in-progress":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
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
          <h2 className="text-3xl font-bold tracking-tight">Maintenance Requests</h2>
          <Link href="/maintenance/new">
            <Button>New Request</Button>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Filter by status:</p>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Requests</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {filteredRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <p className="text-muted-foreground mb-2">No maintenance requests found</p>
                <Link href="/maintenance/new">
                  <Button>Create New Request</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{request.title}</CardTitle>
                      <CardDescription>
                        {request.location} • {request.date}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(request.status)}`} />
                        <span className="text-xs capitalize">{request.status.replace("-", " ")}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(request.priority)}`} />
                        <span className="text-xs capitalize">{request.priority} priority</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{request.description}</p>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Link href={`/maintenance/${request.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(request)}>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this maintenance request. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

