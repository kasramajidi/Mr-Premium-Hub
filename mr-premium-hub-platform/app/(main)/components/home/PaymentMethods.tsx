"use client";

import { SiMastercard, SiPaypal } from "react-icons/si";

interface PaymentCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const paymentMethods: PaymentCard[] = [
  {
    icon: (
      <SiMastercard className="text-4xl sm:text-5xl md:text-6xl text-[#EB001B]" />
    ),
    title: "MasterCard",
    description: "پرداخت با مستر کارت",
  },
  {
    icon: (
      <SiPaypal className="text-4xl sm:text-5xl md:text-6xl text-[#0070BA]" />
    ),
    title: "PayPal",
    description: "پرداخت با پی پال",
  },
];

export default function PaymentMethods() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 text-center mb-8 md:mb-12">
          پرداخت ارزی آنلاین با پی پال و مستر کارت
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white p-6 transition-opacity hover:opacity-80 cursor-pointer text-center"
            >
              <div className="mb-3 flex items-center justify-center">
                {method.icon}
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-1">
                {method.title}
              </h3>
              <p className="text-xs text-gray-600">{method.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
