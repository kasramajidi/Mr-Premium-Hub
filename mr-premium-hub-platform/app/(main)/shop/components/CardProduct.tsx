"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Product } from "./productsData";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("fa-IR").format(price);
};

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { name, price, originalPrice, image, discount } = product;

  const discountPercentage =
    discount ||
    (originalPrice
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0);

  const handleProductClick = () => {
    router.push(`/shop/product/${product.id}`);
  };

  return (
    <div
      className="bg-[#f7f7f7] rounded-2xl p-3 md:p-4 transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full flex flex-col"
      onClick={handleProductClick}
    >
      <div className="relative grow mb-3">
        <div className="relative flex items-center justify-center w-full h-40 overflow-hidden bg-white md:h-56 rounded-xl">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full md:w-16 md:h-16">
              <svg
                className="w-6 h-6 text-gray-400 md:w-8 md:h-8"
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
            </div>
          )}
        </div>
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-[#ff4c00] text-white px-2 py-1 rounded-full text-xs font-bold">
            -{discountPercentage}%
          </div>
        )}
      </div>
      <h3 className="mb-3 text-xs font-medium leading-tight text-right text-gray-900 md:text-sm">
        {name}
      </h3>
      <div className="flex items-center justify-center mt-auto gap-3">
        <div className="text-left flex-1">
          {originalPrice && originalPrice > price ? (
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs text-gray-500 line-through">
                {formatPrice(originalPrice)}{" "}
                <span className="text-gray-400">تومان</span>
              </span>
              <span className="text-sm font-bold text-gray-900 md:text-base">
                {formatPrice(price)}{" "}
                <span className="text-gray-400">تومان</span>
              </span>
            </div>
          ) : (
            <span className="text-sm font-bold text-gray-900 md:text-base">
              {formatPrice(price)} <span className="text-gray-400">تومان</span>
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleProductClick();
          }}
          className="bg-[#4837f3] text-white py-2 md:py-2.5 px-3 md:px-4 rounded-l-full rounded-r-2xl font-medium text-xs hover:bg-[#ff4c00] transition-colors duration-200 flex flex-col items-center justify-center leading-tight shrink-0"
        >
          <span>خرید</span>
          <span>محصول</span>
        </button>
      </div>
    </div>
  );
}
