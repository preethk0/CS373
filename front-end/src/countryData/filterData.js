import { demographicCountryNames } from "./demographicsCountries";
import { foodAndTourismCountryNames } from "./foodAndTourismCountries";
import { geographyCountryNames } from "./geographyCountries";

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
  { value: "country_language-asc", label: "Language (ascending)" },
  { value: "country_language-des", label: "Language (descending)" },
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

export const demographicStatesFilterValues = [
  { value: "0-5", label: "Less than 5 states" },
  { value: "6-10", label: "6 to 10 states" },
  { value: "11-25", label: "11 to 25 states" },
  { value: "26-50", label: "26 to 50 states" },
  { value: "51-100", label: "51 to 100 states" },
  { value: "101-250", label: "More than 100 states" },
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

export const FoodAndTourismCountryNameFilterOptions =
  foodAndTourismCountryNames.map((country) => {
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
  {
    value: "country_tourism_revenue-asc",
    label: "Tourism Revenue (ascending)",
  },
  {
    value: "country_tourism_revenue-des",
    label: "Tourism Revenue (descending)",
  },
  {
    value: "country_number_of_tourists-asc",
    label: "Number of Tourists (ascending)",
  },
  {
    value: "country_number_of_tourists-des",
    label: "Number of Tourists (descending)",
  },
  { value: "country_income_level-asc", label: "Income Level (ascending)" },
  { value: "country_income_level-des", label: "Income Level (descending)" },
];
// ************************************************************************

export const geographySortValues = [
  { value: "", label: "None" },
  { value: "country_name-asc", label: "Country name (A-Z)" },
  { value: "country_name-des", label: "Country name (Z-A)" },
  { value: "country_continent-asc", label: "Continent (A-Z)" },
  { value: "country_continent-des", label: "Continent (Z-A)" },
  { value: "country_region-asc", label: "Region (A-Z)" },
  { value: "country_region-des", label: "Region (Z-A)" },
  { value: "country_longitude-asc", label: "Longitude (ascending)" },
  { value: "country_longitude-des", label: "Longitude (descending)" },
  { value: "country_latitude-asc", label: "Latitude (ascending)" },
  { value: "country_latitude-des", label: "Latitude (descending)" },
];

export const geographyCountryNameFilterOptions = geographyCountryNames.map(
  (country) => {
    return { value: country, label: country };
  }
);

export const geographyContinentFilterValues = [
  { value: "Africa", label: "Africa" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "North America", label: "North America" },
  { value: "Oceania", label: "Oceania" },
  { value: "South America", label: "South America" },
];

export const geographyRegionFilterValues = [
  { value: "East Asia & Pacific", label: "East Asia & Pacific" },
  { value: "Europe & Central Asia", label: "Europe & Central Asia" },
  { value: "Latin America & Caribbean", label: "Latin America & Caribbean" },
  { value: "Middle East & North Africa", label: "Middle East & North Africa" },
  { value: "North America", label: "North America" },
  { value: "South Asia", label: "South Asia" },
  { value: "Sub-Saharan Africa", label: "Sub-Saharan Africa" },
];

export const geographyLongitudeFilterValues = [
  { value: "-180*-140", label: "-180 to -140" },
  { value: "-140*-100", label: "-140 to -100" },
  { value: "-100*-60", label: "-100 to -60" },
  { value: "-60*-20", label: "-60 to -20" },
  { value: "-20*20", label: "-20 to 20" },
  { value: "20*60", label: "20 to 60" },
  { value: "60*100", label: "60 to 100" },
  { value: "100*140", label: "100 to 140" },
  { value: "140*180", label: "140 to 180" },
];

export const geographyLatitudeFilterValues = [
  { value: "-180*-140", label: "-180 to -140" },
  { value: "-140*-100", label: "-140 to -100" },
  { value: "-100*-60", label: "-100 to -60" },
  { value: "-60*-20", label: "-60 to -20" },
  { value: "-20*20", label: "-20 to 20" },
  { value: "20*60", label: "20 to 60" },
  { value: "60*100", label: "60 to 100" },
  { value: "100*140", label: "100 to 140" },
  { value: "140*180", label: "140 to 180" },
];
