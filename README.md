# NOVA — Premium Editorial E-Commerce HTML Template

**NOVA** is an editorial, luxury lifestyle and fashion e-commerce website template built exclusively with modern **HTML5, CSS3, Vanilla JavaScript, GSAP, and GSAP ScrollTrigger**.

Designed to look and feel like an award-winning digital experience, NOVA emphasizes large typography, generous whitespace, near-black minimalist surfaces, sophisticated product presentation, and smooth, scroll-driven physics.

---

## Table of Contents

1. [How to Run the Template](#1-how-to-run-the-template)
2. [How to Change the Brand Name](#2-how-to-change-the-brand-name)
3. [How to Change Colors & Theming](#3-how-to-change-colors--theming)
4. [How to Add Products](#4-how-to-add-products)
5. [How to Change Product Images & Media](#5-how-to-change-product-images--media)
6. [How to Customize Navigation & Links](#6-how-to-customize-navigation--links)
7. [How the Cart System Works](#7-how-the-cart-system-works)
8. [How the Animation Engine Works (GSAP & ScrollTrigger)](#8-how-the-animation-engine-works)
9. [How to Replace Demo Checkout with Real Payments (Stripe / Shopify / PayPal)](#9-how-to-replace-demo-checkout)
10. [Credits & External Libraries](#10-credits--external-libraries)

---

## 1. How to Run the Template

NOVA is a clean, dependency-free static website template. You do not need Node.js or a backend to run it.

### Method A: Local Web Server (Recommended)
You can serve the template using any lightweight static server:

* **VS Code Live Server**: Right-click `index.html` in VS Code and click **"Open with Live Server"**.
* **Python**:
  ```bash
  python3 -m http.server 8000
  ```
  Open `http://localhost:8000` in your browser.
* **Node (npx serve)**:
  ```bash
  npx serve .
  ```

### Method B: Vite / npm (Pre-configured Development Environment)
If you prefer running via npm:
```bash
npm install
npm run dev
```
Visit `http://localhost:3000`.

---

## 2. How to Change the Brand Name

The placeholder brand name is **NOVA**. To rebrand the template:

1. **HTML Headers & Footers**:
   Search for `<span class="brand-logo">NOVA<span class="dot"></span></span>` across `.html` files and replace `NOVA` with your brand name.
2. **Page Titles**:
   Update the `<title>` tag inside `<head>` in `index.html`, `shop.html`, `product.html`, `cart.html`, `checkout.html`, `wishlist.html`, `about.html`, and `contact.html`.
3. **Data Store**:
   In `js/products.js`, update product names or descriptions referencing `NOVA`.

---

## 3. How to Change Colors & Theming

All theme variables are centralized in `css/style.css` at the top of the `:root` block:

```css
:root {
  /* Canvas & Structural Surfaces */
  --bg-primary: #0A0A0C;       /* Main canvas background */
  --bg-surface: #111114;       /* Card & section background */
  --bg-elevated: #16161B;      /* Inputs & elevated modules */
  --bg-card: #141418;          /* Product card background */

  /* Typography */
  --text-primary: #F4F4F2;     /* Crisp off-white display type */
  --text-secondary: #90909A;   /* Muted paragraph copy */
  --text-muted: #5A5A66;       /* Subtext & breadcrumbs */

  /* Refined Accent */
  --accent: #C8A97E;           /* Champagne Gold / Bronze accent */
  --accent-hover: #DFBF92;
  --accent-subtle: rgba(200, 169, 126, 0.12);

  /* Typography Fonts */
  --font-display: 'Syne', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

To switch to a cobalt-blue or platinum palette, simply update `--accent` (e.g. `#4A72FF` or `#D4D4D8`).

---

## 4. How to Add Products

Products are stored in a single central catalog file: `js/products.js`.

To add a new product, append a new object to `NOVA_PRODUCTS`:

```javascript
{
  id: "your-product-slug",
  name: "Sculptural Wool Knit",
  category: "Apparel",
  categorySlug: "apparel",
  price: 420,
  originalPrice: 480,
  rating: 4.9,
  reviewsCount: 18,
  badge: "New Arrival",
  image: "assets/images/your-product.jpg",
  gallery: [
    "assets/images/your-product.jpg",
    "assets/images/your-product-alt.jpg"
  ],
  description: "A detailed editorial overview of the craftsmanship.",
  details: [
    "100% Extrafine Merino Wool",
    "Hand-finished in Biella, Italy",
    "Tubular rib collar"
  ],
  specs: {
    "Weight": "380 GSM",
    "Fit": "Architectural Relaxed",
    "Care": "Dry Clean Only"
  },
  sizes: ["S", "M", "L", "XL"],
  colors: [
    { name: "Obsidian Black", hex: "#121214" },
    { name: "Raw Slate", hex: "#3A3A42" }
  ],
  isFeatured: true,     // Display on homepage featured grid
  isNewArrival: true,   // Display on homepage horizontal scroll
  inStock: true
}
```

The shop filtering, sorting, PDP details, and search will immediately index the new piece.

---

## 5. How to Change Product Images & Media

* Images are stored in `assets/images/`.
* You can replace the provided vector `.svg` artwork with standard `.webp`, `.jpg`, or `.png` photography.
* **Recommended Aspect Ratios**:
  * Product cards & PDP: `1:1` or `4:5` (e.g. `1000x1000px` or `800x1000px`).
  * Editorial banners & Immersive section: `16:9` or `16:10` (e.g. `1600x1000px`).
* Ensure all images have descriptive `alt` tags for accessibility and SEO.

---

## 6. How to Customize Navigation & Links

Navigation links are defined in `index.html` (and repeated in the header of each page):

```html
<nav class="desktop-nav">
  <a href="shop.html" class="nav-link">Shop</a>
  <a href="shop.html?category=footwear" class="nav-link">Collections</a>
  <a href="about.html" class="nav-link">About</a>
  <a href="about.html#journal" class="nav-link">Journal</a>
  <a href="contact.html" class="nav-link">Contact</a>
</nav>
```

Active state is automatically recognized by `initActiveNav()` in `js/main.js` based on the current window URL.

---

## 7. How the Cart System Works

The cart runs entirely in client-side memory using `localStorage` through `js/cart.js`:

* **Key APIs**:
  * `addToCart(productId, size, color, quantity)`
  * `removeFromCart(index)`
  * `updateCartQuantity(index, newQty)`
  * `clearCart()`
  * `getCartTotals()`
* **Promotions**: Applying promo code `NOVA10` applies a 10% subtotal deduction.
* **Shipping Threshold**: Orders exceeding `$250` automatically receive complimentary express freight.
* **Cart Drawer**: The flyout drawer is accessible globally across all pages without requiring page reloads.

---

## 8. How the Animation Engine Works

All animations are coordinated in `js/animations.js` using **GSAP** and **ScrollTrigger**:

1. **Navbar Dynamic Blur**: Triggers `.scrolled` state after 50px of vertical travel.
2. **Hero Interactive Float & Parallax**:
   * Staggered text mask reveals on initial load.
   * Product scales, rotates, and translates vertically with scroll scrub.
   * Floating geometric rings rotate on continuous mathematical trajectories.
   * Desktop mouse position generates subtle 3D rotational tilt.
3. **Marquee Ticker**: Continuous horizontal velocity looping via GSAP timeline.
4. **Horizontal Scroll Presentation**: The New Arrivals section pins the viewport on desktop and translates horizontally as the user scrolls vertically.
5. **Accessibility / Reduced Motion**:
   All scroll-scrubs and floating loops immediately yield to `@media (prefers-reduced-motion: reduce)` for users who specify reduced motion in their OS.

---

## 9. How to Replace Demo Checkout with Real Payments

The checkout in `checkout.html` is structured as a client-side template demo. To connect a live payment processor:

* **Stripe Checkout**:
  Replace `checkoutForm.addEventListener('submit', ...)` in `js/checkout.js` with your backend endpoint calling `stripe.checkout.sessions.create()` and redirect to `session.url`.
* **Shopify Storefront API**:
  Submit the cart array (`getCartItems()`) to the Shopify Storefront GraphQL `checkoutCreate` mutation.
* **PayPal / Braintree**:
  Drop in the PayPal JavaScript SDK buttons inside `#panel-card`.

---

## 10. Credits & External Libraries

* **GSAP & ScrollTrigger** — [GreenSock](https://greensock.com/gsap/) (v3.12.5 via Cloudflare CDN)
* **Google Fonts** — [Syne](https://fonts.google.com/specimen/Syne), [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
* **Icons** — Clean semantic SVG vector definitions (inspired by Lucide).

---
© 2026 NOVA Atelier. Built for commercial editorial storefronts.
