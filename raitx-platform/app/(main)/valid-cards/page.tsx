import type { Metadata } from "next";
import ValidCardsPageClient from "./components/ValidCardsPageClient";
import { fetchShopProducts } from "@/app/(main)/shop/lib/shop-api";

export const metadata: Metadata = {
  title: "کارت‌های اعتباری",
  description: "خرید و دریافت انواع کارت‌های اعتباری، گیفت کارت‌ها و مسترکارت",
  keywords: [
    "کارت اعتباری",
    "مسترکارت",
    "ویزا کارت",
    "گیفت کارت",
    "کارت بازی",
    "ريتكس",
  ],
  alternates: {
    canonical: "/valid-cards",
  },
};

export default async function ValidCardsPage() {
  let initialProducts: Awaited<ReturnType<typeof fetchShopProducts>> = [];
  try {
    initialProducts = await fetchShopProducts();
    if (process.env.BUILD_STATIC === "1") {
      console.log("[build:static] valid-cards/page — using", initialProducts.length, "products for static HTML");
    }
  } catch {
    // مثل مقالات: در صورت خطا آرایه خالی؛ کلاینت می‌تواند از API بگیرد
  }
  if (process.env.NODE_ENV === "development" && initialProducts.length === 0) {
    console.warn("[valid-cards/page] No products from API. Check network and https://mrpremiumhub.org/api.ashx?action=shop");
  }
  // در بیلد استاتیک داده را داخل HTML می‌گذاریم تا حتماً در خروج باشد (props گاهی در export سریال نمی‌شوند)
  const safeJson = JSON.stringify(initialProducts)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
  return (
    <main className="min-h-screen bg-gray-50 pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 md:pb-10">
      <script
        id="valid-cards-data"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: safeJson }}
      />
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <ValidCardsPageClient initialProducts={initialProducts} />
      </div>
    </main>
  );
}

