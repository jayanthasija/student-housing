"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
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
import { FileIcon, FileTextIcon, ImageIcon, TrashIcon } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"

type Document = {
  id: string
  name: string
  type: "image" | "pdf" | "doc"
  size: string
  uploadDate: string
  status: "pending" | "approved" | "rejected"
}

export default function DocumentsPage() {
  const { toast } = useToast()
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Lease Agreement.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadDate: "2023-03-15",
      status: "approved",
    },
    {
      id: "2",
      name: "ID Card.jpg",
      type: "image",
      size: "1.2 MB",
      uploadDate: "2023-03-16",
      status: "approved",
    },
    {
      id: "3",
      name: "Proof of Enrollment.doc",
      type: "doc",
      size: "0.8 MB",
      uploadDate: "2023-03-20",
      status: "pending",
    },
  ])

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [deletedDocument, setDeletedDocument] = useState<Document | null>(null)

  const handleDelete = (document: Document) => {
    setSelectedDocument(document)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedDocument) {
      setDeletedDocument(selectedDocument)
      setDocuments(documents.filter((d) => d.id !== selectedDocument.id))
      setDeleteDialogOpen(false)

      toast({
        title: "Document deleted",
        description: "Document has been deleted.",
        action: (
          <Button
            variant="outline"
            onClick={() => {
              if (deletedDocument) {
                setDocuments((prev) => [...prev, deletedDocument])
                setDeletedDocument(null)
                toast({
                  title: "Document restored",
                  description: "Document has been restored.",
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

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-6 w-6 text-blue-500" />
      case "pdf":
        return <FileIcon className="h-6 w-6 text-red-500" />
      case "doc":
        return <FileTextIcon className="h-6 w-6 text-green-500" />
      default:
        return <FileIcon className="h-6 w-6" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-500"
      case "pending":
        return "text-yellow-500"
      case "rejected":
        return "text-red-500"
      default:
        return "text-gray-500"
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
          <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
          <Link href="/documents/upload">
            <Button>Upload Document</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Documents</CardTitle>
            <CardDescription>View and manage your uploaded documents</CardDescription>
          </CardHeader>
          <CardContent>
            {documents.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">No documents found</p>
                <Link href="/documents/upload">
                  <Button>Upload Your First Document</Button>
                </Link>
              </div>
            ) : (
              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-4 font-medium border-b">
                  <div className="col-span-6 md:col-span-5">Name</div>
                  <div className="hidden md:block md:col-span-2">Size</div>
                  <div className="col-span-3 md:col-span-3">Upload Date</div>
                  <div className="col-span-3 md:col-span-2">Status</div>
                </div>
                {documents.map((document) => (
                  <div key={document.id} className="grid grid-cols-12 p-4 items-center border-b last:border-0">
                    <div className="col-span-6 md:col-span-5 flex items-center space-x-2">
                      {getDocumentIcon(document.type)}
                      <span className="truncate">{document.name}</span>
                    </div>
                    <div className="hidden md:block md:col-span-2 text-sm text-muted-foreground">{document.size}</div>
                    <div className="col-span-3 md:col-span-3 text-sm text-muted-foreground">{document.uploadDate}</div>
                    <div className={`col-span-2 md:col-span-1 text-sm capitalize ${getStatusColor(document.status)}`}>
                      {document.status}
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(document)}>
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this document. This action cannot be undone.
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

