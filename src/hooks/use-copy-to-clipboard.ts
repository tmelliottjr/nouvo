import { useCallback, useState } from "react";

interface UseCopyToClipboardProps {
  timeout?: number;
}

interface UseCopyToClipboardReturn {
  isCopied: boolean;
  copyToClipboard: (text: string) => Promise<boolean>;
}

/**
 * Custom hook for copying text to clipboard with success feedback
 *
 * @param timeout Optional timeout duration for the copied state (in ms)
 * @returns Object containing isCopied state and copyToClipboard function
 */
export function useCopyToClipboard({
  timeout = 2000,
}: UseCopyToClipboardProps = {}): UseCopyToClipboardReturn {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(
    async (text: string) => {
      if (!navigator?.clipboard) {
        console.warn("Clipboard API not available");
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);

        // Reset the copied state after the specified timeout
        setTimeout(() => {
          setIsCopied(false);
        }, timeout);

        return true;
      } catch (error) {
        console.error("Failed to copy text: ", error);
        setIsCopied(false);
        return false;
      }
    },
    [timeout]
  );

  return { isCopied, copyToClipboard };
}
