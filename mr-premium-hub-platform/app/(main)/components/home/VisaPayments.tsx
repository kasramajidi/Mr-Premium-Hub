"use client";

import Link from "next/link";

interface VisaCard {
  title: string;
  description: string;
}

const visaServices: VisaCard[] = [
  { title: "MY CIC", description: "سفارت کانادا" },
  { title: "AUSTRALIA", description: "سفارت استرالیا" },
  { title: "MRV FEE", description: "سفارت آمریکا" },
  { title: "SEVIS FEE", description: "سویس فی" },
  { title: "UK VISA", description: "سفارت انگلستان" },
];

export default function VisaPayments() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 text-center mb-8 md:mb-12">
          پرداخت هزینه تعیین وقت سفارت و مهاجرت{" "}
          <Link
            href="/currency-payment"
            className="text-[#ff5538] hover:opacity-80 text-sm md:text-base"
          >
            (جزئیات بیشتر)
          </Link>
        </h2>
        <p className="text-sm text-gray-600 text-center max-w-2xl mx-auto mb-8">
          پرداخت MRV، SEVIS و هزینه‌های ویزای کشورهای مختلف از طریق مستر پریمیوم هاب با امنیت و سرعت.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {visaServices.map((service, index) => (
            <Link
              key={index}
              href="/currency-payment"
              className="bg-white p-6 transition-opacity hover:opacity-80 cursor-pointer text-center block rounded-lg shadow-sm hover:shadow-md"
            >
              <h3 className="text-base font-medium text-gray-900 mb-1">
                {service.title}
              </h3>
              <p className="text-xs text-gray-600">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
