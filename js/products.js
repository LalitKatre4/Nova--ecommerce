/**
 * NOVA — Central Product Catalog
 * Commercial E-Commerce Template Data Store
 * All products, pricing, variants, and specifications are maintained here.
 */

const NOVA_PRODUCTS = [
  {
    id: "eclipse-runner",
    name: "Eclipse Runner",
    category: "Footwear",
    categorySlug: "footwear",
    price: 380,
    originalPrice: 420,
    rating: 4.9,
    reviewsCount: 38,
    badge: "Bestseller",
    image: "/assets/images/eclipse-runner.jpg",
    gallery: [
      "/assets/images/eclipse-runner.jpg",
      "/assets/images/terra-boot.jpg",
      "/assets/images/vector-crossbody.jpg"
    ],
    description: "An avant-garde technical runner fusing parametric cushioning geometry with brushed titanium hardware and structured knit mesh. Engineered for high-speed urban transit and sculptural elegance.",
    details: [
      "Custom 3D-molded EVA and carbon-infused midsole structure",
      "Breathable high-tensile engineered mesh upper",
      "Brushed titanium hardware lace stabilization clips",
      "Hand-finished in Civitanova Marche, Italy"
    ],
    specs: {
      "Weight": "340g (Size 42)",
      "Drop": "8mm heel-to-toe",
      "Sole": "Vibram® custom compound",
      "Origin": "Italy"
    },
    sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45"],
    colors: [
      { name: "Obsidian / Titanium", hex: "#1A1A1E" },
      { name: "Chalk / Gold", hex: "#D4AF37" },
      { name: "Monolith Slate", hex: "#3A3A44" }
    ],
    isFeatured: true,
    isNewArrival: true,
    inStock: true
  },
  {
    id: "atelier-jacket",
    name: "Atelier Melton Coat",
    category: "Outerwear",
    categorySlug: "outerwear",
    price: 890,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 24,
    badge: "Craftsmanship",
    image: "/assets/images/atelier-jacket.jpg",
    gallery: [
      "/assets/images/atelier-jacket.jpg",
      "/assets/images/zenith-blazer.jpg",
      "/assets/images/horizon-scarf.jpg"
    ],
    description: "A tailored architectural trench crafted from 780 GSM heavy double-face virgin wool and cashmere. Features sharp peak lapels, genuine buffalo horn closures, and deep besom pockets.",
    details: [
      "90% Virgin Melton Wool, 10% Cashmere",
      "Full cupro Bemberg lining with interior welt pocket",
      "Natural horn button fastening with reinforced backing",
      "Structured dropped shoulder silhouette"
    ],
    specs: {
      "Fit": "Relaxed Tailored",
      "Weight": "780 GSM",
      "Lining": "100% Cupro Bemberg",
      "Care": "Specialist Dry Clean Only"
    },
    sizes: ["46 (S)", "48 (M)", "50 (L)", "52 (XL)"],
    colors: [
      { name: "Deep Charcoal", hex: "#18181D" },
      { name: "Midnight Navy", hex: "#131826" }
    ],
    isFeatured: true,
    isNewArrival: false,
    inStock: true
  },
  {
    id: "form-leather-bag",
    name: "Form Sculptural Tote",
    category: "Leather Goods",
    categorySlug: "leather",
    price: 640,
    originalPrice: 700,
    rating: 4.8,
    reviewsCount: 42,
    badge: "Limited Run",
    image: "/assets/images/form-leather-bag.jpg",
    gallery: [
      "/assets/images/form-leather-bag.jpg",
      "/assets/images/minimalist-wallet.jpg",
      "/assets/images/arc-bracelet.jpg"
    ],
    description: "Constructed from full-grain Tuscan calfskin with raw-edge burnishing and solid brushed champagne brass rivets. A monolithic daily carry engineered to develop a rich patina over time.",
    details: [
      "100% Full-grain vegetable tanned Italian calfskin",
      "Solid brass custom-machined rivets in brushed champagne finish",
      "Internal magnetic closure with zipped security pouch",
      "Accommodates up to a 16-inch laptop"
    ],
    specs: {
      "Dimensions": "42cm x 34cm x 14cm",
      "Handle Drop": "24cm",
      "Weight": "1.1kg",
      "Origin": "Florence, Italy"
    },
    sizes: ["Standard 22L"],
    colors: [
      { name: "Noir Full-Grain", hex: "#141416" },
      { name: "Smoked Espresso", hex: "#2C2018" }
    ],
    isFeatured: true,
    isNewArrival: false,
    inStock: true
  },
  {
    id: "axis-chronograph",
    name: "Axis Chronograph 41",
    category: "Timepieces",
    categorySlug: "timepieces",
    price: 1250,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 19,
    badge: "Signature",
    image: "/assets/images/axis-chronograph.jpg",
    gallery: [
      "/assets/images/axis-chronograph.jpg",
      "/assets/images/arc-bracelet.jpg",
      "/assets/images/monolith-sunglasses.jpg"
    ],
    description: "Grade 5 titanium case housing a bespoke automatic chronograph caliber with 68 hours power reserve. Minimalist matte black dial with hairline gold markers and anti-reflective sapphire crystal.",
    details: [
      "Case: Sandblasted Grade 5 Titanium (41mm diameter, 11.8mm depth)",
      "Movement: Caliber NV-01 Automatic (28,800 vph, 68h reserve)",
      "Crystal: Double-domed scratchproof sapphire with AR coating",
      "Strap: French Barenia calfskin with titanium deployment buckle"
    ],
    specs: {
      "Case Size": "41mm",
      "Water Resistance": "100m / 10 ATM",
      "Power Reserve": "68 Hours",
      "Warranty": "5 Years International"
    },
    sizes: ["One Size (41mm)"],
    colors: [
      { name: "Titanium Matte Black", hex: "#1E1E22" },
      { name: "Brushed Palladium", hex: "#8A8A94" }
    ],
    isFeatured: true,
    isNewArrival: true,
    inStock: true
  },
  {
    id: "monolith-sunglasses",
    name: "Monolith Acetate Eyewear",
    category: "Accessories",
    categorySlug: "accessories",
    price: 320,
    originalPrice: 350,
    rating: 4.7,
    reviewsCount: 31,
    badge: "New",
    image: "/assets/images/monolith-sunglasses.jpg",
    gallery: [
      "/assets/images/monolith-sunglasses.jpg",
      "/assets/images/axis-chronograph.jpg",
      "/assets/images/minimalist-wallet.jpg"
    ],
    description: "Chunky 8mm Japanese cellulose acetate frames featuring brutalist straight-cut brow geometry and Category 3 polarized Carl Zeiss lenses with total UV400 defense.",
    details: [
      "Custom 8mm Takiron Japanese cellulose acetate",
      "Carl Zeiss Vision tinted lenses (100% UV400)",
      "Seven-barrel custom hinges with teflon-coated screws",
      "Includes hard leather travel case and microfiber cloth"
    ],
    specs: {
      "Lens Width": "52mm",
      "Bridge": "21mm",
      "Temple Length": "145mm",
      "Protection": "100% UVA/UVB Filter Cat. 3"
    },
    sizes: ["Standard"],
    colors: [
      { name: "Charcoal Obsidian", hex: "#151518" },
      { name: "Tortoise Amber", hex: "#5C3A1E" }
    ],
    isFeatured: false,
    isNewArrival: true,
    inStock: true
  },
  {
    id: "void-cashmere",
    name: "Void Cashmere Knit",
    category: "Apparel",
    categorySlug: "apparel",
    price: 460,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 28,
    badge: "Core Essential",
    image: "/assets/images/void-cashmere.jpg",
    gallery: [
      "/assets/images/void-cashmere.jpg",
      "/assets/images/atelier-jacket.jpg",
      "/assets/images/zenith-blazer.jpg"
    ],
    description: "Spun from 100% pure Mongolian Grade-A cashmere yarns in a dense 12-gauge jersey knit. Soft thermal insulation with refined ribbed collar, cuffs, and drop-tail hem.",
    details: [
      "100% Grade-A Mongolian Cashmere (15.5 micron fiber)",
      "Dense 2-ply 12-gauge knit structure prevents pilling",
      "Seamless tubular knitting along body panels",
      "Sourced from sustainable ethical nomadic cooperatives"
    ],
    specs: {
      "Yarn": "2-Ply Grade-A Cashmere",
      "Gauge": "12-Gauge",
      "Weight": "310g",
      "Care": "Hand Wash Cold or Dry Clean"
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Void Black", hex: "#0E0E11" },
      { name: "Raw Oatmeal", hex: "#D6CEBF" },
      { name: "Heather Slate", hex: "#44444D" }
    ],
    isFeatured: false,
    isNewArrival: true,
    inStock: true
  },
  {
    id: "solstice-fragrance",
    name: "Solstice Extrait de Parfum",
    category: "Fragrance",
    categorySlug: "fragrance",
    price: 260,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 56,
    badge: "Artisanal",
    image: "/assets/images/solstice-fragrance.jpg",
    gallery: [
      "/assets/images/solstice-fragrance.jpg",
      "/assets/images/arc-bracelet.jpg",
      "/assets/images/axis-chronograph.jpg"
    ],
    description: "An architectural extrait formulated at 32% pure oil concentration. Top notes of smoked birch and pink pepper yield to a heart of Tuscan iris and black amber over deep Haitian vetiver.",
    details: [
      "Extrait de Parfum (32% oil concentration)",
      "Nose: Master perfumer Jean-Marc Dubois, Grasse",
      "Heavy hand-polished flacon with solid magnetic cap",
      "Unisex formulation with 14+ hours longevity"
    ],
    specs: {
      "Volume": "100ml / 3.4 fl. oz.",
      "Concentration": "Extrait de Parfum (32%)",
      "Top Notes": "Smoked Birch, Pink Pepper",
      "Base Notes": "Black Amber, Haitian Vetiver"
    },
    sizes: ["100ml (3.4 fl oz)"],
    colors: [
      { name: "Dark Amber Gold", hex: "#C8A97E" }
    ],
    isFeatured: false,
    isNewArrival: true,
    inStock: true
  },
  {
    id: "vector-crossbody",
    name: "Vector Technical Crossbody",
    category: "Accessories",
    categorySlug: "accessories",
    price: 290,
    originalPrice: 320,
    rating: 4.8,
    reviewsCount: 17,
    badge: "Waterproof",
    image: "/assets/images/vector-crossbody.jpg",
    gallery: [
      "/assets/images/vector-crossbody.jpg",
      "/assets/images/minimalist-wallet.jpg",
      "/assets/images/eclipse-runner.jpg"
    ],
    description: "Constructed with X-Pac® waterproof laminated sailcloth and Fidlock® magnetic mechanical buckle. Designed for hands-free mobility with quick-adjust nylon webbing.",
    details: [
      "Dimension Polyant X-Pac® waterproof composite canvas",
      "German-engineered Fidlock® magnetic V-buckle",
      "YKK AquaGuard® waterproof taped zippers",
      "Modular internal organizers with key tether"
    ],
    specs: {
      "Capacity": "4.5 Liters",
      "Weight": "280g",
      "Strap": "Military-spec nylon seatbelt webbing",
      "Weather Resistance": "IPX5 Rainproof"
    },
    sizes: ["One Size"],
    colors: [
      { name: "Matte Black", hex: "#16161A" },
      { name: "Alpine Olive", hex: "#2E3328" }
    ],
    isFeatured: false,
    isNewArrival: true,
    inStock: true
  },
  {
    id: "terra-boot",
    name: "Terra Commando Chelsea",
    category: "Footwear",
    categorySlug: "footwear",
    price: 540,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 22,
    badge: "Winter Core",
    image: "/assets/images/terra-boot.jpg",
    gallery: [
      "/assets/images/terra-boot.jpg",
      "/assets/images/atelier-jacket.jpg",
      "/assets/images/eclipse-runner.jpg"
    ],
    description: "A brutalist update to the classic Chelsea boot, crafted from 2.2mm water-resistant oiled calf leather seated on a rugged Goodyear welted Vibram® lug sole.",
    details: [
      "2.2mm oiled full-grain calf leather upper",
      "Goodyear storm-welt construction (resoleable)",
      "Vibram® Montagna deep lug rubber outsole",
      "High-elastic double side gussets and heavy webbing pull tabs"
    ],
    specs: {
      "Construction": "Goodyear Welted 360°",
      "Sole": "Vibram® Rubber Lug",
      "Shaft Height": "18cm",
      "Origin": "Northamptonshire, UK"
    },
    sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45"],
    colors: [
      { name: "Oiled Onyx", hex: "#121215" },
      { name: "Earth Espresso", hex: "#221C16" }
    ],
    isFeatured: false,
    isNewArrival: false,
    inStock: true
  },
  {
    id: "zenith-blazer",
    name: "Zenith Double-Breasted Blazer",
    category: "Apparel",
    categorySlug: "apparel",
    price: 720,
    originalPrice: 780,
    rating: 4.8,
    reviewsCount: 15,
    badge: "Architectural",
    image: "/assets/images/zenith-blazer.jpg",
    gallery: [
      "/assets/images/zenith-blazer.jpg",
      "/assets/images/atelier-jacket.jpg",
      "/assets/images/void-cashmere.jpg"
    ],
    description: "An unconstructed 6-button double-breasted jacket sculpted from high-twist Italian tropical wool. Lightweight, breathable drape that holds structural silhouette without rigid canvas.",
    details: [
      "100% Italian Super 130s High-Twist Wool",
      "Soft canvassed chest piece with natural shoulder slope",
      "Six genuine horn button arrangement with 2-to-close fastening",
      "Dual rear vents and interior passport pockets"
    ],
    specs: {
      "Fabric": "Vitale Barberis Canonico Super 130s",
      "Cut": "Modern Architectural Relaxed",
      "Vents": "Dual Side Vents",
      "Care": "Dry Clean Only"
    },
    sizes: ["46 (S)", "48 (M)", "50 (L)", "52 (XL)"],
    colors: [
      { name: "Charcoal Shadow", hex: "#1C1C22" },
      { name: "Dark Taupe", hex: "#322E2A" }
    ],
    isFeatured: false,
    isNewArrival: false,
    inStock: true
  },
  {
    id: "arc-bracelet",
    name: "Arc Brushed Cuff",
    category: "Accessories",
    categorySlug: "accessories",
    price: 380,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 29,
    badge: "Precious Metal",
    image: "/assets/images/arc-bracelet.jpg",
    gallery: [
      "/assets/images/arc-bracelet.jpg",
      "/assets/images/axis-chronograph.jpg",
      "/assets/images/solstice-fragrance.jpg"
    ],
    description: "Cast in solid 925 sterling silver plated in 5-micron brushed palladium with internal chamfered edges for seamless ergonomic wrist comfort. Precision laser-engraved branding.",
    details: [
      "Solid 925 Sterling Silver base metal",
      "5-Micron industrial brushed palladium electroplating",
      "Comfort-fit chamfered internal rim",
      "Individually numbered atelier hallmark"
    ],
    specs: {
      "Width": "14mm",
      "Thickness": "3.5mm",
      "Weight": "48g",
      "Origin": "Arezzo, Italy"
    },
    sizes: ["Small (15-17cm)", "Medium (17-19cm)", "Large (19-21cm)"],
    colors: [
      { name: "Brushed Palladium", hex: "#D6D6DC" },
      { name: "Champagne Gold Vermeil", hex: "#C8A97E" }
    ],
    isFeatured: false,
    isNewArrival: false,
    inStock: true
  },
  {
    id: "horizon-scarf",
    name: "Horizon Bauhaus Silk Scarf",
    category: "Accessories",
    categorySlug: "accessories",
    price: 210,
    originalPrice: 240,
    rating: 4.7,
    reviewsCount: 14,
    badge: "Silk",
    image: "/assets/images/horizon-scarf.jpg",
    gallery: [
      "/assets/images/horizon-scarf.jpg",
      "/assets/images/atelier-jacket.jpg",
      "/assets/images/zenith-blazer.jpg"
    ],
    description: "Woven in Lake Como from 18-momme heavyweight pure mulberry silk twill. Screen-printed with minimalist geometric line work inspired by modernist architectural blueprints.",
    details: [
      "100% Pure Mulberry Silk Twill (18 Momme)",
      "Traditional hand-rolled and hand-sewn edges",
      "Artisanal screen printing with water-based dyes",
      "Delivered in a bespoke matte gift box"
    ],
    specs: {
      "Dimensions": "90cm x 90cm",
      "Weave": "18 Momme Silk Twill",
      "Hem": "Hand-rolled French hem",
      "Origin": "Como, Italy"
    },
    sizes: ["90cm x 90cm"],
    colors: [
      { name: "Monochrome & Gold", hex: "#C8A97E" },
      { name: "Raw Umber", hex: "#3B2E24" }
    ],
    isFeatured: false,
    isNewArrival: false,
    inStock: true
  }
];

