const API_BASE = "https://mrpremiumhub.org/api.ashx";

export interface ApiArticle {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  image: string;
  date: string;
  comments: number;
  content: string[];
  headings: string[];
  Relatedservice?: {
    title: string;
    description: string;
    image: string;
    link: string;
  };
}

export interface ArticleDetail {
  id: number;
  title: string;
  slug: string;
  category: string;
  comments: number;
  date: string;
  image: string;
  content: string[];
  headings: string[];
  relatedService?: {
    title: string;
    description: string;
    image: string;
    link: string;
  };
}

function normalizeApiArticle(raw: Record<string, unknown>): ApiArticle {
  const category = raw.category ?? raw.Category;
  const cat = category != null && String(category).trim() !== "" ? String(category).trim() : null;
  return {
    id: Number(raw.id ?? raw.ID ?? 0),
    title: String(raw.title ?? raw.Title ?? ""),
    slug: String(raw.slug ?? raw.Slug ?? ""),
    category: cat,
    image: String(raw.image ?? raw.Image ?? "").trim() || "/Images/Shop/product-pic1.jpg",
    date: String(raw.date ?? raw.Date ?? ""),
    comments: Number(raw.comments ?? raw.Comments ?? 0),
    content: Array.isArray(raw.content) ? raw.content.map(String) : [],
    headings: Array.isArray(raw.headings) ? raw.headings.map(String) : [],
    Relatedservice: raw.Relatedservice as ApiArticle["Relatedservice"],
  };
}

export async function getArticlesFromApi(): Promise<ApiArticle[]> {
  try {
    const res = await fetch(`${API_BASE}?action=Article&_t=${Date.now()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const data = await res.json();
    const rawArray = Array.isArray(data)
      ? data
      : (data?.data ?? data?.items ?? data?.list ?? []);
    if (Array.isArray(rawArray)) {
      return rawArray.map((item: unknown) =>
        normalizeApiArticle(typeof item === "object" && item != null ? (item as Record<string, unknown>) : {})
      );
    }
  } catch {
    // در صورت خطای شبکه یا API
  }
  return [];
}

function toArticleDetail(a: ApiArticle): ArticleDetail {
  return {
    id: a.id,
    title: a.title,
    slug: a.slug,
    category: a.category ?? "—",
    comments: a.comments ?? 0,
    date: a.date ?? "",
    image: a.image ?? "/Images/Shop/product-pic1.jpg",
    content: a.content ?? [],
    headings: a.headings ?? [],
    relatedService: a.Relatedservice,
  };
}

export async function getArticleBySlugFromApi(slug: string): Promise<ArticleDetail | null> {
  const list = await getArticlesFromApi();
  const decoded = decodeURIComponent(slug);
  const article = list.find(
    (a) => a.slug === slug || a.slug === decoded || encodeURIComponent(a.slug) === slug
  );
  return article ? toArticleDetail(article) : null;
}

export async function getAllArticleSlugsFromApi(): Promise<string[]> {
  const list = await getArticlesFromApi();
  return list.map((a) => a.slug);
}

export async function getRelatedArticlesFromApi(
  currentSlug: string,
  limit: number = 10
): Promise<ArticleDetail[]> {
  const list = await getArticlesFromApi();
  const decoded = decodeURIComponent(currentSlug);
  return list
    .filter(
      (a) => a.slug !== currentSlug && a.slug !== decoded && encodeURIComponent(a.slug) !== currentSlug
    )
    .slice(0, limit)
    .map(toArticleDetail);
}

export function getUniqueCategoriesFromArticles(articles: ApiArticle[]): string[] {
  const set = new Set<string>();
  for (const a of articles) {
    if (a.category && a.category.trim()) set.add(a.category.trim());
  }
  return Array.from(set).sort();
}

/**
 * با هر باز شدن صفحهٔ مقاله، این تابع فراخوانی می‌شود تا شمارندهٔ دیدگاه/بازدید در API یکی اضافه شود.
 * بک‌اند باید یکی از این‌ها را پشتیبانی کند:
 * - GET ?action=Article&id=ID&incrementView=1
 * - GET ?action=ArticleView&id=ID
 */
export async function incrementArticleView(articleId: number): Promise<void> {
  try {
    await fetch(
      `${API_BASE}?action=Article&id=${articleId}&incrementView=1`,
      { method: "GET", cache: "no-store" }
    );
  } catch {
    // در صورت خطا ساکت می‌مانیم تا صفحه خراب نشود
  }
}
