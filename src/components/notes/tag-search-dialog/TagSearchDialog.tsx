"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TagBadge } from "@/components/ui/tag-badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNoteSearch } from "@/hooks/use-tag-search";
import { useNotes } from "@/state-providers/use-notes";
import { useTagsSettings } from "@/state-providers/use-tags-settings";
import {
  CalendarIcon,
  CircleDashed,
  CircleDot,
  FileEditIcon,
  FileTextIcon,
  FolderIcon,
  InfoIcon,
  Plus,
  Search,
  TagIcon,
  XIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export interface TagSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TagSearchDialog({ open, onOpenChange }: TagSearchDialogProps) {
  const { tags } = useTagsSettings();
  const {
    searchText,
    setSearchText,
    selectedTags,
    operator,
    searchType,
    setSearchType,
    addTag,
    removeTag,
    clearTags,
    clearSearch,
    setOperator,
    results,
    isSearching,
  } = useNoteSearch();

  const { selectNote, treeData } = useNotes();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  // Clear search when dialog is closed
  useEffect(() => {
    if (!open) {
      // Optional: Clear the search when dialog closes
      // clearSearch();
    }
  }, [open]);

  // Calculate note paths for search results
  const notePaths = useMemo(() => {
    const paths: Record<string, string> = {};

    results.forEach((note) => {
      let path = "";
      if (note.parentId) {
        const pathParts: string[] = [];
        let currentId = note.parentId;

        while (currentId) {
          const parent = treeData[currentId];
          if (!parent) break;

          pathParts.unshift(parent.name);
          currentId = parent.parentId;
        }

        path = pathParts.join(" / ");
      } else {
        path = "Root";
      }

      paths[note.id] = path;
    });

    return paths;
  }, [results, treeData]);

  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Handle note selection
  const handleNoteClick = (noteId: string) => {
    selectNote(noteId);
    onOpenChange(false); // Close the dialog
    router.push(`/notes/${noteId}`);
  };

  // Helper function for tab selection
  const handleTabChange = (value: string) => {
    setSearchType(value as "tags" | "title" | "content" | "all");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Search Notes</span>
          </DialogTitle>
          <DialogDescription>
            Find your notes by tags, title, or content.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="all"
          value={searchType}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all" className="flex items-center gap-1">
              <Search className="h-4 w-4" />
              <span>All</span>
            </TabsTrigger>
            <TabsTrigger value="title" className="flex items-center gap-1">
              <FileEditIcon className="h-4 w-4" />
              <span>Title</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-1">
              <FileTextIcon className="h-4 w-4" />
              <span>Content</span>
            </TabsTrigger>
            <TabsTrigger value="tags" className="flex items-center gap-1">
              <TagIcon className="h-4 w-4" />
              <span>Tags</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search note titles and content..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="flex-1"
                />
                {searchText && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchText("")}
                    className="h-10 w-10"
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {selectedTags.map((tag) => (
                  <TagBadge
                    key={tag}
                    name={tag}
                    color={tags.find((t) => t.name === tag)?.color}
                    onRemove={() => removeTag(tag)}
                  />
                ))}

                <DropdownMenu
                  open={showDropdown}
                  onOpenChange={setShowDropdown}
                >
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Plus className="h-4 w-4" />
                      <span>Add Tag</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-56 max-h-56 overflow-y-auto"
                  >
                    {tags.length === 0 ? (
                      <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                        No tags available. Create tags in Settings.
                      </div>
                    ) : (
                      tags
                        .filter((tag) => !selectedTags.includes(tag.name))
                        .map((tag) => (
                          <DropdownMenuItem
                            key={tag.name}
                            className="cursor-pointer"
                            onClick={() => {
                              addTag(tag.name);
                              setShowDropdown(false);
                            }}
                          >
                            <TagBadge name={tag.name} color={tag.color} />
                          </DropdownMenuItem>
                        ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {selectedTags.length >= 2 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() =>
                          setOperator(operator === "AND" ? "OR" : "AND")
                        }
                      >
                        {operator === "AND" ? (
                          <CircleDot className="h-4 w-4" />
                        ) : (
                          <CircleDashed className="h-4 w-4" />
                        )}
                        <span>{operator}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        {operator === "AND"
                          ? "Notes must contain ALL selected tags"
                          : "Notes must contain ANY selected tag"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {(selectedTags.length > 0 || searchText) && (
                  <Button variant="ghost" size="sm" onClick={clearSearch}>
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="title" className="mt-0">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search by note title..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="flex-1"
              />
              {searchText && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchText("")}
                  className="h-10 w-10"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="content" className="mt-0">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search within note content..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="flex-1"
              />
              {searchText && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchText("")}
                  className="h-10 w-10"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="tags" className="mt-0">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {selectedTags.map((tag) => (
                  <TagBadge
                    key={tag}
                    name={tag}
                    color={tags.find((t) => t.name === tag)?.color}
                    onRemove={() => removeTag(tag)}
                  />
                ))}

                {selectedTags.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No tags selected. Add tags to search.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <DropdownMenu
                  open={showDropdown}
                  onOpenChange={setShowDropdown}
                >
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Plus className="h-4 w-4" />
                      <span>Add Tag</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-56 max-h-56 overflow-y-auto"
                  >
                    {tags.length === 0 ? (
                      <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                        No tags available. Create tags in Settings.
                      </div>
                    ) : (
                      tags
                        .filter((tag) => !selectedTags.includes(tag.name))
                        .map((tag) => (
                          <DropdownMenuItem
                            key={tag.name}
                            className="cursor-pointer"
                            onClick={() => {
                              addTag(tag.name);
                              setShowDropdown(false);
                            }}
                          >
                            <TagBadge name={tag.name} color={tag.color} />
                          </DropdownMenuItem>
                        ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {selectedTags.length >= 2 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() =>
                          setOperator(operator === "AND" ? "OR" : "AND")
                        }
                      >
                        {operator === "AND" ? (
                          <CircleDot className="h-4 w-4" />
                        ) : (
                          <CircleDashed className="h-4 w-4" />
                        )}
                        <span>{operator}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        {operator === "AND"
                          ? "Notes must contain ALL selected tags"
                          : "Notes must contain ANY selected tag"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {selectedTags.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearTags}>
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Search Results Section */}
        {isSearching && (
          <div className="overflow-y-auto flex-1 border-t pt-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Search Results</h3>
              {results.length > 0 && (
                <Badge variant="outline">
                  {results.length} {results.length === 1 ? "note" : "notes"}{" "}
                  found
                </Badge>
              )}
            </div>

            <div className="space-y-3 pr-1">
              {results.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <InfoIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    No notes found with the current search criteria.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try a different search term or different tags.
                  </p>
                </div>
              ) : (
                results.map((note) => (
                  <Card
                    key={note.id}
                    className="hover:border-primary/50 cursor-pointer transition-colors"
                    onClick={() => handleNoteClick(note.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{note.name}</h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <CalendarIcon className="h-3 w-3" />
                            <span>{formatDate(note.creationDate)}</span>
                          </div>
                        </div>

                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <FolderIcon className="h-3 w-3 mr-1" />
                          <span>{notePaths[note.id]}</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-2">
                          {note.tags.map((tagName) => (
                            <TagBadge
                              key={tagName}
                              name={tagName}
                              color={
                                tags.find((t) => t.name === tagName)?.color
                              }
                              className="text-xs py-0 px-2 h-5"
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
