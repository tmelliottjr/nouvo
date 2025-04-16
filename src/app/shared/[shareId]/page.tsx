import { ShareNoteSkeleton } from "@/components/notes/share-note-skeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shared Note - Noevo",
  description: "View a shared note",
};

export default async function SharedNotePage({
  params,
}: {
  params: { shareId: string };
}) {
  const { shareId } = await params;
  return <ShareNoteSkeleton shareId={shareId} />;
}
