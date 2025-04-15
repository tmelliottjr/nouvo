"use client";

import { TagBadge } from "@/components/ui/tag-badge";
import {
  SearchField,
  SearchToken,
} from "@/state-providers/tag-search-provider";
import React from "react";
import { useTagsSettings } from "../../state-providers/use-tags-settings";

interface SearchTokenBadgeProps {
  token: SearchToken;
  fieldColors: Record<SearchField | 'default', string>;
  onRemove: () => void;
}

export function SearchTokenBadge({
  token,
  fieldColors,
  onRemove,
}: SearchTokenBadgeProps) {
  const { tags } = useTagsSettings();
  let color = fieldColors["default"];

  if (token.field === "tag") {
    color = tags.filter((tag) => tag.name === token.value)[0]?.color;
  }

  return (
    <TagBadge
      name={`${token.field}: ${token.value}`}
      color={color}
      onRemove={onRemove}
      compact
      className="mx-0.5 cursor-default"
    />
  );
}

interface TokenizedInputProps {
  value: string;
  tokens: SearchToken[];
  fieldColors: Record<SearchField, string>;
  onChange: (value: string) => void;
  onRemoveToken: (index: number) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export function TokenizedInput({
  value,
  tokens,
  fieldColors,
  onChange,
  onRemoveToken,
  placeholder,
  className,
  inputClassName,
  onKeyDown,
  onFocus,
  inputRef,
}: TokenizedInputProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Focus the input when clicking anywhere in the container
  const handleContainerClick = () => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-wrap items-center gap-0.5 w-full border rounded-md px-2 py-1 bg-background focus-within:ring-2 focus-within:ring-ring focus-within:border-input ${
        className || ""
      }`}
      onClick={handleContainerClick}
    >
      {tokens.map((token, index) => (
        <SearchTokenBadge
          key={`${token.field}-${index}`}
          token={token}
          fieldColors={fieldColors}
          onRemove={() => onRemoveToken(index)}
        />
      ))}
      <input
        ref={inputRef}
        className={`flex-1 outline-none min-w-[150px] py-1 bg-transparent ${
          inputClassName || ""
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        placeholder={tokens.length > 0 ? "" : placeholder}
      />
    </div>
  );
}
