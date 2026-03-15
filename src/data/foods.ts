export interface FoodOption {
  id: string
  name: string
  emoji: string
  cuisine: string
  vibe: string[]
  priceRange: "Rs" | "RsRs" | "RsRsRs"
  timeToEat: "quick" | "casual" | "leisurely"
  description: string
  imageQuery: string
  color: string
  tags: string[]
}

export const FOOD_OPTIONS: FoodOption[] = [
  {
    id: "biryani",
    name: "Biryani",
    emoji: "🍚",
    cuisine: "Indian",
    vibe: ["comfort", "hearty", "aromatic"],
    priceRange: "RsRs",
    timeToEat: "casual",
    description: "Fragrant rice layers with perfectly spiced meat. The ultimate group meal.",
    imageQuery: "biryani rice indian food",
    color: "#f4a261",
    tags: ["rice", "spicy", "indian", "sharing", "vegetarian-friendly"],
  },
  {
    id: "pizza",
    name: "Pizza",
    emoji: "🍕",
    cuisine: "Italian",
    vibe: ["fun", "casual", "crowd-pleaser"],
    priceRange: "RsRs",
    timeToEat: "casual",
    description: "Everyone loves pizza. No debates, no drama. Just cheesy perfection.",
    imageQuery: "pizza margherita italian",
    color: "#e63946",
    tags: ["cheese", "baked", "italian", "sharing", "vegetarian-friendly"],
  },
  {
    id: "tacos",
    name: "Tacos",
    emoji: "🌮",
    cuisine: "Mexican",
    vibe: ["fun", "casual", "vibrant"],
    priceRange: "Rs",
    timeToEat: "quick",
    description: "Handheld happiness. Crispy, soft, spicy, fresh — pick your fighter.",
    imageQuery: "tacos mexican street food",
    color: "#e9c46a",
    tags: ["street food", "mexican", "quick", "fresh"],
  },
  {
    id: "sushi",
    name: "Sushi",
    emoji: "🍣",
    cuisine: "Japanese",
    vibe: ["elegant", "fresh", "adventurous"],
    priceRange: "RsRsRs",
    timeToEat: "leisurely",
    description: "For when the group is feeling fancy. Precision in every bite.",
    imageQuery: "sushi platter japanese",
    color: "#264653",
    tags: ["seafood", "japanese", "fresh", "premium"],
  },
  {
    id: "ramen",
    name: "Ramen",
    emoji: "🍜",
    cuisine: "Japanese",
    vibe: ["comfort", "warm", "cozy"],
    priceRange: "RsRs",
    timeToEat: "casual",
    description: "A bowl of pure soul. Rich broth, springy noodles, perfect soft egg.",
    imageQuery: "ramen noodle soup japanese",
    color: "#a4161a",
    tags: ["noodles", "soup", "japanese", "comfort"],
  },
  {
    id: "burgers",
    name: "Burgers",
    emoji: "🍔",
    cuisine: "American",
    vibe: ["casual", "hearty", "fun"],
    priceRange: "Rs",
    timeToEat: "quick",
    description: "The classic. Juicy, messy, and absolutely worth it.",
    imageQuery: "gourmet burger american",
    color: "#d4a373",
    tags: ["beef", "american", "quick", "hearty"],
  },
  {
    id: "dosa",
    name: "Dosa",
    emoji: "🫓",
    cuisine: "South Indian",
    vibe: ["crispy", "light", "authentic"],
    priceRange: "Rs",
    timeToEat: "quick",
    description: "Paper-thin, golden, and crispy. The best quick eat Bangalore has to offer.",
    imageQuery: "masala dosa south indian",
    color: "#e9c46a",
    tags: ["south indian", "crispy", "vegetarian", "quick"],
  },
  {
    id: "thai",
    name: "Thai Curry",
    emoji: "🍛",
    cuisine: "Thai",
    vibe: ["bold", "aromatic", "spicy"],
    priceRange: "RsRs",
    timeToEat: "casual",
    description: "Creamy coconut, fresh herbs, bold chilies. Thai hits different.",
    imageQuery: "thai green curry coconut",
    color: "#2d6a4f",
    tags: ["curry", "thai", "spicy", "aromatic", "vegetarian-friendly"],
  },
  {
    id: "bbq",
    name: "BBQ",
    emoji: "🥩",
    cuisine: "American",
    vibe: ["smoky", "hearty", "festive"],
    priceRange: "RsRsRs",
    timeToEat: "leisurely",
    description: "Low and slow. Smoky, fall-off-the-bone magic for hungry groups.",
    imageQuery: "bbq ribs smoky grilled",
    color: "#6b1f1f",
    tags: ["meat", "grilled", "american", "sharing"],
  },
  {
    id: "chinese",
    name: "Dim Sum",
    emoji: "🥟",
    cuisine: "Chinese",
    vibe: ["fun", "sharing", "variety"],
    priceRange: "RsRs",
    timeToEat: "leisurely",
    description: "Endless little baskets of joy. Order everything. Regret nothing.",
    imageQuery: "dim sum dumplings chinese",
    color: "#c1121f",
    tags: ["dumplings", "chinese", "sharing", "variety", "vegetarian-friendly"],
  },
  {
    id: "kebab",
    name: "Kebabs",
    emoji: "🥙",
    cuisine: "Middle Eastern",
    vibe: ["smoky", "hearty", "street food"],
    priceRange: "Rs",
    timeToEat: "quick",
    description: "Fire-kissed, spiced perfection. The street food that never fails.",
    imageQuery: "kebab grilled meat middle eastern",
    color: "#8b4513",
    tags: ["grilled", "street food", "spiced", "quick"],
  },
  {
    id: "pasta",
    name: "Pasta",
    emoji: "🍝",
    cuisine: "Italian",
    vibe: ["comfort", "hearty", "satisfying"],
    priceRange: "RsRs",
    timeToEat: "casual",
    description: "Carbs are a love language. Bold sauce, al dente noodles, done.",
    imageQuery: "pasta italian tomato sauce",
    color: "#c44d00",
    tags: ["italian", "noodles", "comfort", "vegetarian-friendly"],
  },
]

