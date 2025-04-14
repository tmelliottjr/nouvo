"use client";

import React from "react";

interface TreeItemContainerProps {
  id: string;
  children: React.ReactNode;
}

export function TreeItemContainer({ id, children }: TreeItemContainerProps) {
  return (
    <div className="staggered-item" data-item-id={id}>
      {children}
    </div>
  );
}
