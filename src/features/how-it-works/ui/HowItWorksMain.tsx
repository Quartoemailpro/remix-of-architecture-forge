import { motion } from "framer-motion";
import { ArrowDownToLine, Shuffle, ArrowUpFromLine } from "lucide-react";
import { HOW_IT_WORKS_CONTENT } from "../content";

const ICONS = {
  ArrowDownToLine,
  Shuffle,
  ArrowUpFromLine,
} as const;

export default function HowItWorksMain() {
  const { title, subtitle, stages } = HOW_IT_WORKS_CONTENT;

  return (
    <div className="container py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary">{title}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {stages.map((stage, i) => {
          const Icon = ICONS[stage.icon as keyof typeof ICONS];
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-6 rounded-lg border border-border/50 bg-card"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">{stage.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{stage.description}</p>
                  <ul className="mt-4 space-y-2">
                    {stage.details.map((detail, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {i < stages.length - 1 && (
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-px h-5 bg-border" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
