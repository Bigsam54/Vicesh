# <img src="https://res.cloudinary.com/dja3u7oha/image/upload/v1782844744/VIKESH_LOGO_SYMBOL_MAIN_euzsju.png" align="center" width="48" height="48" alt="VIKESH Symbol"/> VICESH COSMETICS ECOMMERCE

[![Framework](https://img.shields.io/badge/Framework-React%2019-ec4899?style=for-the-badge&logo=react)](https://react.dev/)
[![Build Tool](https://img.shields.io/badge/Build%20Tool-Vite-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS%204-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Language](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)](#)

An exquisite, world-class digital flagship for **Vicesh Cosmetics**, a premium Ghanaian beauty brand. Vicesh Cosmetics combines luxury branding with clean, unrefined West African botanical heritage, delivering an intuitive and seamless ecommerce experience for modern organic self-care.

---

## 📸 Hero Banner & Visual Identity

<div align="center">
  <img src="https://res.cloudinary.com/dja3u7oha/image/upload/v1782844746/VIKESH_Variation_vzqsnb.png" width="400" alt="Vicesh Logo Banner" style="max-width:100%;" />
  <p><em>"Unrefined West African Heritage — Handcrafted Luxury Formulations"</em></p>
</div>

### 🌐 Live Showcase & Preview
* **Live Storefront Demo:** [Vicesh Cosmetics Flagship](https://ais-pre-v5glj2dvqjhxxab344imqd-29359642493.europe-west2.run.app)
* **API Ingress Gateway:** `Port 3000` (Reverse Nginx Ingress Proxy enabled)

---

## 🌿 Project Overview

Vicesh Cosmetics specializes in premium, eco-friendly haircare, skincare, pedicure, and manicure systems. Each formula is ethically infused with wild-harvested botanicals and essential oils, sourced directly from women-led agricultural cooperatives in Northern Ghana.

This application is designed as an immersive digital showroom. It features high-fidelity typography, fluid micro-interactions, responsive touch ergonomics, and robust, offline-resilient local persistence to ensure a prestigious consumer journey on all device formats.

---

## ✨ Features

The storefront comes pre-loaded with comprehensive, production-grade features built directly into a lightweight, fully client-contained state machine:

| Feature Category | Description |
| :--- | :--- |
| **📱 Fully Responsive** | Designed from the ground up for fluid adaptability across mobile, tablet, and ultra-wide desktops. |
| **✨ Modern UI / UX** | Styled with high-contrast editorial typography, smooth layout transitions, and generous negative space. |
| **🛍️ Ecommerce Store** | Dynamic interactive storefront with single-click collection filters, quick view modal triggers, and dynamic image grids. |
| **🛒 Cart & Checkout** | Full-fledged real-time cart drawer with automatic tax calculations, discount coupon systems, and delivery progress steps. |
| **👤 Customer Accounts** | Client-side account simulation with order histories, personal profile forms, and saved shipping configurations. |
| **💖 Wishlist Manager** | Localized bookmarking hub to instantly save and recall custom items with heart-button feedback. |
| **📦 Dynamic Collections** | Quick exploration tiles including *Hair & Scalp Care*, *Skin Talk Pedicure*, and *Nail & Manicure Systems*. |
| **🔍 Instant Product Search**| In-memory search filter scanning product titles, ingredient listings, and benefits instantly. |
| **💬 Interactive FAQs** | Smooth accordion layout detailing botanical sourcing, shelf lives, and eco-delivery systems. |
| **✉️ Wholesale & Contact** | Modern high-fidelity form handlers for consumer relations and bulk institutional purchasing. |
| **🌱 Ghana Eco-Heritage** | Tailored brand assets including the exclusive unrefined shea, rosemary oil, and sweet almond listings. |
| **🦾 Accessible UI** | Semantic elements, full screen-reader compliance, and generous touch target ratios (>44px). |

---

## 🛠️ Technology Stack

```
   ┌────────────────────────────────────────────────────────┐
   │                       Storefront                       │
   │               React 19 & Vite 6 (SPA)                  │
   └───────────────────────────┬────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌───────────────────────┐             ┌───────────────────────┐
│     User Interface    │             │   Component Engine    │
│  Tailwind CSS v4.1    │             │  Motion / Lucide Icons│
└───────────────────────┘             └───────────────────────┘
```

### Frontend Architecture
* **Core Engine:** **React 19** utilizing functional components, custom storage hooks, and reactive contexts.
* **Build System:** **Vite 6** utilizing type-stripping ESM builds with Hot Module Replacement (HMR) constraints.
* **Styling Framework:** **Tailwind CSS v4** featuring responsive utility prefixes (`sm:`, `md:`, `lg:`) and fluid custom themes.
* **Animations:** **Motion** (React) for staggered entrance offsets and cart drawer slides.
* **Iconography:** **Lucide React** for modern, uniform high-contrast vector outlines.

### Future Backend Infrastructure (Planned Integration)
* **API Service:** Node.js + Express.js Restful API (fully prepared using TSX/Esbuild bundles).
* **Database Layer:** Cloud SQL (PostgreSQL) managed via Drizzle ORM or Firestore for user state caching.
* **Payment Integration:** Paystack / Stripe sandbox APIs.

---

## 📁 Folder Structure

The project has been organized following modular design system practices to separate concerns and ensure token-safe generation limits:

```text
/
├── index.html                  # Standard entry point & custom Favicon hook
├── package.json                # Dependencies, development & deployment build pipelines
├── metadata.json               # Platform app description & frame capability configurations
├── src/
│   ├── main.tsx                # Master bootstrapping script (React DOM render)
│   ├── App.tsx                 # Core application layout & routing controller
│   ├── index.css               # Global stylesheets importing Tailwind CSS v4 & Google Fonts
│   ├── types.ts                # Strict TypeScript global interfaces (Product, CartItem, Order)
│   ├── context/
│   │   └── StoreContext.tsx    # Global React Context tracking Cart, Wishlist, Search, & Active User
│   ├── data/
│   │   ├── faqs.ts             # Static structured FAQ database
│   │   └── products.ts         # High-fidelity botanical catalog & pricing lists
│   ├── components/
│   │   ├── Header.tsx          # Optimized sticky header with Logo asset, Desktop navigation & Mobile menu
│   │   ├── Footer.tsx          # Premium informative footer with wholesale, newsletter, & site maps
│   │   ├── ProductCard.tsx     # Reusable product cards with animated hover imagery & quick add
│   │   ├── BrandDroplet.tsx    # Signature branding asset vector representation
│   │   └── QuickViewModal.tsx  # Dynamic floating product detail popup modal
│   └── pages/
│       ├── Home.tsx            # Landing Page with Hero slider, collections, and featured sections
│       ├── Shop.tsx            # Shop Page with instant Collection Explorer and grid controls
│       ├── ProductDetail.tsx   # Botanical profile pages detailing ingredients and directions
│       ├── Cart.tsx            # Full interactive shopping cart overview and calculators
│       ├── Checkout.tsx        # High-end step-by-step transaction checkout flow
│       ├── Account.tsx         # User Profile, Saved items, and Historic invoice simulator
│       ├── AboutUs.tsx         # "Our Story" page showing sustainable Ghanian heritage
│       ├── Contact.tsx         # Client support & Wholesale inquiry channels
│       ├── FAQs.tsx            # Interactive accordion details on eco-stamps
│       ├── Policies.tsx        # Standard shipping, returns, and privacy agreements
│       └── NotFound.tsx        # 404 Elegant error recovery screen
```

---

## 🚀 Installation & Running Locally

Get your development environment up and running in under two minutes:

### Prerequisites
Make sure you have [Node.js (v18 or higher)](https://nodejs.org/) installed on your machine.

### 1. Clone & Navigate
```bash
git clone https://github.com/your-username/vicesh-cosmetics.git
cd vicesh-cosmetics
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Spin Up Development Server
```bash
npm run dev
```
Once started, open [http://localhost:3000](http://localhost:3000) in your web browser.

### Available Production Command Scripts
* `npm run build` : Compiles optimized production-ready static assets to the `/dist` directory.
* `npm run lint` : Runs the strict TypeScript compiler check (`tsc --noEmit`) to enforce type-safety.
* `npm run preview` : Tests the production-compiled assets locally.

---

## 🔒 Environment Variables

To add third-party payment gates or persistent cloud databases, create a `.env` file in the root directory.

Check the reference blueprint in `.env.example`:

```env
# Server Ingress Port (Default: 3000)
PORT=3000

# Backend Secrets (Optional - kept fully server-side)
GEMINI_API_KEY=your_gemini_api_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
PAYSTACK_SECRET_KEY=your_paystack_secret_key_here
```

---

## 🎨 Design System

Vicesh Cosmetics uses a highly tailored visual framework designed to convey purity, heritage, and luxury:

### 📐 Typography
* **Primary Display (Headings):** **Playfair Display** (imported via Google Fonts) paired with tailored tracking and line spacing to provide a high-end editorial feel.
* **Body copy & Controls:** **Inter** (sans-serif) for general labels, form inputs, and descriptions.
* **Data / Status Tags:** **JetBrains Mono** or **Fira Code** for technical metrics, ingredient tracking, and price lists.

### 🎨 Premium Color Palette
```
██████████  #1C1326  - Deep Charcoal (Base text & premium headers)
██████████  #FCFAF6  - Off-White Cream (Page background panels)
██████████  #E2DCD0  - Soft Warm Beige (Delicate border separators)
██████████  #1A332C  - Forest Green (Primary calls-to-action & accents)
██████████  #D4AF37  - Ghanaian Gold (Signature botanical stamps)
██████████  #5D536B  - Slate Amethyst (Muted captions & descriptions)
```

### 📏 Grid System & Breakpoints
* **Mobile Layouts (< 768px):** Centered logo placement, single-column list stacks, large mobile-friendly CTA cards.
* **Tablet Layouts (768px - 1024px):** Dual-column product displays, expanding slide-out cart drawers.
* **Desktop Grid (1024px+):** Tri-column editorial grids, sticky sidebars, and fluid screen wrappers (`max-w-7xl mx-auto`).

---

## 🧩 Component Library Documentation

The project includes an array of meticulously designed, modular components:

<details>
<summary><b>🔹 Core Navigation Components</b></summary>
<br>

* **Header (Sticky Navigation):**
  * Auto-hides on scroll up/down to preserve screenspace.
  * Injects the official branding logo (`vzqsnb.png`) with responsive scaling (increases to `h-14` / `sm:h-20` on desktop).
  * Re-allocates the mobile menu trigger cleanly to the top-right corner, and aligns the main logo to the far-left corner.
  * Hides distracting search and wishlist options on compact viewports to avoid header clutter.
* **Footer (Rich Directory):**
  * Contains direct links to policies, collections, custom forms, and heritage reports.
  * Integrates a client-side Newsletter submission form with real-time success feedback.
</details>

<details>
<summary><b>🔹 Product & Commerce Components</b></summary>
<br>

* **ProductCard:**
  * Uses aspect-ratio frames (`aspect-[4/5]`) to prevent layout shifts.
  * Displays high-quality Unsplash image placeholders with elegant hover zooms.
  * Houses quick-action "Quick View" modals and instantaneous "Add to Cart" triggers.
* **QuickViewModal:**
  * Displays comprehensive botanical profiles, directions for use, key ingredients, and shipping assurances inside a centered overlay card.
* **Collection Explorer (Shop.tsx):**
  * Implements an intelligent **Collection Explorer** screen on the shop entry.
  * Users click a signature card segment (e.g. *Hair Care*, *Pedicure*, *Manicure*) which activates that exact tag and opens the curated list instantly.
</details>

<details>
<summary><b>🔹 Interactive Elements</b></summary>
<br>

* **Cart Drawer & Checkout Form:**
  * Fully interactive, tracking added item quantities, computing promotional discounts, and handling order completions.
* **Accordions & Contact Forms:**
  * Found in FAQs and Contact pages, utilizing custom toggle hooks and fluid motion properties.
</details>

---

## 📈 Performance & Core Web Vitals

The codebase adheres strictly to lightweight, high-performance web development standards:

* **⚡ Layout Shift Prevention (CLS):** All images are constrained using Tailwind's strict aspect-ratio tags (e.g., `aspect-[4/5]`) alongside lazy referrers to ensure stable page-load rendering.
* **🍃 Zero Heavy External Dependencies:** The storefront runs entirely on React's virtual DOM tree without relying on large third-party canvas or styling bundles.
* **📁 Esbuild Compilation Integration:** Production bundles are parsed through Esbuild, converting TypeScript directly into compressed JavaScript fragments for rapid hosting delivery.

---

## ♿ Accessibility Considerations (A11y)

* **Semantic HTML Elements:** The structure strictly uses correct document tagging (such as `<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`, and `<button>`) to support native accessibility engines.
* **High Color Contrast:** Dark charcoal text (`#1C1326`) and forest green highlights (`#1A332C`) maintain a high-contrast ratio against the off-white background (`#FCFAF6`), comfortably passing WCAG AAA standards.
* **Touch-Target Sizing:** In accordance with standard touch ergonomics, all active interactive elements (including collection tiles, header menu nodes, and footer inputs) provide at least a `44px` physical target size on touchscreens.

---

## 🔍 SEO & Discovery Optimizations

* **Meta Management:** Each primary page view changes document head titles dynamically.
* **Structured Data:** High-fidelity JSON product listings are prepared to easily render schema markup (e.g. `Schema.org/Product`) for search indexing crawlers.
* **Social Graph Tags:** Optimized to support standard open-graph (OG) image headers and descriptions for crisp social card shares.

---

## 🔮 Future Roadmaps

1. **🔒 Real authentication with Firebase Auth:** Transitioning the customer simulator accounts to fully verified email/password databases.
2. **💳 Ghanaian Payment Gateway integration:** Fully hook up Paystack sandboxes to support real-time Cedis (GHS) and USD transactions.
3. **💬 AI-Powered Personal Apothecary Assistant:** Integrate Gemini models via server endpoints to analyze hair or skin types and recommend botanical formulations in real-time.

---

## 🤝 Contributing Guidelines

We welcome contributions from developers, designers, and botanists!

1. **Fork** the repository on GitHub.
2. Create a feature-specific branch (`git checkout -b feature/amazing-botanical`).
3. Commit your changes with descriptive messages (`git commit -m 'Add unrefined rosemary oil solution'`).
4. Push to the branch (`git push origin feature/amazing-botanical`).
5. Open a **Pull Request** detailing your modifications.

---

## 📜 Credits & License

* **Visual Assets & Logos:** Generously hosted and provided by Vicesh Cosmetic's media network.
* **Stock Photography:** Curation from [Unsplash](https://unsplash.com/).
* **Ghanaian Heritage Research:** Direct references to Northern Ghana shea and botanical processing collectives.

Licensed under the **MIT License** — feel free to utilize, modify, and distribute the repository code for your private and commercial operations.

---

<div align="center">
  <p>Crafted with pride 🌿 For Ghanaian Botanical Restoration</p>
  <img src="https://res.cloudinary.com/dja3u7oha/image/upload/v1782844744/VIKESH_LOGO_SYMBOL_MAIN_euzsju.png" width="32" alt="VIKESH Symbol Logo Footer"/>
</div>