export type Mood = "hungry" | "adventurous" | "lazy" | "fancy" | "broke"
export type GroupSize = "just-us-two" | "small-gang" | "big-squad"

export interface Filters {
  mood: Mood | null
  groupSize: GroupSize | null
  budget: "Rs" | "RsRs" | "RsRsRs" | null
  veggieOnly: boolean
}

export function filterFoods(filters: Filters): FoodOption[] {
  return FOOD_OPTIONS.filter((food) => {
    // Exact budget match
    if (filters.budget && food.priceRange !== filters.budget) return false

    // Veggie: keep vegetarian or vegetarian-friendly items
    if (filters.veggieOnly) {
      const isVeg =
        food.tags.includes("vegetarian") || food.tags.includes("vegetarian-friendly")
      if (!isVeg) return false
    }

    // Mood filters
    if (filters.mood === "broke" && food.priceRange === "RsRsRs") return false
    if (filters.mood === "fancy" && food.priceRange === "Rs") return false
    if (filters.mood === "lazy" && food.timeToEat === "leisurely") return false
    if (filters.mood === "hungry" && food.timeToEat === "leisurely") return false
    if (filters.mood === "adventurous") {
      const adventurous = ["Japanese", "Thai", "Middle Eastern", "Chinese"]
      if (!adventurous.includes(food.cuisine)) return false
    }

    return true
  })
}

export function getRandomFood(options: FoodOption[]): FoodOption {
  return options[Math.floor(Math.random() * options.length)]
}

// Display helper: convert internal price key to rupee symbols
export function formatPrice(priceRange: string): string {
  return priceRange.replace(/Rs/g, "₹")
}
