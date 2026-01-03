"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "مسترپریمیوم هاب",
    siteDescription: "پلتفرم دیجیتال مارکتینگ",
    email: "info@example.com",
  });

  const handleSave = () => {
    alert("تنظیمات با موفقیت ذخیره شد!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            تنظیمات
          </h1>
          <p className="text-sm text-gray-600">مدیریت تنظیمات سایت</p>
        </div>

        <div className="bg-white border-b border-gray-200 p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              تنظیمات عمومی
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  نام سایت
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) =>
                    setSettings({ ...settings, siteName: e.target.value })
                  }
                  className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  توضیحات سایت
                </label>
                <textarea
                  rows={3}
                  value={settings.siteDescription}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      siteDescription: e.target.value,
                    })
                  }
                  className="w-full bg-white border-b border-gray-300 px-3 py-2 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors resize-none text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              تنظیمات ایمیل
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  آدرس ایمیل
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) =>
                    setSettings({ ...settings, email: e.target.value })
                  }
                  className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-[#ff5538] text-white px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              ذخیره تغییرات
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
