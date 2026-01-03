"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import ArticlesTable from "./components/ArticlesTable";
import ArticleForm from "./components/ArticleForm";

interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  views: number;
  status: string;
  date: string;
  content?: string;
}

const initialArticles: Article[] = [
  {
    id: "1",
    title: "راهنمای کامل SEO",
    category: "آموزش سئو",
    author: "علی احمدی",
    views: 1234,
    status: "منتشر شده",
    date: "1403/01/15",
  },
  {
    id: "2",
    title: "بهترین روش‌های دیجیتال مارکتینگ",
    category: "بازاریابی دیجیتال",
    author: "مریم رضایی",
    views: 856,
    status: "منتشر شده",
    date: "1403/01/14",
  },
  {
    id: "3",
    title: "طراحی UI/UX مدرن",
    category: "طراحی سایت",
    author: "حسین محمدی",
    views: 2341,
    status: "پیش‌نویس",
    date: "1403/01/13",
  },
];

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = () => {
    setEditingArticle(null);
    setShowForm(true);
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("آیا از حذف این مقاله اطمینان دارید؟")) {
      setArticles(articles.filter((article) => article.id !== id));
    }
  };

  const handleSave = (formData: any) => {
    if (editingArticle) {
      setArticles(
        articles.map((article) =>
          article.id === editingArticle.id
            ? { ...article, ...formData, date: new Date().toLocaleDateString("fa-IR") }
            : article
        )
      );
    } else {
      const newArticle: Article = {
        id: Date.now().toString(),
        ...formData,
        author: "ادمین",
        views: 0,
        date: new Date().toLocaleDateString("fa-IR"),
      };
      setArticles([newArticle, ...articles]);
    }
    setShowForm(false);
    setEditingArticle(null);
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-gray-900 mb-2">
              مدیریت مقالات
            </h1>
            <p className="text-sm text-gray-600">
              افزودن، ویرایش و حذف مقالات
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-[#ff5538] text-white px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            افزودن مقاله جدید
          </button>
        </div>

        <div className="bg-white border-b border-gray-200 p-4">
          <input
            type="text"
            placeholder="جستجو در مقالات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
          />
        </div>

        <ArticlesTable
          articles={filteredArticles}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {showForm && (
          <ArticleForm
            article={editingArticle || undefined}
            onClose={() => {
              setShowForm(false);
              setEditingArticle(null);
            }}
            onSave={handleSave}
          />
        )}
      </div>
    </AdminLayout>
  );
}
