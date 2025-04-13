import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import strings from "@/lib/strings";
import { getShareableNoteUrl } from "@/lib/utils";
import { Check, Share2 } from "lucide-react";

interface ShareNoteButtonProps {
  noteId: string;
  className?: string;
}

/**
 * Button component that generates and copies a shareable URL for a note
 */
export function ShareNoteButton({ noteId, className }: ShareNoteButtonProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleShare = async () => {
    const url = getShareableNoteUrl(noteId);
    await copyToClipboard(url);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={className}
            onClick={handleShare}
            aria-label={strings.notes.share.button.ariaLabel}
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
            <span className="ml-2 hidden sm:inline">
              {isCopied
                ? strings.notes.share.copied
                : strings.notes.share.button.label}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{strings.notes.share.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
