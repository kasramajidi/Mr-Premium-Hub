"use client";

import React, { useState, useEffect } from "react";
import { Pencil, Save, Check } from "lucide-react";

interface UserData {
  id: string;
  email: string;
  userType: string;
  firstName: string;
  lastName: string;
  mobile: string;
  phone: string;
}

export default function AccountDetailsSection() {
  const [userData, setUserData] = useState<UserData>({
    id: "",
    email: "",
    userType: "عادی",
    firstName: "",
    lastName: "",
    mobile: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user) {
          setUserData({
            id: user.id?.toString() || "",
            email: user.email || "",
            userType: user.userType || "عادی",
            firstName: user.firstName || user.username?.split(" ")[0] || "",
            lastName: user.lastName || user.username?.split(" ").slice(1).join(" ") || "",
            mobile: user.mobile || "",
            phone: user.phone || "",
          });
        }
      } catch {}
    }
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (typeof window !== "undefined") {
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = { ...stored, ...userData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    setIsSaving(false);
    setSaveSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const cancelEdit = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserData({
      id: user.id?.toString() || "",
      email: user.email || "",
      userType: user.userType || "عادی",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      mobile: user.mobile || "",
      phone: user.phone || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">مشخصات فردی</h3>
          <p className="mt-0.5 text-sm text-gray-500">اطلاعات شخصی و تماس</p>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-hover"
          >
            <Pencil size={16} />
            ویرایش
          </button>
        )}
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
            <Check className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-sm font-medium text-green-700">تغییرات با موفقیت ذخیره شد.</p>
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">شماره کاربری</label>
                <div className="mt-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500">
                  {userData.id || "-"}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ایمیل</label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="ایمیل"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">نوع کاربری</label>
                <div className="mt-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500">
                  {userData.userType}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">نام</label>
                <input
                  type="text"
                  value={userData.firstName}
                  onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="نام"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">نام خانوادگی</label>
                <input
                  type="text"
                  value={userData.lastName}
                  onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="نام خانوادگی"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">شماره همراه</label>
                <input
                  type="tel"
                  value={userData.mobile}
                  onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="شماره همراه"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">شماره ثابت</label>
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="شماره ثابت"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-hover disabled:opacity-50"
              >
                {isSaving ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Save size={16} />
                )}
                ذخیره تغییرات
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                انصراف
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              { label: "شماره کاربری", value: userData.id || "-" },
              { label: "ایمیل", value: userData.email || "-" },
              { label: "نوع کاربری", value: userData.userType },
              { label: "نام", value: userData.firstName || "-" },
              { label: "نام خانوادگی", value: userData.lastName || "-" },
              { label: "شماره همراه", value: userData.mobile || "-" },
              { label: "شماره ثابت", value: userData.phone || "-" },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className="block text-xs font-medium text-gray-500">{label}</label>
                <p className="mt-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600">
                  {value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
