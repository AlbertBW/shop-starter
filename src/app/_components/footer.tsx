"use client";

import Link from "next/link";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { siteConfig } from "~/config/site";

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-border bg-background px-4 py-6 text-center text-sm text-muted-foreground">
      <div className="space-y-4">
        <div className="flex justify-center space-x-4 text-primary">
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
        </div>
        <div className="flex flex-row items-center justify-evenly">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>

          <div className="flex flex-row items-center justify-center space-x-2">
            <Link
              href="https://github.com/albertbw"
              target="_blank"
              className="flex items-center justify-center space-x-2 hover:text-muted-foreground"
            >
              <SiGithub className="h-5 w-5 text-primary" />
              <span>Albert Wales</span>
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link
              href="https://github.com/albertbw/shop-starter"
              target="_blank"
              className="flex items-center justify-center space-x-2 hover:text-muted-foreground"
            >
              <span>View Repo</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
