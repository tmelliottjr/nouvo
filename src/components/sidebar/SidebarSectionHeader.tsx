"use client";

import { SidebarGroupLabel } from "@/components/ui/sidebar";
import Link from "next/link";
import React from "react";

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
    <>
      {href ? (
        <Link
          href={href}
          className="flex items-center cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md px-2 py-1"
        >
          <HeaderContent />
        </Link>
      ) : (
        <div className="flex items-center px-2 py-1">
          <HeaderContent />
        </div>
      )}
      {actions?.map((action, index) => (
        <React.Fragment key={index}>{action}</React.Fragment>
      ))}
    </>
  );
}
