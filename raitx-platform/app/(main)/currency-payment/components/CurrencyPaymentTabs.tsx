"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HiSparkles,
  HiChevronRight,
  HiChevronLeft,
} from "react-icons/hi";
import React from "react";
import { services, serviceCategories } from "./servicesData";
import type { Service } from "./servicesData";

interface CardItem {
  id: string;
  label: string;
  labelEn?: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

/** بخش کارت: آیکون، عنوان، زیرعنوان، توضیح — عین کارت‌های اعتباری */
function ServiceCardContent({
  icon,
  label,
  labelEn,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  labelEn?: string;
  description: string;
}) {
  return (
    <>
      <div className="mb-4 sm:mb-5 flex items-center justify-center">
        <div className="p-3 sm:p-4 rounded-xl bg-gray-50 group-hover:bg-[#ff5538]/5 transition-all duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>
      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-[#ff5538] transition-colors">
        {label}
      </h3>
      {labelEn && (
        <p className="text-[10px] sm:text-xs text-gray-400 mb-2 font-medium">
          {labelEn}
        </p>
      )}
      <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 mb-4 flex-1">
        {description}
      </p>
    </>
  );
}

function serviceToCard(s: Service): CardItem {
  return {
    id: s.id,
    label: s.label,
    labelEn: s.labelEn,
    description: s.description,
    icon: s.icon,
    href: s.href,
  };
}

export default function CurrencyPaymentTabs() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  const allCards: CardItem[] =
    selectedCategory === "all"
      ? services.map(serviceToCard)
      : filteredServices.map(serviceToCard);

  const totalPages = Math.ceil(allCards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageCards = allCards.slice(startIndex, endIndex);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      {/* هدر — مثل کارت‌های اعتباری */}
      <div className="mb-8 sm:mb-10 md:mb-12 text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#ff5538]/10 flex items-center justify-center">
            <HiSparkles className="text-[#ff5538] text-xl sm:text-2xl md:text-3xl" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
              <span style={{ color: "#ff5538" }}>پرداخت</span>{" "}
              <span className="text-[#1a3760]">ارزی</span>
            </h1>
          </div>
        </div>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-6 sm:leading-7 max-w-2xl mx-auto">
          نقد درآمد پی پال و پرداخت با پی پال - پرداخت آزمونها، VPS، اکانت
          پریمیوم، دامنه و هاست، سیم کارت و شماره مجازی.
        </p>
      </div>

      {/* تب‌های فیلتر — مثل کارت‌های اعتباری */}
      <div className="w-full">
        <div className="mb-8 sm:mb-10 md:mb-12 flex flex-wrap gap-2 sm:gap-2.5 justify-center items-center">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.value)}
              className={`
                  px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium
                  transition-all duration-200 cursor-pointer
                  ${
                    selectedCategory === category.value
                      ? "bg-[#ff5538] text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-[#ff5538]/30"
                  }
                `}
            >
              {category.label}
            </button>
          ))}
        </div>

        {selectedCategory === "all" ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {currentPageCards.map((card) => (
                <Link
                  key={card.id}
                  href={card.href}
                  className="group bg-white rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer text-center border border-gray-100 hover:border-[#ff5538]/30 hover:-translate-y-1 flex flex-col"
                >
                  <ServiceCardContent
                    icon={card.icon}
                    label={card.label}
                    labelEn={card.labelEn}
                    description={card.description}
                  />
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-[#ff5538]/30"
                  }`}
                >
                  <HiChevronRight className="text-lg" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-[#ff5538] text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-[#ff5538]/30"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-[#ff5538]/30"
                  }`}
                >
                  <HiChevronLeft className="text-lg" />
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {filteredServices.map((s) => {
                const card = serviceToCard(s);
                return (
                  <Link
                    key={card.id}
                    href={card.href}
                    className="group bg-white rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer text-center border border-gray-100 hover:border-[#ff5538]/30 hover:-translate-y-1 flex flex-col"
                  >
                    <ServiceCardContent
                      icon={card.icon}
                      label={card.label}
                      labelEn={card.labelEn}
                      description={card.description}
                    />
                  </Link>
                );
              })}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <p className="text-sm sm:text-base text-gray-500">
                  خدماتی در این دسته‌بندی یافت نشد.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
