"use client";

import { useState, useEffect } from "react";
import { useFilters } from "../../../context/FilterContext";

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("fa-IR").format(price);
};

const parsePrice = (priceString: string): number => {
  const cleaned = priceString.replace(/[^\d]/g, "");
  const parsed = parseInt(cleaned, 10);
  return isNaN(parsed) ? 0 : parsed;
};

export default function PriceRangeFilter() {
  const { priceRange, setPriceRange } = useFilters();
  
  const updatePrice = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...priceRange];
    newRange[index] = value;
    setPriceRange(newRange);
  };
  const [minValue, setMinValue] = useState(formatPrice(priceRange[0]));
  const [maxValue, setMaxValue] = useState(formatPrice(priceRange[1]));

  useEffect(() => {
    if (document.activeElement?.id !== "price-min") {
      setMinValue(formatPrice(priceRange[0]));
    }
  }, [priceRange[0]]);

  useEffect(() => {
    if (document.activeElement?.id !== "price-max") {
      setMaxValue(formatPrice(priceRange[1]));
    }
  }, [priceRange[1]]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const rawValue = inputValue.replace(/[^\d]/g, "");
    
    if (rawValue === "") {
      setMinValue("");
      updatePrice(0, 0);
      return;
    }

    setMinValue(rawValue);
    const value = parseInt(rawValue, 10);
    if (!isNaN(value) && value >= 0) {
      updatePrice(0, value);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const rawValue = inputValue.replace(/[^\d]/g, "");
    
    if (rawValue === "") {
      setMaxValue("");
      updatePrice(1, 10000000);
      return;
    }

    setMaxValue(rawValue);
    const value = parseInt(rawValue, 10);
    if (!isNaN(value) && value >= 0) {
      updatePrice(1, value);
    }
  };

  const handleMinBlur = () => {
    const value = parsePrice(minValue);
    if (isNaN(value) || value < 0) {
      setMinValue(formatPrice(0));
      updatePrice(0, 0);
    } else if (value > priceRange[1]) {
      setMinValue(formatPrice(priceRange[1]));
      updatePrice(0, priceRange[1]);
    } else {
      setMinValue(formatPrice(value));
    }
  };

  const handleMaxBlur = () => {
    const value = parsePrice(maxValue);
    if (isNaN(value) || value < priceRange[0]) {
      setMaxValue(formatPrice(priceRange[0]));
      updatePrice(1, priceRange[0]);
    } else {
      setMaxValue(formatPrice(value));
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-gradient-to-b from-[#ff5538] to-[#ff5538] rounded-full"></div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">محدوده قیمت</h3>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <div className="flex-1">
          <label
            htmlFor="price-min"
            className="block mb-1 text-sm text-gray-600"
          >
            از
          </label>
          <input
            id="price-min"
            type="text"
            inputMode="numeric"
            value={minValue}
            onChange={handleMinChange}
            onBlur={handleMinBlur}
            aria-label="حداقل قیمت"
            className="w-full px-3 py-2 text-xs sm:text-sm text-center border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#ff5538] focus:border-[#ff5538] transition-all bg-white placeholder-gray-400"
            placeholder="340,000"
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="price-max"
            className="block mb-1 text-sm text-gray-600"
          >
            تا
          </label>
          <input
            id="price-max"
            type="text"
            inputMode="numeric"
            value={maxValue}
            onChange={handleMaxChange}
            onBlur={handleMaxBlur}
            aria-label="حداکثر قیمت"
            className="w-full px-3 py-2 text-xs sm:text-sm text-center border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#ff5538] focus:border-[#ff5538] transition-all bg-white placeholder-gray-400"
            placeholder="19,000,000"
          />
        </div>
      </div>
    </div>
  );
}
