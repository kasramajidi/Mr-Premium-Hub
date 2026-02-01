"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Download,
  MapPin,
  User,
  LogOut,
} from "lucide-react";

const menuItems: { label: string; value: string; icon: React.ReactNode }[] = [
  { label: "پیشخوان", value: "dashboard", icon: <LayoutDashboard size={18} strokeWidth={2} /> },
  { label: "سفارش‌ها", value: "orders", icon: <Package size={18} strokeWidth={2} /> },
  { label: "دانلودها", value: "downloads", icon: <Download size={18} strokeWidth={2} /> },
  { label: "آدرس‌ها", value: "addresses", icon: <MapPin size={18} strokeWidth={2} /> },
  { label: "جزئیات حساب", value: "accountDetails", icon: <User size={18} strokeWidth={2} /> },
  { label: "خروج", value: "logout", icon: <LogOut size={18} strokeWidth={2} /> },
];

interface SidebarProps {
  active: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ active, onSectionChange }: SidebarProps) {
  const router = useRouter();

  const handleClick = (value: string) => {
    if (value === "logout") {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("userLogout"));
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/auth", { scroll: false });
      }
    } else {
      onSectionChange(value);
    }
  };

  return (
    <nav
      className="rounded-2xl border border-gray-200/90 bg-white/95 p-2 shadow-sm shadow-gray-200/50 backdrop-blur-sm"
      aria-label="منوی حساب کاربری"
    >
      {menuItems.map((item) => {
        const isActive = active === item.value;
        const isLogout = item.value === "logout";
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => handleClick(item.value)}
            className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-[#ff5538] text-white shadow-md shadow-[#ff5538]/20"
                : isLogout
                  ? "text-gray-500 hover:bg-red-50 hover:text-red-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            {isActive && (
              <span className="absolute right-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-white/40" />
            )}
            <span className="flex shrink-0 opacity-90">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
