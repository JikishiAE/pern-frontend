export type ToastType = {
    id: string
    title?: string
    description?: string
    variant?: "default" | "destructive"
    action?: React.ReactNode
}