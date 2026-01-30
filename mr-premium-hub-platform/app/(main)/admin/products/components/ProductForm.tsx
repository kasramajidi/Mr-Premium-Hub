"use client";

import React, { useState } from "react";

export interface ShopApiPayload {
  img?: string;
  video?: string;
  price?: number;
  title?: string;
  groups?: string;
  value?: number;
  search?: string;
  UserComments?: string;
  RelatedProducts?: string;
  Specifications?: string;
  Score?: number;
  NumberOfComments?: number;
  brand?: string;
  text?: string;
  inPersonDelivery?: boolean;
}

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    category: string;
    price: string;
    stock: number;
    description?: string;
  };
  onClose: () => void;
  onSave: (data: ShopApiPayload) => void;
}

const API_URL = "https://mrpremiumhub.org/api.ashx?action=shop";

export default function ProductForm({
  product,
  onClose,
  onSave,
}: ProductFormProps) {
  const parsePrice = (p: string) => {
    const num = p.replace(/[^\d]/g, "");
    return num ? num : "";
  };

  const [formData, setFormData] = useState<Record<string, string | number | boolean>>({
    img: "",
    video: "",
    price: product?.price ? parsePrice(product.price) : "",
    title: product?.name || "",
    groups: product?.category || "",
    value: product?.stock ?? 0,
    search: "",
    UserComments: "",
    RelatedProducts: "",
    Specifications: "",
    Score: "",
    NumberOfComments: "",
    brand: "",
    text: product?.description || "",
    inPersonDelivery: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updateField = (key: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setError(null);
    setSuccess(null);
  };

  const buildPayload = (): ShopApiPayload => {
    const payload: ShopApiPayload = {};
    if (formData.img) payload.img = String(formData.img);
    if (formData.video) payload.video = String(formData.video);
    if (formData.price !== "" && formData.price !== undefined)
      payload.price = Number(formData.price) || 0;
    if (formData.title) payload.title = String(formData.title);
    if (formData.groups) payload.groups = String(formData.groups);
    if (formData.value !== "" && formData.value !== undefined)
      payload.value = Number(formData.value) ?? 0;
    if (formData.search) payload.search = String(formData.search);
    if (formData.UserComments) payload.UserComments = String(formData.UserComments);
    if (formData.RelatedProducts) payload.RelatedProducts = String(formData.RelatedProducts);
    if (formData.Specifications) payload.Specifications = String(formData.Specifications);
    if (formData.Score !== "" && formData.Score !== undefined)
      payload.Score = Number(formData.Score);
    if (formData.NumberOfComments !== "" && formData.NumberOfComments !== undefined)
      payload.NumberOfComments = Number(formData.NumberOfComments);
    if (formData.brand) payload.brand = String(formData.brand);
    if (formData.text) payload.text = String(formData.text);
    payload.inPersonDelivery = Boolean(formData.inPersonDelivery);
    return payload;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    const payload = buildPayload();

    try {
      let res: Response;
      try {
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (fetchErr) {
        const cause =
          fetchErr instanceof TypeError && fetchErr.message.includes("fetch")
            ? "خطای اتصال به اینترنت یا مسدود بودن دسترسی (CORS)"
            : fetchErr instanceof Error
              ? fetchErr.message
              : "خطا در ارسال درخواست به سرور";
        throw new Error(cause);
      }

      let data: Record<string, unknown> = {};
      try {
        const parsed = await res.json();
        data = typeof parsed === "object" && parsed != null ? parsed : {};
      } catch {
        data = {};
      }

      const isFailed = !res.ok || data.statu === 0;

      if (isFailed) {
        const errMsg =
          (typeof data.error === "string" && data.error) ||
          (typeof data.message === "string" && data.message) ||
          (typeof data.msg === "string" && data.msg) ||
          (typeof data.reason === "string" && data.reason) ||
          (typeof data.detail === "string" && data.detail) ||
          (data.statu === 0 ? "سرور ثبت را رد کرد (statu: 0)" : `خطای سرور (کد: ${res.status})`);
        throw new Error(errMsg);
      }

      setSuccess("محصول با موفقیت ثبت شد");
      onSave(payload);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      const cause =
        err instanceof Error
          ? err.message
          : "خطای نامشخص. لطفاً دوباره تلاش کنید.";
      setError(cause);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-3 text-right text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ff5538]/30 focus:border-[#ff5538] transition-all text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";
  const sectionTitle = "text-base font-medium text-gray-800 mb-3 pb-2 border-b border-gray-100";

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-xl">
          <h2 className="text-xl font-medium text-gray-900">
            {product ? "ویرایش محصول" : "افزودن محصول جدید"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {success && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm">
              <span className="shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">✓</span>
              <span>{success}</span>
            </div>
          )}
          {error && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              <span className="shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">!</span>
              <div>
                <p className="font-medium mb-0.5">علت خطا:</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          <section>
            <h3 className={sectionTitle}>اطلاعات اصلی محصول</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelClass}>عنوان محصول</label>
                <input
                  type="text"
                  value={String(formData.title ?? "")}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="مثال: گیفت کارت گوگل پلی ۱۰ دلاری"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>دسته‌بندی محصول</label>
                <input
                  type="text"
                  value={String(formData.groups ?? "")}
                  onChange={(e) => updateField("groups", e.target.value)}
                  placeholder="مثال: گیفت کارت"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>برند محصول</label>
                <input
                  type="text"
                  value={String(formData.brand ?? "")}
                  onChange={(e) => updateField("brand", e.target.value)}
                  placeholder="مثال: گوگل"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>قیمت محصول (تومان)</label>
                <input
                  type="text"
                  value={String(formData.price ?? "")}
                  onChange={(e) => updateField("price", e.target.value)}
                  placeholder="مثال: 25000000"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>ارزش یا موجودی</label>
                <input
                  type="number"
                  value={formData.value === "" ? "" : Number(formData.value)}
                  onChange={(e) =>
                    updateField("value", parseInt(e.target.value) || 0)
                  }
                  placeholder="مثال: 1000"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className={sectionTitle}>تصاویر و ویدیوی محصول</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>آدرس تصویر محصول</label>
                <input
                  type="text"
                  value={String(formData.img ?? "")}
                  onChange={(e) => updateField("img", e.target.value)}
                  placeholder="مثال: https://example.com/image.jpg"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>آدرس ویدیوی محصول</label>
                <input
                  type="text"
                  value={String(formData.video ?? "")}
                  onChange={(e) => updateField("video", e.target.value)}
                  placeholder="مثال: https://example.com/video.mp4"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className={sectionTitle}>توضیحات و مشخصات فنی محصول</h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>توضیحات محصول</label>
                <textarea
                  rows={3}
                  value={String(formData.text ?? "")}
                  onChange={(e) => updateField("text", e.target.value)}
                  placeholder="توضیح کامل درباره محصول برای نمایش به کاربر"
                  className={`${inputClass} h-auto py-2 min-h-[80px] resize-none`}
                />
              </div>
              <div>
                <label className={labelClass}>مشخصات فنی محصول</label>
                <textarea
                  rows={2}
                  value={String(formData.Specifications ?? "")}
                  onChange={(e) => updateField("Specifications", e.target.value)}
                  placeholder="مثال: ظرفیت، نوع، کشور سازنده"
                  className={`${inputClass} h-auto py-2 min-h-[60px] resize-none`}
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className={sectionTitle}>امتیاز و نظرات کاربران</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>امتیاز محصول (از ۵)</label>
                <input
                  type="text"
                  value={String(formData.Score ?? "")}
                  onChange={(e) => updateField("Score", e.target.value)}
                  placeholder="مثال: 4.7"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>تعداد نظرات کاربران</label>
                <input
                  type="number"
                  value={formData.NumberOfComments === "" ? "" : Number(formData.NumberOfComments)}
                  onChange={(e) =>
                    updateField("NumberOfComments", parseInt(e.target.value) || 0)
                  }
                  placeholder="مثال: 101"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>متن نظرات کاربران</label>
                <input
                  type="text"
                  value={String(formData.UserComments ?? "")}
                  onChange={(e) => updateField("UserComments", e.target.value)}
                  placeholder="خلاصه یا لیست نظرات کاربران درباره محصول"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className={sectionTitle}>سایر تنظیمات محصول</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>کلمات کلیدی جستجو</label>
                <input
                  type="text"
                  value={String(formData.search ?? "")}
                  onChange={(e) => updateField("search", e.target.value)}
                  placeholder="کلمات کلیدی برای جستجوی محصول در سایت"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>محصولات مرتبط</label>
                <input
                  type="text"
                  value={String(formData.RelatedProducts ?? "")}
                  onChange={(e) => updateField("RelatedProducts", e.target.value)}
                  placeholder="لیست یا شناسه محصولات پیشنهادی مرتبط"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="inPersonDelivery"
                  checked={Boolean(formData.inPersonDelivery)}
                  onChange={(e) =>
                    updateField("inPersonDelivery", e.target.checked)
                  }
                  className="w-4 h-4 rounded border-gray-300 text-[#ff5538] focus:ring-[#ff5538]"
                />
                <label htmlFor="inPersonDelivery" className={labelClass + " mb-0"}>
                  امکان تحویل حضوری محصول
                </label>
              </div>
            </div>
          </section>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#ff5538] text-white px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "در حال ثبت..." : "ثبت"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
