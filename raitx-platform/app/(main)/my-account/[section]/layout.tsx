const SECTIONS = [
  "orders",
  "orders-new",
  "orders-refund",
  "downloads",
  "addresses",
  "accountDetails",
  "wallet",
  "wallet-increase",
  "wallet-repay",
  "wallet-payments",
  "wallet-transactions",
  "profile-banks",
  "profile-password",
  "profile-invite",
  "profile-messages",
  "cryptocurrency",
];

export function generateStaticParams() {
  return SECTIONS.map((section) => ({ section }));
}

export default function SectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
