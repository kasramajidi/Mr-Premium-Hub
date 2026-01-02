import type { Metadata } from "next";
import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "سبد خرید | مسترپریمیوم هاب",
  description:
    "سبد خرید شما در مسترپریمیوم هاب - مشاهده و مدیریت محصولات انتخابی خود",
  keywords: ["سبد خرید", "خرید", "فروشگاه", "مسترپریمیوم هاب"],
  openGraph: {
    title: "سبد خرید | مسترپریمیوم هاب",
    description: "مشاهده و مدیریت محصولات انتخابی خود در سبد خرید",
    type: "website",
  },
  alternates: {
    canonical: "/cart",
  },
};

export default function CartLayout() {
  return <CartPageClient />;
}
