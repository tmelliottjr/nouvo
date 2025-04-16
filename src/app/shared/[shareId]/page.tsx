import { ShareNoteSkeleton } from "@/components/notes/share-note-skeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shared Note - Noevo",
  description: "View a shared note",
};

export default function SharedNotePage({
  params,
}: {
  params: { shareId: string };
}) {
  return <ShareNoteSkeleton shareId={params.shareId} />;
}
