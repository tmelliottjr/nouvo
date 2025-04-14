"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      defaultTheme="system"
      themes={["light", "dark", "night-owl"]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
