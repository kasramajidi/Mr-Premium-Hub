"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: "داشبورد", href: "/admin", icon: "📊" },
  { name: "مقالات", href: "/admin/articles", icon: "📝" },
  { name: "محصولات", href: "/admin/products", icon: "🛍️" },
  { name: "سفارشات", href: "/admin/orders", icon: "📦" },
  { name: "کاربران", href: "/admin/users", icon: "👥" },
  { name: "نظرات", href: "/admin/comments", icon: "💬" },
  { name: "تنظیمات", href: "/admin/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-l border-gray-200 min-h-screen sticky top-0">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#ff5538] text-white"
                  : "text-gray-700 hover:bg-gray-50 hover:text-[#ff5538]"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

