"use client";

import React from "react";
import AdminLayout from "./components/AdminLayout";
import StatsCards from "./components/StatsCards";
import RecentOrders from "./components/RecentOrders";
import QuickActions from "./components/QuickActions";
import ChartSection from "./components/ChartSection";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
            داشبورد
          </h1>
          <p className="text-sm text-gray-500">
            خوش آمدید به پنل مدیریت مستر پریمیوم هاب
          </p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2">
            <ChartSection />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        <RecentOrders />
      </div>
    </AdminLayout>
  );
}
