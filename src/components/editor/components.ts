import { withProps } from "@udecode/cn";
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import {
  CodeBlockPlugin,
  CodeLinePlugin,
  CodeSyntaxPlugin,
} from "@udecode/plate-code-block/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import { KbdPlugin } from "@udecode/plate-kbd/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import { ParagraphPlugin, PlateLeaf } from "@udecode/plate/react";
import { BlockquoteElement } from "../plate-ui/blockquote-element";
import { CodeBlockElement } from "../plate-ui/code-block-element";
import { HeadingElement } from "../plate-ui/heading-element";
import { EmojiInputPlugin } from "@udecode/plate-emoji/react";
import { HrElement } from "../plate-ui/hr-element";
import { CodeLineElement } from "../plate-ui/code-line-element";
import { CodeLeaf } from "../plate-ui/code-leaf";
import { CodeSyntaxLeaf } from "../plate-ui/code-syntax-leaf";
import { KbdLeaf } from "../plate-ui/kbd-leaf";
import { LinkPlugin } from "@udecode/plate-link/react";
import { LinkElement } from "../plate-ui/link-element";
import { ParagraphElement } from "../plate-ui/paragraph-element";
import { ToggleElement } from "../plate-ui/toggle-element";
import { EmojiInputElement } from "../plate-ui/emoji-input-element";
import { TocPlugin } from "@udecode/plate-heading/react";
import { TocElement } from "../plate-ui/toc-element";

// export const viewComponents = {
//   [BlockquotePlugin.key]: BlockquoteElement,
//   [CodeBlockPlugin.key]: CodeBlockElement,
//   [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: "h1" }),
//   [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: "h2" }),
//   [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: "h3" }),
//   [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: "h4" }),
//   [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: "h5" }),
//   [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: "h6" }),
// };

export const viewComponents = {
  [BlockquotePlugin.key]: BlockquoteElement,
  [BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
  [CodeBlockPlugin.key]: CodeBlockElement,
  [CodeLinePlugin.key]: CodeLineElement,
  [CodePlugin.key]: CodeLeaf,
  [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
  [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: "h1" }),
  [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: "h2" }),
  [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: "h3" }),
  [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: "h4" }),
  [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: "h5" }),
  [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: "h6" }),
  [HorizontalRulePlugin.key]: HrElement,
  [ItalicPlugin.key]: withProps(PlateLeaf, { as: "em" }),
  [KbdPlugin.key]: KbdLeaf,
  [LinkPlugin.key]: LinkElement,
  [ParagraphPlugin.key]: ParagraphElement,
  [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
  [SubscriptPlugin.key]: withProps(PlateLeaf, { as: "sub" }),
  [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: "sup" }),
  [TogglePlugin.key]: ToggleElement,
  [UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" }),
  [TocPlugin.key]: TocElement,
};

export const editorComponents = {
  ...viewComponents,
  [EmojiInputPlugin.key]: EmojiInputElement,
};
