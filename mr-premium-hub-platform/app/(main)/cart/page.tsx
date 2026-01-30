"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart, type CartItem } from "../context/CartContext";
import MainContainer from "./Components/ui/MainContainer";
import BreadcrumbBox from "./Components/ui/BreadcrumbBox";
import {
  COLORS,
  WARRANTIES,
  type Color,
  type Warranty,
} from "./Components/constants/productConstants";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCart();
  const router = useRouter();

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  const getColorName = (colorValue: string): string => {
    const color: Color | undefined = COLORS.find((c) => c.value === colorValue);
    return color ? color.name : colorValue;
  };

  const getWarrantyText = (warrantyId: string): string => {
    const warranty: Warranty | undefined = WARRANTIES.find(
      (w) => w.id === warrantyId
    );
    return warranty ? warranty.text : warrantyId;
  };

  const getOptionLabel = (item: CartItem): string => {
    const p = item.product as CartItem["product"] & { productType?: string; denominations?: { id: string; label: string }[] };
    if (p.productType === "service") return "سرویس";
    if (p.productType === "gift_card" && p.denominations?.length && item.selectedWarranty) {
      const d = p.denominations.find((x) => x.id === item.selectedWarranty);
      return d ? `مبلغ: ${d.label}` : getWarrantyText(item.selectedWarranty);
    }
    if (item.selectedWarranty) return `گارانتی: ${getWarrantyText(item.selectedWarranty)}`;
    return "";
  };

  const showColor = (item: CartItem): boolean => {
    const t = (item.product as CartItem["product"] & { productType?: string }).productType;
    return t !== "gift_card" && t !== "service";
  };

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 py-8 min-h-screen">
        <MainContainer>
          <BreadcrumbBox pageName="سبد خرید" />
          <div className="mt-8 text-center">
            <div className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-200 shadow-sm">
              <h2 className="text-gray-800 text-sm sm:text-base font-medium">
                سبد خرید شما در حال حاضر خالی است
              </h2>
            </div>
            <button
              onClick={() => router.push("/shop")}
              className="bg-[#ff5538] mt-4 text-white px-6 sm:px-8 py-2 rounded-xl cursor-pointer hover:opacity-90 transition-opacity text-sm sm:text-base font-medium"
            >
              بازگشت به فروشگاه
            </button>
          </div>
        </MainContainer>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 min-h-screen">
      <MainContainer>
        <BreadcrumbBox pageName="سبد خرید" />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div>
              <div>
                <div className="overflow-x-auto bg-white p-3 sm:p-4 rounded-2xl shadow-sm">
                  <div className="hidden sm:block">
                    <table className="w-full" aria-label="جدول سبد خرید">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">
                            محصول
                          </th>
                          <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">
                            قیمت
                          </th>
                          <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">
                            تعداد
                          </th>
                          <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">
                            جمع جزء
                          </th>
                          <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">
                            عملیات
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item: CartItem, index: number) => (
                          <tr key={index} className="border-b border-gray-50">
                            <td className="py-3 sm:py-4 px-2 sm:px-4">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                                  <svg
                                    className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M7 4V2a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                                    />
                                  </svg>
                                </div>
                                <div className="text-right">
                                  <h3 className="font-medium text-gray-800 text-xs sm:text-sm">
                                    {item.product.name}
                                  </h3>
                                  <p className="text-gray-500 text-xs mt-1">
                                    گارانتی:{" "}
                                    {getWarrantyText(item.selectedWarranty)}،
                                    رنگ: {getColorName(item.selectedColor)}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
                              <span className="font-medium text-gray-600 text-xs sm:text-sm">
                                {formatPrice(item.finalPrice)}
                              </span>
                            </td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(
                                    index,
                                    parseInt(e.target.value, 10) || 1
                                  )
                                }
                                className="w-14 sm:w-16 h-8 sm:h-10 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-900 font-medium focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-xs sm:text-sm"
                                aria-label={`تعداد ${item.product.name}`}
                              />
                            </td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
                              <span className="font-bold text-gray-600 text-xs sm:text-sm">
                                {formatPrice(item.finalPrice * item.quantity)}
                              </span>
                            </td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
                              <button
                                onClick={() => removeFromCart(index)}
                                className="w-7 h-7 sm:w-8 sm:h-8 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center"
                                aria-label={`حذف ${item.product.name} از سبد خرید`}
                              >
                                <svg
                                  className="w-3 h-3 sm:w-4 sm:h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="sm:hidden space-y-4">
                    {items.map((item: CartItem, index: number) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-4 border border-gray-100"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                            <svg
                              className="w-6 h-6 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 4V2a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-blue-800 text-sm">
                              {item.product.name}
                            </h3>
                            <p className="text-gray-500 text-xs mt-1">
                              {getOptionLabel(item)}
                              {showColor(item) && `، رنگ: ${getColorName(item.selectedColor)}`}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center">
                            <span className="text-gray-600 block text-xs mb-1">
                              قیمت:
                            </span>
                            <span className="font-medium text-gray-900">
                              {formatPrice(item.finalPrice)}
                            </span>
                          </div>
                          <div className="text-center">
                            <span className="text-gray-600 block text-xs mb-1">
                              تعداد:
                            </span>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  index,
                                  parseInt(e.target.value, 10) || 1
                                )
                              }
                              className="w-16 h-8 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent text-xs"
                              aria-label={`تعداد ${item.product.name}`}
                            />
                          </div>
                          <div className="text-center">
                            <span className="text-gray-600 block text-xs mb-1">
                              جمع جزء:
                            </span>
                            <span className="font-bold text-gray-900">
                              {formatPrice(item.finalPrice * item.quantity)}
                            </span>
                          </div>
                          <div className="text-center">
                            <span className="text-gray-600 block text-xs mb-1">
                              عملیات:
                            </span>
                            <button
                              onClick={() => removeFromCart(index)}
                              className="w-8 h-8 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center mx-auto"
                              aria-label={`حذف ${item.product.name} از سبد خرید`}
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 bg-white p-3 sm:p-4 rounded-2xl shadow-sm">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <label htmlFor="discount-code" className="sr-only">
                        کد تخفیف
                      </label>
                      <input
                        id="discount-code"
                        type="text"
                        placeholder="کد تخفیف"
                        className="w-full h-10 sm:h-12 bg-gray-50 border border-gray-200 rounded-lg px-3 sm:px-4 text-right text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-xs sm:text-sm"
                        aria-label="کد تخفیف"
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-[#ff5538] hover:opacity-90 text-white px-4 sm:px-6 py-2 rounded-lg transition-opacity cursor-pointer whitespace-nowrap text-xs sm:text-sm font-medium"
                    >
                      اعمال کد تخفیف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <aside
              className="bg-white rounded-2xl p-4 sm:p-6 sticky top-8 shadow-sm"
              aria-label="خلاصه سبد خرید"
            >
              <h3 className="text-base sm:text-lg font-bold text-gray-800 text-right mb-4 sm:mb-6">
                جمع کل سبد خرید
              </h3>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-xs sm:text-sm">
                    جمع جزء:
                  </span>
                  <span className="font-medium text-gray-800 text-xs sm:text-sm">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-xs sm:text-sm">
                    تخفیف:
                  </span>
                  <span className="font-medium text-gray-600 text-xs sm:text-sm">
                    0 تومان
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-bold text-gray-800">
                      مجموع:
                    </span>
                    <span className="font-bold text-[#ff5538] text-base sm:text-lg">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-[#ff5538] text-white py-2 rounded-xl cursor-pointer hover:opacity-90 transition-opacity mb-3 sm:mb-4 font-medium"
              >
                ادامه جهت تسویه حساب
              </button>

              <button
                onClick={clearCart}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors font-medium text-xs sm:text-sm"
              >
                پاک کردن سبد خرید
              </button>
            </aside>
          </div>
        </div>
      </MainContainer>
    </div>
  );
}
