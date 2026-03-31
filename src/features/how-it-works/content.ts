export const HOW_IT_WORKS_CONTENT = {
  title: "How It Works",
  subtitle: "A simple three-step process to protect your privacy.",
  stages: [
    {
      id: "input",
      title: "Input",
      icon: "ArrowDownToLine",
      description: "You send funds to a temporary address generated exclusively for your session.",
      details: [
        "Unique address per transaction",
        "Confirmation after 3 blocks on the network",
        "Support for multiple cryptocurrencies",
      ],
    },
    {
      id: "process",
      title: "Processing",
      icon: "Shuffle",
      description: "Your funds are fragmented and mixed with other deposits in our liquidity pools.",
      details: [
        "Fragmentation into multiple parcels",
        "Mixing with funds from other users",
        "Random delays between transfers",
      ],
    },
    {
      id: "output",
      title: "Output",
      icon: "ArrowUpFromLine",
      description: "Funds are distributed to your destination addresses with configurable delays.",
      details: [
        "Distribution to up to 5 addresses",
        "Customizable delay (0.5h - 24h)",
        "No link to the original deposit",
      ],
    },
  ],
} as const;
