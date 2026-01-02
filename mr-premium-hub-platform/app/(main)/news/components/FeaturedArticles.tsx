import Image from "next/image";
import Link from "next/link";

interface FeaturedArticle {
  id: number;
  title: string;
  category: string;
  comments: number;
  image: string;
  link: string;
  slug: string;
}

interface FeaturedArticlesProps {
  articles: FeaturedArticle[];
}

export default function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  return (
    <div className="flex-1 w-full">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-5 md:mb-6 w-full">
        {articles.slice(0, 2).map((article) => (
          <Link
            key={article.id}
            href={`/news/${encodeURIComponent(article.slug)}`}
            className="flex flex-col items-center justify-end py-3 sm:py-4 md:py-5 sm:w-[calc((100%-0.75rem)/2)] w-full h-[140px] xs:h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] rounded-lg bg-gradient-to-br from-orange-300 to-orange-400 text-gray-800 relative overflow-hidden hover:opacity-90 transition-opacity cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className="absolute inset-0 opacity-20">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-end w-full px-2 sm:px-3 md:px-4">
              <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1 text-[10px] xs:text-xs sm:text-sm mb-1.5 sm:mb-2">
                <div className="flex items-center gap-1">
                  <span className="whitespace-nowrap">{article.category}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="whitespace-nowrap">{article.comments} دیدگاه</span>
                </div>
              </div>
              <span className="text-xs xs:text-sm sm:text-base md:text-lg tracking-tighter text-center hover:underline line-clamp-2 px-1">
                {article.title}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 md:gap-5">
        {articles.slice(2).map((article) => (
          <Link
            key={article.id}
            href={`/news/${encodeURIComponent(article.slug)}`}
            className="flex flex-col items-center justify-end py-3 sm:py-4 md:py-5 sm:w-[calc((100%-1.5rem)/3)] md:w-[calc((100%-2rem)/3)] w-full h-[140px] xs:h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] rounded-lg bg-gradient-to-br from-orange-300 to-orange-400 text-gray-800 relative overflow-hidden hover:opacity-90 transition-opacity cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className="absolute inset-0 opacity-20">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-end w-full px-2 sm:px-3 md:px-4">
              <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1 text-[10px] xs:text-xs sm:text-sm mb-1.5 sm:mb-2">
                <div className="flex items-center gap-1">
                  <span className="whitespace-nowrap">{article.category}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="whitespace-nowrap">{article.comments} دیدگاه</span>
                </div>
              </div>
              <span className="text-xs xs:text-sm sm:text-base md:text-lg tracking-tighter text-center hover:underline line-clamp-2 px-1">
                {article.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

