"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  alt?: string;
}

export default function Logo({ 
  alt = "لوگو شرکت"
}: LogoProps) {
  return (
    <Link 
      href="/" 
      className="inline-flex items-center group transition-opacity hover:opacity-90 cursor-pointer"
      aria-label="صفحه اصلی"
    >
      <div className="relative h-16 sm:h-20 md:h-24 lg:h-28 xl:h-28 w-auto flex items-center justify-center">
        <Image
          src="/Images/Logo/logo.png"
          alt={alt}
          width={560}
          height={150}
          className="h-full w-auto object-contain object-center"
          sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, (max-width: 1024px) 400px, 480px"
          quality={92}
          priority
        />
      </div>
    </Link>
  );
}

