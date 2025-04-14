"use client";

import { TagSearchDialog } from "@/components/notes/tag-search-dialog/TagSearchDialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TagBadge } from "@/components/ui/tag-badge";
import { useTagSearch } from "@/hooks/use-tag-search";
import { useNotes } from "@/state-providers/use-notes";
import {
  getDefaultTagColor,
  useTagsSettings,
} from "@/state-providers/use-tags-settings";
import { Plus, Tag } from "lucide-react";
import { useState } from "react";

interface EditorToolbarProps {
  noteId: string;
  tags: string[];
}

export function EditorToolbar({ noteId, tags }: EditorToolbarProps) {
  const { updateNote } = useNotes();
  const { tags: tagSettings } = useTagsSettings();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { addTag: addTagToSearch, clearTags } = useTagSearch();
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  // Handle clicking on a tag to search
  const handleTagClick = (tagName: string) => {
    // Clear any existing search first
    clearTags();
    // Add this tag to the search criteria
    addTagToSearch(tagName);
    // Open the search dialog
    setSearchDialogOpen(true);
  };

  // Filter out tags that are already assigned to the note
  const availableTags = tagSettings
    .filter((tag) => !tags.includes(tag.name))
    .map((tag) => tag.name);

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      updateNote(noteId, { tags: [...tags, tag] });
    }
    setOpen(false);
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    updateNote(noteId, { tags: tags.filter((t) => t !== tag) });
  };

  // Find tag settings
  const getTagColor = (tagName: string): string => {
    const tagSetting = tagSettings.find((t) => t.name === tagName);

    if (tagSetting) {
      return tagSetting.color;
    }

    // Use default color if tag doesn't have settings yet
    const tagIndex = tagSettings.length;
    return getDefaultTagColor(tagIndex);
  };

  return (
    <div className="border-b p-2 flex flex-wrap items-center gap-2">
      <TagSearchDialog
        open={searchDialogOpen}
        onOpenChange={setSearchDialogOpen}
      />
      {tags.map((tag) => (
        <TagBadge
          key={tag}
          name={tag}
          color={getTagColor(tag)}
          onRemove={() => removeTag(tag)}
          onClick={() => handleTagClick(tag)}
        />
      ))}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1 text-muted-foreground"
          >
            <Tag className="h-3.5 w-3.5" />
            <span>Add Tag</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[200px]" align="start" side="bottom">
          <Command>
            <CommandInput
              placeholder="Search or add tag..."
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandEmpty>
              {inputValue && (
                <div className="px-2 py-1.5">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => addTag(inputValue)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create &quot;{inputValue}&quot;
                  </Button>
                </div>
              )}
            </CommandEmpty>
            <CommandGroup className="p-1.5 gap-1 flex flex-col">
              {availableTags
                .filter((tag) =>
                  tag.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((tag) => (
                  <Button
                    key={tag}
                    variant="ghost"
                    size="sm"
                    className="justify-start h-auto px-2 py-1 w-full cursor-pointer"
                    onClick={() => addTag(tag)}
                  >
                    <TagBadge
                      name={tag}
                      color={getTagColor(tag)}
                      className="inline-flex w-auto"
                    />
                  </Button>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
