"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Wallet, Info, Plus } from "lucide-react";

export default function DashboardMain() {
  const router = useRouter();
  const formatRial = (n: number) => new Intl.NumberFormat("fa-IR").format(n) + " ریال";

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          کیف پول
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "موجودی بلوکه شده", action: null as string | null, href: null as string | null },
            { label: "موجودی در دسترس", action: "افزایش", href: "/my-account/wallet-increase" },
            { label: "موجودی کیف پول", action: null as string | null, href: null as string | null },
          ].map(({ label, action, href }) => (
            <div
              key={label}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{label}</span>
                <button type="button" className="text-gray-400 hover:text-gray-600" title="اطلاعات">
                  <Info size={14} />
                </button>
              </div>
              <p className="mt-2 text-lg font-bold text-gray-900">{formatRial(0)}</p>
              {action && href && (
                <button
                  type="button"
                  onClick={() => router.push(href)}
                  className="mt-4 text-sm font-medium text-[#ff5538] hover:underline"
                >
                  {action}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-900">آخرین درخواست های پشتیبانی</h3>
            <button
              type="button"
              onClick={() => router.push("/contact")}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff5538] text-white hover:bg-[#e6452e]"
              title="درخواست جدید"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 font-medium text-gray-600">وضعیت</th>
                  <th className="px-4 py-3 font-medium text-gray-600">آخرین بروزرسانی</th>
                  <th className="px-4 py-3 font-medium text-gray-600">عنوان پیام</th>
                  <th className="px-4 py-3 font-medium text-gray-600">شماره پیام</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-500">
                    پیامی ثبت نشده است
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-900">آخرین سفارش ها</h3>
            <button
              type="button"
              onClick={() => router.push("/my-account/orders")}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff5538] text-white hover:bg-[#e6452e]"
              title="سفارش جدید"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 font-medium text-gray-600">شماره سفارش</th>
                  <th className="px-4 py-3 font-medium text-gray-600">نوع سفارش</th>
                  <th className="px-4 py-3 font-medium text-gray-600">آخرین بروزرسانی</th>
                  <th className="px-4 py-3 font-medium text-gray-600">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-500">
                    سفارشی ثبت نشده است
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
