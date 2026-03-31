export const FEES_CONTENT = {
  title: "Transparent Fees",
  subtitle: "No surprises. Calculate exactly how much you will pay.",
  breakdown: {
    service: {
      label: "Service fee",
      description: "Percentage applied to the total amount",
    },
    network: {
      label: "Network fee",
      description: "Fixed blockchain transaction cost",
    },
  },
  simulatorTitle: "Fee Simulator",
  amountLabel: "Amount in BTC",
  summaryLabels: {
    sent: "Amount sent:",
    serviceFee: "Service fee:",
    networkFee: "Network fee:",
    received: "You receive:",
  },
} as const;
