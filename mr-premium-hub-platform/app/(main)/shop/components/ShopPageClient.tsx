"use client";

import { FilterProvider } from "../../context/FilterContext";
import ShopSection from "./ShopSection";

export default function ShopPageClient() {
  return (
    <FilterProvider>
      <main className="min-h-screen bg-gray-50">
        <ShopSection />
      </main>
    </FilterProvider>
  );
}

