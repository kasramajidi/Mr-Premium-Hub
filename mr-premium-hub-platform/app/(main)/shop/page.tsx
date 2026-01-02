import type { Metadata } from "next";
import ShopPageClient from "./components/ShopPageClient";

export const metadata: Metadata = {
  title: "فروشگاه",
  description:
    "فروشگاه مسترپریمیوم هاب - خرید محصولات هوشمند شامل تلفن هوشمند، جارو هوشمند، حلقه هوشمند، دسته های بازی، ساعت های هوشمند و عینک هوشمند از برندهای معتبر",
  keywords: [
    "فروشگاه",
    "محصولات هوشمند",
    "تلفن هوشمند",
    "ساعت هوشمند",
    "عینک هوشمند",
    "دسته بازی",
    "جارو هوشمند",
    "حلقه هوشمند",
    "اپل",
    "سامسونگ",
    "سونی",
    "شیائومی",
    "مسترپریمیوم هاب",
  ],
  openGraph: {
    title: "فروشگاه مسترپریمیوم هاب | محصولات هوشمند",
    description:
      "خرید محصولات هوشمند از برندهای معتبر در فروشگاه مسترپریمیوم هاب",
    type: "website",
  },
  alternates: {
    canonical: "/shop",
  },
};

export default function ShopPage() {
  const shopJsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "فروشگاه مسترپریمیوم هاب",
    description:
      "فروشگاه محصولات هوشمند شامل تلفن هوشمند، جارو هوشمند، حلقه هوشمند، دسته های بازی، ساعت های هوشمند و عینک هوشمند",
    url: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com"
    }/shop`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd) }}
      />
      <ShopPageClient />
    </>
  );
}
