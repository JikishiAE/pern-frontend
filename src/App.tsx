import { ParticleBackground } from './components/particle-background'
import { ToastContainer } from './components/toastContainer'
import { AppRouter } from './routes/AppRouter'

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900">

      <ParticleBackground />

      <ToastContainer />
        
      <AppRouter />

    </div>
  )
}

export default App
