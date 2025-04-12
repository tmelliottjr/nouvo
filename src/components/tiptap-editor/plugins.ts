import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { common, createLowlight } from "lowlight";

export const extensions = [
  StarterKit,
  Link.configure({
    linkOnPaste: true,
  }),
  Placeholder.configure({
    placeholder: "Write something...",
  }),
  CodeBlockLowlight.configure({
    lowlight: createLowlight(common),
    HTMLAttributes: {
      class: "hljs",
    },
  }),
];
