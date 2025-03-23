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
  useSidebar,
} from "~/app/_components/ui/sidebar";
import { navItems, socialMediaLinks } from "./nav";
import { Separator } from "./ui/separator";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { MobileThemeToggle } from "./theme-toggle";

export function AppSidebar() {
  const { isMobile } = useSidebar();
  const { theme } = useTheme();

  if (!isMobile) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarContent className="text-highlight-1 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="sr-only">
            Social media links
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-row justify-center">
              {socialMediaLinks.map((item) => (
                <SidebarMenuItem key={item.title} className="w-fit">
                  <SidebarMenuButton
                    asChild
                    className="size-6 w-fit p-0 hover:bg-transparent"
                  >
                    <Link href={item.url} target="_blank">
                      <item.icon className="size-6" />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="bg-highlight-1" />

        <SidebarGroup>
          <SidebarGroupLabel className="sr-only">
            Navigation Links
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-4">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-inherit">
                    <a href={item.url} className="text-xl font-extralight">
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="bg-highlight-1" />

        <SidebarGroup>
          <SidebarGroupLabel className="sr-only">
            Navigation Links
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-4">
              <SidebarMenuItem>
                <SignedOut>
                  <SidebarMenuButton asChild className="hover:bg-inherit">
                    <a href={"/sign-in"} className="text-xl font-extralight">
                      <span>Sign In</span>
                    </a>
                  </SidebarMenuButton>
                </SignedOut>
                <SignedIn>
                  <SidebarMenuButton asChild className="hover:bg-inherit">
                    <a href={"/account"} className="text-xl font-extralight">
                      <span>Account</span>
                    </a>
                  </SidebarMenuButton>
                </SignedIn>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-inherit">
                  <a href={"/cart"} className="text-xl font-extralight">
                    <span>Cart</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-inherit">
                  <MobileThemeToggle />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SignedIn>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="text-xl font-extralight text-red-600 hover:bg-inherit"
                  >
                    <SignOutButton />
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
