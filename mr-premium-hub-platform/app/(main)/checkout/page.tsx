"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/(main)/context/CartContext";
import { getAuthCookie } from "@/app/(main)/auth/lib/cookie";
import MainContainer from "./ui/MainContainer";
import BreadcrumbBox from "./ui/BreadcrumbBox";
import OrderSummary from "./Components/OrderSummary";
import BillingDetails from "./Components/BillingDetails";
import EmptyCartState from "./Components/EmptyCartState";

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);
    if (!getAuthCookie()) {
      router.replace(`/auth?next=${encodeURIComponent("/checkout")}`, { scroll: false });
      return;
    }
  }, [router]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  if (!mounted) {
    return (
      <div className="bg-gray-50 py-8 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">در حال بارگذاری…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <div className="bg-gray-50 py-8 min-h-screen">
      <MainContainer>
        <BreadcrumbBox pageName="تسویه حساب" />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          <BillingDetails />
          <OrderSummary
            items={items}
            getTotalPrice={getTotalPrice}
            formatPrice={formatPrice}
          />
        </div>
      </MainContainer>
    </div>
  );
}
