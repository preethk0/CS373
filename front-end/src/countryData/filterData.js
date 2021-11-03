import { demographicCountryNames } from "./demographicsCountries";

export const demographicGDPFilterValues = [
  { value: "0-25", label: "$0-$25 billion" },
  { value: "25-50", label: "$25-$50 billion" },
  { value: "50-100", label: "$50-$100 billion" },
  { value: "100-250", label: "$100-$250 billion" },
  { value: "250-500", label: "$250-$500 billion" },
  { value: "500-750", label: "$500-$750 billion" },
  { value: "750-1000", label: "$750 billion - $1 trillion" },
  { value: "1000-5000", label: "$1-$5 trillion" },
  { value: "5000-10000", label: "$5-$10 trillion" },
  { value: "10000-20000", label: "$10-20 trillion" },
];

export const countryFilterOptions = demographicCountryNames.map((country) => {
  return { value: country, label: country };
});
