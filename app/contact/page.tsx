import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact VOLTURA support for product, shipping, and storefront questions."
};

export default function ContactPage() {
  return <ContactForm />;
}
