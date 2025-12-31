"use client";

import { FaInstagram, FaTelegram, FaXTwitter, FaWhatsapp } from "react-icons/fa6";

export default function ContactMethods() {
  const contactMethods = [
    {
      name: "Instagram",
      value: "20payment",
      icon: FaInstagram,
      href: "https://instagram.com/20payment",
      color: "text-pink-600",
    },
    {
      name: "WhatsApp",
      value: "info@20payment.com",
      icon: FaWhatsapp,
      href: "https://wa.me/your-number",
      color: "text-green-600",
    },
    {
      name: "Telegram",
      value: "@bistpayment",
      icon: FaTelegram,
      href: "https://t.me/bistpayment",
      color: "text-blue-500",
    },
    {
      name: "X (Twitter)",
      value: "20payment",
      icon: FaXTwitter,
      href: "https://x.com/20payment",
      color: "text-gray-900",
    },
  ];

  return (
    <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-lg h-[368px] sm:h-[412px] md:h-[500px] lg:h-[550px] xl:h-[580px] flex flex-col">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6">
        راه های ارتباطی دیگه
      </h2>
      <div className="space-y-3 sm:space-y-4 flex-1">
        {contactMethods.map((method) => {
          const Icon = method.icon;
          return (
            <a
              key={method.name}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
            >
              <Icon className={`text-lg sm:text-xl md:text-2xl ${method.color} shrink-0`} />
              <span className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                {method.value}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

