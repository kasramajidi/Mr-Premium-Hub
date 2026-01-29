"use client";

interface DomainExtension {
  id: string;
  ext: string;
  price: string;
  description: string;
}

const domainExtensions: DomainExtension[] = [
  { id: "com", ext: "com.", price: "از 10.99$", description: "محبوب‌ترین پسوند دامنه" },
  { id: "net", ext: "net.", price: "از 12.99$", description: "مناسب برای شبکه ها" },
  { id: "org", ext: "org.", price: "از 11.99$", description: "برای سازمانها" },
  { id: "info", ext: "info.", price: "از 9.99$", description: "برای اطلاعات عمومی" },
  { id: "biz", ext: "biz.", price: "از 13.99$", description: "برای کسب و کار" },
  { id: "co", ext: "co.", price: "از 24.99$", description: "جایگزین مدرن .com" },
];

export default function DomainExtensions() {
  return (
    <div className="bg-gray-50 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-6">
      <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3 text-center">
        انواع پسوند دامنه
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 text-center mb-4 sm:mb-6">
        پسوند مناسب برای کسب و کار خود انتخاب کنید
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {domainExtensions.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="text-lg sm:text-xl font-bold text-gray-900">
                {item.ext}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 shrink-0">
                {item.price}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 text-right leading-5">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
