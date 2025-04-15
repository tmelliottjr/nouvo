"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

export interface SuggestionItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
}

interface SuggestionsDropdownProps {
  items: SuggestionItem[];
  onSelect: (item: SuggestionItem) => void;
  highlightedIndex: number;
  setHighlightedIndex: (index: number) => void;
  className?: string;
  maxHeight?: string;
  sectionTitle?: string;
}

export function SuggestionsDropdown({
  items,
  onSelect,
  highlightedIndex,
  setHighlightedIndex,
  className,
  maxHeight = "250px",
  sectionTitle,
}: SuggestionsDropdownProps) {
  const listRef = useRef<HTMLDivElement>(null);

  // Scroll highlighted item into view when it changes
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.querySelector(
        `[data-index="${highlightedIndex}"]`
      );
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [highlightedIndex]);

  return (
    <div
      className={cn(
        "z-10 w-full rounded-md border bg-popover shadow-md",
        className
      )}
    >
      <div className="p-1">
        {sectionTitle && (
          <div className="text-sm font-medium px-2 py-1.5 text-muted-foreground">
            {sectionTitle}
          </div>
        )}
        <div
          ref={listRef}
          className="mt-1 overflow-y-auto"
          style={{ maxHeight }}
          role="listbox"
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              data-index={index}
              role="option"
              aria-selected={highlightedIndex === index}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer rounded-sm",
                highlightedIndex === index
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/50"
              )}
              onClick={() => onSelect(item)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
              {item.color && (
                <span
                  className="flex-shrink-0 inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              )}
              <span className="truncate">{item.label}</span>
              {item.description && (
                <span className="text-xs text-muted-foreground ml-auto truncate">
                  {item.description}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
