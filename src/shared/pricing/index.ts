export const PRICING_CONFIG = {
  SERVICE_FEE: 0.015,
  NETWORK_FEE: 0.0001,
  MIN_AMOUNT: 0.001,
  MAX_AMOUNT: 100,
} as const;

export interface FeeBreakdown {
  amount: number;
  serviceFee: number;
  networkFee: number;
  totalFee: number;
  received: number;
}

export function calculateFees(amount: number): FeeBreakdown {
  const serviceFee = amount * PRICING_CONFIG.SERVICE_FEE;
  const networkFee = PRICING_CONFIG.NETWORK_FEE;
  const totalFee = serviceFee + networkFee;
  const received = Math.max(0, amount - totalFee);
  return { amount, serviceFee, networkFee, totalFee, received };
}
