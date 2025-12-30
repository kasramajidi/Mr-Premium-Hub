"use client";

import { useState } from "react";
import { SiMastercard, SiPaypal } from "react-icons/si";

interface PaymentCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  backText?: string;
}

const paymentMethods: PaymentCard[] = [
  {
    icon: <SiMastercard className="text-4xl sm:text-5xl md:text-6xl text-[#EB001B]" />,
    title: "MasterCard",
    description: "پرداخت با مستر کارت",
    backText: "پرداخت امن و سریع با مستر کارت در تمامی سایت‌های بین‌المللی",
  },
  {
    icon: <SiPaypal className="text-4xl sm:text-5xl md:text-6xl text-[#0070BA]" />,
    title: "PayPal",
    description: "پرداخت با پی پال",
    backText: "پرداخت آنلاین و مطمئن با پی‌پال برای تمامی تراکنش‌های بین‌المللی",
  },
];

export default function PaymentMethods() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const handleCardFlip = (index: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-6 sm:mb-8 md:mb-12">
          پرداخت ارزی آنلاین با پی پال و مستر کارت
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-3xl mx-auto">
          {paymentMethods.map((method, index) => {
            const isFlipped = flippedCards.has(index);
            return (
              <div
                key={index}
                className="relative h-48 sm:h-52 md:h-56 lg:h-60 perspective-1000"
                onClick={() => handleCardFlip(index)}
                onMouseEnter={() => handleCardFlip(index)}
                onMouseLeave={() => handleCardFlip(index)}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front of card */}
                  <div
                    className="absolute inset-0 bg-gray-50 rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer text-center backface-hidden flex flex-col items-center justify-center"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div className="mb-4 flex items-center justify-center">
                      {method.icon}
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                      {method.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                      {method.description}
                    </p>
                  </div>

                  {/* Back of card */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-md cursor-pointer text-center backface-hidden flex flex-col items-center justify-center rotate-y-180"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
                      {method.backText || method.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}

