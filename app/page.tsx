import { products } from "@/data/products";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { EditorialPromo } from "@/components/home/editorial-promo";
import { FaqSection } from "@/components/home/faq-section";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { ProductRail } from "@/components/home/product-rail";
import { ReviewsSection } from "@/components/home/reviews-section";
import { TrustBadges } from "@/components/shared/trust-badges";

export default function HomePage() {
  const featured = products.filter((product) => product.isFeatured);
  const arrivals = products.filter((product) => product.isNew);
  const trending = products.filter((product) => product.isTrending);

  return (
    <>
      <HeroCarousel />
      <TrustBadges />
      <ProductRail eyebrow="Featured" title="Premium picks" products={featured} />
      <EditorialPromo />
      <CategoryShowcase />
      <ProductRail eyebrow="New arrivals" title="Fresh rotation" products={arrivals} href="/products?sort=new" />
      <ReviewsSection />
      <ProductRail eyebrow="Trending now" title="In motion" products={trending} href="/products?sort=rating" />
      <NewsletterSection />
      <FaqSection />
    </>
  );
}
