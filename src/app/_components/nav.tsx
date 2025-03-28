"use client";

import { Search, UserCircle2Icon } from "lucide-react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "./ui/sidebar";
import UserButtonClerk from "./user-button";
import ShoppingCartMenu from "./shopping-cart";
import { siteConfig } from "~/config/site";

export const navItems = [
  {
    title: "HOME",
    url: "/",
  },
  {
    title: "PRODUCTS",
    url: "/products",
  },
  {
    title: "ABOUT",
    url: "/about",
  },
  {
    title: "CONTACT",
    url: "/contact",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const firstParam = pathname.split("/")[1];

  return (
    <nav className="no-print py-6">
      <div className="flex flex-row md:pt-4">
        <div className="flex items-center gap-4 text-highlight-1 md:w-full">
          {Object.values(siteConfig.links).map((link) => (
            <Link
              key={link.title}
              href={link.url}
              target="_blank"
              className="hidden md:block"
            >
              <link.icon />
            </Link>
          ))}

          <div className="h-6 w-6 md:hidden">
            <SidebarTrigger />
          </div>
        </div>
        <h3 className="w-full text-center text-2xl font-light uppercase">
          <Link href={"/"}>{siteConfig.name}</Link>
        </h3>
        <div className="flex items-center justify-end gap-4 text-highlight-1 md:w-full">
          <span className="hidden md:block">
            <Search />
          </span>

          <ShoppingCartMenu />

          <span className="hidden md:flex">
            <ModeToggle />
          </span>
          <div className="hidden size-6 md:flex">
            <ClerkLoading>
              <div className="flex size-6 animate-pulse items-center justify-center rounded-full bg-muted-foreground"></div>
            </ClerkLoading>
            <ClerkLoaded>
              <SignedIn>
                <UserButtonClerk />
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <button>
                    <UserCircle2Icon />
                  </button>
                </SignInButton>
              </SignedOut>
            </ClerkLoaded>
          </div>
        </div>
      </div>

      <div className="hidden justify-center py-6 font-extralight tracking-widest md:flex">
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            data-active={firstParam === item.url.split("/")[1]}
            className="mx-4 border-b border-transparent transition-all hover:text-muted-foreground data-[active=true]:border-primary"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}
