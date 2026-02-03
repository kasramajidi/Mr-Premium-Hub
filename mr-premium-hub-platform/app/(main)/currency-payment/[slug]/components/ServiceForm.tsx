"use client";

import { useState } from "react";
import { Service } from "../../components/servicesData";

/** از پروکسی سمت سرور استفاده می‌کنیم تا CORS مانع ارسال نشود */
const API_URL = "/api/auth-proxy?action=ExamRegister";

interface ServiceFormProps {
  service: Service;
}

export default function ServiceForm({ service }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");
    try {
      const payload = {
        title: formData.subject.trim() || service.label,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        comment: formData.description,
        date: new Date().toISOString(),
      };
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(typeof data?.error === "string" ? data.error : "خطا در ارسال درخواست");
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", description: "" });
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
      <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right">
        درخواست {service.label}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm text-gray-700 mb-1.5 text-right">
              نام و نام خانوادگی
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
              placeholder="نام خود را وارد کنید"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm text-gray-700 mb-1.5 text-right">
              ایمیل
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
              placeholder="email@example.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-1.5 text-right">
            شماره تماس
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
            placeholder="09123456789"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-1.5 text-right">
            موضوع
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
            placeholder="موضوع درخواست را وارد کنید"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-1.5 text-right">
            توضیحات (اختیاری)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent resize-none text-right"
            placeholder="توضیحات اضافی را اینجا وارد کنید"
          />
        </div>
        {submitStatus === "success" && (
          <p className="text-sm text-green-600 text-right">
            درخواست شما با موفقیت ارسال شد.
          </p>
        )}
        {submitStatus === "error" && (
          <p className="text-sm text-red-600 text-right">{errorMessage}</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full text-white text-xs sm:text-sm font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-opacity hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#ff5538' }}
        >
          {submitting ? "در حال ارسال..." : "ارسال درخواست"}
        </button>
      </form>
    </div>
  );
}

