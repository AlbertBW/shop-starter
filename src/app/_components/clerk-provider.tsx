"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { type ReactNode } from "react";

export function ClerkThemeProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
        variables: {
          colorBackground: resolvedTheme === "dark" ? "#0a0f0f" : "",
          borderRadius: "0.2rem",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
