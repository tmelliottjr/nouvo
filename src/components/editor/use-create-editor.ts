"use client";

import { ParagraphPlugin, usePlateEditor } from "@udecode/plate/react";

import { editorComponents, viewComponents } from "./components";
import { editorPlugins, viewPlugins } from "./plugins";

// Permissions :party:
const readOnly = false;

export const useCreateEditor = () => {
  return usePlateEditor({
    override: {
      components: readOnly ? viewComponents : editorComponents,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plugins: (readOnly ? viewPlugins : editorPlugins) as any,
    value: [
      {
        children: [{ text: "Basic Editor" }],
        type: "h1",
      },
      {
        children: [{ text: "Heading 2" }],
        type: "h2",
      },
      {
        children: [{ text: "Heading 3" }],
        type: "h3",
      },
      {
        children: [{ text: "This is a blockquote element" }],
        type: "blockquote",
      },
      {
        children: [
          { text: "Basic marks: " },
          { bold: true, text: "bold" },
          { text: ", " },
          { italic: true, text: "italic" },
          { text: ", " },
          { text: "underline", underline: true },
          { text: ", " },
          { strikethrough: true, text: "strikethrough" },
          { text: "." },
        ],
        type: ParagraphPlugin.key,
      },
    ],
  });
};

// blockquote: withProps(PlateElement, {
//   as: "blockquote",
//   className: "border-l-4 border-[#d0d7de] pl-4 text-[#636c76]",
// }),
// [BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
// h1: withProps(PlateElement, {
//   as: "h1",
//   className:
//     "mb-4 mt-6 text-3xl font-semibold tracking-tight lg:text-4xl",
// }),
// h2: withProps(PlateElement, {
//   as: "h2",
//   className: "mb-4 mt-6 text-2xl font-semibold tracking-tight",
// }),
// h3: withProps(PlateElement, {
//   as: "h3",
//   className: "mb-4 mt-6 text-xl font-semibold tracking-tight",
// }),
// [ItalicPlugin.key]: withProps(PlateLeaf, { as: "em" }),
// [ParagraphPlugin.key]: withProps(PlateElement, {
//   as: "p",
//   className: "mb-4",
// }),
// [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
// [UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" }),
