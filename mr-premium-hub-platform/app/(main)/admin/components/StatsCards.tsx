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
    color: "bg-green-50 text-green-600",
  },
  {
    title: "سفارشات",
    value: "789",
    change: "+15%",
    icon: "📦",
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "مقالات",
    value: "234",
    change: "+5%",
    icon: "📝",
    color: "bg-orange-50 text-orange-600",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 border-b border-gray-200 hover:border-[#ff5538] transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${stat.color}`}>
              {stat.icon}
            </div>
            <span className="text-xs text-green-600 font-medium">
              {stat.change}
            </span>
          </div>
          <h3 className="text-sm text-gray-600 mb-1">{stat.title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

