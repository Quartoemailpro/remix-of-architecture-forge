import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_CONTENT } from "../content";

export default function FAQMain() {
  return (
    <div className="container py-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary">{FAQ_CONTENT.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{FAQ_CONTENT.subtitle}</p>
        </div>

        <div className="space-y-8">
          {FAQ_CONTENT.categories.map((cat) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-mono text-primary mb-3 uppercase tracking-wider">{cat.name}</h2>
              <Accordion type="single" collapsible className="border border-border/50 rounded-lg overflow-hidden">
                {cat.questions.map((item, i) => (
                  <AccordionItem key={i} value={`${cat.name}-${i}`} className="border-border/50">
                    <AccordionTrigger className="px-4 text-sm text-left hover:no-underline hover:text-primary">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
