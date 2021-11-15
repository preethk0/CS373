import { demographicCountryNames } from "./demographicsCountries";
import { foodAndTourismCountryNames } from "./foodAndTourismCountries";

export const demographicSortValues = [
  { value: "", label: "None" },
  { value: "country_name-asc", label: "Country name (A-Z)" },
  { value: "country_name-des", label: "Country name (Z-A)" },
  { value: "country_population-asc", label: "Population (ascending)" },
  { value: "country_population-des", label: "Population (descending)" },
  { value: "country_GDP-asc", label: "Nominal GDP (ascending)" },
  { value: "country_GDP-des", label: "Nominal GDP (descending)" },
  { value: "country_states-asc", label: "Number of states (ascending)" },
  { value: "country_states-des", label: "Number of states (descending)" },
];

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

export const demographicLanguageFilterValues = [
  "Guarani",
  "Spanish; Castilian",
  "English",
  "Marshallese",
  "Danish",
  "Arabic",
  "French",
  "Georgian",
  "Dzongkha",
  "Romanian; Moldavian; Moldovan",
  "Azerbaijani",
  "Sango",
  "Tigrinya",
  "Dutch; Flemish",
  "Greek, Modern (1453-)",
  "Turkish",
  "Catalan; Valencian",
  "Afrikaans",
  "Ndebele, South; South Ndebele",
  "Pedi; Sepedi; Northern Sotho",
  "Sotho, Southern",
  "Swati",
  "Tsonga",
  "Tswana",
  "Venda",
  "Xhosa",
  "Zulu",
  "Portuguese",
  "Nauru",
  "Italian",
  "Gilbertese",
  "Central Khmer",
  "Polish",
  "Slovenian",
  "Japanese",
  "Chichewa; Chewa; Nyanja",
  "Divehi; Dhivehi; Maldivian",
  "Finnish",
  "Swedish",
  "Tonga (Tonga Islands)",
  "Bosnian",
  "Croatian",
  "Serbian",
  "German",
  "Icelandic",
  "Urdu",
  "Kinyarwanda",
  "Somali",
  "Uzbek",
  "Faroese",
  "Bulgarian",
  "Swahili",
  "Thai",
  "Bislama",
  "Mongolian",
  "Belarusian",
  "Russian",
  "Kazakh",
  "Papiamento",
  "Haitian; Haitian Creole",
  "Hungarian",
  "Hebrew",
  "Montenegrin",
  "Samoan",
  "Latvian",
  "Amharic",
  "Maori",
  "Estonian",
  "Albanian",
  "Armenian",
  "Aymara",
  "Quechua",
  "Maltese",
  "Turkmen",
  "Tetum",
  "Persian",
  "Pushto; Pashto",
  "Czech",
  "Nepali",
  "Rundi",
  "Kalaallisut; Greenlandic",
  "Bokmål, Norwegian; Norwegian Bokmål",
  "Norwegian Nynorsk; Nynorsk, Norwegian",
  "Vietnamese",
  "Ukrainian",
  "Chinese",
  "Hindi",
  "Palauan",
  "Malagasy",
  "Lithuanian",
  "Luxembourgish; Letzeburgesch",
  "Burmese",
  "Indonesian",
  "Irish",
  "Romansh",
  "Bengali",
  "Malay",
  "Tamil",
  "Sinhala; Sinhalese",
  "Kurdish",
  "Tagalog",
].map((language) => {
  return { value: language, label: language };
});

export const FoodAndTourismCountryNameFilterOptions = foodAndTourismCountryNames.map((country) => {
  return { value: country, label: country };
});


export const FoodAndTourismRevenueFilterValues = [
  { value: "0-10", label: "0 to 10 million" },
  { value: "10-100", label: "10 to 100 million" },
  { value: "100-1000", label: "100 million to 1 billion" },
  { value: "1000-100000", label: "1 to 100 billion" },
  { value: "100000-1000000", label: "100 billion to 1 trillion" },
];

export const FoodAndTourismNumberTouristsFilterValues = [
  { value: "0-10", label: "0 to 10k" },
  { value: "10-100", label: "10k to 100k" },
  { value: "100-1000", label: "100k to 1 million" },
  { value: "1000-100000", label: "1 million to 10 million" },
  { value: "100000-1000000", label: "10 million to 100 million" },
];

export const FoodAndTourismIncomeLevelFilterValues = [
  "High income",
  "Upper middle income",
  "Lower middle income",
  "Low income",
];

export const FoodAndTourismSortValues = [
  { value: "", label: "None" },
  { value: "country_name-asc", label: "Country name (A-Z)" },
  { value: "country_name-des", label: "Country name (Z-A)" },
  { value: "country_tourism_revenue-asc", label: "Tourism Revenue (ascending)" },
  { value: "country_tourism_revenue-des", label: "Tourism Revenue (descending)" },
  { value: "country_number_of_tourists-asc", label: "Number of Tourists (ascending)" },
  { value: "country_number_of_tourists-des", label: "Number of Tourists (descending)" },
  { value: "country_income_level-asc", label: "Income Level (ascending)" },
  { value: "country_income_level-des", label: "Income Level (descending)" },
];
