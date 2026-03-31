import { calculateFees } from "@/shared/pricing";
import type { FeeBreakdown } from "@/shared/pricing";
import type { MixingOutput } from "../domain/mixing-output";
import {
  getTotalPercentage,
  canAddOutput,
  canRemoveOutput,
  isSessionValid,
  isOutputAddressValid,
} from "../domain/mixing-policies";
import { createDefaultOutput } from "../domain/mixing-output";

export interface MixingSessionState {
  fees: FeeBreakdown;
  totalPercentage: number;
  canAdd: boolean;
  canRemove: boolean;
  isValid: boolean;
}

export function getMixingSessionState(amount: number, outputs: MixingOutput[]): MixingSessionState {
  return {
    fees: calculateFees(amount),
    totalPercentage: getTotalPercentage(outputs),
    canAdd: canAddOutput(outputs.length),
    canRemove: canRemoveOutput(outputs.length),
    isValid: isSessionValid(amount, outputs),
  };
}

export function addMixingOutput(outputs: MixingOutput[]): MixingOutput[] | null {
  if (!canAddOutput(outputs.length)) return null;
  return [...outputs, createDefaultOutput()];
}

export function removeMixingOutput(outputs: MixingOutput[], index: number): MixingOutput[] | null {
  if (!canRemoveOutput(outputs.length)) return null;
  return outputs.filter((_, idx) => idx !== index);
}

export function updateMixingOutput(
  outputs: MixingOutput[],
  index: number,
  field: keyof MixingOutput,
  value: string | number
): MixingOutput[] {
  return outputs.map((o, idx) => (idx === index ? { ...o, [field]: value } : o));
}

export function checkOutputAddressValid(output: MixingOutput): boolean {
  return isOutputAddressValid(output);
}

export type { MixingOutput } from "../domain/mixing-output";
export { createDefaultOutputs } from "./create-default-outputs";
export { MIXING_CONFIG } from "../domain/mixing-policies";
