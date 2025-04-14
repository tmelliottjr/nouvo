"use client";

import React from "react";

interface TreeNodeActionProps {
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  ariaLabel: string;
  className?: string;
  destructive?: boolean;
}

export function TreeNodeAction({
  icon,
  onClick,
  ariaLabel,
  className = "",
  destructive = false,
}: TreeNodeActionProps) {
  const baseClasses =
    "h-6 w-6 p-0 rounded-md flex items-center justify-center cursor-pointer";
  const colorClasses = destructive
    ? "text-muted-foreground hover:text-destructive"
    : "text-muted-foreground hover:text-foreground";

  return (
    <div
      className={`${baseClasses} ${colorClasses} ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      }}
      aria-label={ariaLabel}
    >
      {icon}
    </div>
  );
}
