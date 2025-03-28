import { useEffect, useState } from "react"

export function ParticleBackground() {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      speed: number
      opacity: number
    }>
  >([])

  useEffect(() => {
    // Create particles only on client-side
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * windowWidth,
      y: Math.random() * windowHeight,
      size: 1 + Math.random() * 2,
      speed: 0.5 + Math.random() * 1,
      opacity: 0.2 + Math.random() * 0.6,
    }))

    setParticles(newParticles)

    // Animation loop
    let animationFrameId: number
    let lastTime = 0

    const animate = (time: number) => {
      const deltaTime = time - lastTime
      lastTime = time

      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let y = particle.y + particle.speed * (deltaTime / 16)

          // Reset position when particle goes off screen
          if (y > windowHeight) {
            y = -10
          }

          return {
            ...particle,
            y,
          }
        }),
      )

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-cyan-500 rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  )
}

