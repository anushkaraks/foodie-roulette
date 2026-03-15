import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChefHat, SlidersHorizontal } from "lucide-react"
import { ThreeDFoodCarousel } from "./components/ui/3d-carousel"
import FiltersBar from "./components/FiltersBar"
import RandomButton from "./components/RandomButton"
import WinnerScreen from "./components/WinnerScreen"
import { filterFoods, getRandomFood, Filters, FoodOption } from "./data/foods"

const defaultFilters: Filters = {
  mood: null,
  groupSize: null,
  budget: null,
  veggieOnly: false,
}

type AppState = "spinning" | "winner"

export default function App() {
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [showFilters, setShowFilters] = useState(false)
  const [winner, setWinner] = useState<FoodOption | null>(null)
  const [appState, setAppState] = useState<AppState>("spinning")
  const [isSpinAnimating, setIsSpinAnimating] = useState(false)

  const filteredFoods = useMemo(() => filterFoods(filters), [filters])

  // Called immediately when button is clicked — starts carousel spin visual
  const handleSpin = () => {
    setIsSpinAnimating(true)
  }

  // Called after the 1800ms button animation finishes — reveals winner
  const handleSpinComplete = () => {
    setIsSpinAnimating(false)
    if (filteredFoods.length === 0) return
    const picked = getRandomFood(filteredFoods)
    setWinner(picked)
    setAppState("winner")
  }

  const handleSelect = (food: FoodOption) => {
    setWinner(food)
    setAppState("winner")
  }

  const handleReset = () => {
    setWinner(null)
    setAppState("spinning")
  }

  const activeFilterCount = [filters.mood, filters.budget, filters.veggieOnly].filter(Boolean).length

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #e85d04, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #f4a261, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #e85d04, #ff7b1a)" }}
            >
              <ChefHat size={20} className="text-white" />
            </motion.div>
            <div>
              <h1 className="font-display font-black text-xl text-white leading-none">
                Foodie Roulette
              </h1>
              <p className="text-xs font-mono text-white/30 mt-0.5">
                no more "idk, what do you want?"
              </p>
            </div>
          </div>

          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-body transition-all relative"
            style={{
              background: showFilters ? "#e85d04" : "rgba(255,255,255,0.06)",
              color: showFilters ? "#fff" : "rgba(255,255,255,0.5)",
              border: showFilters ? "1px solid #e85d04" : "1px solid rgba(255,255,255,0.1)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeFilterCount > 0 && !showFilters && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-mono flex items-center justify-center text-white"
                style={{ background: "#e85d04" }}
              >
                {activeFilterCount}
              </span>
            )}
          </motion.button>
        </motion.header>

        {/* Filters panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-6"
            >
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-display font-bold text-white">Customize your spin</p>
                  <button
                    onClick={() => setFilters(defaultFilters)}
                    className="text-xs font-mono text-white/30 hover:text-white/60 transition-colors"
                  >
                    clear all
                  </button>
                </div>
                <FiltersBar filters={filters} onChange={setFilters} />

                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-xs font-mono text-white/30">
                    {filteredFoods.length} option{filteredFoods.length !== 1 ? "s" : ""} in the roulette
                    {filteredFoods.length === 0 && " — try loosening the filters!"}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <AnimatePresence mode="wait">
          {appState === "spinning" ? (
            <motion.div
              key="spinning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col flex-1"
            >
              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-4"
              >
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight">
                  Stop debating,<br />
                  <span style={{ color: "#e85d04" }} className="text-glow">
                    start eating.
                  </span>
                </h2>
                <p className="text-xs text-white/30 font-mono mt-2 tracking-wide">
                  drag to browse &middot; click to peek &middot; spin for fate
                </p>
              </motion.div>

              {/* 3D Carousel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-6"
              >
                <ThreeDFoodCarousel
                  foods={filteredFoods}
                  onSelect={handleSelect}
                  isSpinAnimating={isSpinAnimating}
                />
              </motion.div>

              {/* Spin button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center mt-auto pb-4"
              >
                <RandomButton
                  onSpin={handleSpin}
                  onSpinComplete={handleSpinComplete}
                  disabled={filteredFoods.length === 0}
                />
              </motion.div>

              <p className="text-center text-xs text-white/20 font-mono pb-2">
                or drag the wheel and click any card to preview
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="winner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1"
            >
              {winner && <WinnerScreen food={winner} onReset={handleReset} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
