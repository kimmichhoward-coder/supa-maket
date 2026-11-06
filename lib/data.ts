export type Product = {
  id: number; name: string; category: string; price: number;
  seller: string; location: string; description: string; emoji: string;
};

export const products: Product[] = [
  { id: 1, name: "Wireless Bluetooth Headphones", category: "Electronics", price: 2450, seller: "Metro Gadgets", location: "Nairobi", description: "Everyday wireless audio with a comfortable fit.", emoji: "🎧" },
  { id: 2, name: "Smart Watch", category: "Electronics", price: 3200, seller: "Tech Corner", location: "Nairobi", description: "A practical smart watch for daily use.", emoji: "⌚" },
  { id: 3, name: "Cotton Hoodie", category: "Fashion", price: 1800, seller: "Urban Thread", location: "Kisumu", description: "Comfortable casual wear.", emoji: "🧥" },
  { id: 4, name: "Everyday Sneakers", category: "Fashion", price: 2900, seller: "Step Up Store", location: "Nakuru", description: "Versatile shoes for everyday outfits.", emoji: "👟" },
  { id: 5, name: "Table Lamp", category: "Home & Living", price: 1500, seller: "Home Finds", location: "Nairobi", description: "A simple lamp for your home or desk.", emoji: "💡" },
  { id: 6, name: "Kitchen Storage Set", category: "Home & Living", price: 1250, seller: "Home Finds", location: "Nairobi", description: "Keep kitchen essentials organised.", emoji: "🍽️" },
  { id: 7, name: "Skin Care Gift Set", category: "Beauty", price: 2100, seller: "Glow Shop", location: "Eldoret", description: "A sample beauty listing for the demo.", emoji: "🧴" },
  { id: 8, name: "Organic Honey 500g", category: "Food & Groceries", price: 650, seller: "Green Basket", location: "Kapsabet", description: "Locally listed grocery item.", emoji: "🍯" },
  { id: 9, name: "Notebook Set", category: "Books & Stationery", price: 480, seller: "Campus Supplies", location: "Eldoret", description: "Stationery for school and work.", emoji: "📚" },
  { id: 10, name: "Football", category: "Sports & Outdoors", price: 1600, seller: "Active Life", location: "Nairobi", description: "A sample sports equipment listing.", emoji: "⚽" },
  { id: 11, name: "Power Bank 20000mAh", category: "Electronics", price: 2750, seller: "Metro Gadgets", location: "Nairobi", description: "Portable charging for compatible devices.", emoji: "🔋" },
  { id: 12, name: "Travel Backpack", category: "Fashion", price: 2200, seller: "Urban Thread", location: "Kisumu", description: "A practical bag for everyday travel.", emoji: "🎒" }
];

export const bnbListings = [
  { id: 1, name: "Piara Valley Homes", area: "Kapsabet", price: 4500, guests: 2, detail: "Modern short-stay accommodation. Sample listing." },
  { id: 2, name: "The Garden Residence", area: "Eldoret", price: 6000, guests: 4, detail: "Comfortable stay for families and small groups." },
  { id: 3, name: "City View Suites", area: "Nairobi", price: 7500, guests: 2, detail: "Convenient city accommodation." },
  { id: 4, name: "Lake Breeze Stay", area: "Kisumu", price: 5200, guests: 3, detail: "A sample short-stay listing." }
];

export const carListings = [
  { id: 1, name: "Toyota Axio", area: "Nairobi", price: 3500, mode: "Self-drive", detail: "Daily rental rate shown for demonstration." },
  { id: 2, name: "Toyota Noah", area: "Eldoret", price: 6500, mode: "With driver", detail: "Suitable for family and group travel." },
  { id: 3, name: "Toyota Fielder", area: "Kisumu", price: 4000, mode: "Self-drive", detail: "Sample vehicle listing." },
  { id: 4, name: "Toyota Hiace", area: "Nairobi", price: 9500, mode: "With driver", detail: "Group transport sample listing." }
];

export const categories = ["All", "Electronics", "Fashion", "Home & Living", "Beauty", "Food & Groceries", "Books & Stationery", "Sports & Outdoors"];
export const money = (amount: number) => `KSh ${amount.toLocaleString("en-KE")}`;
