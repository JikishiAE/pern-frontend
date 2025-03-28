import type React from "react"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  className?: string
  color?: string;
}

export function Progress({ value = 0, className = "", color = "", ...props }: ProgressProps) {
  return (
    <div className={`relative h-4 w-full overflow-hidden rounded-full bg-secondary ${className}`} {...props}>
        <div className="h-full bg-primary transition-all" style={{ width: `${value}%` }}>
            <div className={`h-full rounded-full bg-gradient-to-r ${color}`} />
        </div>
    </div>
  )
}

