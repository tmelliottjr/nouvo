"use client";

import { useEffect, useState } from "react";

export function useFolderExpansion(
  folderId: string,
  isFromUrl: boolean,
  isDirectPathToNote: (folderId: string) => boolean
) {
  const [isAutoExpanding, setIsAutoExpanding] = useState(false);

  useEffect(() => {
    if (isFromUrl && isDirectPathToNote(folderId)) {
      setIsAutoExpanding(true);

      // Reset the auto-expanding flag after animation completes
      const timer = setTimeout(() => {
        setIsAutoExpanding(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isFromUrl, folderId, isDirectPathToNote]);

  // Determine animation class based on auto-expansion
  const animationClass = isAutoExpanding
    ? "transition-all duration-300 ease-in-out"
    : "transition-all duration-150 ease-in-out";

  return { isAutoExpanding, animationClass };
}