// Helper Query Methods
function getAllProducts() {
  return NOVA_PRODUCTS;
}

function getProductById(id) {
  return NOVA_PRODUCTS.find(p => p.id === id) || NOVA_PRODUCTS[0];
}

function getFeaturedProducts() {
  return NOVA_PRODUCTS.filter(p => p.isFeatured);
}

function getNewArrivals() {
  return NOVA_PRODUCTS.filter(p => p.isNewArrival);
}

function getProductsByCategory(categorySlug) {
  if (!categorySlug || categorySlug === 'all') return NOVA_PRODUCTS;
  return NOVA_PRODUCTS.filter(p => p.categorySlug === categorySlug);
}

function formatPrice(amount) {
  return '$' + Number(amount).toLocaleString('en-US');
}

/**
 * Curated Collections Structure
 * Maps existing products into editorial compilations
 */
const NOVA_COLLECTIONS = [
  {
    id: "autumn-winter-2026",
    slug: "autumn-winter-2026",
    name: "Autumn / Winter 2026",
    kicker: "SEASONAL CAMPAIGN",
    season: "AW26",
    tagline: "Architectural silhouettes engineered for cold-weather metropolitan transit.",
    description: "An inquiry into dense virgin wools, double-faced cashmere, and brutalist lug soles. Sculptural trench coats and unconstructed blazers designed to hold form against cold gusts.",
    heroImage: "/assets/images/collections-hero.jpg",
    accentColor: "#C8A97E",
    productIds: ["atelier-jacket", "zenith-blazer", "terra-boot", "void-cashmere", "horizon-scarf"]
  },
  {
    id: "essentials",
    slug: "essentials",
    name: "Permanent Essentials",
    kicker: "ARCHIVAL FOUNDATIONS",
    season: "PERMANENT",
    tagline: "Uncompromised foundational objects designed for perpetual rotation.",
    description: "Monolithic carry, grade-A Mongolian cashmere, and brutalist eyewear. The pieces that establish the baseline of the NOVA uniform.",
    heroImage: "/assets/images/editorial-form-function.jpg",
    accentColor: "#E0D8CB",
    productIds: ["void-cashmere", "form-leather-bag", "eclipse-runner", "monolith-sunglasses", "arc-bracelet"]
  },
  {
    id: "footwear",
    slug: "footwear",
    name: "Footwear Archive",
    kicker: "PARAMETRIC & LUG SOLING",
    season: "SYSTEM",
    tagline: "High-density transit runners and Goodyear welted commando boots.",
    description: "Hand-finished in Civitanova Marche with custom Vibram® compounding, parametric cushioning midsoles, and water-resistant oiled calf leather.",
    heroImage: "/assets/images/eclipse-runner.jpg",
    accentColor: "#A3A3B0",
    productIds: ["eclipse-runner", "terra-boot"]
  },
  {
    id: "outerwear",
    slug: "outerwear",
    name: "Outerwear & Tailoring",
    kicker: "STRUCTURAL ARCHITECTURE",
    season: "ATELIER",
    tagline: "780 GSM Melton wool, high-twist Italian tropical wool, and cashmere knitwear.",
    description: "Sharp peak lapels, genuine buffalo horn closures, and precision drop-tail geometry engineered for effortless proportion.",
    heroImage: "/assets/images/atelier-jacket.jpg",
    accentColor: "#8C7B68",
    productIds: ["atelier-jacket", "zenith-blazer", "void-cashmere"]
  },
  {
    id: "leather-goods",
    slug: "leather-goods",
    name: "Leather Goods & Carry",
    kicker: "TUSCAN PATINA & X-PAC",
    season: "HARDWARE",
    tagline: "Full-grain calfskin totes, waterproof sailcloth crossbody bags, and card cases.",
    description: "Solid brushed champagne brass rivets, Fidlock® magnetic mechanical closures, and hand-burnished raw edges built to age with distinction.",
    heroImage: "/assets/images/form-leather-bag.jpg",
    accentColor: "#7D5836",
    productIds: ["form-leather-bag", "vector-crossbody", "minimalist-wallet"]
  },
  {
    id: "timepieces",
    slug: "timepieces",
    name: "Horology & Fine Objects",
    kicker: "GRADE 5 TITANIUM & SILVER",
    season: "MECHANICAL",
    tagline: "Bespoke automatic chronographs, 925 palladium cuffs, and 32% extrait.",
    description: "Micro-machined titanium cases housing 68-hour automatic movements, cast solid silver jewelry, and architectural flacon fragrances.",
    heroImage: "/assets/images/axis-chronograph.jpg",
    accentColor: "#C8A97E",
    productIds: ["axis-chronograph", "arc-bracelet", "solstice-fragrance", "monolith-sunglasses"]
  }
];

function getAllCollections() {
  return NOVA_COLLECTIONS;
}

function getCollectionBySlug(slug) {
  return NOVA_COLLECTIONS.find(c => c.slug === slug || c.id === slug) || NOVA_COLLECTIONS[0];
}

function getProductsForCollection(collectionId) {
  const collection = getCollectionBySlug(collectionId);
  if (!collection) return NOVA_PRODUCTS.slice(0, 4);
  return collection.productIds
    .map(id => NOVA_PRODUCTS.find(p => p.id === id))
    .filter(Boolean);
}

