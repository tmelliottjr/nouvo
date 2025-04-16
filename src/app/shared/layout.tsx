import { AuthProvider } from "@/state-providers/use-auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shared Note - Noevo",
  description: "View a shared note from Noevo",
};

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
