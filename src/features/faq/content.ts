export const FAQ_CONTENT = {
  title: "Frequently Asked Questions",
  subtitle: "Everything you need to know about the service.",
  categories: [
    {
      name: "General",
      questions: [
        {
          q: "What is a cryptocurrency mixer?",
          a: "A mixer (or tumbler) is a service that enhances the privacy of blockchain transactions by mixing your funds with those of other users to make tracking difficult.",
        },
        {
          q: "Is it legal to use a mixer?",
          a: "Using mixers for privacy purposes is legal in most jurisdictions. However, using them for money laundering or other illegal activities is prohibited.",
        },
        {
          q: "Are my funds safe?",
          a: "We use multiple layers of security. However, as with any blockchain service, there are inherent risks. Never send more than you are willing to lose.",
        },
      ],
    },
    {
      name: "Technical",
      questions: [
        {
          q: "How many confirmations are required?",
          a: "3 confirmations on the network are required before your funds are processed.",
        },
        {
          q: "What is the minimum and maximum delay?",
          a: "The minimum delay is 30 minutes and the maximum is 24 hours. Longer delays increase privacy.",
        },
        {
          q: "How many addresses can I distribute to?",
          a: "You can distribute to up to 5 different destination addresses with customizable percentages.",
        },
      ],
    },
    {
      name: "Fees",
      questions: [
        {
          q: "How are fees calculated?",
          a: "The service fee is 1.5% of the total amount, plus a fixed network fee of 0.0001 BTC per transaction.",
        },
        {
          q: "Are there hidden fees?",
          a: "No. All fees are displayed before confirmation. What you see is what you pay.",
        },
      ],
    },
  ],
} as const;
