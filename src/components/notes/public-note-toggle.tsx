import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Note } from "@/lib/notes";
import { Globe, Lock } from "lucide-react";
import { useState } from "react";

interface PublicNoteToggleProps {
  note: Note;
  onToggle: (isPublic: boolean) => Promise<void>;
}

export function PublicNoteToggle({ note, onToggle }: PublicNoteToggleProps) {
  const [isPublic, setIsPublic] = useState(note.isPublic || false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { copyToClipboard } = useCopyToClipboard();

  const handleToggle = async () => {
    try {
      setIsLoading(true);
      const newValue = !isPublic;
      await onToggle(newValue);
      setIsPublic(newValue);

      if (newValue) {
        toast({
          title: "Note is now public",
          description: "Anyone with the link can view this note",
        });
      } else {
        toast({
          title: "Note is now private",
          description: "Only you and people you share with can view this note",
        });
      }
    } catch (error) {
      console.error("Error toggling public status:", error);
      toast({
        variant: "destructive",
        title: "Failed to update note visibility",
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPublicLink = () => {
    console.log({ note });
    const publicUrl = `${window.location.origin}/users/${note.userId}/notes/${note.id}`;
    console.log({ note });
    copyToClipboard(publicUrl);
    toast({
      title: "Public link copied",
      description: "Now you can share it with anyone",
    });
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <Switch
          checked={isPublic}
          onCheckedChange={handleToggle}
          disabled={isLoading}
          id="public-toggle"
        />
        <Label htmlFor="public-toggle" className="cursor-pointer">
          {isPublic ? (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              Public
            </div>
          ) : (
            <div className="flex items-center">
              <Lock className="h-4 w-4 mr-2" />
              Private
            </div>
          )}
        </Label>
      </div>

      {isPublic && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={handleCopyPublicLink}
              >
                Copy public link
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy a link that anyone can use to view this note</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
