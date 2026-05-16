import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "VOLTURA | Premium Performance Apparel",
    template: "%s | VOLTURA"
  },
  description:
    "A premium sportswear and fashion shopping experience built with Next.js, TypeScript, Tailwind CSS, Framer Motion, Shadcn/UI primitives, and a Stripe-ready checkout structure.",
  keywords: [
    "premium sportswear",
    "fashion ecommerce",
    "performance apparel",
    "Next.js store",
    "VOLTURA"
  ],
  openGraph: {
    title: "VOLTURA | Premium Performance Apparel",
    description: "Original high-end sport fashion storefront with immersive product discovery.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80",
        width: 1600,
        height: 900,
        alt: "Premium sportswear editorial campaign"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
