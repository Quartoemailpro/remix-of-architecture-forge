import type { MixingOutput } from "../domain/mixing-output";

export function createDefaultOutputs(): MixingOutput[] {
  return [
    { address: "", percentage: 50, delay: 1 },
    { address: "", percentage: 50, delay: 2 },
  ];
}
