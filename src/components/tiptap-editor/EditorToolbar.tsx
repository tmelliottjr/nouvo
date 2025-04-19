"use client";

import { SearchDialog } from "@/components/notes/search-dialog/SearchDialog";
import { Button } from "@/components/ui/button";
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
import { Editor } from "@tiptap/react";
import { FileUp, Plus, Tag } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface EditorToolbarProps {
  noteId: string;
  tags: string[];
  editor?: Editor | null;
}

export function EditorToolbar({ noteId, tags, editor }: EditorToolbarProps) {
  const { updateNote } = useNotes();
  const { tags: tagSettings } = useTagsSettings();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { clearTags, setSearchText } = useTagSearch();
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  // State for keyboard navigation
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Reference to file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle clicking on a tag to search
  const handleTagClick = (tagName: string) => {
    // Clear any existing search first
    clearTags();
    // Add this tag to the search criteria using the new format
    setSearchText(`tag:${tagName}`);
    // Open the search dialog
    setSearchDialogOpen(true);
  };

  // File upload handling
  const handleFileUploadClick = () => {
    // Trigger the hidden file input click event
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length || !editor) return;

    // Create a DataTransfer object to simulate a drag and drop event
    const dataTransfer = new DataTransfer();

    // Add all selected files to the DataTransfer object
    Array.from(files).forEach((file) => {
      dataTransfer.items.add(file);
    });

    // Create a drop event to dispatch to the editor
    // Note: This is how TipTap FileHandler extension expects files to be added
    const event = new DragEvent("drop", {
      dataTransfer,
      bubbles: true,
    });

    // Dispatch the event to the editor's DOM element to trigger file handling
    editor.view.dom.dispatchEvent(event);

    // Reset the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Filter out tags that are already assigned to the note
  const availableTags = tagSettings
    .filter((tag) => !tags.includes(tag.name))
    .map((tag) => tag.name);

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      updateNote({
        id: noteId,
        tags: [...tags, tag],
      });
    }
    setOpen(false);
    setInputValue("");
    setHighlightedIndex(-1);
  };

  const removeTag = (tag: string) => {
    updateNote({
      id: noteId,
      tags: tags.filter((t) => t !== tag),
    });
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

  // Filter tags based on input
  const filteredTags = availableTags.filter((tag) =>
    tag.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prevIndex) => {
          const newIndex =
            prevIndex < filteredTags.length - 1
              ? prevIndex + 1
              : inputValue && filteredTags.length === 0
                ? 0
                : prevIndex;
          return newIndex;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredTags.length) {
          addTag(filteredTags[highlightedIndex]);
        } else if (
          inputValue &&
          filteredTags.length === 0 &&
          highlightedIndex === 0
        ) {
          addTag(inputValue);
        } else if (inputValue && filteredTags.length === 0) {
          addTag(inputValue);
        }
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  };

  // Reset highlighted index when input changes
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [inputValue]);

  // Reset highlighted index when dropdown opens
  useEffect(() => {
    if (open) {
      setHighlightedIndex(-1);
      // Focus the input when the dropdown opens
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [open]);

  return (
    <div className="border-b p-2 flex flex-wrap items-center gap-2">
      <SearchDialog
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

      {/* File Upload Button */}
      <Button
        variant="outline"
        size="sm"
        className="h-7 gap-1 text-muted-foreground"
        onClick={handleFileUploadClick}
        title="Upload file"
      >
        <FileUp className="h-3.5 w-3.5" />
        <span>Upload</span>
      </Button>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept="image/jpeg,image/png,image/gif,image/webp,application/pdf,text/plain,text/markdown"
      />

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
        <PopoverContent className="p-2 w-[200px]" align="start" side="bottom">
          <div className="space-y-2">
            <div className="flex">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search or add tag..."
                className="w-full px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-stone-300"
                aria-label="Search or add tag"
                role="combobox"
                aria-expanded={open}
                aria-controls="tag-suggestion-list"
                aria-autocomplete="list"
                aria-activedescendant={
                  highlightedIndex >= 0 ? `tag-item-${highlightedIndex}` : ""
                }
              />
            </div>

            {inputValue && filteredTags.length === 0 && (
              <div className="py-1">
                <Button
                  variant="ghost"
                  size="sm"
                  id="create-tag-option"
                  className={`w-full justify-start ${
                    highlightedIndex === 0
                      ? "bg-accent/50 text-accent-foreground"
                      : ""
                  }`}
                  onClick={() => addTag(inputValue)}
                  tabIndex={-1}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create &quot;{inputValue}&quot;
                </Button>
              </div>
            )}

            <div
              className="max-h-[150px] overflow-y-auto space-y-1"
              ref={listRef}
              id="tag-suggestion-list"
              role="listbox"
            >
              {filteredTags.map((tag, index) => (
                <div
                  key={tag}
                  id={`tag-item-${index}`}
                  role="option"
                  aria-selected={highlightedIndex === index}
                  className={`cursor-pointer p-1 rounded ${
                    highlightedIndex === index
                      ? "bg-accent/50 text-accent-foreground"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => addTag(tag)}
                >
                  <TagBadge
                    name={tag}
                    color={getTagColor(tag)}
                    className="inline-flex w-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
