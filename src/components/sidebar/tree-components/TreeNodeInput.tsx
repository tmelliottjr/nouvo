"use client";

import { Input } from "@/components/ui/input";
import React from "react";

interface TreeNodeInputProps {
  initialValue?: string;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder: string;
  autoFocus?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  className?: string;
}

export function TreeNodeInput({
  initialValue,
  onKeyDown,
  onBlur,
  placeholder,
  autoFocus = true,
  inputRef,
  className = "h-7",
}: TreeNodeInputProps) {
  return (
    <Input
      ref={inputRef}
      className={className}
      defaultValue={initialValue}
      autoFocus={autoFocus}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  );
}
