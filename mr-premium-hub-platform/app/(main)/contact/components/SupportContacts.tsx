"use client";

export default function SupportContacts() {
  const supportContacts = [
    {
      label: "پشتیبانی اول",
      number: "02166000779",
      href: "tel:02166000779",
    },
    {
      label: "پشتیبانی دوم",
      number: "09109143134",
      href: "tel:09109143134",
    },
    {
      label: "پشتیبانی سوم",
      number: "09109143135",
      href: "tel:09109143135",
    },
    {
      label: "پشتیبانی چهارم",
      number: "09109143136",
      href: "tel:09109143136",
    },
  ];

  return (
    <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-lg h-[300px] sm:h-[330px] md:h-[380px] lg:h-[420px] xl:h-[450px] flex flex-col">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6">
        تماس با پشتیبانی
      </h2>
      <div className="space-y-2 sm:space-y-3">
        {supportContacts.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            className="block bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs sm:text-sm md:text-base font-medium text-gray-700">
                {contact.label}
              </div>
              <div className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                {contact.number}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

