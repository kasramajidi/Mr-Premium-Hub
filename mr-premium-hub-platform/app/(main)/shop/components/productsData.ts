export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  discount?: number;
  category: string;
  brand: string;
  createdAt: string | Date;
  sales: number;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "گوشی هوشمند آیفون 15 Pro Max",
    price: 8400000,
    originalPrice: 9000000,
    image: "/Images/Shop/product-pic1.jpg",
    rating: 5,
    reviews: 128,
    isNew: true,
    discount: 10,
    category: "گوشی هوشمند",
    brand: "اپل",
    createdAt: "2024-01-15",
    sales: 45,
    description:
      "گوشی هوشمند آیفون 15 Pro Max با جدیدترین تکنولوژی‌ها و دوربین حرفه‌ای",
  },
  {
    id: 2,
    name: "لپ‌تاپ اپل مک‌بوک پرو 14 اینچی",
    price: 12000000,
    image: "/Images/Shop/product-pic2.jpg",
    rating: 5,
    reviews: 89,
    isNew: false,
    category: "لپ‌تاپ",
    brand: "اپل",
    createdAt: "2024-01-10",
    sales: 32,
    description:
      "لپ‌تاپ حرفه‌ای اپل با پردازنده M3 Pro و نمایشگر Liquid Retina XDR",
  },
  {
    id: 3,
    name: "ساعت هوشمند اپل واچ سری 9",
    price: 2800000,
    originalPrice: 3200000,
    image: "/Images/Shop/product-pic3.jpg",
    rating: 4,
    reviews: 156,
    isNew: false,
    discount: 12,
    category: "ساعت هوشمند",
    brand: "اپل",
    createdAt: "2024-01-08",
    sales: 67,
    description:
      "ساعت هوشمند اپل واچ سری 9 با قابلیت‌های سلامتی و ورزشی پیشرفته",
  },
  {
    id: 4,
    name: "هدفون بی‌ساز Sony WH-1000XM5",
    price: 18000000,
    image: "/Images/Shop/product-pic4.jpg",
    rating: 5,
    reviews: 203,
    isNew: false,
    category: "هدفون",
    brand: "سونی",
    createdAt: "2024-01-05",
    sales: 89,
    description:
      "هدفون بی‌ساز حرفه‌ای سونی با نویز کنسلینگ پیشرفته و کیفیت صدای فوق‌العاده",
  },
  {
    id: 5,
    name: "تبلت سامسونگ گلکسی تب S9",
    price: 45000000,
    originalPrice: 52000000,
    image: "/Images/Shop/product-pic5.jpg",
    rating: 4,
    reviews: 78,
    isNew: true,
    discount: 13,
    category: "تبلت",
    brand: "سامسونگ",
    createdAt: "2024-01-12",
    sales: 23,
    description: "تبلت سامسونگ گلکسی تب S9 با نمایشگر AMOLED و قلم S Pen",
  },
  {
    id: 6,
    name: "دوربین کانن EOS R6 Mark II",
    price: 85000000,
    image: "/Images/Shop/product-pic6.jpg",
    rating: 5,
    reviews: 45,
    isNew: false,
    category: "دوربین",
    brand: "کانن",
    createdAt: "2024-01-03",
    sales: 12,
    description:
      "دوربین حرفه‌ای کانن EOS R6 Mark II با سنسور Full-Frame و فیلم‌برداری 4K",
  },
  {
    id: 7,
    name: "اسپیکر بلوتوث JBL Charge 5",
    price: 8500000,
    image: "/Images/Shop/product-pic10.png",
    rating: 4,
    reviews: 167,
    isNew: false,
    category: "اسپیکر",
    brand: "JBL",
    createdAt: "2024-01-01",
    sales: 134,
    description:
      "اسپیکر بلوتوث قابل حمل JBL Charge 5 با صدای قدرتمند و مقاوم در برابر آب",
  },
  {
    id: 8,
    name: "کیف لپ‌تاپ Lenovo ThinkPad",
    price: 3200000,
    image: "/Images/Shop/product-pic11.png",
    rating: 4,
    reviews: 92,
    isNew: false,
    category: "لوازم جانبی",
    brand: "لنوو",
    createdAt: "2023-12-28",
    sales: 56,
    description:
      "کیف لپ‌تاپ لنوو ThinkPad با طراحی حرفه‌ای و محافظت عالی از لپ‌تاپ",
  },
  {
    id: 9,
    name: "گوشی هوشمند سامسونگ گلکسی S24 Ultra",
    price: 75000000,
    originalPrice: 82000000,
    image: "/Images/Shop/product-pic12.png",
    rating: 5,
    reviews: 234,
    isNew: true,
    discount: 8,
    category: "گوشی هوشمند",
    brand: "سامسونگ",
    createdAt: "2024-01-20",
    sales: 78,
    description:
      "گوشی هوشمند سامسونگ گلکسی S24 Ultra با دوربین 200 مگاپیکسلی و قلم S Pen",
  },
  {
    id: 10,
    name: "لپ‌تاپ ایسوس ROG Strix G16",
    price: 95000000,
    image: "/Images/Shop/product-pic1.jpg",
    rating: 4,
    reviews: 67,
    isNew: false,
    category: "لپ‌تاپ",
    brand: "ایسوس",
    createdAt: "2024-01-18",
    sales: 28,
    description:
      "لپ‌تاپ گیمینگ ایسوس ROG Strix G16 با کارت گرافیک RTX 4060 و پردازنده Intel Core i7",
  },
  {
    id: 11,
    name: "هدفون اپل ایرپادز پرو 2",
    price: 12000000,
    originalPrice: 15000000,
    image: "/Images/Shop/product-pic6.jpg",
    rating: 5,
    reviews: 189,
    isNew: false,
    discount: 20,
    category: "هدفون",
    brand: "اپل",
    createdAt: new Date("2024-01-14"),
    sales: 156,
    description:
      "هدفون بی‌ساز اپل ایرپادز پرو 2 با نویز کنسلینگ فعال و کیفیت صدای Spatial Audio",
  },
  {
    id: 12,
    name: "ساعت هوشمند سامسونگ گلکسی واچ 6",
    price: 22000000,
    image: "/Images/Shop/product-pic12.png",
    rating: 4,
    reviews: 98,
    isNew: true,
    category: "ساعت هوشمند",
    brand: "سامسونگ",
    createdAt: new Date("2024-01-22"),
    sales: 34,
    description:
      "ساعت هوشمند سامسونگ گلکسی واچ 6 با نمایشگر AMOLED و قابلیت‌های سلامتی پیشرفته",
  },
];

export const categories: string[] = [
  "گوشی هوشمند",
  "لپ‌تاپ",
  "تبلت",
  "ساعت هوشمند",
  "هدفون",
  "اسپیکر",
  "دوربین",
  "لوازم جانبی",
];

export const brands: string[] = [
  "اپل",
  "سامسونگ",
  "شیائومی",
  "هوآوی",
  "لنوو",
  "ایسوس",
  "اچ‌پی",
  "دل",
  "سونی",
  "کانن",
  "JBL",
];

