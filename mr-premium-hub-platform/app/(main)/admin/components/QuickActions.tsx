"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Action {
  name: string;
  action: () => void;
  icon: string;
}

export default function QuickActions() {
  const router = useRouter();

  const actions: Action[] = [
    {
      name: "افزودن مقاله",
      action: () => router.push("/admin/articles"),
      icon: "➕",
    },
    {
      name: "افزودن محصول",
      action: () => router.push("/admin/products"),
      icon: "➕",
    },
    {
      name: "مدیریت کاربران",
      action: () => router.push("/admin/users"),
      icon: "👥",
    },
    {
      name: "تنظیمات",
      action: () => router.push("/admin/settings"),
      icon: "⚙️",
    },
  ];

  return (
    <div className="bg-white border-b border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">دسترسی سریع</h3>
      <div className="space-y-2">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="w-full flex items-center gap-3 px-4 py-3 border-b border-gray-200 hover:border-[#ff5538] hover:text-[#ff5538] transition-colors text-sm font-medium text-gray-700 text-right"
          >
            <span className="text-lg">{action.icon}</span>
            <span>{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

