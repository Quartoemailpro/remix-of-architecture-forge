import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MIXING_CONTENT } from "../content";
import { DISCLAIMER } from "@/shared/content/disclaimer";
import { formatBTC } from "@/shared/utils/format";
import { PRICING_CONFIG } from "@/shared/pricing";
import {
  getMixingSessionState,
  addMixingOutput,
  removeMixingOutput,
  updateMixingOutput,
  createDefaultOutputs,
  MIXING_CONFIG,
} from "../application/mixing-actions";
import type { MixingOutput } from "../application/mixing-actions";
import { OutputRow } from "./OutputRow";

export default function MixingMain() {
  const [amount, setAmount] = useState("");
  const [outputs, setOutputs] = useState<MixingOutput[]>(createDefaultOutputs());

  const parsedAmount = parseFloat(amount) || 0;
  const state = useMemo(() => getMixingSessionState(parsedAmount, outputs), [parsedAmount, outputs]);

  const handleOutputChange = (i: number, field: keyof MixingOutput, value: string | number) => {
    setOutputs((prev) => updateMixingOutput(prev, i, field, value));
  };

  const handleAddOutput = () => {
    setOutputs((prev) => addMixingOutput(prev) ?? prev);
  };

  const handleRemoveOutput = (i: number) => {
    setOutputs((prev) => removeMixingOutput(prev, i) ?? prev);
  };

  return (
    <div className="container py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient-primary">{MIXING_CONTENT.title}</h1>
          <p className="mt-3 text-muted-foreground">{MIXING_CONTENT.subtitle}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-lg border border-border/50 bg-card mb-6"
        >
          <label className="text-sm font-medium text-foreground block mb-2">{MIXING_CONTENT.amountLabel}</label>
          <Input
            type="number"
            placeholder={MIXING_CONTENT.amountPlaceholder}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="font-mono text-lg"
            min={PRICING_CONFIG.MIN_AMOUNT}
            max={PRICING_CONFIG.MAX_AMOUNT}
            step={0.001}
          />
          <p className="text-xs text-muted-foreground mt-2 font-mono">
            Min: {PRICING_CONFIG.MIN_AMOUNT} BTC — Max: {PRICING_CONFIG.MAX_AMOUNT} BTC
          </p>
        </motion.div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{MIXING_CONTENT.destinationsTitle}</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddOutput}
              disabled={!state.canAdd}
              className="gap-1"
            >
              <Plus className="w-4 h-4" /> {MIXING_CONTENT.addButton}
            </Button>
          </div>
          {outputs.map((output, i) => (
            <OutputRow
              key={i}
              output={output}
              index={i}
              onChange={handleOutputChange}
              onRemove={handleRemoveOutput}
              canRemove={state.canRemove}
              delayMin={MIXING_CONFIG.MIN_DELAY_HOURS}
              delayMax={MIXING_CONFIG.MAX_DELAY_HOURS}
            />
          ))}
          {state.totalPercentage !== 100 && (
            <div className="flex items-center gap-2 p-3 rounded-md bg-warning/10 border border-warning/20 text-warning text-xs font-mono">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              Total distribution: {state.totalPercentage}% (must be 100%)
            </div>
          )}
        </div>

        {parsedAmount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 rounded-lg border border-primary/20 bg-primary/5 mb-6 space-y-3"
          >
            <h3 className="text-sm font-semibold text-primary">{MIXING_CONTENT.summaryTitle}</h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm font-mono">
              <span className="text-muted-foreground">{MIXING_CONTENT.summaryAmount}</span>
              <span className="text-right text-foreground">{formatBTC(parsedAmount)}</span>
              <span className="text-muted-foreground">{MIXING_CONTENT.summaryServiceFee}</span>
              <span className="text-right text-foreground">- {formatBTC(state.fees.serviceFee)}</span>
              <span className="text-muted-foreground">{MIXING_CONTENT.summaryNetworkFee}</span>
              <span className="text-right text-foreground">- {formatBTC(state.fees.networkFee)}</span>
              <span className="text-muted-foreground border-t border-border/50 pt-2">{MIXING_CONTENT.summaryReceived}</span>
              <span className="text-right text-primary font-semibold border-t border-border/50 pt-2">
                {formatBTC(state.fees.received)}
              </span>
            </div>
          </motion.div>
        )}

        <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-xs text-destructive mb-6 font-mono flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {DISCLAIMER.risk}
        </div>

        <Button className="w-full glow-primary gap-2" size="lg" disabled={!state.isValid}>
          {MIXING_CONTENT.confirmButton}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
