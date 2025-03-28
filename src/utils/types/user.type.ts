export type User = {
    id: number
    name: string
    email: string
    role: "Negocio" | "Cliente"
    isVerified: boolean
}