import { cookies } from "next/headers";
import AdminShell from "./AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session");

  if (!sessionCookie?.value) {
    return <>{children}</>;
  }

  return <AdminShell>{children}</AdminShell>;
}
