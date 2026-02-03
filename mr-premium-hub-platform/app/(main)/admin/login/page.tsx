import AdminLoginForm from "./AdminLoginForm";

interface AdminLoginPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const nextRaw = searchParams?.next;
  const nextPath = Array.isArray(nextRaw) ? nextRaw[0] : nextRaw ?? null;
  return <AdminLoginForm nextPath={nextPath} />;
}
