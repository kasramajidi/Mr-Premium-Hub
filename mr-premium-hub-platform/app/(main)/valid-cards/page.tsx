import type { Metadata } from "next";
import CreditCardsTabs from "./components/CreditCardsTabs";

export const metadata: Metadata = {
  title: "کارت‌های اعتباری",
  description: "خرید و دریافت انواع کارت‌های اعتباری، گیفت کارت‌ها و مسترکارت",
  keywords: [
    "کارت اعتباری",
    "مسترکارت",
    "ویزا کارت",
    "گیفت کارت",
    "کارت بازی",
    "مسترپریمیوم هاب",
  ],
  alternates: {
    canonical: "/valid-cards",
  },
};

export default function ValidCardsPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 md:pb-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <CreditCardsTabs />
      </div>
    </main>
  );
}

