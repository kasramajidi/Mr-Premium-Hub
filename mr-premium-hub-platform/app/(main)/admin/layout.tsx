import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "پنل مدیریت | مسترپریمیوم هاب",
  description: "پنل مدیریت مسترپریمیوم هاب",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
