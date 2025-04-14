import { NotesProvider } from "@/state-providers/use-notes";
import { TagsSettingsProvider } from "@/state-providers/use-tags-settings";
import type { Metadata } from "next";
// Import the client component - fixed import path
import { SettingsLayoutClient } from "../../components/settings/settings-layout-client";

// Metadata can only be exported from Server Components
export const metadata: Metadata = {
  title: "Settings | Noevo",
  description: "Configure your Noevo app settings",
};

// Server Component
export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotesProvider>
      <TagsSettingsProvider>
        <SettingsLayoutClient>{children}</SettingsLayoutClient>
      </TagsSettingsProvider>
    </NotesProvider>
  );
}
