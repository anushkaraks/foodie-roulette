import { motion } from "framer-motion"
import { X, Clock, Users, Check } from "lucide-react"
import { FoodOption, formatPrice } from "../data/foods"

interface FoodCardProps {
  food: FoodOption
  onPick: (food: FoodOption) => void
  onClose: () => void
}

const timeLabels = {
  quick: "Quick eat",
  casual: "Casual",
  leisurely: "Take your time",
}

const timeEmojis = {
  quick: "⚡",
  casual: "😌",
  leisurely: "🛋️",
}

export default function FoodCard({ food, onPick, onClose }: FoodCardProps) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-6xl mb-2">{food.emoji}</div>
          <h2 className="font-display font-black text-2xl text-white leading-tight">{food.name}</h2>
          <p className="text-sm font-mono mt-0.5" style={{ color: food.color }}>
            {food.cuisine}
          </p>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <X size={18} className="text-white/50" />
        </button>
      </div>

      <p className="text-sm text-white/60 font-body mb-5 leading-relaxed">{food.description}</p>

      <div className="grid grid-cols-3 gap-2 mb-5">
        <div
          className="rounded-xl p-3 text-center"
          style={{ background: `${food.color}18`, border: `1px solid ${food.color}33` }}
        >
          <div className="text-sm font-bold mb-1" style={{ color: food.color }}>₹</div>
          <div className="text-xs font-mono text-white/80">{formatPrice(food.priceRange)}</div>
          <div className="text-[10px] text-white/40 mt-0.5">budget</div>
        </div>
        <div
          className="rounded-xl p-3 text-center"
          style={{ background: `${food.color}18`, border: `1px solid ${food.color}33` }}
        >
          <Clock size={14} className="mx-auto mb-1 opacity-60" style={{ color: food.color }} />
          <div className="text-xs font-mono text-white/80">{timeEmojis[food.timeToEat]}</div>
          <div className="text-[10px] text-white/40 mt-0.5">{timeLabels[food.timeToEat]}</div>
        </div>
        <div
          className="rounded-xl p-3 text-center"
          style={{ background: `${food.color}18`, border: `1px solid ${food.color}33` }}
        >
          <Users size={14} className="mx-auto mb-1 opacity-60" style={{ color: food.color }} />
          <div className="text-xs font-mono text-white/80">🤝</div>
          <div className="text-[10px] text-white/40 mt-0.5">sharing</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {food.vibe.map((v) => (
          <span
            key={v}
            className="text-xs px-2.5 py-1 rounded-full font-body"
            style={{
              background: `${food.color}22`,
              color: food.color,
              border: `1px solid ${food.color}44`,
            }}
          >
            {v}
          </span>
        ))}
      </div>

      <motion.button
        onClick={() => onPick(food)}
        className="w-full py-3.5 rounded-xl font-display font-bold text-base text-white relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${food.color}, ${food.color}cc)` }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center justify-center gap-2">
          <Check size={16} />
          We're eating this!
        </span>
      </motion.button>

      <button
        onClick={onClose}
        className="w-full mt-2 py-2 text-sm text-white/30 hover:text-white/50 transition-colors font-body"
      >
        nah, keep spinning
      </button>
    </div>
  )
}
