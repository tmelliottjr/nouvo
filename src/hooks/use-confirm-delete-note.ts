import strings from "../lib/strings";
import { useConfirm } from "./use-confirm";

export function useConfirmDeleteNote() {
  const { confirm } = useConfirm();

  const confirmDelete = async (noteName: string) => {
    const confirmed = await confirm({
      title: strings.notes.deleteDialog.title,
      description: strings.notes.deleteDialog.description(noteName),
      variant: "danger",
    });

    return confirmed;
  };

  return { confirmDelete };
}
