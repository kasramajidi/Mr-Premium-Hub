"use client";

import React, { useState } from "react";

interface ArticleFormProps {
  article?: {
    id: string;
    title: string;
    category: string;
    content?: string;
    status: string;
  };
  onClose: () => void;
  onSave: (article: any) => void;
}

export default function ArticleForm({
  article,
  onClose,
  onSave,
}: ArticleFormProps) {
  const [formData, setFormData] = useState({
    title: article?.title || "",
    category: article?.category || "",
    content: article?.content || "",
    status: article?.status || "پیش‌نویس",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-xl font-medium text-gray-900">
            {article ? "ویرایش مقاله" : "افزودن مقاله جدید"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              عنوان مقاله <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              دسته‌بندی <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
            >
              <option value="">انتخاب کنید...</option>
              <option value="آموزش سئو">آموزش سئو</option>
              <option value="بازاریابی دیجیتال">بازاریابی دیجیتال</option>
              <option value="طراحی سایت">طراحی سایت</option>
              <option value="برنامه‌نویسی">برنامه‌نویسی</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              محتوا <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={10}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full bg-white border-b border-gray-300 px-3 py-2 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors resize-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              وضعیت
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
            >
              <option value="پیش‌نویس">پیش‌نویس</option>
              <option value="منتشر شده">منتشر شده</option>
            </select>
          </div>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="bg-[#ff5538] text-white px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

