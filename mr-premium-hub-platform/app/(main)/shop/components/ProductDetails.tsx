"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import ProductFeatures from "./ProductFeatures";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";
import { products } from "./productsData";

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id ? parseInt(params.id as string, 10) : null;
  const [showToast, setShowToast] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedWarranty, setSelectedWarranty] = useState("");
  const [quantity, setQuantity] = useState(1);

  const product = id ? products.find((p) => p.id === id) : null;
  const productImages = product
    ? [product.image, product.image, product.image]
    : [];
  const finalPrice = product ? product.price * quantity : 0;

  const handleAddToCart = () => {
    if (selectedColor && selectedWarranty && product) {
      setShowToast(true);
      setIsBouncing(true);
      setTimeout(() => {
        setIsBouncing(false);
      }, 2000);
      setTimeout(() => {
        const toastElement = document.querySelector(
          '[data-toast="cart-notification"]'
        );
        if (toastElement) {
          toastElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }
      }, 100);
      console.log("Product added to cart:", {
        product: product.name,
        color: selectedColor,
        warranty: selectedWarranty,
        quantity: quantity,
        price: finalPrice,
      });
    }
  };

  const handleViewCart = () => {
    router.push("/shop/cart");
    setShowToast(false);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fefefe] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            محصول یافت نشد
          </h2>
          <button
            onClick={() => router.push("/shop")}
            className="bg-[#3b82f6] text-white px-6 py-3 rounded-lg hover:bg-[#2563eb] transition-colors"
          >
            بازگشت به فروشگاه
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fefefe] py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {showToast && (
          <div
            data-toast="cart-notification"
            className={`w-full bg-[#fafbf5] rounded-lg mb-4 sm:mb-6 ${
              isBouncing ? "animate-bounce" : ""
            }`}
          >
            <div className="px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#95ac3c] rounded-full flex items-center justify-center shrink-0">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-[#30351d] font-medium text-right text-sm sm:text-base lg:text-lg leading-relaxed">
                    {product.name} به سبد خرید شما اضافه شد
                  </span>
                </div>
                <button
                  onClick={handleViewCart}
                  className="bg-[#95ac3c] border border-[#95ac3c] cursor-pointer text-white px-3 py-2 sm:px-4 sm:py-2 lg:px-4 lg:py-2 rounded-lg hover:text-[#95ac3c] hover:bg-white hover:border hover:border-[#95ac3c] transition-all duration-300 font-medium text-xs sm:text-sm lg:text-sm whitespace-nowrap shrink-0"
                >
                  مشاهده سبد خرید
                </button>
              </div>
            </div>
          </div>
        )}

        <nav className="mb-4" aria-label="مسیر صفحه">
          <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            >
              خانه
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/shop"
              className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            >
              {product.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </nav>

        <div className="w-full h-auto min-h-[400px] lg:h-[515px] bg-[#f7f7f7] rounded-2xl p-4 sm:p-6 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 h-full">
            <div className="order-1 lg:order-2">
              <ProductImageGallery product={product} images={productImages} />
            </div>
            <div className="order-2 lg:order-1">
              <ProductInfo
                product={product}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedWarranty={selectedWarranty}
                setSelectedWarranty={setSelectedWarranty}
                quantity={quantity}
                setQuantity={setQuantity}
                finalPrice={finalPrice}
                handleAddToCart={handleAddToCart}
              />
            </div>
            <div className="order-3 lg:order-3">
              <ProductFeatures product={product} />
            </div>
          </div>
        </div>
        <ProductTabs />
        <div className="mt-16">
          <RelatedProducts
            currentProductId={product.id}
            category={product.category}
          />
        </div>
      </div>
    </div>
  );
}
