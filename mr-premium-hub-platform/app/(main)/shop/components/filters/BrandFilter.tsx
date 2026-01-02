"use client";

import { useFilters } from "../../../context/FilterContext";

const brands = ["اپل", "سامسونگ", "سونی", "شیائومی"];

export default function BrandFilter() {
  const { selectedBrands, updateBrand } = useFilters();

  return (
    <section className="space-y-3" aria-label="فیلتر برند">
      <div className="flex items-center gap-2">
        <div
          className="w-1 h-5 bg-gradient-to-b from-[#ff5538] to-[#ff5538] rounded-full"
          aria-hidden="true"
        ></div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">برندها</h3>
      </div>

      <div
        className="grid grid-cols-2 gap-2"
        role="group"
        aria-label="انتخاب برند"
      >
        {brands.map((brand) => (
          <button
            key={brand}
            type="button"
            onClick={() => updateBrand(brand)}
            aria-pressed={selectedBrands.includes(brand)}
            aria-label={`${
              selectedBrands.includes(brand) ? "حذف" : "انتخاب"
            } برند ${brand}`}
            className={`px-3 py-2 rounded-lg border-2 transition-all duration-200 text-xs sm:text-sm font-medium shadow-sm ${
              selectedBrands.includes(brand)
                ? "bg-gradient-to-r from-[#ff5538] to-[#ff5538] cursor-pointer text-white border-[#ff5538] hover:opacity-90 shadow-md transform hover:scale-105"
                : "bg-white cursor-pointer text-gray-700 border-gray-300 hover:border-[#ff5538] hover:text-[#ff5538] hover:bg-gray-50 hover:shadow-md"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>
    </section>
  );
}
