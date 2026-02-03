"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, ChevronLeft, ChevronRight } from "lucide-react";
import AccountEmptyState from "./AccountEmptyState";

export type OrderRow = {
  id: string;
  orderNumber: string;
  orderType: string;
  lastUpdate: string;
  status: string;
  currencyAmount: string; // e.g. "۵۰ - یورو"
};

// وقتی API سفارش داشته باشید این آرایه را از سرور پر کنید
const MOCK_ORDERS: OrderRow[] = [
  {
    id: "1",
    orderNumber: "751788",
    orderType: "لغو/تغییر زمان پروازهای خارجی",
    lastUpdate: "۰۳:۰۶:۰۴ - ۱۴۰۴/۱۱/۱۵",
    status: "پیش نویس",
    currencyAmount: "۵۰ - یورو",
  },
  {
    id: "2",
    orderNumber: "751787",
    orderType: "ثبت سایر سفارشها",
    lastUpdate: "۰۱:۴۹:۴۳ - ۱۴۰۴/۱۱/۱۵",
    status: "پیش نویس",
    currencyAmount: "۴۵ - یورو",
  },
];

const ITEMS_PER_PAGE = 10;

export default function OrdersSection() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  // برای تست از MOCK_ORDERS استفاده می‌شود؛ بعداً از API بگیرید
  const orders = MOCK_ORDERS;
  const totalCount = orders.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageOrders = orders.slice(start, start + ITEMS_PER_PAGE);

  if (orders.length === 0) {
    return (
      <AccountEmptyState
        message="هنوز سفارشی ثبت نکرده‌اید. از فروشگاه یا خدمات پرداخت ارزی می‌توانید خرید کنید."
        buttonText="مرور فروشگاه"
        onButtonClick={() => router.push("/shop")}
      />
    );
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">فهرست سفارش ها</h3>
        <p className="mt-0.5 text-sm text-gray-500">لیست و وضعیت سفارش‌های شما</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-4 py-3">
          <button
            type="button"
            onClick={() => setShowFilter(!showFilter)}
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover"
          >
            فیلتر
            <ChevronRight
              size={16}
              className={`transition-transform ${showFilter ? "rotate-90" : ""}`}
              aria-hidden
            />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right" aria-label="جدول فهرست سفارش ها">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                <th className="w-12 px-4 py-3 font-medium text-gray-600" aria-label="جزئیات" />
                <th className="px-4 py-3 font-medium text-gray-600">شماره سفارش</th>
                <th className="px-4 py-3 font-medium text-gray-600">نوع سفارش</th>
                <th className="px-4 py-3 font-medium text-gray-600">آخرین بروزرسانی</th>
                <th className="px-4 py-3 font-medium text-gray-600">وضعیت</th>
                <th className="px-4 py-3 font-medium text-gray-600">مبلغ ارز</th>
              </tr>
            </thead>
            <tbody>
              {pageOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="rounded p-1.5 text-gray-400 hover:text-gray-600"
                      title="مشاهده جزئیات"
                      aria-label={`جزئیات سفارش ${order.orderNumber}`}
                    >
                      <ChevronRight size={18} className="rotate-180" />
                    </button>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{order.orderNumber}</td>
                  <td className="px-4 py-3 text-gray-700">{order.orderType}</td>
                  <td className="px-4 py-3 text-gray-600">{order.lastUpdate}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="text-gray-700">{order.status}</span>
                      <button
                        type="button"
                        className="p-1 text-gray-400 hover:text-brand"
                        title="ویرایش"
                        aria-label="ویرایش وضعیت"
                      >
                        <Pencil size={14} />
                      </button>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{order.currencyAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 border-t border-gray-100 bg-gray-50/50 px-4 py-3">
          <span className="text-sm text-gray-600">
            تعداد کل : <span className="font-medium">{new Intl.NumberFormat("fa-IR").format(totalCount)}</span>
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
              aria-label="صفحه قبل"
            >
              <ChevronRight size={20} />
            </button>
            <span
              className="flex h-9 min-w-9 items-center justify-center rounded-full bg-brand text-sm font-medium text-white"
              aria-current="page"
            >
              {new Intl.NumberFormat("fa-IR").format(currentPage)}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
              aria-label="صفحه بعد"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
