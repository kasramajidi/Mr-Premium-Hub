/**
 * همهٔ درخواست‌ها از نقطهٔ ورود واحد API (lib/api-base) با action=Article زده می‌شود.
 */
import { fetchFromApi } from "@/lib/api-base";

/** آیتم نظر مقاله — سازگار با ArticleCommentDisplayItem در article-comments-api */
export interface ArticleCommentItem {
  id: number | string;
  author: string;
  content: string;
  rating: number;
  status: string;
  date?: string;
  userEmail: string;
}

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
  UserComments?: ArticleCommentItem[];
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
  userComments?: ArticleCommentItem[];
  relatedService?: {
    title: string;
    description: string;
    image: string;
    link: string;
  };
}

function normalizeComment(raw: unknown): ArticleCommentItem | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const id = r.id ?? r.ID ?? 0;
  const content = String(r.commentText ?? r.CommentText ?? r.comment ?? r.content ?? "").trim();
  const author = String(r.userName ?? r.UserName ?? r.author ?? "").trim();
  if (!content && !author) return null;
  const dateRaw = r.date ?? r.Date ?? r.createdAt ?? r.CreatedAt;
  let dateStr: string | undefined;
  if (dateRaw != null) dateStr = typeof dateRaw === "number" ? String(dateRaw) : String(dateRaw);
  return {
    id: typeof id === "number" ? id : String(id),
    author: author || "کاربر",
    content,
    rating: Number(r.rating ?? r.Rating ?? 0) || 1,
    status: String(r.status ?? r.Status ?? "pending"),
    date: dateStr,
    userEmail: String(r.userEmail ?? r.UserEmail ?? r.email ?? "").trim(),
  };
}

function normalizeApiArticle(raw: Record<string, unknown>): ApiArticle {
  const category = raw.category ?? raw.Category;
  const cat = category != null && String(category).trim() !== "" ? String(category).trim() : null;
  const userCommentsRaw = raw.UserComments ?? raw.userComments ?? raw.comments;
  const userComments: ArticleCommentItem[] = Array.isArray(userCommentsRaw)
    ? userCommentsRaw.map(normalizeComment).filter((c): c is ArticleCommentItem => c != null)
    : [];
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
    UserComments: userComments.length > 0 ? userComments : undefined,
    Relatedservice: raw.Relatedservice as ApiArticle["Relatedservice"],
  };
}

const isStaticBuild = process.env.BUILD_STATIC === "1";

/** در بیلد استاتیک نتیجهٔ اولین فراخوانی موفق را نگه می‌داریم تا بقیهٔ صفحات همان را استفاده کنند (کمتر به API فشار بیاید و بیلد پایدارتر شود) */
let staticBuildArticlesCache: ApiArticle[] | null = null;

function parseArticlesResponse(data: unknown): ApiArticle[] {
  const rawArray = Array.isArray(data)
    ? data
    : (data && typeof data === "object"
        ? (data as Record<string, unknown>).data ??
          (data as Record<string, unknown>).items ??
          (data as Record<string, unknown>).list ??
          (data as Record<string, unknown>).Articles ??
          []
        : []);
  if (!Array.isArray(rawArray)) return [];
  return rawArray.map((item: unknown) =>
    normalizeApiArticle(typeof item === "object" && item != null ? (item as Record<string, unknown>) : {})
  );
}

async function fetchArticlesOnce(): Promise<ApiArticle[]> {
  try {
    const timeoutMs = isStaticBuild ? 60000 : 30000;
    const data = await fetchFromApi("Article", undefined, { timeoutMs });
    if (data == null) return [];
    return parseArticlesResponse(data);
  } catch {
    throw new Error("Articles fetch failed");
  }
}

/** همیشه با fetch و آدرس کامل مستقیم — بدون فایل کش. در بیلد استاتیک یک بار نتیجه را کش می‌کنیم. */
export async function getArticlesFromApi(): Promise<ApiArticle[]> {
  if (isStaticBuild && staticBuildArticlesCache !== null) {
    return staticBuildArticlesCache;
  }
  const maxAttempts = isStaticBuild ? 3 : 2;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      if (isStaticBuild) {
        console.log("[build:static] Articles API — attempt", attempt, "of", maxAttempts);
      }
      const list = await fetchArticlesOnce();
      if (isStaticBuild) {
        console.log("[build:static] Articles API — got", list.length, "articles");
        if (list.length > 0) {
          staticBuildArticlesCache = list;
          list.slice(0, 5).forEach((a, i) => console.log("[build:static]   ", i + 1, a.title));
          if (list.length > 5) console.log("[build:static]   ... and", list.length - 5, "more");
        }
      }
      if (list.length > 0 || attempt === maxAttempts) return list;
      if (isStaticBuild && attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, 3000));
      }
    } catch (e) {
      if (isStaticBuild) {
        console.warn("[build:static] Articles API attempt", attempt, "failed:", e);
        if (attempt < maxAttempts) await new Promise((r) => setTimeout(r, 3000));
      }
      if (attempt === maxAttempts) {
        if (isStaticBuild) {
          console.warn("[build:static] Articles API fetch failed after " + maxAttempts + " attempts. Pages may be empty.");
        }
        return [];
      }
    }
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
    userComments: a.UserComments?.length ? a.UserComments : undefined,
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
    await fetchFromApi("Article", { id: articleId, incrementView: 1 });
  } catch {
    // در صورت خطا ساکت می‌مانیم تا صفحه خراب نشود
  }
}
