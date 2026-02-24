"use client";

import type { ShopProduct } from "@/app/(main)/shop/lib/shop-api";
import CreditCardsTabs from "./CreditCardsTabs";

interface Props {
  initialProducts?: ShopProduct[];
}

export default function ValidCardsPageClient({ initialProducts = [] }: Props) {
  return (
    <section className="space-y-6 sm:space-y-8 md:space-y-10">
      <CreditCardsTabs initialProducts={initialProducts} />
    </section>
  );
}

