"use client";

import React from "react";
import { Package, Clock, ArrowLeft } from "lucide-react";

interface AccountEmptyStateProps {
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
  icon?: React.ReactNode;
  isComingSoon?: boolean;
}

export default function AccountEmptyState({
  message,
  buttonText,
  onButtonClick,
  icon,
  isComingSoon = false,
}: AccountEmptyStateProps) {
  if (isComingSoon) {
    return (
      <div className="flex flex-col items-center justify-center py-14 sm:py-16 px-4">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/80 text-amber-600 shadow-inner ring-2 ring-amber-200/50">
          <Clock size={28} strokeWidth={2} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-1.5">به زودی</h3>
        <p className="text-sm text-gray-500 text-center mb-6 max-w-sm leading-relaxed">
          {message}
        </p>
        {buttonText && onButtonClick && (
          <button
            type="button"
            onClick={onButtonClick}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#ff5538] bg-white px-5 py-2.5 text-sm font-semibold text-[#ff5538] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff5538] hover:text-white hover:shadow-md hover:shadow-[#ff5538]/20"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            {buttonText}
          </button>
        )}
      </div>
    );
  }

  const Icon = icon ?? <Package size={32} className="text-gray-400" strokeWidth={2} />;

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-14 px-4">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 shadow-inner ring-2 ring-gray-200/60">
        {Icon}
      </div>
      <p className="text-sm text-gray-600 text-center mb-6 max-w-sm leading-relaxed">
        {message}
      </p>
      {buttonText && onButtonClick && (
        <button
          type="button"
          onClick={onButtonClick}
          className="inline-flex items-center gap-2 rounded-xl bg-[#ff5538] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#ff5538]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff5538]/95 hover:shadow-lg hover:shadow-[#ff5538]/30"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
