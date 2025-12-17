import { Feather } from "@expo/vector-icons";

export type BudgetIcon = {
  id: string;
  name: keyof typeof Feather.glyphMap;
  label: string;
};

export type IconCategory =
  | "food"
  | "transport"
  | "home"
  | "shopping"
  | "entertainment"
  | "finance"
  | "health"
  | "travel"
  | "tech"
  | "personal"
  | "education"
  | "pets"
  | "other";

export const ICONS: BudgetIcon[] = [
  // Food & Dining
  { id: "coffee", name: "coffee", label: "Coffee" },
  { id: "shopping-cart", name: "shopping-cart", label: "Groceries" },
  { id: "shopping-bag", name: "shopping-bag", label: "Shopping Bag" },
  { id: "box", name: "box", label: "Takeout" },
  { id: "gift", name: "gift", label: "Gifts" },

  // Transportation
  { id: "truck", name: "truck", label: "Car / Vehicle" },
  { id: "navigation", name: "navigation", label: "Navigation" },
  { id: "map", name: "map", label: "Map" },
  { id: "map-pin", name: "map-pin", label: "Location" },
  { id: "compass", name: "compass", label: "Compass" },

  // Home & Utilities
  { id: "home", name: "home", label: "Home" },
  { id: "zap", name: "zap", label: "Electricity" },
  { id: "wifi", name: "wifi", label: "Internet" },
  { id: "droplet", name: "droplet", label: "Water" },
  { id: "tool", name: "tool", label: "Maintenance" },

  // Finance & Bills
  { id: "credit-card", name: "credit-card", label: "Credit Card" },
  { id: "dollar-sign", name: "dollar-sign", label: "Money" },
  { id: "trending-up", name: "trending-up", label: "Investments" },
  { id: "save", name: "save", label: "Savings" },
  { id: "percent", name: "percent", label: "Interest" },

  // Entertainment
  { id: "film", name: "film", label: "Movies" },
  { id: "music", name: "music", label: "Music" },
  { id: "headphones", name: "headphones", label: "Audio" },
  { id: "play", name: "play", label: "Games" },
  { id: "tv", name: "tv", label: "TV" },

  // Health & Fitness
  { id: "heart", name: "heart", label: "Health" },
  { id: "activity", name: "activity", label: "Fitness" },
  { id: "thermometer", name: "thermometer", label: "Medical" },
  { id: "smile", name: "smile", label: "Wellbeing" },

  // Travel
  { id: "briefcase", name: "briefcase", label: "Travel / Work" },
  { id: "airplay", name: "airplay", label: "Flights" },
  { id: "sun", name: "sun", label: "Vacation" },
  { id: "moon", name: "moon", label: "Overnight" },

  // Education & Work
  { id: "book", name: "book", label: "Books" },
  { id: "edit", name: "edit", label: "Writing" },
  { id: "clipboard", name: "clipboard", label: "Tasks" },
  { id: "calendar", name: "calendar", label: "Calendar" },

  // Technology
  { id: "smartphone", name: "smartphone", label: "Phone" },
  { id: "tablet", name: "tablet", label: "Tablet" },
  { id: "cpu", name: "cpu", label: "Hardware" },

  // Personal & Lifestyle
  { id: "user", name: "user", label: "Personal" },
  { id: "users", name: "users", label: "Family" },
  { id: "lock", name: "lock", label: "Security" },
  { id: "key", name: "key", label: "Keys" },
  { id: "watch", name: "watch", label: "Watch" },

  // Miscellaneous
  { id: "bell", name: "bell", label: "Alerts" },
  { id: "star", name: "star", label: "Favorites" },
  { id: "flag", name: "flag", label: "Goals" },
  { id: "archive", name: "archive", label: "Archive" },
  { id: "more-horizontal", name: "more-horizontal", label: "More" },
];
