"use client";

import React from "react";
import { useFilters } from "../../context/FilterContext";
import ProductGrid from "./ProductGrid";
import { products } from "./productsData";
import { brands } from "./productsData";

export default function ShopMainContent() {
  const { appliedFilters, setSelectedBrands, applyFilters } = useFilters();
  const mainCategoryId = appliedFilters?.mainCategoryId ?? null;
  const isGiftCards = mainCategoryId === "giftcards";

  return (
    <div className="space-y-6">
      {isGiftCards && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">فیلتر برند:</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedBrands([]);
                applyFilters();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                !appliedFilters?.brands?.length
                  ? "bg-[#ff5538] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              همه
            </button>
            {brands.map((brand) => {
              const isActive = appliedFilters?.brands?.includes(brand);
              return (
                <button
                  key={brand}
                  type="button"
                  onClick={() => {
                    setSelectedBrands(isActive ? [] : [brand]);
                    applyFilters();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#ff5538] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {brand}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <ProductGrid products={products} appliedFilters={appliedFilters} />
    </div>
  );
}
