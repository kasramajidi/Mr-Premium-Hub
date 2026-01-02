"use client";

import { useFilters } from "../../../context/FilterContext";

const brands = ["اپل", "سامسونگ", "سونی", "شیائومی"];

export default function BrandFilter() {
  const { selectedBrands, updateBrand } = useFilters();

  return (
    <section className="space-y-3" aria-label="فیلتر برند">
      <div className="flex items-center gap-3">
        <div
          className="w-1 h-6 bg-blue-400 rounded-full"
          aria-hidden="true"
        ></div>
        <h3 className="text-lg font-bold text-gray-700">برندها</h3>
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
            className={`px-2 py-1 rounded-full border transition-all duration-200 text-xs font-medium ${
              selectedBrands.includes(brand)
                ? "bg-blue-600 cursor-pointer text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700"
                : "bg-white cursor-pointer text-gray-600 border-blue-200 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>
    </section>
  );
}
