"use client";

import { useMemo, useState, useEffect } from "react";
import FeaturedArticles from "./FeaturedArticles";
import LatestArticlesSection from "./LatestArticlesSection";
import NewsSidebar from "./NewsSidebar";

const ARTICLES_API_URL = "https://mrpremiumhub.org/api.ashx?action=Article";
const LATEST_ARTICLES_PER_PAGE = 8;

/** حذف تگ‌های HTML از متن تا در کارت به‌صورت متن ساده نمایش داده شود */
function stripHtml(html: string): string {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface ArticleForList {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  image: string;
  date: string;
  comments: number;
  content: string[];
}

interface NewsPageClientProps {
  /** مقالات از قبل فیلترشده توسط سرور (بر اساس دسته) */
  articles: ArticleForList[];
  categories: string[];
  /** دستهٔ انتخاب‌شده از URL؛ از سرور پاس داده می‌شود تا محتوا در HTML اولیه باشد */
  selectedCategory?: string;
}

/** شکل خام یک مقاله از API */
interface RawArticle {
  id?: number;
  title?: string;
  slug?: string;
  category?: string | null;
  image?: string;
  date?: string;
  comments?: number;
  content?: string[];
}

function parseArticlesResponse(data: unknown): RawArticle[] {
  const rawArray = Array.isArray(data)
    ? data
    : (data && typeof data === "object"
        ? (data as Record<string, unknown>).data ??
          (data as Record<string, unknown>).items ??
          (data as Record<string, unknown>).list ??
          (data as Record<string, unknown>).Articles ??
          []
        : []);
  return Array.isArray(rawArray) ? rawArray : [];
}

function toArticleForList(raw: RawArticle): ArticleForList {
  return {
    id: Number(raw.id ?? 0),
    title: String(raw.title ?? ""),
    slug: String(raw.slug ?? ""),
    category: raw.category != null && String(raw.category).trim() !== "" ? String(raw.category).trim() : null,
    image: String(raw.image ?? "").trim() || "/Images/Shop/product-pic1.jpg",
    date: String(raw.date ?? ""),
    comments: Number(raw.comments ?? 0),
    content: Array.isArray(raw.content) ? raw.content.map(String) : [],
  };
}

export default function NewsPageClient({ articles, categories, selectedCategory = "" }: NewsPageClientProps) {
  const categoryParam = selectedCategory;

  // لاگ همیشگی: ببین کامپوننت اجرا شده و چند تا مقاله از سرور اومده
  console.log("[NewsPageClient] mounted — articles from server:", articles.length, "skip client fetch:", articles.length > 0);

  /** وقتی سرور داده نداده (مثلاً بیلد استاتیک بدون دسترسی به API)، از کلاینت از همان API می‌گیریم */
  const [clientArticles, setClientArticles] = useState<ArticleForList[] | null>(null);
  const [clientError, setClientError] = useState(false);

  useEffect(() => {
    if (articles.length > 0) {
      console.log("[NewsPageClient] Using server articles, no fetch.");
      return;
    }
    let cancelled = false;
    fetch(ARTICLES_API_URL, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data: unknown) => {
        if (!cancelled) {
          const rawList = parseArticlesResponse(data);
          setClientArticles(rawList.map(toArticleForList));
          setClientError(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setClientError(true);
          setClientArticles([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [articles.length]);

  const effectiveArticles =
    articles.length > 0 ? articles : (clientArticles ?? []);
  const effectiveCategories =
    articles.length > 0
      ? categories
      : Array.from(
          new Set(
            (clientArticles ?? [])
              .map((a) => a.category)
              .filter((c): c is string => c != null && c.trim() !== "")
          )
        ).sort((a, b) => a.localeCompare(b, "fa"));

  const filteredArticles = effectiveArticles;

  const featuredArticles = useMemo(
    () =>
      filteredArticles.slice(0, 5).map((a) => ({
        id: a.id,
        title: a.title,
        category: a.category ?? "—",
        comments: a.comments ?? 0,
        image: a.image || "/Images/Shop/product-pic1.jpg",
        link: `/news/${encodeURIComponent(a.slug)}`,
        slug: a.slug,
      })),
    [filteredArticles]
  );

  const latestArticles = useMemo(
    () =>
      filteredArticles.map((a) => ({
        id: a.id,
        title: a.title,
        description: stripHtml(a.content?.[0] ?? "").substring(0, 150) || a.title,
        date: a.date ?? "",
        image: a.image || "/Images/Shop/product-pic1.jpg",
        link: `/news/${encodeURIComponent(a.slug)}`,
        slug: a.slug,
      })),
    [filteredArticles]
  );

  const [latestPage, setLatestPage] = useState(1);
  const totalLatestPages = Math.max(1, Math.ceil(latestArticles.length / LATEST_ARTICLES_PER_PAGE));
  const paginatedLatest = useMemo(
    () =>
      latestArticles.slice(
        (latestPage - 1) * LATEST_ARTICLES_PER_PAGE,
        latestPage * LATEST_ARTICLES_PER_PAGE
      ),
    [latestArticles, latestPage]
  );

  useEffect(() => {
    queueMicrotask(() => setLatestPage(1));
  }, [categoryParam]);

  useEffect(() => {
    if (latestPage > totalLatestPages) {
      queueMicrotask(() => setLatestPage(totalLatestPages));
    }
  }, [latestPage, totalLatestPages]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-3 order-2 lg:order-2">
          {clientError ? (
            <p className="text-gray-500 text-center py-8">
              بارگذاری مقالات ناموفق بود. اتصال اینترنت و دسترسی به سرور را بررسی کنید.
            </p>
          ) : filteredArticles.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {categoryParam ? `مقاله‌ای در دسته «${categoryParam}» یافت نشد.` : "مقاله‌ای یافت نشد."}
            </p>
          ) : (
            <FeaturedArticles articles={featuredArticles} />
          )}
        </div>
        <aside className="lg:col-span-1 order-1 lg:order-1">
          <NewsSidebar categories={effectiveCategories} selectedCategory={categoryParam || undefined} />
        </aside>
      </div>
      <div className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        {filteredArticles.length > 0 ? (
          <>
            <LatestArticlesSection articles={paginatedLatest} />
            {latestArticles.length > LATEST_ARTICLES_PER_PAGE && (
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6 sm:mt-8 mb-8 sm:mb-10">
                <button
                  type="button"
                  onClick={() => setLatestPage((p) => Math.max(1, p - 1))}
                  disabled={latestPage <= 1}
                  className="min-w-[80px] h-10 px-4 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  قبلی
                </button>
                <span className="text-sm text-gray-600 px-2">
                  صفحه {latestPage} از {totalLatestPages}
                </span>
                <button
                  type="button"
                  onClick={() => setLatestPage((p) => Math.min(totalLatestPages, p + 1))}
                  disabled={latestPage >= totalLatestPages}
                  className="min-w-[80px] h-10 px-4 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  بعدی
                </button>
              </div>
            )}
          </>
        ) : null}
      </div>
    </>
  );
}
