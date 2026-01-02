import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

export default function NewsBanner() {
  return (
    <section className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
      <div className="relative bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#ff5538]/10 to-transparent rounded-full -mr-8 sm:-mr-10 md:-mr-12 -mt-8 sm:-mt-10 md:-mt-12"></div>
        <div className="absolute bottom-0 left-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-tr from-[#1a3760]/10 to-transparent rounded-full -ml-7 sm:-ml-8 md:-ml-10 -mb-7 sm:-mb-8 md:-mb-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-gradient-to-r from-[#ff5538]/5 to-[#1a3760]/5 rounded-full blur-2xl"></div>
        
        <div className="relative px-4 sm:px-5 md:px-6 lg:px-8 py-5 sm:py-6 md:py-7 lg:py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-gradient-to-r from-orange-50 to-orange-100 rounded-full mb-2.5 sm:mb-3 md:mb-4 border border-orange-200/50">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#ff5538] animate-pulse"></div>
              <span className="text-[9px] xs:text-[10px] sm:text-xs text-[#ff5538] font-semibold">همکاری با ما</span>
            </div>
            
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-2.5 md:mb-3 leading-tight px-2" style={{ color: '#1a3760' }}>
              آماده شروع پروژه بعدی خود هستید؟
            </h3>
            
            <p className="text-[11px] xs:text-xs sm:text-sm text-gray-600 mb-4 sm:mb-5 md:mb-6 max-w-xl mx-auto leading-relaxed px-2">
              با ما تماس بگیرید و از خدمات حرفه‌ای ما بهره‌مند شوید
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 px-2">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#ff5538] to-[#ff7744] text-white rounded-lg text-xs sm:text-sm font-semibold shadow-md shadow-[#ff5538]/20 hover:shadow-lg hover:shadow-[#ff5538]/25 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 w-full sm:w-auto"
              >
                <span>تماس با ما</span>
                <HiArrowLeft className="text-xs sm:text-sm rotate-180 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg text-xs sm:text-sm font-semibold hover:border-[#1a3760] hover:text-[#1a3760] transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <span>درباره ما</span>
                <HiArrowLeft className="text-xs sm:text-sm rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

