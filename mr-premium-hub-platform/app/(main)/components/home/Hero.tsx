"use client";

import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("دلار آمریکا");

  const currencies = [
    "دلار استرالیا",
    "یورو",
    "دلار آمریکا",
    "لیر",
    "دلار پی پال",
    "دلار کانادا",
  ];

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/ChatGPT%20Image%20Jan%2024,%202026,%2004_07_27%20PM.png"
          alt="نقد کردن درآمدهای ارزی - مسترپریمیوم هاب"
          fill
          className="object-cover object-center"
          priority
          quality={100}
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.5))",
          }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 text-center lg:text-right space-y-4 text-white w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
              نقد کردن درآمدهای ارزی
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              با Mr Premium Hub، درآمدهای ارزی خود را به راحتی و با بهترین نرخ
              تبدیل کنید. ما با سال‌ها تجربه در زمینه پرداخت‌های بین‌المللی،
              خدمات متنوعی از جمله نقد کردن پی‌پال، پرداخت هزینه‌های سفارت، خرید
              بلیت هواپیما و هتل، و ثبت نام آزمون‌های بین‌المللی را ارائه
              می‌دهیم. امنیت و سرعت در انجام تراکنش‌ها، اولویت اصلی ماست.
            </p>
          </div>

          <div className="w-full max-w-full sm:max-w-md lg:w-auto lg:min-w-[320px] px-2 sm:px-0">
            <div className="bg-white p-6 w-full">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-1">
                    محاسبه گر قیمت
                  </h2>
                  <p className="text-xs text-gray-500">
                    در کمتر از ۱۰ ساعت پیش!
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      مبلغ ارزی را وارد کنید
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0"
                        className="flex-1 px-3 py-2 text-sm border-b border-gray-300 focus:outline-none focus:border-[#ff5538] bg-transparent text-gray-900"
                      />
                      <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-xs text-gray-700 transition-colors whitespace-nowrap">
                        مبلغ
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      انتخاب ارز
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {currencies.map((currency) => (
                        <button
                          key={currency}
                          onClick={() => setSelectedCurrency(currency)}
                          className={`px-2 py-1.5 text-xs transition-all ${
                            selectedCurrency === currency
                              ? "bg-[#ff5538] text-white"
                              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {currency}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
