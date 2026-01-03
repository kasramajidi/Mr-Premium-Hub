"use client";

import React from "react";

interface Comment {
  id: string;
  author: string;
  content: string;
  post: string;
  status: string;
  date: string;
}

interface CommentsTableProps {
  comments: Comment[];
  onApprove: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CommentsTable({
  comments,
  onApprove,
  onDelete,
}: CommentsTableProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                نویسنده
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                محتوا
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                پست
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
            {comments.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  نظری یافت نشد
                </td>
              </tr>
            ) : (
              comments.map((comment) => (
                <tr
                  key={comment.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {comment.author}
                  </td>
                  <td className="py-3 px-4 text-gray-700 max-w-xs truncate">
                    {comment.content}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{comment.post}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        comment.status === "تایید شده"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {comment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{comment.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {comment.status !== "تایید شده" && (
                        <button
                          onClick={() => onApprove(comment.id)}
                          className="text-[#ff5538] hover:underline text-xs"
                        >
                          تایید
                        </button>
                      )}
                      <button
                        onClick={() => onDelete(comment.id)}
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
