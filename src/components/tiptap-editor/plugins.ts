import { FileHandler } from "@tiptap-pro/extension-file-handler";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { common, createLowlight } from "lowlight";
import { fileHandlerConfig } from "./file-handler-config";

export const extensions = [
  StarterKit,
  Link.configure({
    linkOnPaste: true,
  }),
  Image,
  Placeholder.configure({
    placeholder: "Write something...",
  }),
  CodeBlockLowlight.configure({
    lowlight: createLowlight(common),
    HTMLAttributes: {
      class: "hljs",
    },
  }),
  FileHandler.configure(fileHandlerConfig),
];
