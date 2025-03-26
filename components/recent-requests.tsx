"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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

type Request = {
  id: string
  title: string
  status: "pending" | "in-progress" | "completed"
  date: string
}

export function RecentRequests() {
  const { toast } = useToast()
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "1",
      title: "Leaking faucet in bathroom",
      status: "in-progress",
      date: "2023-04-15",
    },
    {
      id: "2",
      title: "Broken light fixture in bedroom",
      status: "pending",
      date: "2023-04-20",
    },
  ])

  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletedRequest, setDeletedRequest] = useState<Request | null>(null)

  const handleDelete = (request: Request) => {
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

  const viewDetails = (request: Request) => {
    setSelectedRequest(request)
    setDetailsOpen(true)
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

  return (
    <>
      <div className="space-y-4">
        {requests.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground">No maintenance requests found</p>
          </div>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(request.status)}`} />
                <div>
                  <p className="font-medium">{request.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {request.date} · {request.status.replace("-", " ")}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => viewDetails(request)}>
                  View
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(request)}>
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Maintenance Request Details</DialogTitle>
            <DialogDescription>View the details of your maintenance request</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div>
                <h4 className="font-medium">Title</h4>
                <p className="text-sm">{selectedRequest.title}</p>
              </div>
              <div>
                <h4 className="font-medium">Status</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedRequest.status)}`} />
                  <p className="text-sm capitalize">{selectedRequest.status.replace("-", " ")}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium">Date Submitted</h4>
                <p className="text-sm">{selectedRequest.date}</p>
              </div>
              <div>
                <h4 className="font-medium">Description</h4>
                <p className="text-sm">
                  {selectedRequest.title === "Leaking faucet in bathroom"
                    ? "The bathroom sink faucet is constantly dripping, even when turned off completely. It's wasting water and making noise at night."
                    : "The ceiling light fixture in the bedroom doesn't work. I've tried changing the bulb but it still doesn't turn on."}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
    </>
  )
}

