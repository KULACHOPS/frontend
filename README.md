# 🌶️ KULACHOPS — Campus Food Ordering & Delivery Platform

> **Chop Life on Campus.** On-demand food delivery connecting university students with campus canteens, bukka spots, grills, and late-night noodle hubs — direct to hostel doors.

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)](https://vitejs.dev/)
[![Platform](https://img.shields.io/badge/Platform-Web%20%2F%20PWA-orange.svg)](#)
[![Brand](https://img.shields.io/badge/Style-Chowdeck--Inspired-D9381E.svg)](#)

---

## 📖 Overview

**KULACHOPS** is a specialized campus food ordering and delivery web application inspired by the Chowdeck on-demand delivery model, specifically optimized for Nigerian university campuses. It bridges the gap between busy students in hostels/lecture halls and campus food vendors, offering affordable delivery fees, late-night operations (up to 2:00 AM), zero-failure wallet transactions, and secure 4-digit PIN handover verification.

---

## 🎨 Color Palette & Brand Design System

KULACHOPS features a custom Nigerian culinary-inspired color system with warm, appetizing, and premium tones:

| Role | Color Name | Hex Code | Usage in App |
| :--- | :--- | :--- | :--- |
| **Primary** | **Pepper Red** | `#D9381E` | Primary CTA buttons, flame brand gradients, cart indicators, live tracking route pulses |
| **Main Background** | **Ivory** | `#F8F5EF` | Global page background, modal canvases, drawer surfaces |
| **Secondary Background** | **Warm Stone** | `#E9E3D8` | Category pills, inactive filter chips, toggle tracks, borders (`#DDD6CA`) |
| **Dark** | **Espresso** | `#241A17` | Main headings, body typography, hero section background, dark modal headers, footer |
| **Premium Accent** | **Muted Brass** | `#B59A68` | Rating stars, promo/voucher tags, late-night alerts, subtle radial glows |
| **Secondary Accent** | **Sage** | `#7A8469` | Campus vetted badges, delivered tags, rider online badges, positive operational states |

---

## ✨ Key Features

### 🎓 1. Student Experience (Chowdeck-Inspired)
- **Hero & Live Discovery**: Dynamic campus selector, instant food/canteen search, and promo code claim banner (`CHOPLIFE50`).
- **Campus Curation**: Curated categories (Rice & Bowls, Grills & Shawarma, Swallow & Soups, Quick Bites, Late Night 2AM, Chillers & Parfait).
- **Canteen & Bukka Profiles**: Operating hours, prep times, reviews, delivery fees, and verified student favorites.
- **Customizable Menu Items**: Select proteins (beef, chicken, goat meat, fish), sides (plantain, coleslaw, egg), spicy levels, and chef notes.
- **Student Cart Drawer**: Multi-item tray with packaging fees and platform fee calculation.
- **Multi-Payment Checkout**:
  - **In-App Student Wallet**: Instant debit with zero gateway timeouts.
  - **Virtual Bank Transfer**: Dynamic account details with auto-verification.
  - **Debit Card**: PCI-DSS gateway integration.
  - **Hostel Drop-off**: Select hostel, block/floor, room number, and rider instructions.
- **Live Order Tracking**:
  - Animated route tracking map from vendor to student hostel.
  - Estimated delivery countdown timer.
  - Assigned rider phone and direct call action.
  - **4-Digit Handover PIN**: Secure PIN system to guarantee delivery before rider completion.
- **Wallet Top-Up Modal**: Fast top-ups with preset student amounts (₦1,000, ₦2,500, ₦5,000, ₦10,000).
- **Order History & Reorder**: Track past orders and re-add favorite meals to tray in 1 click.
- **Ratings & Reviews**: 5-star ratings for food quality and rider courtesy.
- **Authentication & PWA Nav**: Mobile bottom navigation bar displayed conditionally once signed in.

### 🍳 2. Vendor Kitchen Terminal
- Multi-vendor switching (Mama Cass, Sweet Sensation, Iya Basira, Suya & Grills Hub, Night Owl Noodles).
- Real-time kitchen ticket queue with loud order alerts and auto-cancel timers.
- Order progression: **Accept Order ➔ Start Cooking ➔ Mark Ready for Rider**.
- Instant menu item stock control (toggle dishes out-of-stock when ingredients finish).
- Settlement tracking with daily revenue breakdown and 10% platform commission calculation.

### 🚴 3. Rider Dispatch View
- Online / Offline toggle with live status indicator.
- Incoming campus job offers with delivery distance and earnings breakdown (+₦450 per drop).
- Mission progression: **Collected from Kitchen ➔ En Route to Hostel ➔ Handover Verification**.
- 4-digit PIN verification input ensuring accurate meal handover.
- Daily earnings counter and completed runs log.

### 🛡️ 4. Super Admin Operations Center
- Multi-campus dispatch metrics (University of Lagos, UNIBEN, FUTA).
- Real-time GMV, platform commission, active order feed, and vendor roster.
- University zone management with base delivery fee controls.
- Payout settlement ledger for weekly merchant disbursements.

---

## 🏗️ Project Architecture

```
kulachops/
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   └── AdminPanel.tsx          # Campus admin & operations ledger
│   │   │   ├── common/
│   │   │   │   ├── BottomNav.tsx           # PWA bottom nav (authenticated students)
│   │   │   │   ├── CampusSelectorModal.tsx # University campus switcher
│   │   │   │   ├── Navbar.tsx              # Brand header & quick actions
│   │   │   │   ├── RoleSwitcherBanner.tsx  # Role simulation banner
│   │   │   │   └── Toast.tsx               # Global notification toasts
│   │   │   ├── rider/
│   │   │   │   └── RiderInterface.tsx      # Courier dispatch & PIN verification
│   │   │   ├── student/
│   │   │   │   ├── AuthModal.tsx           # Student login & OTP modal
│   │   │   │   ├── CartDrawer.tsx          # Tray slider with fee breakdown
│   │   │   │   ├── CategoryList.tsx        # Food categories horizontal bar
│   │   │   │   ├── CheckoutModal.tsx       # Address, payment, and order placement
│   │   │   │   ├── FilterBar.tsx           # Search, sort, and dietary filters
│   │   │   │   ├── HeroBanner.tsx          # Floating search & promo banner
│   │   │   │   ├── LandingPage.tsx         # Chowdeck-style student landing page
│   │   │   │   ├── MenuItemModal.tsx       # Dish customization & sides selection
│   │   │   │   ├── OrderHistoryModal.tsx   # Order receipts & reorder
│   │   │   │   ├── OrderTrackingModal.tsx  # Live animated map & courier PIN
│   │   │   │   ├── RatingModal.tsx         # 5-star review modal
│   │   │   │   ├── VendorCard.tsx          # Canteen summary card
│   │   │   │   ├── VendorDetailView.tsx    # Canteen menu & items showcase
│   │   │   │   └── WalletModal.tsx         # Student balance & instant top-up
│   │   │   └── vendor/
│   │   │       └── VendorDashboard.tsx     # Kitchen ticket terminal & menu stock
│   │   ├── context/
│   │   │   └── AppContext.tsx              # Central state management & order lifecycle
│   │   ├── data/
│   │   │   └── mockData.ts                 # Campuses, canteens, menus & student profiles
│   │   ├── types/
│   │   │   └── index.ts                    # Full TypeScript domain interfaces
│   │   ├── App.tsx                         # Main app router & layout
│   │   ├── index.css                       # Design system tokens & global styling
│   │   └── main.tsx                        # React DOM root entry
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher

### Installation & Run

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📱 Mobile & PWA Behavior

- Built mobile-first with adaptive layouts (`min-width: 768px` breakpoints).
- **Public Visitors**: Unauthenticated students explore the landing page with zero clutter.
- **Signed-in Students**: The bottom navigation bar automatically appears, providing 1-tap access to **Explore**, **Search**, **Orders**, and **Wallet/Profile**.

---

## 📄 License & Credits

Developed for **Pi-Technology Services (PTS)** — Kulachops Project.  
Reference Model: Chowdeck-style campus food delivery platform.
