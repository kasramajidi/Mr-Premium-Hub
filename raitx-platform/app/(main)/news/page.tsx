import type { Metadata } from "next";
import { NewsPageClient } from "./components";
import { getArticlesFromApi } from "./lib/articles-api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com";

export const metadata: Metadata = {
  title: "اخبار و مقالات | ريتكس",
  description:
    "آخرین اخبار و مقالات ريتكس در زمینه خدمات ارزی، پرداخت ارزی، پی‌پال، مسترکارت و ویزا",
  keywords: [
    "اخبار",
    "مقالات",
    "ريتكس",
    "خدمات ارزی",
    "پرداخت ارزی",
  ],
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: `${siteUrl}/news`,
    siteName: "ريتكس",
    title: "اخبار و مقالات | ريتكس",
    description:
      "آخرین اخبار و مقالات ريتكس در زمینه خدمات ارزی، پرداخت ارزی، پی‌پال، مسترکارت و ویزا",
    images: [
      {
        url: `${siteUrl}/Images/Baner/Layer 5.png`,
        width: 1200,
        height: 630,
        alt: "اخبار و مقالات ريتكس",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "اخبار و مقالات | ريتكس",
    description: "آخرین اخبار و مقالات ريتکس در زمینه خدمات ارزی و پرداخت ارزی",
  },
};

type SearchParams = Promise<{ category?: string }> | { category?: string };

export default async function NewsPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  // در بیلد استاتیک (output: export) استفاده از searchParams روت را داینامیک می‌کند و بیلد می‌شکند.
  // فقط در حالت عادی (dev/سرور) از searchParams استفاده می‌کنیم.
  const isStaticExport = process.env.BUILD_STATIC === "1";
  let categoryParam = "";
  if (!isStaticExport && searchParams != null) {
    const resolved = "then" in searchParams ? await searchParams : searchParams;
    categoryParam = (resolved?.category ?? "").trim();
  }

  let apiArticles: Awaited<ReturnType<typeof getArticlesFromApi>> = [];
  try {
    apiArticles = await getArticlesFromApi();
    if (process.env.BUILD_STATIC === "1") {
      console.log("[build:static] news/page — using", apiArticles.length, "articles for static HTML");
    }
  } catch (_e) {
    apiArticles = [];
  }

  const articlesForClient = apiArticles.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    category: a.category,
    image: a.image || "/Images/Shop/product-pic1.jpg",
    date: a.date ?? "",
    comments: a.comments ?? 0,
    content: a.content ?? [],
  }));

  const categoriesFromArticles = Array.from(
    new Set(
      apiArticles
        .map((a) => a.category)
        .filter((c): c is string => c != null && String(c).trim() !== "")
    )
  ).sort((a, b) => a.localeCompare(b, "fa"));

  // در بیلد استاتیک همیشه همهٔ مقالات را پاس می‌دهیم؛ فیلتر دسته در کلاینت با useSearchParams انجام می‌شود.
  const articlesToPass = isStaticExport ? articlesForClient : (categoryParam === "" ? articlesForClient : articlesForClient.filter((a) => (a.category ?? "").trim() === categoryParam));

  if (process.env.NODE_ENV === "development" && articlesForClient.length === 0) {
    console.warn("[news/page] No articles from API. Check network and https://mrpremiumhub.org/api.ashx?action=Article");
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-4 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-20 pb-4 sm:pb-6 md:pb-8 lg:pb-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <NewsPageClient
          articles={articlesToPass}
          categories={categoriesFromArticles}
          selectedCategory={categoryParam || undefined}
        />
      </div>
    </main>
  );
}
