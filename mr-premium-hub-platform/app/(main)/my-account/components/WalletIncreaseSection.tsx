"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Info, Plus } from "lucide-react";

const formatRial = (n: number) => new Intl.NumberFormat("fa-IR").format(n) + " ریال";

export default function WalletIncreaseSection() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"gateway" | "bank">("gateway");
  const [amount, setAmount] = useState("");

  const normalizeAmount = (raw: string) => {
    const fa = "۰۱۲۳۴۵۶۷۸۹";
    const en = raw.replace(/[۰-۹]/g, (d) => String(fa.indexOf(d)));
    return en.replace(/\D/g, "");
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    const value = normalizeAmount(amount);
    if (!value || Number(value) <= 0) return;
    // TODO: اتصال به درگاه پرداخت
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "موجودی کیف پول", btn: true, icon: Plus, href: "/my-account/wallet-increase", text: "افزایش" },
          { label: "موجودی در دسترس", btn: false, icon: null, href: null, text: null, disabled: false },
          { label: "موجودی بلوکه شده", btn: false, icon: null, href: null, text: null, disabled: false },
        ].map(({ label, btn, icon: Icon, href, text, disabled }) => (
          <div
            key={label}
            className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">{label}</span>
              <button type="button" className="text-gray-400 hover:text-gray-600" title="اطلاعات">
                <Info size={14} />
              </button>
            </div>
            <p className="mt-2 text-lg font-bold text-gray-900">{formatRial(0)}</p>
            {btn && text && (
              <button
                type="button"
                onClick={() => href && router.push(href)}
                disabled={disabled}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {Icon && (
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white">
                    <Icon size={14} />
                  </span>
                )}
                {text}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900">افزایش اعتبار</h3>
        <p className="mt-1 text-sm text-gray-500">روش پرداخت خود را انتخاب کنید:</p>
        <div className="mt-4 flex gap-4 border-b border-gray-200">
          <button
            type="button"
            onClick={() => setPaymentMethod("bank")}
            className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
              paymentMethod === "bank"
                ? "border-brand text-brand"
                : "-mb-px border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            واریز به حساب بانکی
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("gateway")}
            className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
              paymentMethod === "gateway"
                ? "border-brand text-brand"
                : "-mb-px border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            افزایش موجودی از طریق درگاه
          </button>
        </div>

        {paymentMethod === "gateway" && (
          <form onSubmit={handlePay} className="mt-6 max-w-md space-y-4">
            <div>
              <label htmlFor="credit-amount" className="block text-sm font-medium text-gray-700">
                مبلغ افزایش اعتبار
              </label>
              <div className="mt-1.5 flex overflow-hidden rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-brand focus-within:border-brand">
                <input
                  id="credit-amount"
                  type="text"
                  inputMode="numeric"
                  value={amount}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const v = raw.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, "");
                    setAmount(v ? new Intl.NumberFormat("fa-IR").format(Number(v)) : "");
                  }}
                  className="min-w-0 flex-1 border-0 bg-white py-2.5 px-4 text-left focus:ring-0"
                  placeholder="0"
                />
                <span className="flex items-center border-r border-gray-200 bg-gray-50 px-4 text-sm text-gray-600">
                  ریال
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="rounded-lg bg-brand px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-hover"
            >
              پرداخت
            </button>
          </form>
        )}

        {paymentMethod === "bank" && (
          <p className="mt-4 text-sm text-gray-500">
            اطلاعات واریز به حساب بانکی به زودی در این بخش قرار می‌گیرد.
          </p>
        )}
      </div>
    </div>
  );
}
