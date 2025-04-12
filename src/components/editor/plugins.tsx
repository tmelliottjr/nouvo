"use client";

import emojiMartData from "@emoji-mart/data";
import { CalloutPlugin } from "@udecode/plate-callout/react";
import { CodeBlockPlugin } from "@udecode/plate-code-block/react";
import { DocxPlugin } from "@udecode/plate-docx";
import { EmojiPlugin } from "@udecode/plate-emoji/react";
import { TocPlugin } from "@udecode/plate-heading/react";
import { HighlightPlugin } from "@udecode/plate-highlight/react";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import { JuicePlugin } from "@udecode/plate-juice";
import { KbdPlugin } from "@udecode/plate-kbd/react";
import { LinkPlugin } from "@udecode/plate-link/react";
import { NodeIdPlugin } from "@udecode/plate-node-id";
import { DeletePlugin } from "@udecode/plate-select";
import { SlashPlugin } from "@udecode/plate-slash-command/react";
import { TrailingBlockPlugin } from "@udecode/plate-trailing-block";
import { LinkFloatingToolbar } from "../plate-ui/link-floating-toolbar";
import { autoformatPlugin } from "./plugins/autoformat";
import { basicNodesPlugins } from "./plugins/basic-nodes";
import { exitBreakPlugin } from "./plugins/exit-break";

export const viewPlugins = [
  CalloutPlugin,
  ...basicNodesPlugins,
  HorizontalRulePlugin,

  // Marks
  HighlightPlugin,
  KbdPlugin,
  LinkPlugin.configure({
    render: { afterEditable: () => <LinkFloatingToolbar /> },
  }),
  NodeIdPlugin,
  TocPlugin.configure({
    options: {
      topOffset: 80,
    },
  }),
] as const;

export const editorPlugins = [
  // Nodes
  ...viewPlugins,
  exitBreakPlugin,
  autoformatPlugin,
  DeletePlugin.configure({
    options: {
      query: {
        allow: ["p", "blockquote"],
      },
    },
  }),

  // Functionality
  SlashPlugin.extend({
    options: {
      triggerQuery(editor) {
        return !editor.api.some({
          match: { type: editor.getType(CodeBlockPlugin) },
        });
      },
    },
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  EmojiPlugin.configure({ options: { data: emojiMartData as any } }),
  TrailingBlockPlugin,

  // Deserialization
  DocxPlugin,
  JuicePlugin,
];
