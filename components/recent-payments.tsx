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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

type Payment = {
  id: string
  amount: number
  date: string
  status: "paid" | "pending" | "overdue"
  type: "rent" | "deposit" | "utility"
}

export function RecentPayments() {
  const { toast } = useToast()
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "1",
      amount: 350,
      date: "2023-04-01",
      status: "paid",
      type: "rent",
    },
    {
      id: "2",
      amount: 350,
      date: "2023-03-01",
      status: "paid",
      type: "rent",
    },
    {
      id: "3",
      amount: 350,
      date: "2023-02-01",
      status: "paid",
      type: "rent",
    },
    {
      id: "4",
      amount: 350,
      date: "2023-05-01",
      status: "pending",
      type: "rent",
    },
  ])

  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState("350")
  const [paymentLoading, setPaymentLoading] = useState(false)

  const handlePayment = () => {
    setPaymentLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      const pendingPayment = payments.find((p) => p.status === "pending")

      if (pendingPayment) {
        setPayments(payments.map((p) => (p.id === pendingPayment.id ? { ...p, status: "paid" } : p)))

        toast({
          title: "Payment successful",
          description: `Payment of $${paymentAmount} has been processed.`,
        })
      }

      setPaymentLoading(false)
      setPaymentDialogOpen(false)
    }, 1500)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-500"
      case "pending":
        return "text-yellow-500"
      case "overdue":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Payment History</h3>
          <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
            <DialogTrigger asChild>
              <Button>Make Payment</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Make a Payment</DialogTitle>
                <DialogDescription>Enter payment details below</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="card">Card Number</Label>
                  <Input id="card" type="text" placeholder="**** **** **** 1234" disabled />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handlePayment} disabled={paymentLoading}>
                  {paymentLoading ? "Processing..." : "Pay Now"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border">
          <div className="p-4">
            <div className="font-medium">Upcoming Payment</div>
            <div className="text-sm text-muted-foreground">Your next rent payment of $350 is due on May 1, 2023</div>
          </div>
        </div>

        <div className="rounded-md border">
          <div className="p-4 grid gap-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                <div>
                  <p className="font-medium capitalize">{payment.type} Payment</p>
                  <p className="text-sm text-muted-foreground">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${payment.amount.toFixed(2)}</p>
                  <p className={`text-sm ${getStatusColor(payment.status)}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

