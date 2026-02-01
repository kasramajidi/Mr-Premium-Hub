"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { Product } from "../productsData";
import FlightTicketContent from "../FlightTicketContent";

const PLACEHOLDER_TEXTS = [
  "این محصول توسط مستر پریمیوم هاب (Mr Premium Hub) ارائه می‌شود. برای جزئیات بیشتر و خرید با پشتیبانی تماس بگیرید: ۰۲۱-۹۱۳۲۰۷۰۰ یا support@tehranpayment.com",
];

interface ProductIntroductionProps {
  product?: Product | null;
}

function ProductIntroduction({ product }: ProductIntroductionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  if (product?.useFlightTicketIntro) {
    return (
      <article className="text-right" aria-label="معرفی محصول">
        <FlightTicketContent />
      </article>
    );
  }

  const content = (product?.description ?? "").trim();
  const paragraphs = Array.isArray(product?.introductionParagraphs) ? product.introductionParagraphs : [];
  const images = Array.isArray(product?.introductionImages) ? product.introductionImages.filter((src): src is string => Boolean(src?.trim())) : [];
  const faq = Array.isArray(product?.faq) ? product.faq.filter((item): item is { question: string; answer: string } => Boolean(item && (item.question != null || item.answer != null))) : [];

  const hasText = content !== "" || paragraphs.length > 0;
  const hasAnyContent = images.length > 0 || hasText || faq.length > 0;

  return (
    <article
      className="text-right text-gray-700 space-y-6 sm:space-y-8"
      aria-label="معرفی محصول"
    >
      {/* بلوک عکس‌ها */}
      {images.length > 0 && (
        <section className="space-y-3" aria-label="تصاویر معرفی">
          <h3 className="text-base font-bold text-gray-900">تصاویر</h3>
          <div
            className={`grid gap-2 ${
              images.length === 1
                ? "grid-cols-1 max-w-xs"
                : images.length === 2
                  ? "grid-cols-2 max-w-sm"
                  : "grid-cols-2 sm:grid-cols-3 max-w-md"
            }`}
          >
            {images.map((src, index) => (
              <div
                key={index}
                className="relative h-28 sm:h-32 w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
              >
                <Image
                  src={src}
                  alt={`معرفی محصول - تصویر ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 140px, 160px"
                  unoptimized={src.startsWith("data:") || src.includes("?")}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* متن اصلی و پاراگراف‌ها — فقط وقتی محتوا یا پاراگراف اضافه باشد */}
      {hasText && (
        <section className="space-y-4">
          {content !== "" && (
            <p className="text-sm sm:text-base leading-relaxed">{content}</p>
          )}
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-sm sm:text-base leading-relaxed">
              {paragraph ?? ""}
            </p>
          ))}
        </section>
      )}

      {/* سوالات و جواب‌ها */}
      {faq.length > 0 && (
        <section className="border-t border-gray-200 pt-6" aria-label="سوالات متداول">
          <h3 className="text-base font-bold text-gray-900 mb-4">سوالات متداول</h3>
          <ul className="space-y-2">
            {faq.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <li
                  key={index}
                  className="rounded-xl border border-gray-200 overflow-hidden bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 text-right hover:bg-gray-50 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-medium text-gray-900 flex-1">
                      {item?.question ?? ""}
                    </span>
                    <span
                      className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#ff5538]/10 text-[#ff5538] transition-transform ${isOpen ? "rotate-180" : ""}`}
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
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-3 pt-0">
                      <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                        {item?.answer ?? ""}
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* وقتی هیچ محتوایی تعریف نشده */}
      {!hasAnyContent && (
        <p className="text-sm text-gray-500 italic">
          {PLACEHOLDER_TEXTS[0]}
        </p>
      )}
    </article>
  );
}

export default React.memo(ProductIntroduction);
