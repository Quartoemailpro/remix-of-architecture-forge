export interface MixingOutput {
  address: string;
  percentage: number;
  delay: number;
}

export function createDefaultOutput(percentage = 10, delay = 1): MixingOutput {
  return { address: "", percentage, delay };
}
