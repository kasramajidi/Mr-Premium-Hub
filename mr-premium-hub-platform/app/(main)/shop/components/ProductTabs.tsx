"use client";

import React, { useState, useMemo } from "react";
import TabNavigation from "./tabs/TabNavigation";
import ProductIntroduction from "./tabs/ProductIntroduction";
import SpecificationsSection from "./tabs/SpecificationsSection";
import ReviewsSection from "./tabs/ReviewsSection";

interface TabContentProps {
  activeTab: string;
}

const TabContent = React.memo<TabContentProps>(({ activeTab }) => {
  const tabComponents = useMemo(
    () => ({
      introduction: <ProductIntroduction />,
      specifications: <SpecificationsSection />,
      reviews: <ReviewsSection />,
    }),
    []
  );

  return (
    (tabComponents[
      activeTab as keyof typeof tabComponents
    ] as React.ReactElement) || null
  );
});

TabContent.displayName = "TabContent";

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("introduction");

  const tabs = useMemo(
    () => [
      { id: "introduction", title: "معرفی محصول" },
      { id: "specifications", title: "مشخصات فنی" },
      { id: "reviews", title: "نظرات کاربران" },
    ],
    []
  );

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="mt-20">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <div className="bg-white rounded-br-2xl rounded-bl-2xl p-4 sm:p-6 border-t-0">
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
}
