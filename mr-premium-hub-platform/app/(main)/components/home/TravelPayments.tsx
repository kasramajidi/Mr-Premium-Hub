"use client";

import { HiBuildingOffice, HiPaperAirplane } from "react-icons/hi2";

interface TravelCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const travelServices: TravelCard[] = [
  {
    icon: (
      <HiBuildingOffice className="text-4xl sm:text-5xl md:text-6xl text-gray-700" />
    ),
    title: "پرداخت هتل خارجی",
    description: "",
  },
  {
    icon: (
      <HiPaperAirplane className="text-4xl sm:text-5xl md:text-6xl text-gray-700" />
    ),
    title: "خرید بلیت هواپیما خارجی",
    description: "",
  },
];

export default function TravelPayments() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 text-center mb-8 md:mb-12">
          پرداخت مسافرتی
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
          {travelServices.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 transition-opacity hover:opacity-80 cursor-pointer text-center"
            >
              <div className="mb-3 flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-base font-medium text-gray-900">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
