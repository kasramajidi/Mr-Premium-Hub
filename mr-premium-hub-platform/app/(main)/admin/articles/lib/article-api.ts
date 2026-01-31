const API_BASE = "https://mrpremiumhub.org/api.ashx";

export interface ApiArticleRelatedService {
  title: string;
  description: string;
  image: string;
  link: string;
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
  Relatedservice?: ApiArticleRelatedService;
}

function handleResponse<T>(res: Response): Promise<T> {
  return res.json().then((data) => {
    if (!res.ok) {
      const msg =
        (typeof (data as { error?: string }).error === "string" && (data as { error?: string }).error) ||
        (typeof (data as { message?: string }).message === "string" && (data as { message?: string }).message) ||
        `خطای سرور (کد: ${res.status})`;
      throw new Error(msg);
    }
    return data as T;
  });
}

export async function getArticles(): Promise<ApiArticle[]> {
  const res = await fetch(`${API_BASE}?action=Article&_t=${Date.now()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  const data = await handleResponse<ApiArticle[] | { error?: string }>(res);
  if (Array.isArray(data)) return data;
  return [];
}

export async function createArticle(payload: {
  title: string;
  slug: string;
  category: string;
  image?: string;
  date?: string;
  comments?: number;
  content: string[];
  headings: string[];
  relatedService?: ApiArticleRelatedService;
}): Promise<ApiArticle> {
  const res = await fetch(`${API_BASE}?action=Article`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: payload.title,
      slug: payload.slug,
      category: payload.category || null,
      image: payload.image ?? "/Images/gift-card-guide.jpg",
      date: payload.date ?? new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
      comments: payload.comments ?? 0,
      content: payload.content,
      headings: payload.headings,
      relatedService: payload.relatedService,
    }),
  });
  return handleResponse<ApiArticle>(res);
}

export async function updateArticle(payload: {
  id: number;
  title?: string;
  slug?: string;
  category?: string | null;
  image?: string;
  date?: string;
  comments?: number;
  content?: string[];
  headings?: string[];
  relatedService?: ApiArticleRelatedService;
}): Promise<ApiArticle> {
  const body: Record<string, unknown> = { Id: payload.id };
  if (payload.title !== undefined) body.Title = payload.title;
  if (payload.slug !== undefined) body.Slug = payload.slug;
  if (payload.category !== undefined) body.Category = payload.category;
  if (payload.image !== undefined) body.Image = payload.image;
  if (payload.date !== undefined) body.Date = payload.date;
  if (payload.comments !== undefined) body.Comments = payload.comments;
  if (payload.content !== undefined) body.Content = payload.content;
  if (payload.headings !== undefined) body.Headings = payload.headings;
  if (payload.relatedService !== undefined) body.Relatedservice = payload.relatedService;

  const res = await fetch(`${API_BASE}?action=Article`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse<ApiArticle>(res);
}

export async function deleteArticle(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}?action=Article&id=${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  await handleResponse<unknown>(res);
}
