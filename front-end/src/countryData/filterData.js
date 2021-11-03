import { demographicCountryNames } from "./demographicsCountries";

export const demographicGDPFilterValues = [
  { value: "0-25", label: "Lower than $25 billion" },
  { value: "25-50", label: "$25 to $50 billion" },
  { value: "50-100", label: "$50 to $100 billion" },
  { value: "100-250", label: "$100 to $250 billion" },
  { value: "250-500", label: "$250 to $500 billion" },
  { value: "500-750", label: "$500 to $750 billion" },
  { value: "750-1000", label: "$750 billion to $1 trillion" },
  { value: "1000-5000", label: "$1 to $5 trillion" },
  { value: "5000-10000", label: "$5 to $10 trillion" },
  { value: "10000-25000", label: "Greater than $10 trillion" },
];

export const demographicPopulationFilterValues = [
  { value: "0-1", label: "Lower than 1 million" },
  { value: "1-10", label: "1 to 10 million" },
  { value: "10-25", label: "10 to 25 million" },
  { value: "25-50", label: "25 to 50 million" },
  { value: "50-100", label: "50 to 100 million" },
  { value: "100-1000", label: "100 million to 1 billion" },
  { value: "1000-2000", label: "Greater than 1 billion" },
];

export const countryFilterOptions = demographicCountryNames.map((country) => {
  return { value: country, label: country };
});
