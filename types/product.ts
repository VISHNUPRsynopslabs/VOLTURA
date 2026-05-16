export type ProductCategory =
  | "Footwear"
  | "Outerwear"
  | "Training"
  | "Lifestyle"
  | "Accessories";

export type ProductColor = {
  name: string;
  value: string;
};

export type ProductReview = {
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  details: string[];
  category: ProductCategory;
  gender: "Men" | "Women" | "Unisex";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  tags: string[];
  isNew?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  stock: number;
  reviews: ProductReview[];
};
