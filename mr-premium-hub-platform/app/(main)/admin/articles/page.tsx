"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from "../components/AdminLayout";
import ArticlesTable from "./components/ArticlesTable";
import ArticleForm, { type ArticleFormData } from "./components/ArticleForm";
import { getArticles, createArticle, updateArticle, deleteArticle, type ApiArticle } from "./lib/article-api";

const ARTICLE_OVERRIDES_KEY = "mrph-article-overrides";

function getOverrides(): Record<string, ApiArticle> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(ARTICLE_OVERRIDES_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function setOverride(id: number, article: ApiArticle): void {
  const o = getOverrides();
  o[String(id)] = article;
  localStorage.setItem(ARTICLE_OVERRIDES_KEY, JSON.stringify(o));
}

function removeOverride(id: number): void {
  const o = getOverrides();
  delete o[String(id)];
  localStorage.setItem(ARTICLE_OVERRIDES_KEY, JSON.stringify(o));
}

export interface ArticleRow {
  id: string;
  title: string;
  category: string;
  author: string;
  views: number;
  status: string;
  date: string;
}

function mapApiToRow(a: ApiArticle): ArticleRow {
  return {
    id: String(a.id),
    title: a.title ?? "",
    category: a.category ?? "—",
    author: "—",
    views: a.comments ?? 0,
    status: "منتشر شده",
    date: a.date ?? "",
  };
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<ApiArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ApiArticle | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchArticles = useCallback(async (silent = false) => {
    if (!silent) {
      setLoading(true);
      setFetchError(null);
    }
    try {
      const list = await getArticles();
      const overrides = getOverrides();
      const merged = (Array.isArray(list) ? list : []).map((a) => overrides[String(a.id)] ?? a);
      setArticles(merged);
    } catch (err) {
      if (!silent) setFetchError(err instanceof Error ? err.message : "خطا در دریافت لیست مقالات");
      setArticles((prev) => (silent ? prev : []));
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleAdd = () => {
    setEditingArticle(null);
    setShowForm(true);
  };

  const handleEdit = (row: ArticleRow) => {
    const apiArticle = articles.find((a) => String(a.id) === row.id) ?? null;
    setEditingArticle(apiArticle);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این مقاله اطمینان دارید؟")) return;
    try {
      await deleteArticle(Number(id));
      removeOverride(Number(id));
      await fetchArticles(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : "خطا در حذف مقاله");
    }
  };

  const handleSave = async (formData: ArticleFormData) => {
    try {
      if (editingArticle) {
        await updateArticle({
          id: editingArticle.id,
          title: formData.title,
          slug: formData.slug?.trim() || undefined,
          category: formData.category || null,
          image: formData.image?.trim() || undefined,
          date: formData.date?.trim() || undefined,
          content: formData.content ? formData.content.split("\n").filter(Boolean) : undefined,
          headings: formData.headings?.trim() ? formData.headings.trim().split("\n").filter(Boolean) : undefined,
        });
        const updated: ApiArticle = {
          ...editingArticle,
          title: formData.title,
          slug: (formData.slug?.trim() || formData.title.replace(/\s+/g, "-")).trim(),
          category: formData.category || null,
          image: formData.image?.trim() || editingArticle.image,
          date: formData.date?.trim() || editingArticle.date,
          content: formData.content ? formData.content.split("\n").filter(Boolean) : editingArticle.content,
          headings: formData.headings?.trim() ? formData.headings.trim().split("\n").filter(Boolean) : editingArticle.headings,
        };
        setArticles((prev) => prev.map((a) => (a.id === editingArticle.id ? updated : a)));
        setOverride(editingArticle.id, updated);
      } else {
        const contentLines = formData.content?.trim() ? formData.content.trim().split("\n").filter(Boolean) : [""];
        const headingsLines = formData.headings?.trim() ? formData.headings.trim().split("\n").filter(Boolean) : [];
        const slug = (formData.slug ?? formData.title.replace(/\s+/g, "-")).trim() || formData.title.replace(/\s+/g, "-");
        const dateStr = formData.date?.trim() || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
        const rs = formData.relatedService;
        const relatedService =
          rs && (rs.title || rs.link)
            ? { title: rs.title || "", description: rs.description || "", image: rs.image || "/Images/shop-banner.jpg", link: rs.link || "/shop" }
            : undefined;
        const created = await createArticle({
          title: formData.title,
          slug,
          category: formData.category,
          image: formData.image?.trim() || "/Images/gift-card-guide.jpg",
          date: dateStr,
          comments: 0,
          content: contentLines,
          headings: headingsLines,
          relatedService,
        });
        const newArticle: ApiArticle = {
          id: created.id,
          title: formData.title,
          slug,
          category: formData.category || null,
          image: formData.image?.trim() || "/Images/gift-card-guide.jpg",
          date: dateStr,
          comments: 0,
          content: contentLines,
          headings: headingsLines,
          Relatedservice: relatedService,
        };
        setArticles((prev) => [newArticle, ...prev]);
      }
      setShowForm(false);
      setEditingArticle(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "خطا در ذخیره مقاله");
    }
  };

  const rows: ArticleRow[] = articles.map(mapApiToRow);
  const filteredArticles = rows.filter(
    (row) =>
      (row.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (row.category ?? "").toLowerCase().includes(searchTerm.toLowerCase())
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

        {fetchError && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            <span className="shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">!</span>
            <div>
              <p className="font-medium mb-0.5">علت خطا در دریافت لیست مقالات:</p>
              <p>{fetchError}</p>
              <button
                onClick={() => fetchArticles()}
                className="mt-2 text-[#ff5538] hover:underline text-sm"
              >
                تلاش مجدد
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="bg-white border-b border-gray-200 p-12 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-2 border-[#ff5538] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-600">در حال بارگذاری لیست مقالات از سرور...</p>
            </div>
          </div>
        ) : (
          <ArticlesTable
            articles={filteredArticles}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {showForm && (
          <ArticleForm
            key={editingArticle ? `edit-${editingArticle.id}` : "add"}
            article={
              editingArticle
                ? {
                    id: String(editingArticle.id),
                    title: editingArticle.title,
                    category: editingArticle.category ?? "",
                    content: editingArticle.content?.join("\n") ?? "",
                    status: "منتشر شده",
                    slug: editingArticle.slug ?? "",
                    image: editingArticle.image ?? "",
                    date: editingArticle.date ?? "",
                    headings: editingArticle.headings?.join("\n") ?? "",
                    relatedService: editingArticle.Relatedservice,
                  }
                : undefined
            }
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
