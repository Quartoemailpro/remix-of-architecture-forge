import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Eye, Zap } from "lucide-react";
import { HOME_CONTENT } from "../content";
import { DISCLAIMER } from "@/shared/content/disclaimer";
import { Button } from "@/components/ui/button";

function StepCard({ step }: { step: typeof HOME_CONTENT.steps[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative p-6 rounded-lg border border-border/50 bg-card hover:border-glow transition-all group"
    >
      <span className="text-4xl font-mono font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
        {step.number}
      </span>
      <h3 className="text-xl font-semibold text-foreground mt-2">{step.title}</h3>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{step.description}</p>
    </motion.div>
  );
}

export default function HomeMain() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="container relative py-24 md:py-36 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-8">
              <Shield className="w-3.5 h-3.5" />
              Decentralized Privacy
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="text-gradient-primary">{HOME_CONTENT.headline}</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {HOME_CONTENT.subheadline}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="glow-primary font-semibold gap-2">
                <Link to="/mixer">
                  {HOME_CONTENT.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border/50">
                <Link to="/how-it-works">How It Works</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Simple. Secure. Private.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {HOME_CONTENT.steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </section>

      <section className="container py-20 border-t border-border/50">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">{HOME_CONTENT.transparency.title}</h3>
            </div>
            <ul className="space-y-3">
              {HOME_CONTENT.transparency.items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-warning" />
              <h3 className="text-xl font-semibold">{HOME_CONTENT.risks.title}</h3>
            </div>
            <ul className="space-y-3">
              {HOME_CONTENT.risks.items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-warning flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="container pb-20">
        <div className="p-4 rounded-lg border border-border/50 bg-card/50 text-xs text-muted-foreground font-mono leading-relaxed">
          {DISCLAIMER.legal}
        </div>
      </section>
    </div>
  );
}
