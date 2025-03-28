import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useToast } from "../../../hooks"
import { Button, Input, Label } from "../../../components"
import { AlertCircle, ArrowRight, LockKeyhole, Mail } from "lucide-react"
import { loginUser } from "../../../store/auth"

export function LoginForm() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { toast } = useToast()

    const [loginState, setLoginState] = useState({
        correo: "",
        contrasena: "",
    })
    const [loginError, setLoginError] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        await dispatch( loginUser(loginState) ).catch(() => {
            toast({
                title: "Error",
                description: `He ocurrido algún error!`,
            });
            return;
        });

        setLoginError("")

        toast({
            title: "Inicio de sesión exitoso",
            description: `Bienvenido de nuevo!`,
        })

        navigate("/users")
    }

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-md flex items-start gap-2">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p>{loginError}</p>
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                Email
                </Label>
                <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                    id="email"
                    placeholder="you@example.com"
                    className="pl-10 bg-slate-800/50 border-slate-700/50 text-slate-200 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                    value={loginState.correo}
                    onChange={(e) => setLoginState({ ...loginState, correo: e.target.value })}
                    required
                />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                Password
                </Label>
                <div className="relative">
                <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-slate-800/50 border-slate-700/50 text-slate-200 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                    value={loginState.contrasena}
                    onChange={(e) => setLoginState({ ...loginState, contrasena: e.target.value })}
                    required
                />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/20"
                />
                <label htmlFor="remember" className="text-sm text-slate-400">
                    Recordarme
                </label>
                </div>
                <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300">
                ¿Olvidaste tu contraseña?
                </a>
            </div>

            <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium"
            >
                <span className="flex items-center">
                Iniciar Sesión <ArrowRight className="ml-2 h-4 w-4" />
                </span>
            </Button>
        </form>
    )

}