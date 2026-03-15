import { motion, AnimatePresence } from "framer-motion"
import { Dices } from "lucide-react"
import { useState } from "react"

interface RandomButtonProps {
  onSpin: () => void
  onSpinComplete: () => void
  disabled?: boolean
}

const spinMessages = [
  "The Roulette Decides!",
  "Spinning fate...",
  "Let destiny choose!",
  "No more arguing!",
  "The oracle speaks...",
]

const SPIN_DURATION = 1800

export default function RandomButton({ onSpin, onSpinComplete, disabled }: RandomButtonProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [msgIdx, setMsgIdx] = useState(0)

  const handleClick = () => {
    if (isSpinning || disabled) return
    setIsSpinning(true)
    setMsgIdx(Math.floor(Math.random() * spinMessages.length))
    onSpin()

    setTimeout(() => {
      setIsSpinning(false)
      onSpinComplete()
    }, SPIN_DURATION)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        onClick={handleClick}
        disabled={disabled || isSpinning}
        className="relative px-10 py-4 rounded-2xl font-display font-black text-lg text-white overflow-hidden disabled:opacity-50 select-none"
        style={{
          background: "linear-gradient(135deg, #e85d04, #ff7b1a)",
          boxShadow: isSpinning
            ? "0 0 50px rgba(232,93,4,0.9), 0 0 100px rgba(232,93,4,0.5)"
            : "0 0 20px rgba(232,93,4,0.4)",
          transition: "box-shadow 0.3s ease",
        }}
        whileHover={!disabled && !isSpinning ? { scale: 1.05 } : {}}
        whileTap={!disabled && !isSpinning ? { scale: 0.96 } : {}}
        animate={
          isSpinning
            ? { scale: [1, 1.06, 1, 1.04, 1, 1.06, 1], transition: { duration: 1.8, ease: "easeInOut" } }
            : { scale: 1 }
        }
      >
        {isSpinning && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 0.65, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.15 }}
          />
        )}

        <span className="flex items-center gap-2.5 relative z-10">
          <motion.span
            animate={isSpinning ? { rotate: [0, 360] } : { rotate: 0 }}
            transition={
              isSpinning
                ? { duration: 0.45, repeat: Infinity, ease: "linear" }
                : { duration: 0.3 }
            }
            style={{ display: "inline-flex" }}
          >
            <Dices size={22} />
          </motion.span>
          {isSpinning ? "Spinning..." : "Spin the Roulette!"}
        </span>
      </motion.button>

      <div className="h-5">
        <AnimatePresence mode="wait">
          {isSpinning && (
            <motion.p
              key={msgIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-xs font-mono text-white/50 text-center"
            >
              {spinMessages[msgIdx]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
