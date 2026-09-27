/**
 * NOVA — Editorial Journal Catalog & Reader Module
 * Rich essays, craftsmanship dispatches, material research, and brand stories.
 */

const NOVA_ARTICLES = [
  {
    id: "everyday-design",
    slug: "everyday-design",
    title: "The Art of Everyday Design",
    category: "Design",
    date: "September 24, 2026",
    isoDate: "2026-09-24",
    readTime: "5 min read",
    author: "Elena Rostova",
    authorRole: "Head of Industrial Design, NOVA Atelier",
    heroImage: "/assets/images/article-everyday-design.jpg",
    supportingImage: "/assets/images/editorial-form-function.jpg",
    featuredProductId: "axis-chronograph",
    excerpt: "Why the objects we touch daily carry disproportionate emotional weight, and how subtle industrial tolerances define modern domestic ceremony.",
    content: [
      {
        type: "lead",
        text: "In an era of disposable digital interfaces and ephemeral trends, the physical objects we choose to bring into our daily rotation carry an intimate responsibility. An everyday carry is not merely a tool; it is a tactile companion to human ritual. When you lift a titanium chronograph from your bedside or pull a double-face virgin wool trench over your shoulders, the immediate haptic feedback registers before conscious thought."
      },
      {
        type: "heading",
        text: "The Tyranny of the Disposable"
      },
      {
        type: "paragraph",
        text: "For the past two decades, consumer design has rewarded lightness at the expense of substance, and novelty at the cost of durability. The result is an environment filled with hollow plastics and synthetic coatings that degrade rather than develop character. At NOVA, we begin every project from the opposite principle: what does this object look like after ten thousand hours of human contact?"
      },
      {
        type: "quote",
        text: "True minimalism is not the absence of energy or detail; it is the absolute concentration of intent until nothing redundant survives.",
        attribution: "Elena Rostova, Studio Monograph Vol. IV"
      },
      {
        type: "heading",
        text: "Tolerances as Respect"
      },
      {
        type: "paragraph",
        text: "Consider the bezel of a chronograph or the hand-burnished edge of a Tuscan calfskin tote. When an artisan chamfers an edge to a tolerance of 15 microns, that microscopic bevel eliminates friction against your skin. It is an act of engineering respect. The user may never consciously articulate why the piece feels so grounded in the palm, but their nervous system knows immediately."
      },
      {
        type: "paragraph",
        text: "Modern luxury must dispense with unnecessary crests, giant logos, and theatrical ornamentation. The weight of the Grade 5 titanium, the quiet click of a Fidlock® mechanical closure, and the drape of unlined Melton wool constitute their own heraldry."
      }
    ],
    tags: ["Industrial Design", "Horology", "Ergonomics", "Philosophy"]
  },
  {
    id: "beyond-material",
    slug: "beyond-material",
    title: "Beyond the Material: The Alchemy of Natural Fibers",
    category: "Materials",
    date: "September 18, 2026",
    isoDate: "2026-09-18",
    readTime: "6 min read",
    author: "Matteo Vianello",
    authorRole: "Director of Textile Research, Biella",
    heroImage: "/assets/images/article-beyond-material.jpg",
    supportingImage: "/assets/images/void-cashmere.jpg",
    featuredProductId: "void-cashmere",
    excerpt: "An investigation into double-face 780 GSM Melton wool, Grade-A Mongolian cashmere, and the tactile intelligence of unblended natural fibers.",
    content: [
      {
        type: "lead",
        text: "Synthetic membranes promised weather resistance, but they failed to replicate the living thermal intelligence of natural virgin animal fibers. In our Biella mill, we have returned to ancestral double-face weaving methods to achieve total weather defense through mechanical density rather than petrochemical laminates."
      },
      {
        type: "heading",
        text: "The Density of 780 GSM Melton"
      },
      {
        type: "paragraph",
        text: "Standard commercial overcoats rarely exceed 450 to 500 grams per square meter. By raising the density to 780 GSM using ultra-fine Australian merino cross-bred with Mongolian cashmere, the weave becomes almost impenetrable to wind. The fibers undergo a specialized milling process that shrinks the surface by thirty percent, interlocking the microscopic scales into an architectural shield."
      },
      {
        type: "quote",
        text: "When a coat possesses sufficient internal density, it sculpts the body rather than merely hanging from it. It becomes architectural enclosure.",
        attribution: "Matteo Vianello"
      },
      {
        type: "heading",
        text: "Cashmere in Its Purest Gauge"
      },
      {
        type: "paragraph",
        text: "In our knitwear atelier, Grade-A raw cashmere hairs measure an average of 15.2 microns in fineness and over 36 millimeters in staple length. Sourced exclusively from the harsh Alashan plateau, these long staples ensure the yarn resists pilling through seasons of rigorous wear while trapping air pockets that regulate body temperature across fluctuating climates."
      }
    ],
    tags: ["Textiles", "Cashmere", "Melton Wool", "Sustainable Craft"]
  },
  {
    id: "why-form-matters",
    slug: "why-form-matters",
    title: "Why Form Matters: Spatial Clarity in Modern Attire",
    category: "Fashion",
    date: "September 10, 2026",
    isoDate: "2026-09-10",
    readTime: "4 min read",
    author: "Julian Thorne",
    authorRole: "Creative Director",
    heroImage: "/assets/images/article-form-matters.jpg",
    supportingImage: "/assets/images/zenith-blazer.jpg",
    featuredProductId: "zenith-blazer",
    excerpt: "Modernist proportion does not reject ornament out of austerity, but out of devotion to spatial clarity and unencumbered metropolitan movement.",
    content: [
      {
        type: "lead",
        text: "When Mies van der Rohe coined 'less is more', he was not celebrating emptiness; he was demanding that every retained element achieve absolute perfection. In tailoring, this doctrine demands unconstructed canvasing, drop shoulders cut with mathematical bias, and sharp peak lapels that draw the eye upward into structural equilibrium."
      },
      {
        type: "heading",
        text: "Discarding Rigid Canvasing"
      },
      {
        type: "paragraph",
        text: "Traditional British tailoring relies on layers of horsehair canvas and thick shoulder padding to artificially impose a silhouette upon the wearer. NOVA approaches tailoring from the Italian scuola disinvolta: the garment must mold to the living anatomy without restricting dynamic movement."
      },
      {
        type: "paragraph",
        text: "By spinning high-twist tropical wool with natural bi-stretch elasticity, we create blazers and trenches that retain clean architectural drape whether walking down a windy concourse or seated on an eight-hour transatlantic flight."
      }
    ],
    tags: ["Tailoring", "Modernism", "Silhouette", "Architecture"]
  },
  {
    id: "modern-classic",
    slug: "modern-classic",
    title: "The Making of a Modern Classic",
    category: "Craftsmanship",
    date: "August 28, 2026",
    isoDate: "2026-08-28",
    readTime: "7 min read",
    author: "Marc Renard",
    authorRole: "Master Horologist, Geneva",
    heroImage: "/assets/images/article-modern-classic.jpg",
    supportingImage: "/assets/images/axis-chronograph.jpg",
    featuredProductId: "axis-chronograph",
    excerpt: "Dissecting the NV-01 automatic chronograph: sandblasted Grade 5 titanium, hairline gold hands, and the human hands in Geneva.",
    content: [
      {
        type: "lead",
        text: "A mechanical chronograph is humanity's most poetic machine: a kinetic sculpture that harnesses potential energy to fragment the infinite continuum of time into measurable thirty-second intervals. Designing the NV-01 demanded two years of prototyping to strip away decorative clutter and leave only crystalline legibility."
      },
      {
        type: "heading",
        text: "The Metallurgical Challenge of Grade 5 Titanium"
      },
      {
        type: "paragraph",
        text: "Unlike commercial stainless steel or Grade 2 titanium, Grade 5 (Ti-6Al-4V) incorporates six percent aluminum and four percent vanadium. It is twice as strong as steel at forty percent lower weight, but notoriously difficult to mill. Each 41mm case requires four hours on a five-axis CNC machine followed by individual micro-bead blasting with ceramic media."
      },
      {
        type: "quote",
        text: "The matte surface absorbs glare entirely. In low light, the hairline polished gold indices catch ambient illumination without reflection.",
        attribution: "Marc Renard"
      },
      {
        type: "heading",
        text: "Caliber NV-01: Bespoke Power Reserve"
      },
      {
        type: "paragraph",
        text: "Inside ticks a high-beat 28,800 vph automatic caliber fitted with a tungsten rotor and silicon balance spring immune to magnetic fields from laptops and mobile phones. With a 68-hour power reserve, the piece can rest across a weekend and remain running precisely when strapped on Monday morning."
      }
    ],
    tags: ["Horology", "Grade 5 Titanium", "Automatic Movements", "Geneva"]
  },
  {
    id: "autumn-winter-preview",
    slug: "autumn-winter-preview",
    title: "Inside the Autumn / Winter 2026 Collection",
    category: "Brand Stories",
    date: "August 14, 2026",
    isoDate: "2026-08-14",
    readTime: "5 min read",
    author: "NOVA Editorial Board",
    authorRole: "Atelier Field Dispatches",
    heroImage: "/assets/images/journal-hero.jpg",
    supportingImage: "/assets/images/atelier-jacket.jpg",
    featuredProductId: "atelier-jacket",
    excerpt: "A field report from the Civitanova Marche and Biella ateliers on the evolution of monolithic outerwear and technical soling.",
    content: [
      {
        type: "lead",
        text: "For the Autumn / Winter 2026 campaign, the design team relocated to an unheated brutalist warehouse in Turin. We wanted to build garments under the exact atmospheric conditions they would face: damp stone, brisk northern winds, and low winter sun that exposes every imperfection in textile weave."
      },
      {
        type: "heading",
        text: "Monolithic Color Grading"
      },
      {
        type: "paragraph",
        text: "The palette of AW26 was drawn strictly from mineral pigments: obsidian charcoal, raw slate, unbleached chalk, and deep umber. Rather than dye fabrics in chemical vats, we utilized natural wool sorting methods where fleece colors are separated by hand before spinning, preserving the lanolin content and natural waterproof properties."
      },
      {
        type: "paragraph",
        text: "The collection unites five core garments into a modular layering system where each piece works in standalone isolation or as part of a weather-sealed ensemble."
      }
    ],
    tags: ["Autumn Winter 2026", "Atelier", "Collection Launch", "Turin"]
  },
  {
    id: "objects-with-purpose",
    slug: "objects-with-purpose",
    title: "Objects with Purpose: The Lifespan of Vegetable Leather",
    category: "Lifestyle",
    date: "July 30, 2026",
    isoDate: "2026-07-30",
    readTime: "4 min read",
    author: "Matteo Vianello",
    authorRole: "Director of Materials",
    heroImage: "/assets/images/form-leather-bag.jpg",
    supportingImage: "/assets/images/vector-crossbody.jpg",
    featuredProductId: "form-leather-bag",
    excerpt: "Full-grain Tuscan calfskin, sailcloth laminates, and why the best personal equipment is engineered to outlive trends.",
    content: [
      {
        type: "lead",
        text: "There is a moral difference between products made to be consumed and objects made to be inherited. Chrome-tanned commercial leathers seal hides under plastic topcoats that crack with age. Vegetable tanning, by contrast, uses chestnut bark tannins that saturate the collagen structure, allowing the leather to breathe and darken gracefully."
      },
      {
        type: "heading",
        text: "The Patina Equation"
      },
      {
        type: "paragraph",
        text: "When you carry the Form Sculptural Tote, your skin oils, atmospheric humidity, and accidental scrapes do not ruin the surface—they enrich it. After six months, the hide takes on a deep honey-amber luster unique to your daily patterns of life. This is the definition of quiet heirloom luxury."
      }
    ],
    tags: ["Leathercraft", "Tuscan Tannery", "Patina", "Daily Carry"]
  }
];

// Helper Query Methods
function getAllArticles() {
  return NOVA_ARTICLES;
}

function getFeaturedArticle() {
  return NOVA_ARTICLES[0];
}

function getArticleById(id) {
  return NOVA_ARTICLES.find(a => a.id === id || a.slug === id) || NOVA_ARTICLES[0];
}

function getArticlesByCategory(category) {
  if (!category || category === 'all' || category === 'All') return NOVA_ARTICLES;
  return NOVA_ARTICLES.filter(a => a.category.toLowerCase() === category.toLowerCase());
}

function getRelatedArticles(currentId, limit = 3) {
  return NOVA_ARTICLES
    .filter(a => a.id !== currentId && a.slug !== currentId)
    .slice(0, limit);
}
