"use client";

import React from "react";
import Link from "next/link";

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: string;
  date: string;
}

const recentOrders: Order[] = [
  {
    id: "#1234",
    customer: "علی احمدی",
    product: "لپ تاپ اپل",
    amount: "25,000,000 تومان",
    status: "در حال پردازش",
    date: "1403/01/15",
  },
  {
    id: "#1235",
    customer: "مریم رضایی",
    product: "گوشی سامسونگ",
    amount: "15,000,000 تومان",
    status: "ارسال شده",
    date: "1403/01/14",
  },
  {
    id: "#1236",
    customer: "حسین محمدی",
    product: "تبلت آیپد",
    amount: "18,000,000 تومان",
    status: "تحویل داده شده",
    date: "1403/01/13",
  },
];

export default function RecentOrders() {
  return (
    <div className="bg-white border-b border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">سفارشات اخیر</h3>
        <Link
          href="/admin/orders"
          className="text-sm text-[#ff5538] hover:underline"
        >
          مشاهده همه
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                شماره سفارش
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                مشتری
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                محصول
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                مبلغ
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                وضعیت
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                تاریخ
              </th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 text-gray-900">{order.id}</td>
                <td className="py-3 px-4 text-gray-700">{order.customer}</td>
                <td className="py-3 px-4 text-gray-700">{order.product}</td>
                <td className="py-3 px-4 text-gray-900 font-medium">
                  {order.amount}
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

