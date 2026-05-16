import type { Product, ProductCategory } from "@/types/product";

const asset = (name: string) => `/assets/${name}`;

export const categories: {
  name: ProductCategory;
  slug: string;
  description: string;
  image: string;
  accent: string;
}[] = [
  {
    name: "Footwear",
    slug: "footwear",
    description: "Sculpted runners, court silhouettes, and all-day performance soles.",
    image: asset("category-footwear.png"),
    accent: "Track-ready energy"
  },
  {
    name: "Outerwear",
    slug: "outerwear",
    description: "Weather-aware layers with clean lines and technical comfort.",
    image: asset("category-outerwear.png"),
    accent: "Built for movement"
  },
  {
    name: "Training",
    slug: "training",
    description: "Sweat-ready essentials for sessions that move from gym to street.",
    image: asset("category-training.png"),
    accent: "Precision fit"
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Premium daily pieces with an athletic silhouette and editorial finish.",
    image: asset("category-lifestyle.png"),
    accent: "Street refined"
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Carry, cap, layer, and finish the uniform with technical details.",
    image: asset("category-accessories.png"),
    accent: "Final details"
  }
];

export const heroSlides = [
  {
    eyebrow: "Spring performance edit",
    title: "Velocity without noise",
    body: "Lightweight layers, sculptural footwear, and elevated training staples for the city athlete.",
    cta: "Shop new arrivals",
    href: "/products?sort=new",
    image: asset("hero-velocity.png")
  },
  {
    eyebrow: "Engineered essentials",
    title: "Uniforms for motion",
    body: "Technical textures, breathable knits, and tailored silhouettes that keep pace all day.",
    cta: "Explore training",
    href: "/products?category=Training",
    image: asset("hero-uniform.png")
  },
  {
    eyebrow: "Limited color story",
    title: "Carbon, fog, clay",
    body: "A restrained palette with one warm accent, designed for premium rotation.",
    cta: "View the edit",
    href: "/products?tag=limited",
    image: asset("hero-carbon.png")
  }
];

const productImages = {
  runner: [
    asset("aero-knit-runner-1.png"),
    asset("aero-knit-runner-2.png"),
    asset("aero-knit-runner-3.png")
  ],
  jacket: [
    asset("carbon-zip-track-jacket-1.png"),
    asset("carbon-zip-track-jacket-2.png"),
    asset("carbon-zip-track-jacket-3.png")
  ],
  legging: [
    asset("tempo-sculpt-legging-1.png"),
    asset("tempo-sculpt-legging-2.png"),
    asset("tempo-sculpt-legging-3.png")
  ],
  tee: [
    asset("pulse-training-tee-1.png"),
    asset("pulse-training-tee-2.png"),
    asset("pulse-training-tee-3.png")
  ],
  cargo: [
    asset("street-flex-cargo-1.png"),
    asset("street-flex-cargo-2.png"),
    asset("street-flex-cargo-3.png")
  ],
  sneaker: [
    asset("orbit-court-sneaker-1.png"),
    asset("orbit-court-sneaker-2.png"),
    asset("orbit-court-sneaker-3.png")
  ],
  hoodie: [
    asset("thermal-cloud-hoodie-1.png"),
    asset("thermal-cloud-hoodie-2.png"),
    asset("thermal-cloud-hoodie-3.png")
  ],
  windbreaker: [
    asset("nova-mesh-windbreaker-1.png"),
    asset("nova-mesh-windbreaker-2.png"),
    asset("nova-mesh-windbreaker-3.png")
  ],
  gilet: [
    asset("altitude-thermal-gilet-1.png"),
    asset("altitude-thermal-gilet-2.png"),
    asset("altitude-thermal-gilet-3.png")
  ],
  shorts: [
    asset("cadence-knit-short-1.png"),
    asset("cadence-knit-short-2.png"),
    asset("cadence-knit-short-3.png")
  ],
  bra: [
    asset("form-curve-bra-1.png"),
    asset("form-curve-bra-2.png"),
    asset("form-curve-bra-3.png")
  ],
  duffle: [
    asset("motion-carry-duffle-1.png"),
    asset("motion-carry-duffle-2.png"),
    asset("motion-carry-duffle-3.png")
  ]
};

const baseReviews = [
  {
    author: "Maya R.",
    rating: 5,
    title: "Looks tailored, feels technical",
    body: "The finish feels premium and the fabric held up through travel and training days.",
    date: "2026-03-12"
  },
  {
    author: "Andre K.",
    rating: 4,
    title: "Clean daily rotation piece",
    body: "The fit is sharp without being restrictive. I sized up for a relaxed look.",
    date: "2026-02-28"
  }
];

