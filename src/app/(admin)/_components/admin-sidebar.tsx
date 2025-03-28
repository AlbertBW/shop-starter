"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/app/_components/ui/sidebar";
import { Separator } from "~/app/_components/ui/separator";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { MobileThemeToggle } from "~/app/_components/theme-toggle";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  User,
  LogOut,
  Store,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: <Package className="mr-2 h-4 w-4" />,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: <ShoppingCart className="mr-2 h-4 w-4" />,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="fixed border-r">
      <SidebarContent className="bg-card py-6 text-highlight-1">
        <div className="mb-6 flex h-12 items-center justify-center px-4 text-2xl font-bold tracking-tight">
          <Link href={"/admin"} className="inline-flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-highlight-2">
              A
            </div>
            <span className="hidden lg:block">Admin</span>
          </Link>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-semibold uppercase text-muted-foreground">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-1 space-y-1 px-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${pathname === item.url ? "bg-highlight-2/20 text-highlight-1" : "text-muted-foreground"}`}
                    data-active={pathname === item.url}
                  >
                    <Link href={item.url} className="flex w-full items-center">
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-semibold uppercase text-muted-foreground">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-1 space-y-1 px-2">
              <SidebarMenuItem>
                <SignedOut>
                  <SidebarMenuButton
                    asChild
                    className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <a href={"/sign-in"}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Sign In</span>
                    </a>
                  </SidebarMenuButton>
                </SignedOut>
                <SignedIn>
                  <SidebarMenuButton
                    asChild
                    className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Link href={"/user-profile"}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Account</span>
                    </Link>
                  </SidebarMenuButton>
                </SignedIn>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Link href={"/"}>
                    <Store className="mr-2 h-4 w-4" />
                    <span>Go to Store</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <MobileThemeToggle />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SignedIn>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/20"
                  >
                    <SignOutButton>
                      <div className="flex items-center">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                      </div>
                    </SignOutButton>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SignedIn>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
