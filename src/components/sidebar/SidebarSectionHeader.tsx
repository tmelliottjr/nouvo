"use client";

import { SidebarGroupLabel } from "@/components/ui/sidebar";
import Link from "next/link";
import React from "react";
import { TreeNodeActions } from "./tree-components/TreeNodeActions";

interface SidebarSectionHeaderProps {
  title: string;
  href?: string;
  actions?: React.ReactNode[];
}

export function SidebarSectionHeader({
  title,
  href,
  actions,
}: SidebarSectionHeaderProps) {
  const HeaderContent = () => (
    <SidebarGroupLabel className="text-base font-semibold">
      {title}
    </SidebarGroupLabel>
  );

  return (
    <div className="flex items-center justify-between w-full gap-2 px-2 relative">
      <div className="flex-shrink-0">
        {href ? (
          <Link
            href={href}
            className="flex items-center cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md py-1"
          >
            <HeaderContent />
          </Link>
        ) : (
          <div className="flex items-center py-1">
            <HeaderContent />
          </div>
        )}
      </div>

      {actions && actions.length > 0 && (
        <TreeNodeActions>{actions}</TreeNodeActions>
      )}
    </div>
  );
}
