"use client";

import React, { useMemo } from "react";

const SpecificationsSection = React.memo(() => {
  const specifications = useMemo(
    () => [
      { title: "رنگ:", content: "بنفش، سفید، قرمز، مشکی" },
      { title: "سازگاری:", content: "اندروید ۶.۰ و بالاتر" },
      { title: "توضیحات میکروفون:", content: "نیاز به منبع تغذیه" },
      { title: "ابعاد / وزن :", content: "۴۵ در ۶۸" },
      { title: "نشانگر LED", content: "ندارد" },
      {
        title: "گارانتی",
        content:
          "گارانتی ۱۲ ماهه رایانه همراه گارانتی ۱۸ ماهه رایانه همراه گارانتی ۳۶ ماهه رایانه همراه",
      },
      {
        title: "مقاومت در برابر آب و گرد و غبار / درجه گواهی نامه",
        content: "مقاوم در برابر گرد و غبار با گواهی IPXA",
      },
    ],
    []
  );

  return (
    <section
      className="space-y-0 rounded-2xl overflow-hidden"
      aria-label="مشخصات محصول"
    >
      <dl className="space-y-0">
        {specifications.map((spec, index) => (
          <div
            key={index}
            className={`${
              index % 2 === 0 ? "bg-[#f7f7f7]" : "bg-white"
            } p-3 sm:p-4 rounded-2xl`}
          >
            <dt className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-3">
              {spec.title}
            </dt>
            <dd className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {spec.content}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
});

SpecificationsSection.displayName = "SpecificationsSection";

export default SpecificationsSection;
