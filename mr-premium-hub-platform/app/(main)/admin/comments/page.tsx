"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import CommentsTable from "./components/CommentsTable";

interface Comment {
  id: string;
  author: string;
  content: string;
  post: string;
  status: string;
  date: string;
}

const initialComments: Comment[] = [
  {
    id: "1",
    author: "علی احمدی",
    content: "مقاله بسیار مفیدی بود، ممنون",
    post: "راهنمای کامل SEO",
    status: "تایید شده",
    date: "1403/01/15",
  },
  {
    id: "2",
    author: "مریم رضایی",
    content: "لطفا بیشتر در مورد این موضوع بنویسید",
    post: "بهترین روش‌های دیجیتال مارکتینگ",
    status: "در انتظار تایید",
    date: "1403/01/14",
  },
  {
    id: "3",
    author: "حسین محمدی",
    content: "عالی بود، منتظر مقالات بعدی هستم",
    post: "طراحی UI/UX مدرن",
    status: "تایید شده",
    date: "1403/01/13",
  },
];

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleApprove = (id: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, status: "تایید شده" } : comment
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("آیا از حذف این نظر اطمینان دارید؟")) {
      setComments(comments.filter((comment) => comment.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            مدیریت نظرات
          </h1>
          <p className="text-sm text-gray-600">
            مشاهده و مدیریت نظرات کاربران
          </p>
        </div>
        <CommentsTable
          comments={comments}
          onApprove={handleApprove}
          onDelete={handleDelete}
        />
      </div>
    </AdminLayout>
  );
}
