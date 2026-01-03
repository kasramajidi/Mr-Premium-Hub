"use client";

import React from "react";
import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-medium text-gray-900">پنل مدیریت</h2>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-[#ff5538] transition-colors"
            >
              بازگشت به سایت
            </Link>
            <button className="text-sm text-gray-600 hover:text-[#ff5538] transition-colors">
              خروج
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

