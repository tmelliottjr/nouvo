import { ThemeProvider } from "@/components/themes/theme-provider";

export default function PublicNoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <main className="h-screen bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
        {children}
      </main>
    </ThemeProvider>
  );
}
