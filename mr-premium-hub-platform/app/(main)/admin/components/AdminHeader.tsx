"use client";

import React from "react";
import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="bg-white border-b border-gray-200/80 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            پنل مدیریت
          </h2>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="text-xs sm:text-sm text-gray-500 hover:text-[#ff5538] transition-colors"
            >
              بازگشت به سایت
            </Link>
            <button
              type="button"
              className="text-xs sm:text-sm text-gray-500 hover:text-[#ff5538] transition-colors"
            >
              خروج
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
