"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "../components/Sidebar";
import WelcomeBox from "../components/WelcomeBox";
import DashboardCards from "../components/DashboardCards";
import AccountEmptyState from "../components/AccountEmptyState";
import AddressesSection from "../components/AddressesSection";
import AccountDetailsSection from "../components/AccountDetailsSection";

export default function MyAccountSectionPage() {
  const router = useRouter();
  const params = useParams();
  const section = params?.section as string;
  const [activeSection, setActiveSection] = useState("dashboard");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (!user) {
        router.push("/auth", { scroll: false });
      }
    }
  }, [router]);

  useEffect(() => {
    if (
      section &&
      ["dashboard", "orders", "downloads", "addresses", "accountDetails"].includes(section)
    ) {
      setActiveSection(section);
    } else if (section) {
      router.push("/my-account", { scroll: false });
    }
  }, [section, router]);

  const handleSectionChange = (newSection: string) => {
    setActiveSection(newSection);
    if (newSection === "dashboard") {
      router.push("/my-account", { scroll: false });
    } else {
      router.push(`/my-account/${newSection}`, { scroll: false });
    }
  };

  if (!mounted) {
    return null;
  }

  let content;
  if (activeSection === "dashboard") {
    content = (
      <div className="flex flex-col gap-6 sm:gap-8">
        <WelcomeBox />
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
            دسترسی سریع
          </h2>
          <DashboardCards />
        </div>
      </div>
    );
  } else if (activeSection === "orders") {
    content = (
      <AccountEmptyState
        message="هنوز سفارشی ثبت نکرده‌اید. از فروشگاه یا خدمات پرداخت ارزی می‌توانید خرید کنید."
        buttonText="مرور فروشگاه"
        onButtonClick={() => {
          handleSectionChange("dashboard");
          router.push("/shop", { scroll: false });
        }}
      />
    );
  } else if (activeSection === "downloads") {
    content = (
      <AccountEmptyState
        message="محصول دانلودی برای شما ثبت نشده است."
        buttonText="مشاهده فروشگاه"
        onButtonClick={() => {
          handleSectionChange("dashboard");
          router.push("/shop", { scroll: false });
        }}
      />
    );
  } else if (activeSection === "addresses") {
    content = <AddressesSection />;
  } else if (activeSection === "accountDetails") {
    content = <AccountDetailsSection />;
  } else {
    content = (
      <AccountEmptyState
        message="این بخش به زودی در دسترس خواهد بود."
        buttonText="بازگشت به پیشخوان"
        onButtonClick={() => handleSectionChange("dashboard")}
        isComingSoon={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-50/95 to-gray-100/80">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              حساب من
            </h1>
            <div className="mt-1.5 h-0.5 w-12 rounded-full bg-[#ff5538]" />
            <p className="mt-3 text-sm text-gray-500">
              پیشخوان و تنظیمات حساب کاربری
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className="lg:w-56 lg:shrink-0 lg:sticky lg:top-8 lg:self-start">
            <Sidebar
              active={activeSection}
              onSectionChange={handleSectionChange}
            />
          </aside>
          <main className="min-w-0 flex-1">
            <div className="rounded-2xl border border-gray-200/90 bg-white/95 p-5 sm:p-6 md:p-8 shadow-sm shadow-gray-200/50 min-h-[360px] backdrop-blur-sm">
              {content}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
