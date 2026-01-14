import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "Is NineProo really free?",
    answer: "Yes! All 9 tools are completely free to use with no hidden costs. We believe essential web development utilities should be accessible to everyone. Premium features may be added in the future, but the core tools will always remain free."
  },
  {
    question: "Do I need to create an account?",
    answer: "No account required. Just visit the tool you need and start using it immediately. All processing happens in your browser, so there's nothing to sign up for."
  },
  {
    question: "Is my data private?",
    answer: "Absolutely. All tools run 100% client-side in your browser. Your designs, colors, prompts, and code never leave your device. We don't track, store, or analyze any of your work."
  },
  {
    question: "Can I use the generated CSS in commercial projects?",
    answer: "Yes, everything you create with NineProo is yours to use however you like—personal projects, client work, or commercial applications. No attribution required."
  },
  {
    question: "What browsers are supported?",
    answer: "NineProo works in all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience."
  },
  {
    question: "How do I export my work?",
    answer: "Each tool has a copy-to-clipboard button that lets you instantly grab the generated CSS, SVG, or code. Just click and paste directly into your project."
  },
  {
    question: "Will more tools be added?",
    answer: "We're always working on new tools based on community feedback. Have an idea? We'd love to hear it! Reach out through our contact page."
  },
];

export function FAQSection() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about NineProo
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6 data-[state=open]:bg-secondary/30"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
