import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header, Footer } from "@/components/layout";

const iransans = localFont({
  src: [
    {
      path: "../public/font/woff2/IRANSansWeb.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/woff2/IRANSansWeb_Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/woff2/IRANSansWeb_Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/woff2/IRANSansWeb_Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-iransans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mr Premium Hub",
    template: "%s | Mr Premium Hub",
  },
  description: "نقد کردن درآمدهای ارزی و پرداخت ارزی آنلاین",
  icons: {
    icon: "/Images/Logo/acee0043-fe87-4b79-bab2-de8e09a1ebd0 (1).png",
    apple: "/Images/Logo/acee0043-fe87-4b79-bab2-de8e09a1ebd0 (1).png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${iransans.variable} antialiased bg-white`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
