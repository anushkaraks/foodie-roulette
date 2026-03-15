import { motion } from "framer-motion"
import { Filters, Mood } from "../data/foods"

interface FiltersBarProps {
  filters: Filters
  onChange: (filters: Filters) => void
}

const moods: { value: Mood; label: string; emoji: string }[] = [
  { value: "hungry", label: "Starving", emoji: "😤" },
  { value: "adventurous", label: "Adventurous", emoji: "🌶️" },
  { value: "lazy", label: "Lazy", emoji: "😴" },
  { value: "fancy", label: "Fancy", emoji: "🥂" },
  { value: "broke", label: "Broke", emoji: "💸" },
]

const budgets: { value: "Rs" | "RsRs" | "RsRsRs"; label: string }[] = [
  { value: "Rs", label: "₹ Cheap" },
  { value: "RsRs", label: "₹₹ Medium" },
  { value: "RsRsRs", label: "₹₹₹ Fancy" },
]

export default function FiltersBar({ filters, onChange }: FiltersBarProps) {
  const toggle = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    onChange({ ...filters, [key]: filters[key] === value ? null : value })
  }

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    onChange({ ...filters, [key]: value })
  }

  return (
    <div className="space-y-4">
      {/* Mood */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-2">
          What's the vibe?
        </p>
        <div className="flex flex-wrap gap-2">
          {moods.map((mood) => {
            const active = filters.mood === mood.value
            return (
              <motion.button
                key={mood.value}
                onClick={() => toggle("mood", mood.value)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body transition-all"
                style={{
                  background: active ? "#e85d04" : "rgba(255,255,255,0.06)",
                  color: active ? "#fff" : "rgba(255,255,255,0.5)",
                  border: active ? "1px solid #e85d04" : "1px solid rgba(255,255,255,0.1)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{mood.emoji}</span>
                <span>{mood.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Budget */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-2">Budget?</p>
        <div className="flex gap-2">
          {budgets.map((b) => {
            const active = filters.budget === b.value
            return (
              <motion.button
                key={b.value}
                onClick={() => toggle("budget", b.value)}
                className="px-3 py-1.5 rounded-full text-xs font-mono transition-all"
                style={{
                  background: active ? "#e85d04" : "rgba(255,255,255,0.06)",
                  color: active ? "#fff" : "rgba(255,255,255,0.5)",
                  border: active ? "1px solid #e85d04" : "1px solid rgba(255,255,255,0.1)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {b.label}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Veggie toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => set("veggieOnly", !filters.veggieOnly)}
          className="relative w-10 h-5 rounded-full transition-all"
          style={{ background: filters.veggieOnly ? "#2a9d8f" : "rgba(255,255,255,0.1)" }}
        >
          <motion.div
            className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow"
            animate={{ left: filters.veggieOnly ? "22px" : "2px" }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
        <span className="text-xs font-body text-white/50">🥬 Veggie-friendly only</span>
      </div>
    </div>
  )
}
