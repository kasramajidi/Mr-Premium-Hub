"use client";

import Image from "next/image";

export default function FooterRight() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-56 h-24 sm:w-64 sm:h-28 md:w-72 md:h-32 lg:w-80 lg:h-36">
        <Image
          src="/Images/Logo/acee0043-fe87-4b79-bab2-de8e09a1ebd0 (1).png"
          alt="لوگو شرکت"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
        />
      </div>

      <div className="text-center space-y-1 hidden md:block">
        <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
          مستر پریمیوم هاب (Mr Premium Hub) — خدمات ارزی و پرداخت ارزی
        </p>
        <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
          تلفن: <a href="tel:02191320700" className="hover:text-white">۰۲۱-۹۱۳۲۰۷۰۰</a> | ایمیل: <a href="mailto:support@tehranpayment.com" className="hover:text-white">support@tehranpayment.com</a>
        </p>
        <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
          آدرس: تهران، خیابان کارگر شمالی، نبش بزرگراه جلال آل احمد، کوچه چهارم، پلاک ۴۰، طبقه سوم
        </p>
      </div>
    </div>
  );
}

