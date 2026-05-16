import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";

const faqs = [
  {
    question: "How does VOLTURA sizing run?",
    answer:
      "Most pieces fit true to size with an athletic profile. Choose your usual size for a tailored fit or size up for a relaxed streetwear silhouette."
  },
  {
    question: "Is checkout connected to Stripe?",
    answer:
      "The project includes a Stripe-ready API route and checkout payload shape. Add your Stripe keys and replace the mock response when you are ready to accept payments."
  },
  {
    question: "Can the catalog be replaced with a real backend?",
    answer:
      "Yes. Product data is centralized in a typed mock module, so swapping to a CMS, database, or commerce API is straightforward."
  },
  {
    question: "Do cart and wishlist persist?",
    answer:
      "Cart lines, selected variants, coupons, and wishlist product IDs are persisted locally through Zustand middleware."
  }
];

export function FaqSection() {
  return (
    <section className="container grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr]">
      <SectionHeading eyebrow="FAQ" title="Useful details" description="Key commerce behaviors are already structured for production wiring." />
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={faq.question} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
