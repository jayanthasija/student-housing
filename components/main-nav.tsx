"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("hidden md:flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/profile"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/profile" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Profile
      </Link>
      <Link
        href="/room"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/room" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Room
      </Link>
      <Link
        href="/maintenance"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/maintenance" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Maintenance
      </Link>
      <Link
        href="/payments"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/payments" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Payments
      </Link>
      <Link
        href="/documents"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/documents" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Documents
      </Link>
      <Link
        href="/feedback"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/feedback" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Feedback
      </Link>
    </nav>
  )
}

