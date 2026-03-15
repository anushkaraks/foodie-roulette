import { motion } from "framer-motion"
import { RotateCcw, Share2 } from "lucide-react"
import { FoodOption, formatPrice } from "../data/foods"
import confetti from "../utils/confetti"
import { useEffect } from "react"

interface WinnerScreenProps {
  food: FoodOption
  onReset: () => void
}

export default function WinnerScreen({ food, onReset }: WinnerScreenProps) {
  useEffect(() => {
    confetti(food.color)
  }, [food])

  const share = async () => {
    const text = `The roulette has spoken — we're eating ${food.name} tonight! Decided by Foodie Roulette`
    if (navigator.share) {
      await navigator.share({ text })
    } else {
      await navigator.clipboard.writeText(text)
      alert("The roulette has spoken! Copied to clipboard.")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="text-center py-10 px-6"
    >
      <motion.div
        animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-8xl mb-4 inline-block"
      >
        {food.emoji}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p
          className="text-xs font-mono uppercase tracking-widest mb-2"
          style={{ color: food.color }}
        >
          The roulette has spoken
        </p>
        <h1 className="font-display font-black text-5xl text-white mb-1">{food.name}</h1>
        <p className="text-sm text-white/40 font-body mb-2">{food.cuisine} cuisine</p>
        <p className="text-white/60 font-body text-sm max-w-xs mx-auto leading-relaxed mb-8">
          {food.description}
        </p>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          <span
            className="px-3 py-1 rounded-full text-xs font-mono"
            style={{
              background: `${food.color}22`,
              color: food.color,
              border: `1px solid ${food.color}44`,
            }}
          >
            {formatPrice(food.priceRange)} budget
          </span>
          {food.vibe.slice(0, 2).map((v) => (
            <span
              key={v}
              className="px-3 py-1 rounded-full text-xs font-body text-white/50"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {v}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <motion.button
            onClick={share}
            className="w-full py-3 rounded-xl font-display font-bold text-white flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${food.color}, ${food.color}cc)` }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Share2 size={16} />
            Tell the squad!
          </motion.button>

          <motion.button
            onClick={onReset}
            className="w-full py-3 rounded-xl font-body text-sm text-white/40 hover:text-white/70 transition-colors flex items-center justify-center gap-2"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw size={14} />
            Spin again (no judgement)
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
