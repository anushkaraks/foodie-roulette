import { memo, useEffect, useLayoutEffect, useMemo, useState, useRef } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { FoodOption, formatPrice } from "../../data/foods"
import FoodCard from "../FoodCard"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(query: string, defaultValue = false): boolean {
  const getMatches = () => (IS_SERVER ? defaultValue : window.matchMedia(query).matches)
  const [matches, setMatches] = useState(getMatches)

  useIsomorphicLayoutEffect(() => {
    const mm = window.matchMedia(query)
    const handler = () => setMatches(mm.matches)
    mm.addEventListener("change", handler)
    return () => mm.removeEventListener("change", handler)
  }, [query])

  return matches
}

const transition = { duration: 0.15, ease: [0.32, 0.72, 0, 1] }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

const Carousel = memo(
  ({
    handleClick,
    controls,
    foods,
    isCarouselActive,
  }: {
    handleClick: (food: FoodOption, index: number) => void
    controls: ReturnType<typeof useAnimation>
    foods: FoodOption[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 900 : 1400
    const faceCount = foods.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{ perspective: "1000px", transformStyle: "preserve-3d", willChange: "transform" }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive && rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: { type: "spring", stiffness: 100, damping: 30, mass: 0.1 },
            })
          }
          animate={controls}
        >
          {foods.map((food, i) => (
            <motion.div
              key={food.id}
              className="absolute flex h-full origin-center items-center justify-center p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              }}
              onClick={() => isCarouselActive && handleClick(food, i)}
            >
              <motion.div
                layoutId={`food-${food.id}`}
                className="w-full rounded-2xl overflow-hidden cursor-pointer"
                initial={{ filter: "blur(4px)" }}
                animate={{ filter: "blur(0px)" }}
                transition={transition}
                style={{
                  background: "linear-gradient(160deg, #1a1a28, #22222e)",
                  border: `1.5px solid ${food.color}55`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
                whileHover={{ scale: 1.05, borderColor: food.color }}
              >
                <div className="p-3 text-center select-none">
                  <div
                    className="w-14 h-14 rounded-xl mx-auto mb-2.5 flex items-center justify-center text-3xl"
                    style={{ background: `${food.color}20`, border: `1px solid ${food.color}30` }}
                  >
                    {food.emoji}
                  </div>
                  <div className="font-display font-bold text-white text-sm leading-tight truncate px-1">
                    {food.name}
                  </div>
                  <div
                    className="text-[11px] mt-1 font-body truncate"
                    style={{ color: food.color, opacity: 0.8 }}
                  >
                    {food.cuisine}
                  </div>
                  <div className="text-[10px] mt-1.5 font-mono text-white/30">
                    {formatPrice(food.priceRange)}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

interface ThreeDFoodCarouselProps {
  foods: FoodOption[]
  onSelect: (food: FoodOption) => void
  isSpinAnimating: boolean
}

function ThreeDFoodCarousel({ foods, onSelect, isSpinAnimating }: ThreeDFoodCarouselProps) {
  const [activeFood, setActiveFood] = useState<FoodOption | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()
  const spinRef = useRef(0)

  // When the parent button starts spinning, animate the carousel fast
  useEffect(() => {
    if (isSpinAnimating) {
      // Spin carousel rapidly during animation
      const currentRotation = spinRef.current
      controls.start({
        rotateY: currentRotation + 720 + Math.random() * 360,
        transition: { duration: 1.6, ease: [0.2, 0.8, 0.4, 1] },
      }).then(() => {
        spinRef.current = (currentRotation + 720) % 360
      })
    }
  }, [isSpinAnimating, controls])

  const handleClick = (food: FoodOption) => {
    if (isSpinAnimating) return
    setActiveFood(food)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveFood(null)
    setIsCarouselActive(true)
  }

  const handlePick = (food: FoodOption) => {
    onSelect(food)
    setActiveFood(null)
    setIsCarouselActive(true)
  }

  return (
    <motion.div layout className="relative w-full">
      <AnimatePresence mode="sync">
        {activeFood && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            transition={transitionOverlay}
          >
            <motion.div
              layoutId={`food-${activeFood.id}`}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm"
              style={{
                background: "linear-gradient(135deg, #16161f, #1f1f2e)",
                border: `2px solid ${activeFood.color}`,
                borderRadius: "24px",
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <FoodCard food={activeFood} onPick={handlePick} onClose={handleClose} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-[280px] w-full overflow-hidden">
        {foods.length > 0 ? (
          <Carousel
            handleClick={handleClick}
            controls={controls}
            foods={foods}
            isCarouselActive={isCarouselActive}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <div className="text-4xl mb-3">😬</div>
              <p className="text-white/40 font-body">
                No options match your vibe.
                <br />
                Try loosening the filters!
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export { ThreeDFoodCarousel }
