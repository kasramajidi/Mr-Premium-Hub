"use client";

import React from "react";

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}

const stats: StatCard[] = [
  {
    title: "کل کاربران",
    value: "1,234",
    change: "+12%",
    icon: "👥",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "محصولات",
    value: "456",
    change: "+8%",
    icon: "🛍️",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "سفارشات",
    value: "789",
    change: "+15%",
    icon: "📦",
    color: "bg-violet-50 text-violet-600",
  },
  {
    title: "مقالات",
    value: "234",
    change: "+5%",
    icon: "📝",
    color: "bg-amber-50 text-amber-600",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200/80 p-4 sm:p-5 shadow-sm hover:shadow transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${stat.color}`}
            >
              {stat.icon}
            </div>
            <span className="text-xs font-medium text-emerald-600">
              {stat.change}
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-0.5">{stat.title}</p>
          <p className="text-lg sm:text-xl font-semibold text-gray-900">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
