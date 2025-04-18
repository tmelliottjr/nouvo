import { Toaster } from "@/components/ui/toaster";
import { ConfirmProvider } from "@/hooks/use-confirm";
import { AuthProvider } from "@/state-providers/use-auth";
import { TagsSettingsProvider } from "@/state-providers/use-tags-settings";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "../components/themes/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noevo - A Modern Note-Taking Application",
  description: "Organize your thoughts, ideas, and knowledge with Noevo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <TagsSettingsProvider>
              <ConfirmProvider>
                {children}
                <Toaster />
              </ConfirmProvider>
            </TagsSettingsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
