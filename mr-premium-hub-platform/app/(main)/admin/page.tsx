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
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            داشبورد مدیریت
          </h1>
          <p className="text-sm text-gray-600">
            خوش آمدید به پنل مدیریت مسترپریمیوم هاب
          </p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
