import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { MIXING_CONTENT } from "../content";
import { checkOutputAddressValid } from "../application/mixing-actions";
import type { MixingOutput } from "../application/mixing-actions";

interface OutputRowProps {
  output: MixingOutput;
  index: number;
  onChange: (i: number, field: keyof MixingOutput, value: string | number) => void;
  onRemove: (i: number) => void;
  canRemove: boolean;
  delayMin: number;
  delayMax: number;
}

export function OutputRow({ output, index, onChange, onRemove, canRemove, delayMin, delayMax }: OutputRowProps) {
  const isValidAddr = checkOutputAddressValid(output);

  return (
    <div className="p-4 rounded-lg border border-border/50 bg-card space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-muted-foreground">
          {MIXING_CONTENT.destinationLabel} #{index + 1}
        </span>
        {canRemove && (
          <button onClick={() => onRemove(index)} className="text-muted-foreground hover:text-destructive transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      <Input
        placeholder={MIXING_CONTENT.addressPlaceholder}
        value={output.address}
        onChange={(e) => onChange(index, "address", e.target.value)}
        className={`font-mono text-sm ${!isValidAddr ? "border-destructive" : ""}`}
      />
      {!isValidAddr && (
        <p className="text-xs text-destructive">{MIXING_CONTENT.invalidAddress}</p>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            {MIXING_CONTENT.percentageLabel}: {output.percentage}%
          </label>
          <Slider
            value={[output.percentage]}
            onValueChange={([v]) => onChange(index, "percentage", v)}
            min={10}
            max={100}
            step={1}
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            {MIXING_CONTENT.delayLabel}: {output.delay}h
          </label>
          <Slider
            value={[output.delay]}
            onValueChange={([v]) => onChange(index, "delay", v)}
            min={delayMin}
            max={delayMax}
            step={0.5}
          />
        </div>
      </div>
    </div>
  );
}
