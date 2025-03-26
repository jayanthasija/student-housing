"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function FeedbackPage() {
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    category: "",
    subject: "",
    message: "",
    satisfaction: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    if (!formData.satisfaction) {
      newErrors.satisfaction = "Please rate your satisfaction"
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

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)

      // Reset form
      setFormData({
        category: "",
        subject: "",
        message: "",
        satisfaction: "",
      })

      // Show success dialog
      setShowSuccessDialog(true)

      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback! We appreciate your input.",
      })
    }, 1500)
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
          <h2 className="text-3xl font-bold tracking-tight">Feedback</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit Feedback</CardTitle>
            <CardDescription>We value your feedback to improve our services</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="feedback-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger id="category" className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facilities">Facilities</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="roommates">Roommates</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief subject of your feedback"
                  className={errors.subject ? "border-red-500" : ""}
                />
                {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please provide detailed feedback"
                  rows={5}
                  className={errors.message ? "border-red-500" : ""}
                />
                {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="satisfaction">Overall Satisfaction</Label>
                <RadioGroup
                  value={formData.satisfaction}
                  onValueChange={(value) => handleSelectChange("satisfaction", value)}
                  className={`grid grid-cols-5 gap-4 pt-2 ${errors.satisfaction ? "border-red-500" : ""}`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value="1" id="r1" />
                    <Label htmlFor="r1" className="text-xs">
                      Very Poor
                    </Label>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value="2" id="r2" />
                    <Label htmlFor="r2" className="text-xs">
                      Poor
                    </Label>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value="3" id="r3" />
                    <Label htmlFor="r3" className="text-xs">
                      Average
                    </Label>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value="4" id="r4" />
                    <Label htmlFor="r4" className="text-xs">
                      Good
                    </Label>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value="5" id="r5" />
                    <Label htmlFor="r5" className="text-xs">
                      Excellent
                    </Label>
                  </div>
                </RadioGroup>
                {errors.satisfaction && <p className="text-sm text-red-500">{errors.satisfaction}</p>}
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" form="feedback-form" disabled={isSubmitting} className="ml-auto">
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </CardFooter>
        </Card>
      </div>
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feedback Submitted Successfully!</DialogTitle>
            <DialogDescription>
              Thank you for your feedback. We appreciate your input and will use it to improve our services.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowSuccessDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

