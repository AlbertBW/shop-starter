import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { ThemeProvider } from "./_components/theme-provider";
import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_components/nav";
import { ClerkThemeProvider } from "./_components/clerk-provider";
import { SidebarProvider } from "./_components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shop Starter Kit",
  description: "A starter kit for building a shop",
  authors: [{ name: "Albert Wales", url: "https://github.com/AlbertBW" }],
  creator: "Albert Wales",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkThemeProvider>
            <TRPCReactProvider>
              <SidebarProvider>
                <div className="mx-auto flex w-full max-w-screen-xl flex-col px-6">
                  <AppSidebar />
                  <Navbar />
                  {children}
                </div>
              </SidebarProvider>
            </TRPCReactProvider>
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
