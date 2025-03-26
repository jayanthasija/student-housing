"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { FileIcon, UploadIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function UploadDocumentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    documentType: "",
    description: "",
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])

      // Clear file error if it exists
      if (errors.file) {
        setErrors((prev) => ({
          ...prev,
          file: "",
        }))
      }
    }
  }

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.documentType) {
      newErrors.documentType = "Document type is required"
    }

    if (!selectedFile) {
      newErrors.file = "Please select a file to upload"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate file upload
    setTimeout(() => {
      setIsSubmitting(false)

      // Show success dialog
      setShowSuccessDialog(true)

      toast({
        title: "Document uploaded",
        description: "Your document has been uploaded successfully and is pending review.",
      })
    }, 2000)
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
          <h2 className="text-3xl font-bold tracking-tight">Upload Document</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Document Upload</CardTitle>
            <CardDescription>Upload documents for your student housing</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="upload-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="documentType">Document Type</Label>
                <Select
                  value={formData.documentType}
                  onValueChange={(value) => handleSelectChange("documentType", value)}
                >
                  <SelectTrigger id="documentType" className={errors.documentType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">ID Card</SelectItem>
                    <SelectItem value="lease">Lease Agreement</SelectItem>
                    <SelectItem value="enrollment">Proof of Enrollment</SelectItem>
                    <SelectItem value="insurance">Insurance Document</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.documentType && <p className="text-sm text-red-500">{errors.documentType}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description of the document"
                />
              </div>

              <div className="space-y-2">
                <Label>File</Label>
                <div
                  className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors ${errors.file ? "border-red-500" : ""}`}
                  onClick={handleFileClick}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />

                  {selectedFile ? (
                    <div className="flex flex-col items-center space-y-2">
                      <FileIcon className="h-10 w-10 text-primary" />
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      <Button type="button" variant="outline" size="sm">
                        Change File
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2">
                      <UploadIcon className="h-10 w-10 text-muted-foreground" />
                      <p className="font-medium">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground">PDF, DOC, JPG, PNG (Max 10MB)</p>
                    </div>
                  )}
                </div>
                {errors.file && <p className="text-sm text-red-500">{errors.file}</p>}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/documents")} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" form="upload-form" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="mr-2">Uploading...</span>
                  <span className="animate-spin">⏳</span>
                </>
              ) : (
                "Upload Document"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Document Uploaded Successfully!</DialogTitle>
            <DialogDescription>
              Your document has been uploaded and is now pending review. You will be notified once it has been
              processed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowSuccessDialog(false)
                router.push("/documents")
              }}
            >
              View All Documents
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

