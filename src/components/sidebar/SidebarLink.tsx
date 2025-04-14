"use client";

import Link from "next/link";
import React from "react";

interface SidebarLinkProps {
  href: string;
  isActive?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children: React.ReactNode;
}

export function SidebarLink({
  href,
  isActive,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md w-full ${
        isActive
          ? "bg-accent text-accent-foreground tree-item-selected"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      } ${className || ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  );
}
