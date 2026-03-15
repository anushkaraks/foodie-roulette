// Lightweight confetti without external deps
export default function confetti(color: string = '#e85d04') {
  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.inset = '0'
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '9998'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')!
  const particles: Particle[] = []
  const colors = [color, '#f4a261', '#e9c46a', '#2a9d8f', '#ffffff', '#ffb4a2']

  class Particle {
    x: number
    y: number
    vx: number
    vy: number
    color: string
    size: number
    rotation: number
    rotationSpeed: number
    gravity: number
    opacity: number

    constructor() {
      this.x = Math.random() * canvas.width
      this.y = -10
      this.vx = (Math.random() - 0.5) * 8
      this.vy = Math.random() * 5 + 2
      this.color = colors[Math.floor(Math.random() * colors.length)]
      this.size = Math.random() * 8 + 4
      this.rotation = Math.random() * 360
      this.rotationSpeed = (Math.random() - 0.5) * 10
      this.gravity = 0.15
      this.opacity = 1
    }

    update() {
      this.x += this.vx
      this.vy += this.gravity
      this.y += this.vy
      this.rotation += this.rotationSpeed
      if (this.y > canvas.height * 0.7) {
        this.opacity -= 0.02
      }
    }

    draw() {
      ctx.save()
      ctx.globalAlpha = Math.max(0, this.opacity)
      ctx.translate(this.x, this.y)
      ctx.rotate((this.rotation * Math.PI) / 180)
      ctx.fillStyle = this.color
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6)
      ctx.restore()
    }
  }

  for (let i = 0; i < 120; i++) {
    setTimeout(() => particles.push(new Particle()), i * 20)
  }

  let animFrame: number
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update()
      particles[i].draw()
      if (particles[i].opacity <= 0) particles.splice(i, 1)
    }
    if (particles.length > 0) {
      animFrame = requestAnimationFrame(animate)
    } else {
      canvas.remove()
    }
  }
  animate()

  setTimeout(() => {
    cancelAnimationFrame(animFrame)
    canvas.remove()
  }, 6000)
}
