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
      <div className="relative h-14 min-[500px]:h-18 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto flex items-center justify-center min-w-[140px] sm:min-w-[180px] md:min-w-[220px]">
        <Image
          src="/Images/Logo/Raitx%20international%20payments%20logo%20design%20(1).png"
          alt={alt}
          width={640}
          height={180}
          className="h-full w-auto object-contain object-center"
          sizes="(max-width: 640px) 200px, (max-width: 768px) 260px, (max-width: 1024px) 320px, 400px"
          quality={92}
          priority
        />
      </div>
    </Link>
  );
}

