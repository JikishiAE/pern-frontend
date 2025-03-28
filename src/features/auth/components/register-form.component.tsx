import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useToast, useUsers } from "../../../hooks"
import { Button, Input, Label, Progress } from "../../../components"
import { CheckCircle2, Info, LockKeyhole, Mail, Shield, User } from "lucide-react"
import { registerUser } from "../../../store/auth"

export function RegisterForm() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { toast } = useToast()
    const { users } = useUsers()

    // Register state
    const [registerState, setRegisterState] = useState({
        nombre: "",
        correo: "",
        contrasena: "",
        confirmPassword: "",
        rol: "Cliente" as "Negocio" | "Cliente",
    })
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [agreeToTerms, setAgreeToTerms] = useState(false)
    const [registerErrors, setRegisterErrors] = useState({
        nombre: "",
        correo: "",
        contrasena: "",
        confirmPassword: "",
        terms: "",
    })

    // Password strength handler
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const contrasena = e.target.value
        setRegisterState({ ...registerState, contrasena })

        // Simple password strength calculation
        let strength = 0
        if (contrasena.length > 6) strength += 25
        if (contrasena.match(/[A-Z]/)) strength += 25
        if (contrasena.match(/[0-9]/)) strength += 25
        if (contrasena.match(/[^A-Za-z0-9]/)) strength += 25

        setPasswordStrength(strength)

        // Validate password
        if (contrasena.length < 8) {
        setRegisterErrors((prev) => ({ ...prev, contrasena: "La contraseña debe tener al menos 8 caracteres" }))
        } else {
        setRegisterErrors((prev) => ({ ...prev, contrasena: "" }))
        }

        // Check if passwords match
        if (registerState.confirmPassword && contrasena !== registerState.confirmPassword) {
        setRegisterErrors((prev) => ({ ...prev, confirmPassword: "Las contraseñas no coinciden" }))
        } else if (registerState.confirmPassword) {
        setRegisterErrors((prev) => ({ ...prev, confirmPassword: "" }))
        }
    }

    // Confirm password handler
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPassword = e.target.value
        setRegisterState({ ...registerState, confirmPassword })

        if (confirmPassword !== registerState.contrasena) {
        setRegisterErrors((prev) => ({ ...prev, confirmPassword: "Las contraseñas no coinciden" }))
        } else {
        setRegisterErrors((prev) => ({ ...prev, confirmPassword: "" }))
        }
    }

    // Email validation
    const validateEmail = (email: string) => {
        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
        setRegisterErrors((prev) => ({ ...prev, email: "Formato de correo electrónico inválido" }))
        return false
        }

        // Check if email is unique
        const emailExists = users.some((user) => user.email === email)
        if (emailExists) {
        setRegisterErrors((prev) => ({ ...prev, email: "Este correo electrónico ya está registrado" }))
        return false
        }

        setRegisterErrors((prev) => ({ ...prev, email: "" }))
        return true
    }

    // Email change handler
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const correo = e.target.value
        setRegisterState({ ...registerState, correo })
        validateEmail(correo)
    }

    // Get strength color
    const getStrengthColor = () => {
        if (passwordStrength < 50) return "from-red-500 to-red-600"
        if (passwordStrength < 75) return "from-yellow-500 to-orange-500"
        return "from-green-500 to-emerald-500"
    }

    // Register handler
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate all fields
        let hasErrors = false

        if (!registerState.nombre.trim()) {
            setRegisterErrors((prev) => ({ ...prev, name: "El nombre es requerido" }))
            hasErrors = true
        }

        if (!validateEmail(registerState.correo)) {
            hasErrors = true
        }

        if (registerState.contrasena.length < 8) {
            setRegisterErrors((prev) => ({ ...prev, password: "La contraseña debe tener al menos 8 caracteres" }))
            hasErrors = true
        }

        if (registerState.contrasena !== registerState.confirmPassword) {
            setRegisterErrors((prev) => ({ ...prev, confirmPassword: "Las contraseñas no coinciden" }))
            hasErrors = true
        }

        if (!agreeToTerms) {
            setRegisterErrors((prev) => ({ ...prev, terms: "Debes aceptar los términos y condiciones" }))
            hasErrors = true
        }

        if (hasErrors) {
            return
        }

        // Create new user
        await dispatch( registerUser(
            {
                nombre: registerState.nombre,
                correo: registerState.correo,
                contrasena: registerState.contrasena,
                rol: registerState.rol,
            }
        ) ).catch(() => {
            toast({
                title: "Error",
                description: `He ocurrido algún error!`,
            });
            return;
        });

        // Add user to context
        //addUser(newUser)

        // Show success toast
        toast({
            title: "Registro exitoso",
            description: "Tu cuenta ha sido creada. Por favor espera la verificación por un administrador.",
        })

        // Reset form
        setRegisterState({
            nombre: "",
            correo: "",
            contrasena: "",
            confirmPassword: "",
            rol: "Cliente",
        })
        setPasswordStrength(0)

        // Navigate to users page
        navigate("/users")
    }

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">
                Nombre Completo
                </Label>
                <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                    id="name"
                    placeholder="John Doe"
                    className={`pl-10 bg-slate-800/50 border-slate-700/50 text-slate-200 focus:border-purple-500/50 focus:ring-purple-500/20 ${registerErrors.nombre ? "border-red-500" : ""}`}
                    value={registerState.nombre}
                    onChange={(e) => {
                    setRegisterState({ ...registerState, nombre: e.target.value })
                    if (e.target.value.trim()) {
                        setRegisterErrors((prev) => ({ ...prev, name: "" }))
                    }
                    }}
                    required
                />
                </div>
                {registerErrors.nombre && <p className="text-red-500 text-xs mt-1">{registerErrors.nombre}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="register-email" className="text-slate-300">
                Correo Electrónico
                </Label>
                <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                    id="register-email"
                    type="email"
                    placeholder="you@example.com"
                    className={`pl-10 bg-slate-800/50 border-slate-700/50 text-slate-200 focus:border-purple-500/50 focus:ring-purple-500/20 ${registerErrors.correo ? "border-red-500" : ""}`}
                    value={registerState.correo}
                    onChange={handleEmailChange}
                    required
                />
                </div>
                {registerErrors.correo && <p className="text-red-500 text-xs mt-1">{registerErrors.correo}</p>}
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                <Label htmlFor="register-password" className="text-slate-300">
                    Contraseña
                </Label>
                <div className="relative group">
                    <Info className="h-4 w-4 text-slate-500 cursor-help" />
                    <div className="absolute right-0 w-64 p-2 mt-2 text-xs bg-slate-800 border border-slate-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    La contraseña debe tener al menos 8 caracteres con mayúsculas, números y símbolos
                    </div>
                </div>
                </div>
                <div className="relative">
                <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    className={`pl-10 bg-slate-800/50 border-slate-700/50 text-slate-200 focus:border-purple-500/50 focus:ring-purple-500/20 ${registerErrors.contrasena ? "border-red-500" : ""}`}
                    value={registerState.contrasena}
                    onChange={handlePasswordChange}
                    required
                />
                </div>
                {registerErrors.contrasena && <p className="text-red-500 text-xs mt-1">{registerErrors.contrasena}</p>}

                <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Fortaleza de la contraseña</span>
                    <span
                    className={`
                        ${passwordStrength < 50 ? "text-red-400" : ""}
                        ${passwordStrength >= 50 && passwordStrength < 75 ? "text-yellow-400" : ""}
                        ${passwordStrength >= 75 ? "text-green-400" : ""}
                    `}
                    >
                    {passwordStrength < 50 ? "Débil" : passwordStrength < 75 ? "Media" : "Fuerte"}
                    </span>
                </div>
                <Progress value={passwordStrength} className={`h-1.5 bg-slate-700`} color={getStrengthColor()}/>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-slate-300">
                Confirmar Contraseña
                </Label>
                <div className="relative">
                <Shield className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className={`pl-10 bg-slate-800/50 border-slate-700/50 text-slate-200 focus:border-purple-500/50 focus:ring-purple-500/20 ${registerErrors.confirmPassword ? "border-red-500" : ""}`}
                    value={registerState.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                />
                </div>
                {registerErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{registerErrors.confirmPassword}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="role" className="text-slate-300">
                Tipo de Cuenta
                </Label>
                <select
                id="role"
                className="w-full rounded-md bg-slate-800/50 border-slate-700/50 text-slate-200 focus:border-purple-500/50 focus:ring-purple-500/20 h-10 px-3"
                value={registerState.rol}
                onChange={(e) =>
                    setRegisterState({ ...registerState, rol: e.target.value as "Negocio" | "Cliente" })
                }
                >
                <option value="Negocio">Negocio</option>
                <option value="Cliente">Cliente</option>
                </select>
            </div>

            <div className="flex items-start space-x-2">
                <input
                type="checkbox"
                id="terms"
                className={`rounded border-slate-700 bg-slate-800 text-purple-500 focus:ring-purple-500/20 mt-1 ${registerErrors.terms ? "border-red-500" : ""}`}
                checked={agreeToTerms}
                onChange={(e) => {
                    setAgreeToTerms(e.target.checked)
                    if (e.target.checked) {
                    setRegisterErrors((prev) => ({ ...prev, terms: "" }))
                    }
                }}
                />
                <label htmlFor="terms" className="text-sm text-slate-400">
                Acepto los{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300">
                    Términos de Servicio
                </a>{" "}
                y la{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300">
                    Política de Privacidad
                </a>
                </label>
            </div>
            {registerErrors.terms && <p className="text-red-500 text-xs mt-1">{registerErrors.terms}</p>}

            <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium"
            >
                <span className="flex items-center">
                Crear Cuenta <CheckCircle2 className="ml-2 h-4 w-4" />
                </span>
            </Button>
        </form>
    )

}