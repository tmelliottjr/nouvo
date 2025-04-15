"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getBackgroundColorClass,
  getBorderColorClass,
  getTextColorClass,
} from "@/state-providers/use-tags-settings";
import { X } from "lucide-react";
import { ReactNode } from "react";

/**
 * Props for the TagBadge component
 */
export interface TagBadgeProps {
  /**
   * Tag name to display
   */
  name: string;

  /**
   * Tag color (either hex color or named color like "blue-500")
   */
  color?: string;

  /**
   * Optional className to apply to the badge
   */
  className?: string;

  /**
   * Optional click handler for the tag
   */
  onClick?: () => void;

  /**
   * Optional remove handler - if provided, displays a remove button
   */
  onRemove?: () => void;

  /**
   * Optional custom content instead of the tag name
   */
  children?: ReactNode;

  /**
   * Whether this badge is compact (for inside inputs)
   */
  compact?: boolean;
}

/**
 * A reusable tag badge component that handles consistent styling
 */
export function TagBadge({
  name,
  color,
  className,
  onClick,
  onRemove,
  children,
  compact = false,
}: TagBadgeProps) {
  // Get styling classes based on color
  const bgClass = color ? getBackgroundColorClass(color) : "";
  const borderClass = color ? getBorderColorClass(color) : "";
  const textClass = color ? getTextColorClass(color) : "";

  // Style object for custom hex colors
  const style: React.CSSProperties = {};
  if (color && color.startsWith("#")) {
    // Get a more dimmed version of the color for the background
    const hexColor = color.substring(1);
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);

    // Create a dimmer background color with low opacity
    style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.15)`;

    // Use the original color for the border and text
    style.borderColor = color;
    style.color = color;
  }

  return (
    <Badge
      className={cn(
        "border font-medium",
        bgClass,
        borderClass,
        textClass,
        onClick && "cursor-pointer",
        onRemove && "flex items-center gap-1",
        compact && "text-xs py-0.5 px-1.5 h-5",
        className
      )}
      style={style}
      onClick={onClick}
    >
      {children || name}
      {onRemove && (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "hover:bg-transparent",
            compact ? "h-3 w-3 p-0 ml-0.5" : "h-4 w-4 p-0"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <X className={compact ? "h-2 w-2" : "h-3 w-3"} />
        </Button>
      )}
    </Badge>
  );
}

/**
 * Color-only badge for displaying in color pickers
 */
export interface ColorBadgeProps {
  /**
   * Color value (either hex or named color)
   */
  color: string;

  /**
   * Optional label to display
   */
  label?: string;

  /**
   * Optional className to apply
   */
  className?: string;
}

/**
 * A badge that displays just a color with optional label
 */
export function ColorBadge({ color, label, className }: ColorBadgeProps) {
  return (
    <TagBadge name="" color={color} className={className}>
      {label || <span className="sr-only">Color</span>}
    </TagBadge>
  );
}
