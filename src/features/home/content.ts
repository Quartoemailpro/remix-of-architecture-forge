export const HOME_CONTENT = {
  headline: "Real Privacy for Your Transactions",
  subheadline: "Protect your financial identity with advanced mixing technology. No logs, no tracking.",
  steps: [
    {
      number: "01",
      title: "Send",
      description: "Deposit your funds to the automatically generated address.",
    },
    {
      number: "02",
      title: "Mix",
      description: "Your funds are fragmented and mixed with others in liquidity pools.",
    },
    {
      number: "03",
      title: "Receive",
      description: "Clean funds are sent to your destination addresses with configurable delay.",
    },
  ],
  cta: "Start Mixing",
  transparency: {
    title: "Full Transparency",
    items: [
      "Auditable source code",
      "No permanent logs",
      "Clear and predictable fees",
      "Documented risks",
    ],
  },
  risks: {
    title: "Risks You Should Know",
    items: [
      "Blockchain transactions are irreversible",
      "Delays may vary depending on the network",
      "Additional privacy, not absolute",
    ],
  },
} as const;
