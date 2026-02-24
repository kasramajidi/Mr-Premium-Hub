"use client";

import { useEffect } from "react";

export default function NewsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[news] Error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gray-50 pt-4 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-20 pb-4 sm:pb-6 md:pb-8 lg:pb-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
          <p className="text-amber-800 font-medium mb-2">خطا در بارگذاری صفحه اخبار</p>
          <p className="text-amber-700 text-sm mb-4">لطفاً صفحه را رفرش کنید یا کمی بعد تلاش کنید.</p>
          <button
            type="button"
            onClick={reset}
            className="bg-[#ff5538] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    </main>
  );
}
