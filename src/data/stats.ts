export interface Stat {
  id: string;
  eyebrow: string;
  value: string;
  unit: string;
  headline: string;
  description: string;
  year: string;
  sourceName: string;
  sourceUrl: string;
  note?: string;
  secondaryValue?: string;
  lastVerified: string;
  verified: boolean;
}

export const stats: Stat[] = [
  {
    id: "feedstock-scale",
    eyebrow: "Feedstock",
    headline: "Tens of millions of tonnes of bagasse produced each year",
    value: "75–100",
    unit: "million tonnes / year",
    description:
      "Sugarcane bagasse is the fibrous residue left after cane is crushed for sugar. India's sugar industry produces it at very large scale.",
    note: "Estimates vary by source and year; shown as a range.",
    year: "[ADD: Year]",
    sourceName:
      "[ADD: Primary source, e.g. ISMA, Ministry of Food & Public Distribution, or a peer-reviewed review]",
    sourceUrl: "[ADD: Source URL]",
    lastVerified: "2026-10-14",
    verified: false,
  },
  {
    id: "plastic-waste",
    eyebrow: "The problem",
    headline:
      "About 3.5 million tonnes of plastic waste reported in India in a single year",
    value: "34.69 lakh",
    secondaryValue: "≈ 3.5 million",
    unit: "tonnes / year",
    year: "2019-20",
    description: "Of this, roughly 15.8 lakh tonnes was reported as recycled.",
    sourceName:
      "CPCB Annual Report on implementation of Plastic Waste Management Rules, as cited in a Rajya Sabha reply (Dec 2022)",
    sourceUrl:
      "https://rsdebate.nic.in/bitstream/123456789/734866/1/PQ_258_22122022_U1800_p234_p238.pdf",
    note: "Self-reported by state pollution control boards; other CPCB estimates differ. Check for a more recent CPCB year and update if available.",
    lastVerified: "2026-10-14",
    verified: false,
  },
  {
    id: "policy-driver",
    eyebrow: "Why now",
    headline: "Regulation is pushing brands toward alternatives",
    value: "",
    unit: "",
    description:
      "India's Plastic Waste Management framework, including extended producer responsibility (EPR) obligations for plastic packaging, is increasing pressure on brands to reduce and replace conventional plastic packaging.",
    year: "[ADD: Year]",
    sourceName:
      "[ADD: Specific rule, e.g. Plastic Waste Management (Amendment) Rules, 2022, from CPCB or MoEFCC]",
    sourceUrl: "[ADD: Source URL]",
    lastVerified: "2026-10-14",
    verified: false,
  },
];
