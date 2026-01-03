"use client";

import React from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
}

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export default function UsersTable({
  users,
  onEdit,
  onDelete,
}: UsersTableProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                نام
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                ایمیل
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                نقش
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                وضعیت
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                تاریخ عضویت
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  کاربری یافت نشد
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {user.name}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{user.email}</td>
                  <td className="py-3 px-4 text-gray-700">{user.role}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        user.status === "فعال"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.joinDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(user)}
                        className="text-[#ff5538] hover:underline text-xs"
                      >
                        ویرایش
                      </button>
                      <button
                        onClick={() => onDelete(user.id)}
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
