"use client";

import React from "react";

interface TreeNodeActionsProps {
  children: React.ReactNode;
  className?: string;
}

export function TreeNodeActions({
  children,
  className = "",
}: TreeNodeActionsProps) {
  return (
    <div
      className={`absolute right-2 opacity-100 transition-opacity flex gap-1 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}
