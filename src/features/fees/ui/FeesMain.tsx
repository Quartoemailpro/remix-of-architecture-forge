import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { FEES_CONTENT } from "../content";
import { PRICING_CONFIG, calculateFees } from "@/shared/pricing";
import { formatBTC } from "@/shared/utils/format";

export default function FeesMain() {
  const [amount, setAmount] = useState("1");
  const parsedAmount = parseFloat(amount) || 0;
  const fees = useMemo(() => calculateFees(parsedAmount), [parsedAmount]);

  return (
    <div className="container py-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary">{FEES_CONTENT.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{FEES_CONTENT.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-lg border border-border/50 bg-card text-center">
            <p className="text-xs text-muted-foreground font-mono mb-1">{FEES_CONTENT.breakdown.service.label}</p>
            <p className="text-2xl font-bold text-primary">{(PRICING_CONFIG.SERVICE_FEE * 100).toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground mt-1">{FEES_CONTENT.breakdown.service.description}</p>
          </div>
          <div className="p-4 rounded-lg border border-border/50 bg-card text-center">
            <p className="text-xs text-muted-foreground font-mono mb-1">{FEES_CONTENT.breakdown.network.label}</p>
            <p className="text-2xl font-bold text-accent">{PRICING_CONFIG.NETWORK_FEE} BTC</p>
            <p className="text-xs text-muted-foreground mt-1">{FEES_CONTENT.breakdown.network.description}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-lg border border-primary/20 bg-primary/5"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">{FEES_CONTENT.simulatorTitle}</h2>
          <div className="mb-6">
            <label className="text-sm text-muted-foreground block mb-2">{FEES_CONTENT.amountLabel}</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="font-mono text-lg"
              min={PRICING_CONFIG.MIN_AMOUNT}
              step={0.01}
            />
          </div>

          {parsedAmount > 0 && (
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{FEES_CONTENT.summaryLabels.sent}</span>
                <span className="text-foreground">{formatBTC(parsedAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{FEES_CONTENT.summaryLabels.serviceFee}</span>
                <span className="text-foreground">- {formatBTC(fees.serviceFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{FEES_CONTENT.summaryLabels.networkFee}</span>
                <span className="text-foreground">- {formatBTC(fees.networkFee)}</span>
              </div>
              <div className="border-t border-border/50 pt-3 flex justify-between">
                <span className="text-foreground font-semibold">{FEES_CONTENT.summaryLabels.received}</span>
                <span className="text-primary font-bold">{formatBTC(fees.received)}</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
