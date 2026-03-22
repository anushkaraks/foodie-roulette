# 🎰 Foodie Roulette

> **"What do you want to eat?"** — *"Idk, what do you want?"*  
> This app ends that conversation forever.

A fun, interactive food decision-maker for groups. Spin the 3D roulette wheel, browse options, pick your vibe — and let fate (or your stomach) decide.


---

## ✨ Features

- 🎡 **3D Draggable Carousel** — Spin, flick, and browse 12 food options in a beautiful 3D wheel
- 🎲 **Random Spin Button** — Let the roulette decide with one click and confetti explosions
- 🔍 **Smart Filters** — Filter by mood (hungry, lazy, fancy, broke...), budget, and veggie preference
- 📱 **Share the result** — Tell your squad what you're eating via native share or clipboard
- 🎉 **Confetti celebration** — Every winner gets a custom confetti burst in the food's color
- 📱 **Fully responsive** — Works on phones for when you're out with the group

---

## 🗂 Project Structure

```
foodie-roulette/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── 3d-carousel.tsx     ← The 3D wheel component (shadcn-style)
│   │   ├── FoodCard.tsx            ← Expanded food detail popup
│   │   ├── FiltersBar.tsx          ← Mood/budget/veggie filters
│   │   ├── RandomButton.tsx        ← The big spin button with animations
│   │   └── WinnerScreen.tsx        ← Celebration screen after picking
│   ├── data/
│   │   └── foods.ts                ← All 12 food options + filter logic
│   ├── utils/
│   │   └── confetti.ts             ← Custom confetti (no external deps!)
│   ├── App.tsx                     ← Main app state & layout
│   ├── main.tsx                    ← React entry point
│   └── index.css                   ← Global styles + grain texture
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18+ installed ([download here](https://nodejs.org))
- npm or yarn

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/foodie-roulette.git
cd foodie-roulette

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

---

## 📦 Deploy to GitHub Pages (Free!)

This is the easiest way to share the app with your friends — no server needed.

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "🎰 Initial commit - Foodie Roulette"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/foodie-roulette.git
git push -u origin main
```

### Step 2: Update vite.config.ts

Add your repo name as the base path:

```ts
export default defineConfig({
  plugins: [react()],
  base: '/foodie-roulette/',   // ← add this line
  resolve: { ... }
})
```

Commit this change:
```bash
git add vite.config.ts
git commit -m "fix: add base path for GitHub Pages"
git push
```

### Step 3: Build the app

```bash
npm run build
```

This creates a `dist/` folder.

### Step 4: Deploy with gh-pages

```bash
# Install the deploy tool (once)
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Then deploy:
npm run build && npx gh-pages -d dist
```

### Step 5: Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select branch: **gh-pages**, folder: **/ (root)**
5. Click **Save**

Your app will be live at:  
`https://YOUR_USERNAME.github.io/foodie-roulette/`

🎉 Share this link with your friends!

---

## 🌐 Alternative: Deploy to Vercel (Even Easier)

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **"New Project"**
3. Import your `foodie-roulette` repo
4. Click **Deploy** (no config needed — Vite is auto-detected)
5. Share the `*.vercel.app` URL

**No base path changes needed for Vercel.**

---

## 🍱 Adding More Foods

Edit `src/data/foods.ts` and add a new entry to `FOOD_OPTIONS`:

```ts
{
  id: 'shawarma',
  name: 'Shawarma',
  emoji: '🌯',
  cuisine: 'Middle Eastern',
  vibe: ['smoky', 'satisfying', 'street food'],
  priceRange: '$',
  timeToEat: 'quick',
  description: 'Crispy edges, soft meat, garlic sauce. Peak street food.',
  imageQuery: 'shawarma wrap street food',
  color: '#c9a84c',
  tags: ['street food', 'quick', 'meat'],
},
```

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool (fast!) |
| Tailwind CSS | Styling |
| Framer Motion | Animations & 3D carousel |
| Lucide React | Icons |
| No backend | 🎉 100% static |

---

## 🧑‍💻 Customization Ideas

- 🗺️ **Add city-specific options** — Bangalore street food, Mumbai snacks, etc.
- ⭐ **Favorites** — Save your go-tos in localStorage
- 🔗 **Invite link** — Share a URL with pre-set filters with your group
- 🗳️ **Group vote mode** — Each person spins, majority wins
- 🕐 **History** — See what you picked last time so you don't repeat

---

Made with ❤️ and hunger 🍽️
