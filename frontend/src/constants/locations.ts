// Hong Kong Location Data
export interface LocationArea {
  district: string;
  areas: string[];
}

export const HONG_KONG_LOCATIONS: LocationArea[] = [
  // Hong Kong Island
  {
    district: "Central and Western",
    areas: ["Kennedy Town", "Shek Tong Tsui", "Sai Ying Pun", "Sheung Wan", "Central", "Admiralty", "Mid-levels", "Peak"]
  },
  {
    district: "Wan Chai",
    areas: ["Wan Chai", "Causeway Bay", "Happy Valley", "Tai Hang", "So Kon Po", "Jardine's Lookout"]
  },
  {
    district: "Eastern",
    areas: ["Tin Hau", "Braemar Hill", "North Point", "Quarry Bay", "Sai Wan Ho", "Shau Kei Wan", "Chai Wan", "Siu Sai Wan"]
  },
  {
    district: "Southern",
    areas: ["Pok Fu Lam", "Aberdeen", "Ap Lei Chau", "Wong Chuk Hang", "Shouson Hill", "Repulse Bay", "Chung Hom Kok", "Stanley", "Tai Tam", "Shek O"]
  },

  // Kowloon
  {
    district: "Yau Tsim Mong",
    areas: ["Tsim Sha Tsui", "Yau Ma Tei", "West Kowloon Reclamation", "King's Park", "Mong Kok", "Tai Kok Tsui"]
  },
  {
    district: "Sham Shui Po",
    areas: ["Mei Foo", "Lai Chi Kok", "Cheung Sha Wan", "Sham Shui Po", "Shek Kip Mei", "Yau Yat Tsuen", "Tai Wo Ping", "Stonecutters Island"]
  },
  {
    district: "Kowloon City",
    areas: ["Hung Hom", "To Kwa Wan", "Ma Tau Kok", "Ma Tau Wai", "Kai Tak", "Kowloon City", "Ho Man Tin", "Kowloon Tong", "Beacon Hill"]
  },
  {
    district: "Wong Tai Sin",
    areas: ["San Po Kong", "Wong Tai Sin", "Tung Tau", "Wang Tau Hom", "Lok Fu", "Diamond Hill", "Tsz Wan Shan", "Ngau Chi Wan"]
  },
  {
    district: "Kwun Tong",
    areas: ["Ping Shek", "Kowloon Bay", "Ngau Tau Kok", "Jordan Valley", "Kwun Tong", "Sau Mau Ping", "Lam Tin", "Yau Tong", "Lei Yue Mun"]
  },

  // New Territories
  {
    district: "Kwai Tsing",
    areas: ["Kwai Chung", "Tsing Yi"]
  },
  {
    district: "Tsuen Wan",
    areas: ["Tsuen Wan", "Lei Muk Shue", "Ting Kau", "Sham Tseng", "Tsing Lung Tau", "Ma Wan", "Sunny Bay"]
  },
  {
    district: "Tuen Mun",
    areas: ["Tai Lam Chung", "So Kwun Wat", "Tuen Mun", "Lam Tei"]
  },
  {
    district: "Yuen Long",
    areas: ["Hung Shui Kiu", "Ha Tsuen", "Lau Fau Shan", "Tin Shui Wai", "Yuen Long", "San Tin", "Lok Ma Chau", "Kam Tin", "Shek Kong", "Pat Heung"]
  },
  {
    district: "North",
    areas: ["Fanling", "Luen Wo Hui", "Sheung Shui", "Shek Wu Hui", "Sha Tau Kok", "Luk Keng", "Wu Kau Tang"]
  },
  {
    district: "Tai Po",
    areas: ["Tai Po Market", "Tai Po", "Tai Po Kau", "Tai Mei Tuk", "Shuen Wan", "Cheung Muk Tau", "Kei Ling Ha"]
  },
  {
    district: "Sha Tin",
    areas: ["Tai Wai", "Sha Tin", "Fo Tan", "Ma Liu Shui", "Wu Kai Sha", "Ma On Shan"]
  },
  {
    district: "Sai Kung",
    areas: ["Clear Water Bay", "Sai Kung", "Tai Mong Tsai", "Tseung Kwan O", "Hang Hau", "Tiu Keng Leng", "Ma Yau Tong"]
  },
  {
    district: "Islands",
    areas: ["Cheung Chau", "Peng Chau", "Lantau Island (including Tung Chung)", "Lamma Island"]
  }
];

export const REGION_COLORS = {
  "Hong Kong Island": "#4CAF50",
  "Kowloon": "#2196F3", 
  "New Territories": "#FF9800"
};

// Helper function to get all areas as flat list for search/filtering
export const getAllAreas = (): string[] => {
  return HONG_KONG_LOCATIONS.flatMap(location => location.areas);
};

// Helper function to format location display
export const formatLocationDisplay = (district: string, area: string): string => {
  return `${area}, ${district}`;
};