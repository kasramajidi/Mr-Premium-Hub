"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import ProductCard from "./CardProduct";
import { products } from "./productsData";
import type { Product } from "./productsData";

interface RelatedProductsProps {
  currentProductId: number;
  category: string;
}

const RelatedProducts = React.memo<RelatedProductsProps>(
  ({ currentProductId, category }) => {
    const relatedProducts = useMemo(() => {
      return products
        .filter(
          (product: Product) =>
            product.id !== currentProductId && product.category === category
        )
        .slice(0, 4);
    }, [currentProductId, category]);

    if (relatedProducts.length === 0) {
      return (
        <section className="py-8 bg-[#f6f5ff] rounded-2xl mt-8">
          <div className="px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">محصولات مرتبط</h2>
              <Link
                href="/shop"
                className="px-4 py-2 bg-gray-100 border border-[#a78bfa] text-gray-900 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer inline-block"
              >
                مشاهده همه
              </Link>
            </div>
            <div className="text-center py-8 text-gray-500">
              <p>محصول مرتبطی یافت نشد</p>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="py-8 bg-[#f7f7f7] rounded-2xl mt-8">
        <div className="px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">محصولات مرتبط</h2>
            <Link
              href="/shop"
              className="px-4 py-2 bg-gray-100 border border-[#a78bfa] text-gray-900 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer inline-block"
            >
              مشاهده همه
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    );
  }
);

RelatedProducts.displayName = "RelatedProducts";

export default RelatedProducts;
