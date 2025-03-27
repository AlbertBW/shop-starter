import { AppSidebar } from "../_components/app-sidebar";
import Footer from "../_components/footer";
import Navbar from "../_components/nav";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full flex-col">
      <div className="mx-auto flex min-h-screen w-full max-w-screen-xl flex-col px-6 pb-12">
        <AppSidebar />
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
}
