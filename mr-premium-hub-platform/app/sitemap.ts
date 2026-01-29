import { MetadataRoute } from "next";
import { services } from "./(main)/currency-payment/components/servicesData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com";

  const currencyPaymentServices = services.filter((s) =>
    s.href.startsWith("/currency-payment/")
  );
  const serviceEntries: MetadataRoute.Sitemap = currencyPaymentServices.map(
    (service) => ({
      url: `${baseUrl}/currency-payment/${service.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/currency-payment`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...serviceEntries,
  ];
}

