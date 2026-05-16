import type { Product, ProductCategory } from "@/types/product";

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
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    accent: "Track-ready energy"
  },
  {
    name: "Outerwear",
    slug: "outerwear",
    description: "Weather-aware layers with clean lines and technical comfort.",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=80",
    accent: "Built for movement"
  },
  {
    name: "Training",
    slug: "training",
    description: "Sweat-ready essentials for sessions that move from gym to street.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    accent: "Precision fit"
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Premium daily pieces with an athletic silhouette and editorial finish.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
    accent: "Street refined"
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Carry, cap, layer, and finish the uniform with technical details.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
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
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=85"
  },
  {
    eyebrow: "Engineered essentials",
    title: "Uniforms for motion",
    body: "Technical textures, breathable knits, and tailored silhouettes that keep pace all day.",
    cta: "Explore training",
    href: "/products?category=Training",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1800&q=85"
  },
  {
    eyebrow: "Limited color story",
    title: "Carbon, fog, clay",
    body: "A restrained palette with one warm accent, designed for premium rotation.",
    cta: "View the edit",
    href: "/products?tag=limited",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=85"
  }
];

const productImages = {
  runner: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1465453869711-7e174808ace9?auto=format&fit=crop&w=1000&q=80"
  ],
  jacket: [
    "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80"
  ],
  legging: [
    "https://images.unsplash.com/photo-1518310952931-b1de897abd40?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=1000&q=80"
  ],
  tee: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1000&q=80"
  ],
  cargo: [
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1000&q=80"
  ],
  sneaker: [
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80"
  ],
  hoodie: [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1618354691229-88d47f285158?auto=format&fit=crop&w=1000&q=80"
  ],
  windbreaker: [
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80"
  ],
  gilet: [
    "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
  ],
  shorts: [
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=1000&q=80"
  ],
  bra: [
    "https://images.unsplash.com/photo-1518310952931-b1de897abd40?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=80"
  ],
  duffle: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80"
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
