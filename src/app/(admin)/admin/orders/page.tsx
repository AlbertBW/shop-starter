import { redirect } from "next/navigation";
import { checkRole } from "~/utils/roles";

export default async function OrdersPage() {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    redirect("/");
  }

  return <div>AdminDashboard</div>;
}
