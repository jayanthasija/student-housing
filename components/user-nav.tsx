"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BellIcon } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function UserNav() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <>
      <Button variant="ghost" size="icon" className="relative mr-2" onClick={() => setNotificationsOpen(true)}>
        <BellIcon className="h-5 w-5" />
        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600"></span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt="@student" />
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/login">Log out</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
            <DialogDescription>Your recent notifications</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-b pb-3">
              <h4 className="font-medium">Maintenance Update</h4>
              <p className="text-sm text-muted-foreground">Your maintenance request has been completed.</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
            <div className="border-b pb-3">
              <h4 className="font-medium">Payment Reminder</h4>
              <p className="text-sm text-muted-foreground">Your rent payment is due in 5 days.</p>
              <p className="text-xs text-muted-foreground">1 day ago</p>
            </div>
            <div className="pb-3">
              <h4 className="font-medium">Document Approved</h4>
              <p className="text-sm text-muted-foreground">Your lease agreement has been approved.</p>
              <p className="text-xs text-muted-foreground">3 days ago</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

