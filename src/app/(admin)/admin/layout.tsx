import { redirect } from "next/navigation";
import { checkRole } from "~/utils/roles";
import { AdminSidebar } from "../_components/admin-sidebar";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className="flex h-screen w-full flex-row">
      <AdminSidebar />

      <div className="w-full">{children}</div>
    </div>
  );
}
