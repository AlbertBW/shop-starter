import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./_components/theme-provider";
import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_components/nav";
import { ClerkThemeProvider } from "./_components/clerk-provider";
import { SidebarProvider } from "./_components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { ShoppingCartProvider } from "./_context/shopping-cart-context";
import Footer from "./_components/footer";
import { siteConfig } from "~/config/site";

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
                <SidebarProvider>
                  <div className="flex w-full flex-col">
                    <div className="mx-auto flex min-h-screen w-full max-w-screen-xl flex-col px-6 pb-12">
                      <AppSidebar />
                      <Navbar />
                      {children}
                    </div>
                    <Footer />
                  </div>
                </SidebarProvider>
              </ShoppingCartProvider>
            </TRPCReactProvider>
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
