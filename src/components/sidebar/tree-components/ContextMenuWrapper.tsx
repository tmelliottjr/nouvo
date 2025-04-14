"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import React from "react";

interface ContextMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: (e: React.MouseEvent) => void;
  destructive?: boolean;
}

type ContextMenuWrapperProps = React.PropsWithChildren<{
  menuItems: Array<ContextMenuItemProps>;
}>;

export function ContextMenuWrapper({
  children,
  menuItems,
}: ContextMenuWrapperProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        {menuItems.map((item, index) => (
          <ContextMenuItem
            key={index}
            onClick={item.onClick}
            className={`cursor-pointer ${
              item.destructive
                ? "text-red-600 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-950"
                : ""
            }`}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            <span>{item.label}</span>
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}
