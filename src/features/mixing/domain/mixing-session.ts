import type { MixingOutput } from "./mixing-output";
import type { FeeBreakdown } from "@/shared/pricing";

export interface MixingSession {
  amount: number;
  outputs: MixingOutput[];
  fees: FeeBreakdown;
  isValid: boolean;
}
