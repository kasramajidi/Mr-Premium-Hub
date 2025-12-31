import type { Metadata } from "next";
import ContactMethods from "./components/ContactMethods";
import ContactForm from "./components/ContactForm";
import SupportContacts from "./components/SupportContacts";
import ImagePlaceholder from "./components/ImagePlaceholder";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "راه‌های ارتباطی با مسترپریمیوم هاب - تماس با پشتیبانی و ارسال پیام",
  keywords: [
    "تماس با ما",
    "پشتیبانی",
    "ارتباط با مسترپریمیوم هاب",
    "تماس با پشتیبانی",
  ],
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white py-3 sm:py-4 md:py-6 lg:py-8 xl:py-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-3 lg:gap-4 xl:gap-5">
          {/* Row 1 - Top */}
          <div className="md:col-span-1 flex flex-col gap-2 sm:gap-3 md:gap-3 lg:gap-4">
            <ImagePlaceholder 
              src="/Images/IMG_20251230_185043_308.jpg"
              className="h-[180px] sm:h-[200px] md:h-[244px] lg:h-[267px] xl:h-[280px] w-full" 
              alt="تصویر تماس 1"
            />
            <ImagePlaceholder 
              src="/Images/IMG_20251230_185043_308.jpg"
              className="h-[180px] sm:h-[200px] md:h-[244px] lg:h-[267px] xl:h-[280px] w-full" 
              alt="تصویر تماس 2"
            />
          </div>
          <div className="md:col-span-1">
            <ContactMethods />
          </div>
          <div className="md:col-span-1">
            <ImagePlaceholder 
              src="/Images/IMG_20251230_185043_308.jpg"
              className="h-[368px] sm:h-[412px] md:h-[500px] lg:h-[550px] xl:h-[580px] w-full" 
              alt="تصویر تماس 3"
            />
          </div>

          {/* Row 2 - Middle */}
          <div className="md:col-span-1 flex flex-col gap-2 sm:gap-3 md:gap-3 lg:gap-4">
            <ImagePlaceholder 
              src="/Images/IMG_20251230_185043_308.jpg"
              className="h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] xl:h-[450px] w-full" 
              alt="تصویر تماس 3"
            />
            <ImagePlaceholder 
              src="/Images/IMG_20251230_185043_308.jpg"
              className="h-[200px] sm:h-[220px] md:h-[260px] lg:h-[280px] xl:h-[300px] w-full" 
              alt="تصویر تماس 4"
            />
          </div>
          <div className="md:col-span-1">
            <ContactForm />
          </div>
          <div className="md:col-span-1 flex flex-col gap-2 sm:gap-3 md:gap-3 lg:gap-4">
            <SupportContacts />
            <ImagePlaceholder 
              src="/Images/IMG_20251230_185043_308.jpg"
              className="h-[200px] sm:h-[220px] md:h-[260px] lg:h-[280px] xl:h-[300px] w-full" 
              alt="تصویر تماس 5"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

