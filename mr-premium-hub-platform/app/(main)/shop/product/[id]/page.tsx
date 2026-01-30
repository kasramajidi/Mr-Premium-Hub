import type { Metadata } from "next";
import ProductDetails from "../../components/ProductDetails";
import { products } from "../../components/productsData";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const productId = parseInt(id, 10);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return {
      title: "محصول یافت نشد",
      description: "محصول مورد نظر یافت نشد",
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com";
  const productUrl = `${siteUrl}/shop/product/${product.id}`;
  const productImage = product.image.startsWith("/")
    ? `${siteUrl}${product.image}`
    : product.image;

  return {
    title: `${product.name} | مسترپریمیوم هاب`,
    description:
      product.description || `${product.name} از برند ${product.brand}`,
    keywords: [
      product.name,
      product.brand,
      product.category,
      "گیفت کارت",
      "مستر پریمیوم هاب",
    ],
    openGraph: {
      title: `${product.name} | مسترپریمیوم هاب`,
      description:
        product.description || `${product.name} از برند ${product.brand}`,
      type: "website",
      images: [
        {
          url: productImage,
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: `/shop/product/${product.id}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id, 10);
  const product = products.find((p) => p.id === productId);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com";
  const productUrl = `${siteUrl}/shop/product/${product?.id}`;
  const productImage = product?.image.startsWith("/")
    ? `${siteUrl}${product.image}`
    : product?.image || "";

  const productJsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: productImage,
        brand: {
          "@type": "Brand",
          name: product.brand,
        },
        category: product.category,
        offers: {
          "@type": "Offer",
          url: productUrl,
          priceCurrency: "IRR",
          price: product.price.toString(),
          availability: "https://schema.org/InStock",
          ...(product.originalPrice && {
            priceValidUntil: new Date(
              Date.now() + 365 * 24 * 60 * 60 * 1000
            ).toISOString(),
          }),
        },
        aggregateRating:
          product.reviews > 0
            ? {
                "@type": "AggregateRating",
                ratingValue: product.rating.toString(),
                reviewCount: product.reviews.toString(),
              }
            : undefined,
      }
    : null;

  return (
    <>
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      <ProductDetails />
    </>
  );
}
