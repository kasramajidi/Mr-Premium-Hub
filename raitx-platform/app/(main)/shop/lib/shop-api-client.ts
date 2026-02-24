/**
 * فقط برای کلاینت — fetch مستقیم به API فروشگاه (بدون وابستگی به Node/fs).
 * وقتی سرور در بیلد استاتیک داده نداده، این ماژول از مرورگر محصولات را می‌گیرد.
 */
import type { ShopProduct } from "./shop-api";

export const SHOP_API_URL = "https://mrpremiumhub.org/api.ashx?action=shop";

/** پارس پاسخ API به لیست ShopProduct — منطق هم‌ساز با shop-api بدون وابستگی به Node */
function parseShopResponse(data: unknown): ShopProduct[] {
  const raw = Array.isArray(data)
    ? data
    : (data && typeof data === "object"
        ? (data as Record<string, unknown>).data ??
          (data as Record<string, unknown>).list ??
          (data as Record<string, unknown>).items ??
          []
        : []);
  if (!Array.isArray(raw)) return [];
  return raw.map((item: Record<string, unknown>, i: number) => {
    const id = Number(item.id ?? item.ID ?? i + 1) || i + 1;
    const name = String(item.title ?? item.name ?? item.Name ?? "—");
    const groups = String(item.groups ?? item.category ?? item.Category ?? "—");
    const price = Math.max(0, Number(item.price ?? item.Price ?? 0));
    const image =
      String(item.img ?? item.image ?? "").trim() || "/Images/Shop/product-pic1.jpg";
    const rawText = String(item.text ?? "").trim() || "خرید از ريتكس.";
    const description =
      rawText
        .replace(/\r\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .split("\n")
        .map((l) => (l as string).trim())
        .filter(Boolean)
        .join("\n\n") || "خرید از ريتكس.";
    const mainCategoryId = ((): ShopProduct["mainCategoryId"] => {
      const g = groups.toLowerCase();
      if (/پرداخت|ارزی|ویزا|مستر|پی پال/.test(groups)) return "currency";
      if (/آزمون|تافل|آیلتس|جی آر ای|ثبت نام/.test(groups)) return "exams";
      if (/سفارت|ویزا|وقت مصاحبه/.test(groups)) return "embassy";
      if (/اپلای|دانشگاه|شهریه|اپلیکیشن/.test(groups)) return "apply";
      if (/گیفت|کارت/.test(groups)) return "giftcards";
      return "other";
    })();
    return {
      id,
      name,
      price,
      image,
      rating: 5,
      reviews: 0,
      isNew: false,
      category: groups,
      brand: "—",
      createdAt: new Date().toISOString().slice(0, 10),
      sales: Math.max(0, Number(item.value ?? item.stock ?? 0)),
      description,
      mainCategoryId,
      productType: "service",
    };
  });
}

export async function fetchShopProductsClient(): Promise<ShopProduct[]> {
  const res = await fetch(SHOP_API_URL, { cache: "no-store" });
  if (!res.ok) return [];
  const data = (await res.json()) as unknown;
  return parseShopResponse(data);
}