export const products: Product[] = [
  {
    id: "prod-001",
    slug: "aero-knit-runner",
    name: "Aero Knit Runner",
    eyebrow: "Responsive city runner",
    description:
      "A sculpted running silhouette with a breathable knit upper, cushioned midsole, and refined contrast overlays.",
    details: ["Engineered knit upper", "Recycled foam midsole", "Grippy rubber traction", "Reflective heel tab"],
    category: "Footwear",
    gender: "Unisex",
    price: 148,
    originalPrice: 188,
    rating: 4.8,
    reviewCount: 128,
    images: productImages.runner,
    colors: [
      { name: "Carbon", value: "#111111" },
      { name: "Fog", value: "#efefeb" },
      { name: "Clay", value: "#c46a41" }
    ],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    tags: ["new", "limited", "running"],
    isNew: true,
    isTrending: true,
    isFeatured: true,
    stock: 34,
    reviews: baseReviews
  },
  {
    id: "prod-002",
    slug: "carbon-zip-track-jacket",
    name: "Carbon Zip Track Jacket",
    eyebrow: "Weather-resistant layer",
    description:
      "A premium track jacket with a structured collar, smooth matte shell, and articulated sleeves for movement.",
    details: ["Water-resistant finish", "Two-way zip", "Interior media pocket", "Elasticated hem"],
    category: "Outerwear",
    gender: "Unisex",
    price: 168,
    originalPrice: 210,
    rating: 4.7,
    reviewCount: 94,
    images: productImages.jacket,
    colors: [
      { name: "Black", value: "#050505" },
      { name: "Stone", value: "#8d8f88" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tags: ["outerwear", "best-seller"],
    isFeatured: true,
    stock: 22,
    reviews: baseReviews
  },
  {
    id: "prod-003",
    slug: "tempo-sculpt-legging",
    name: "Tempo Sculpt Legging",
    eyebrow: "Compressive training fit",
    description:
      "A second-skin training legging with a smooth high-rise waistband and subtle contour paneling.",
    details: ["Four-way stretch", "Hidden waistband pocket", "Squat-proof knit", "Matte compression finish"],
    category: "Training",
    gender: "Women",
    price: 98,
    rating: 4.9,
    reviewCount: 211,
    images: productImages.legging,
    colors: [
      { name: "Graphite", value: "#2d2f2f" },
      { name: "Moss", value: "#687061" }
    ],
    sizes: ["XXS", "XS", "S", "M", "L", "XL"],
    tags: ["training", "yoga"],
    isTrending: true,
    stock: 45,
    reviews: baseReviews
  },
  {
    id: "prod-004",
    slug: "pulse-training-tee",
    name: "Pulse Training Tee",
    eyebrow: "Featherweight breathable tee",
    description:
      "A crisp training tee cut from quick-dry jersey with bonded shoulder seams and a premium drape.",
    details: ["Quick-dry jersey", "Bonded seams", "Anti-odor finish", "Relaxed athletic cut"],
    category: "Training",
    gender: "Men",
    price: 58,
    originalPrice: 72,
    rating: 4.6,
    reviewCount: 76,
    images: productImages.tee,
    colors: [
      { name: "White", value: "#f7f7f4" },
      { name: "Carbon", value: "#111111" },
      { name: "Clay", value: "#c46a41" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    tags: ["training", "essentials"],
    stock: 61,
    reviews: baseReviews
  },
  {
    id: "prod-005",
    slug: "street-flex-cargo",
    name: "Street Flex Cargo",
    eyebrow: "Tailored utility pant",
    description:
      "A relaxed cargo pant with stretch nylon, low-profile pockets, and a tapered fit designed for city movement.",
    details: ["Stretch nylon twill", "Adjustable waist", "Low-profile cargo pockets", "Tapered ankle"],
    category: "Lifestyle",
    gender: "Unisex",
    price: 132,
    rating: 4.7,
    reviewCount: 58,
    images: productImages.cargo,
    colors: [
      { name: "Black", value: "#070707" },
      { name: "Olive", value: "#545947" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["lifestyle", "utility"],
    isTrending: true,
    stock: 19,
    reviews: baseReviews
  },
  {
    id: "prod-006",
    slug: "orbit-court-sneaker",
    name: "Orbit Court Sneaker",
    eyebrow: "Premium court shape",
    description:
      "A low court sneaker with layered leather panels, tonal stitching, and a cushioned footbed for everyday wear.",
    details: ["Leather and mesh upper", "Cushioned footbed", "Stitched toe panel", "Cupsole construction"],
    category: "Footwear",
    gender: "Unisex",
    price: 138,
    rating: 4.5,
    reviewCount: 147,
    images: productImages.sneaker,
    colors: [
      { name: "White", value: "#f7f7f2" },
      { name: "Black", value: "#111111" }
    ],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    tags: ["lifestyle", "footwear"],
    isFeatured: true,
    stock: 52,
    reviews: baseReviews
  },
  {
    id: "prod-007",
    slug: "thermal-cloud-hoodie",
    name: "Thermal Cloud Hoodie",
    eyebrow: "Heavyweight brushed fleece",
    description:
      "A structured hoodie with a plush brushed interior, dropped shoulders, and a minimal embroidered mark.",
    details: ["470gsm brushed fleece", "Double-layer hood", "Ribbed cuffs", "Kangaroo pocket"],
    category: "Lifestyle",
    gender: "Unisex",
    price: 118,
    originalPrice: 148,
    rating: 4.9,
    reviewCount: 184,
    images: productImages.hoodie,
    colors: [
      { name: "Oat", value: "#d9d2c2" },
      { name: "Carbon", value: "#111111" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tags: ["new", "lifestyle"],
    isNew: true,
    stock: 28,
    reviews: baseReviews
  },
  {
    id: "prod-008",
    slug: "nova-mesh-windbreaker",
    name: "Nova Mesh Windbreaker",
    eyebrow: "Packable shell",
    description:
      "A lightweight windbreaker with vented mesh panels, a high collar, and a clean oversized profile.",
    details: ["Packable into pocket", "Vented mesh panels", "Water-repellent shell", "Oversized fit"],
    category: "Outerwear",
    gender: "Women",
    price: 154,
    rating: 4.6,
    reviewCount: 69,
    images: productImages.windbreaker,
    colors: [
      { name: "Fog", value: "#f0f0ec" },
      { name: "Night", value: "#15171a" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["outerwear", "running"],
    isNew: true,
    stock: 17,
    reviews: baseReviews
  },
  {
    id: "prod-009",
    slug: "altitude-thermal-gilet",
    name: "Altitude Thermal Gilet",
    eyebrow: "Insulated core layer",
    description:
      "A modern sleeveless layer with quilted insulation, matte hardware, and a close athletic fit.",
    details: ["Lightweight insulation", "Two zip pockets", "Storm flap", "Layer-friendly profile"],
    category: "Outerwear",
    gender: "Men",
    price: 178,
    rating: 4.7,
    reviewCount: 41,
    images: productImages.gilet,
    colors: [
      { name: "Black", value: "#080808" },
      { name: "Stone", value: "#8d8f88" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    tags: ["outerwear", "limited"],
    stock: 14,
    reviews: baseReviews
  },
  {
    id: "prod-010",
    slug: "cadence-knit-short",
    name: "Cadence Knit Short",
    eyebrow: "Training short with liner",
    description:
      "A clean training short with an integrated liner, secure pocketing, and featherweight stretch.",
    details: ["5 inch inseam", "Built-in liner", "Secure zip pocket", "Laser-cut hem"],
    category: "Training",
    gender: "Men",
    price: 74,
    originalPrice: 92,
    rating: 4.5,
    reviewCount: 84,
    images: productImages.shorts,
    colors: [
      { name: "Black", value: "#111111" },
      { name: "Clay", value: "#c46a41" }
    ],
    sizes: ["S", "M", "L", "XL"],
    tags: ["training", "running"],
    isTrending: true,
    stock: 38,
    reviews: baseReviews
  },
  {
    id: "prod-011",
    slug: "form-curve-bra",
    name: "Form Curve Bra",
    eyebrow: "Medium support studio fit",
    description:
      "A smooth medium-support bra with a high neckline, removable cups, and a sculpted racerback.",
    details: ["Medium support", "Removable cups", "Racerback shape", "Smooth compressive knit"],
    category: "Training",
    gender: "Women",
    price: 64,
    rating: 4.8,
    reviewCount: 116,
    images: productImages.bra,
    colors: [
      { name: "Black", value: "#111111" },
      { name: "Moss", value: "#687061" },
      { name: "Fog", value: "#eeeeea" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["training", "studio"],
    stock: 44,
    reviews: baseReviews
  },
  {
    id: "prod-012",
    slug: "motion-carry-duffle",
    name: "Motion Carry Duffle",
    eyebrow: "Structured gym carry",
    description:
      "A compact duffle with a separate shoe tunnel, padded laptop sleeve, and water-resistant shell.",
    details: ["28L capacity", "Shoe tunnel", "Padded laptop sleeve", "Water-resistant finish"],
    category: "Accessories",
    gender: "Unisex",
    price: 126,
    rating: 4.6,
    reviewCount: 52,
    images: productImages.duffle,
    colors: [
      { name: "Black", value: "#111111" },
      { name: "Stone", value: "#8d8f88" }
    ],
    sizes: ["OS"],
    tags: ["accessories", "travel"],
    isFeatured: true,
    stock: 31,
    reviews: baseReviews
  }
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((item) => item.id !== product.id && (item.category === product.category || item.gender === product.gender))
    .slice(0, limit);
}
