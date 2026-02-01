"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export default function WelcomeBox() {
  let username = "کاربر";
  if (typeof window !== "undefined") {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.username) username = user.username;
    } catch {}
  }

  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200/90 bg-gradient-to-br from-white via-gray-50/50 to-white p-5 sm:p-6 shadow-sm">
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-full bg-gradient-to-b from-[#ff5538] to-[#ff7744]" />
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 pr-1">
        <div className="flex shrink-0">
          <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff5538] to-[#ff6633] text-xl sm:text-2xl font-bold text-white shadow-md shadow-[#ff5538]/25 ring-2 ring-white ring-offset-2">
            {initial}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#ff5538]/10 px-2 py-0.5 text-xs font-medium text-[#ff5538]">
              <Sparkles size={12} />
              پیشخوان
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
            سلام، {username}
          </h2>
          <p className="mt-0.5 text-sm leading-relaxed text-gray-500">
            از اینجا سفارش‌ها، آدرس‌ها و تنظیمات حساب را مدیریت کنید.
          </p>
        </div>
      </div>
    </div>
  );
}
