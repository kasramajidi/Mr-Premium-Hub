import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "پنل مدیریت | مستر پریمیوم هاب",
  description: "پنل مدیریت مستر پریمیوم هاب",
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