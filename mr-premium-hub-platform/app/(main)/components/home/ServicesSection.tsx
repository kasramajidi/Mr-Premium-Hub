"use client";

import Link from "next/link";
import { SiPaypal, SiDigitalocean } from "react-icons/si";
import { HiOutlineTemplate } from "react-icons/hi";

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const services: ServiceCard[] = [
  {
    icon: (
      <SiPaypal className="text-4xl sm:text-5xl md:text-6xl text-[#0070BA]" />
    ),
    title: "نقد درآمد پی‌پال",
    description: "تبدیل موجودی پی‌پال به ریال با بهترین نرخ",
    href: "/currency-payment",
  },
  {
    icon: (
      <HiOutlineTemplate className="text-4xl sm:text-5xl md:text-6xl text-[#81B441]" />
    ),
    title: "تم فارست",
    description: "خرید قالب از تم فارست و پرداخت ارزی",
    href: "/currency-payment",
  },
  {
    icon: (
      <SiDigitalocean className="text-4xl sm:text-5xl md:text-6xl text-[#0080FF]" />
    ),
    title: "دیجیتال اوشن",
    description: "نقد کردن درآمد و پرداخت سرویس‌های ابری",
    href: "/currency-payment",
  },
  {
    icon: (
      <SiPaypal className="text-4xl sm:text-5xl md:text-6xl text-[#0070BA]" />
    ),
    title: "پرداخت با پی‌پال",
    description: "پرداخت صورتحساب و خرید با پی‌پال",
    href: "/currency-payment",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 mb-1">
            خدمات ارزی و پرداخت ارزی
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            مستر پریمیوم هاب (Mr Premium Hub) نقد درآمد پی‌پال، پرداخت با مسترکارت، پرداخت هزینه ویزا و سفارت، ثبت نام آزمون‌های بین‌المللی و خرید بلیت هواپیما و هتل را با امنیت و بهترین نرخ ارائه می‌دهد.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="bg-white p-6 transition-opacity hover:opacity-80 cursor-pointer text-center block rounded-lg shadow-sm hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-1">
                {service.title}
              </h3>
              <p className="text-xs text-gray-600">{service.description}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/currency-payment"
            className="inline-block px-6 py-2.5 bg-[#ff5538] text-white rounded-lg text-sm font-medium hover:opacity-90"
          >
            مشاهده همه خدمات پرداخت ارزی
          </Link>
          <span className="mx-2 text-gray-400">|</span>
          <Link
            href="/valid-cards"
            className="inline-block px-6 py-2.5 border border-[#ff5538] text-[#ff5538] rounded-lg text-sm font-medium hover:bg-[#ff5538] hover:text-white"
          >
            کارت‌های اعتباری
          </Link>
        </div>
      </div>
    </section>
  );
}
