const EXTERNAL_API =
  process.env.NEXT_PUBLIC_API_BASE ?? "https://mrpremiumhub.org/api.ashx";

const isStaticBuild = process.env.BUILD_STATIC === "1";

/**
 * آدرس پایهٔ API:
 * - در بیلد استاتیک مستقیماً به دامنهٔ اصلی می‌زند
 * - در سرور Next (SSR) هم مستقیماً به دامنهٔ اصلی می‌زند
 * - در مرورگر از پروکسی داخلی استفاده می‌کند تا مشکل CORS نداشته باشیم
 */
export function getApiBase(): string {
  if (isStaticBuild) {
    return EXTERNAL_API;
  }

  if (typeof window === "undefined") {
    // روی سرور CORS مسئله‌ای نیست، مستقیماً به سرور اصلی می‌زنیم
    return EXTERNAL_API;
  }

  // سمت کلاینت: استفاده از پروکسی داخلی Next برای رفع CORS و ارسال کوکی‌ها
  return "/api/auth-proxy";
}

/**
 * ساختن URL کامل برای API با توجه به محیط اجرا (پروکسی یا دامنهٔ اصلی)
 */
export function getApiUrl(
  query:
    | string
    | URLSearchParams
    | Record<string, string | number | boolean | null | undefined>
): string {
  let qs: string;

  if (typeof query === "string") {
    qs = query.startsWith("?") ? query.slice(1) : query;
  } else if (query instanceof URLSearchParams) {
    qs = query.toString();
  } else {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null || value === "") continue;
      params.set(key, String(value));
    }
    qs = params.toString();
  }

  const base = getApiBase();
  return qs ? `${base}?${qs}` : base;
}

type FetchFromApiOptions = {
  /** حداکثر زمان انتظار برای پاسخ بر حسب میلی‌ثانیه (اختیاری) */
  timeoutMs?: number;
};

/**
 * فراخوانی سادهٔ GET به API با action مشترک و پارامترهای اختیاری.
 * در صورت خطای شبکه یا وضعیت غیر 2xx خطا پرتاب می‌کند تا کدهای بالادستی بتوانند مدیریت کنند.
 */
export async function fetchFromApi(
  action: string,
  params?: Record<string, string | number | boolean | null | undefined>,
  options?: FetchFromApiOptions
): Promise<unknown> {
  const searchParams = new URLSearchParams();
  searchParams.set("action", action);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;
      searchParams.set(key, String(value));
    }
  }

  const url = `${getApiBase()}?${searchParams.toString()}`;

  const hasAbortController = typeof AbortController !== "undefined";
  const controller =
    hasAbortController && options?.timeoutMs
      ? new AbortController()
      : undefined;

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  if (controller && options?.timeoutMs) {
    timeoutId = setTimeout(() => {
      controller.abort();
    }, options.timeoutMs);
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: controller?.signal,
    });

    if (!res.ok) {
      throw new Error(`API request failed: ${res.status} ${res.statusText}`);
    }

    const contentType = res.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      return res.json().catch(() => null);
    }

    const text = await res.text();
    if (!text) return null;

    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

