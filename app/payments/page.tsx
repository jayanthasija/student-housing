"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

type Payment = {
  id: string
  amount: number
  date: string
  status: "paid" | "pending" | "overdue"
  type: "rent" | "deposit" | "utility" | "other"
  description?: string
}

export default function PaymentsPage() {
  const { toast } = useToast()
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "1",
      amount: 350,
      date: "2023-04-01",
      status: "paid",
      type: "rent",
      description: "April 2023 Rent",
    },
    {
      id: "2",
      amount: 350,
      date: "2023-03-01",
      status: "paid",
      type: "rent",
      description: "March 2023 Rent",
    },
    {
      id: "3",
      amount: 350,
      date: "2023-02-01",
      status: "paid",
      type: "rent",
      description: "February 2023 Rent",
    },
    {
      id: "4",
      amount: 350,
      date: "2023-05-01",
      status: "pending",
      type: "rent",
      description: "May 2023 Rent",
    },
    {
      id: "5",
      amount: 500,
      date: "2023-01-15",
      status: "paid",
      type: "deposit",
      description: "Security Deposit",
    },
    {
      id: "6",
      amount: 45,
      date: "2023-04-15",
      status: "paid",
      type: "utility",
      description: "April 2023 Utilities",
    },
  ])

  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState("350")
  const [paymentType, setPaymentType] = useState("rent")
  const [paymentDescription, setPaymentDescription] = useState("May 2023 Rent")
  const [paymentLoading, setPaymentLoading] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState({
    cardNumber: "**** **** **** 1234",
    expiryDate: "12/25",
    cvv: "***",
    name: "John Doe",
  })

  const handlePayment = () => {
    setPaymentLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      const pendingPayment = payments.find((p) => p.status === "pending")

      if (pendingPayment) {
        setPayments(payments.map((p) => (p.id === pendingPayment.id ? { ...p, status: "paid" } : p)))
      } else {
        // Add a new payment if there's no pending one
        const newPayment: Payment = {
          id: String(payments.length + 1),
          amount: Number.parseFloat(paymentAmount),
          date: new Date().toISOString().split("T")[0],
          status: "paid",
          type: paymentType as "rent" | "deposit" | "utility" | "other",
          description: paymentDescription,
        }

        setPayments([newPayment, ...payments])
      }

      toast({
        title: "Payment successful",
        description: `Payment of $${paymentAmount} has been processed.`,
      })

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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "rent":
        return "Rent Payment"
      case "deposit":
        return "Security Deposit"
      case "utility":
        return "Utility Payment"
      case "other":
        return "Other Payment"
      default:
        return "Payment"
    }
  }

  const totalPaid = payments.filter((p) => p.status === "paid").reduce((sum, payment) => sum + payment.amount, 0)

  const pendingAmount = payments.filter((p) => p.status === "pending").reduce((sum, payment) => sum + payment.amount, 0)

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
          <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
          <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
            <DialogTrigger asChild>
              <Button>Make Payment</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
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
                  <Label htmlFor="type">Payment Type</Label>
                  <Select value={paymentType} onValueChange={setPaymentType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="deposit">Deposit</SelectItem>
                      <SelectItem value="utility">Utility</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={paymentDescription}
                    onChange={(e) => setPaymentDescription(e.target.value)}
                    placeholder="Payment description"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="card">Card Number</Label>
                  <Input id="card" type="text" value={paymentMethod.cardNumber} disabled />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" type="text" value={paymentMethod.expiryDate} disabled />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" type="text" value={paymentMethod.cvv} disabled />
                  </div>
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Paid (YTD)</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPaid.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+20.1% from last year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${pendingAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Due on May 1, 2023</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Rent</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$350.00</div>
              <p className="text-xs text-muted-foreground">Due on the 1st of each month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Deposit</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$500.00</div>
              <p className="text-xs text-muted-foreground">Refundable at end of lease</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="history" className="space-y-4">
          <TabsList className="flex w-full overflow-x-auto space-x-2 p-1">
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>View your payment history and upcoming payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 font-medium border-b">
                    <div className="col-span-6 md:col-span-4">Description</div>
                    <div className="col-span-3 md:col-span-2">Amount</div>
                    <div className="hidden md:block md:col-span-3">Date</div>
                    <div className="col-span-3 md:col-span-3">Status</div>
                  </div>
                  {payments.map((payment) => (
                    <div key={payment.id} className="grid grid-cols-12 p-4 items-center border-b last:border-0">
                      <div className="col-span-6 md:col-span-4">
                        <div className="font-medium truncate">{getTypeLabel(payment.type)}</div>
                        <div className="text-sm text-muted-foreground truncate">{payment.description}</div>
                      </div>
                      <div className="col-span-3 md:col-span-2 font-medium">${payment.amount.toFixed(2)}</div>
                      <div className="hidden md:block md:col-span-3 text-sm text-muted-foreground">{payment.date}</div>
                      <div className={`col-span-3 capitalize ${getStatusColor(payment.status)}`}>{payment.status}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="methods" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md flex items-center justify-center text-white font-bold">
                        VISA
                      </div>
                      <div>
                        <div className="font-medium">Visa ending in 1234</div>
                        <div className="text-sm text-muted-foreground">Expires 12/25</div>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                </div>

                <Button variant="outline">Add Payment Method</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>View and download your invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 font-medium border-b">
                    <div className="col-span-4">Invoice</div>
                    <div className="col-span-3">Amount</div>
                    <div className="col-span-3">Date</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                  {payments
                    .filter((p) => p.status === "paid")
                    .map((payment, index) => (
                      <div key={payment.id} className="grid grid-cols-12 p-4 items-center border-b last:border-0">
                        <div className="col-span-4">
                          <div className="font-medium">Invoice #{2023000 + index + 1}</div>
                          <div className="text-sm text-muted-foreground">{payment.description}</div>
                        </div>
                        <div className="col-span-3 font-medium">${payment.amount.toFixed(2)}</div>
                        <div className="col-span-3 text-sm text-muted-foreground">{payment.date}</div>
                        <div className="col-span-2">
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

