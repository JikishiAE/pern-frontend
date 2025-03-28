import { useState } from "react"
import { Badge, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components"
import { LogIn, UserPlus } from "lucide-react"
import { LoginForm } from "../components/login-form.component"
import { RegisterForm } from "../components/register-form.component"

export function LoginRegisterPage() {

  const [activeTab, setActiveTab] = useState("login")


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-slate-900 p-4">
      <Card className="w-full max-w-md border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
              {activeTab === "login" ? (
                <>
                  <LogIn className="h-6 w-6 text-cyan-500" /> Acceso Portal
                </>
              ) : (
                <>
                  <UserPlus className="h-6 w-6 text-purple-500" /> Nueva Cuenta
                </>
              )}
            </CardTitle>
            <Badge className="bg-slate-800/50 text-cyan-400 border-cyan-500/20 px-3 py-1">Secure</Badge>
          </div>
          <CardDescription className="text-slate-400">
            {activeTab === "login"
              ? "Ingresa tus credenciales para acceder al panel de administración"
              : "Completa el formulario para crear tu cuenta en el sistema"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4 bg-slate-800/50">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-cyan-400"
              >
                <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-purple-400"
              >
                <UserPlus className="mr-2 h-4 w-4" /> Registrarse
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <LoginForm />
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <div className="w-full text-center">
            {activeTab === "login" ? (
              <p className="text-sm text-slate-500">
                ¿No tienes una cuenta?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveTab("register")
                  }}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  Regístrate
                </a>
              </p>
            ) : (
              <p className="text-sm text-slate-500">
                ¿Ya tienes una cuenta?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveTab("login")
                  }}
                  className="text-purple-400 hover:text-purple-300"
                >
                  Iniciar sesión
                </a>
              </p>
            )}
            <p className="text-xs text-slate-500 mt-2">Sistema de Gestión de Usuarios v1.0</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

