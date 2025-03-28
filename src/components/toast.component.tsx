import { X } from "lucide-react"
import type React from "react"
import { useState, useEffect } from "react"

interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  action?: React.ReactNode
  onClose?: () => void
}

export function Toast({ title, description, variant = "default", action, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onClose) {
        setTimeout(onClose, 300)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  const baseStyles =
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all"
  const variantStyles = {
    default: "border-border bg-background text-foreground",
    destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
  }

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${isVisible ? "animate-in fade-in-0 slide-in-from-top-full" : "animate-out fade-out-0 slide-out-to-right-full"}`}
      role="alert"
    >
      <div className="grid gap-1">
        {title && <div className="text-sm font-semibold">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      {action}
      <button
        className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
        onClick={() => {
          setIsVisible(false)
          if (onClose) {
            setTimeout(onClose, 300)
          }
        }}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function ToastAction({ className = "", children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

