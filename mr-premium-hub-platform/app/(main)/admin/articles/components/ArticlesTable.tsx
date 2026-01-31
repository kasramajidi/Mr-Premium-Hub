"use client";

import React from "react";

export interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  views: number;
  status: string;
  date: string;
}

interface ArticlesTableProps {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
}

export default function ArticlesTable({
  articles,
  onEdit,
  onDelete,
}: ArticlesTableProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                عنوان
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                دسته‌بندی
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                نویسنده
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                بازدید
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                وضعیت
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                تاریخ
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  مقاله‌ای یافت نشد
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {article.title}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{article.category}</td>
                  <td className="py-3 px-4 text-gray-700">{article.author}</td>
                  <td className="py-3 px-4 text-gray-600">{article.views}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        article.status === "منتشر شده"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{article.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(article)}
                        className="text-[#ff5538] hover:underline text-xs"
                      >
                        ویرایش
                      </button>
                      <button
                        onClick={() => onDelete(article.id)}
                        className="text-red-600 hover:underline text-xs"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
