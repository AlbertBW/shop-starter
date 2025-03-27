import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./_components/theme-provider";
import { TRPCReactProvider } from "~/trpc/react";
import { ClerkThemeProvider } from "./_components/clerk-provider";
import { siteConfig } from "~/config/site";
import { SidebarProvider } from "./_components/ui/sidebar";
import { ShoppingCartProvider } from "./_context/shopping-cart-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: "Albert Wales", url: "https://github.com/AlbertBW" }],
  creator: "Albert Wales",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="font-inter min-h-svh overflow-y-scroll">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkThemeProvider>
            <TRPCReactProvider>
              <ShoppingCartProvider>
                <SidebarProvider>{children}</SidebarProvider>
              </ShoppingCartProvider>
            </TRPCReactProvider>
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
