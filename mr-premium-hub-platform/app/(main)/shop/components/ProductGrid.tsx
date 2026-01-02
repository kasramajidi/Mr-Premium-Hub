"use client";

import React, { useState, useMemo } from "react";
import ProductHeader from "./ProductHeader";
import ProductCard from "./CardProduct";
import type { Product } from "./productsData";

interface ProductGridProps {
  products: Product[];
  appliedFilters?: {
    categories: string[];
    brands: string[];
    search: string;
    price: [number, number];
  };
}

export default function ProductGrid({ products, appliedFilters }: ProductGridProps) {
  const [sortBy, setSortBy] = useState("price-low");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const handleSortChange = (sortValue: string) => {
    setSortBy(sortValue);
    setCurrentPage(1);
    console.log("مرتب‌سازی تغییر کرد به:", sortValue);
  };

  const filteredProducts = useMemo(() => {
    if (!appliedFilters) return products;

    const hasActiveFilters = 
      appliedFilters.categories.length > 0 ||
      appliedFilters.brands.length > 0 ||
      appliedFilters.search.length > 0 ||
      appliedFilters.price[0] > 0 ||
      appliedFilters.price[1] < 10000000;

    if (!hasActiveFilters) return products;

    return products.filter((product) => {
      if (appliedFilters.categories.length > 0 && !appliedFilters.categories.includes(product.category)) {
        return false;
      }
      if (appliedFilters.brands.length > 0 && !appliedFilters.brands.includes(product.brand)) {
        return false;
      }
      if (appliedFilters.search && !product.name.toLowerCase().includes(appliedFilters.search.toLowerCase())) {
        return false;
      }
      if (product.price < appliedFilters.price[0] || product.price > appliedFilters.price[1]) {
        return false;
      }
      return true;
    });
  }, [products, appliedFilters]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest": {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        }
        case "oldest": {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateA - dateB;
        }
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <ProductHeader onSortChange={handleSortChange} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {sortedProducts.length === 0 && (
        <div className="py-12 text-center bg-white rounded-lg">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            محصولی یافت نشد
          </h3>
          <p className="text-gray-600">
            لطفاً فیلترهای خود را تغییر دهید یا دوباره جستجو کنید.
          </p>
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            aria-label="صفحه قبلی"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg border transition-colors shadow-sm ${
                currentPage === page
                  ? "bg-[#ff5538] text-white border-[#ff5538]"
                  : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
              }`}
              aria-label={`صفحه ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            aria-label="صفحه بعدی"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
