"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import strings from "@/lib/strings";
import { useNotes } from "@/state-providers/use-notes";
import { CalendarIcon, Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { PublicNoteToggle } from "./public-note-toggle";
import { ShareNoteButton } from "./share-note-button";

export function NoteHeader() {
  const router = useRouter();
  const {
    currentPath,
    noteTree,
    selectNote,
    selectFolder,
    currentNote,
    isViewingFolder,
    updateNote,
  } = useNotes();

  // Function to handle breadcrumb clicks
  const handleBreadcrumbClick = (itemName: string, index: number) => {
    if (!currentPath) return;

    // We need to find the node (folder or file) that corresponds to this breadcrumb item
    // Construct the path up to this point
    const pathToItem = currentPath.slice(0, index + 1);

    // Navigate through the tree to find the node
    let currentNodes = noteTree;
    let targetNode = null;

    for (let i = 0; i < pathToItem.length; i++) {
      const nodeName = pathToItem[i];
      const node = currentNodes.find((n) => n.name === nodeName);

      if (node) {
        if (i === pathToItem.length - 1) {
          // This is our target node
          targetNode = node;
        } else if ("children" in node) {
          // This is a folder, continue traversing
          currentNodes = node.children;
        } else {
          // This is a note, we can't go deeper
          break;
        }
      }
    }

    // If we found the node, select it based on its type
    if (targetNode) {
      if ("children" in targetNode) {
        selectFolder(targetNode.id);
      } else {
        selectNote(targetNode.id);
      }
    }
  };

  // Format date for display
  const formatCreationDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Handle click on creation date to navigate to calendar view for that day
  const handleDateClick = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    router.push(`/notes/calendar/${formattedDate}`);
  };

  // Create a collapsed path array when path is longer than 3 items
  const displayPath = React.useMemo(() => {
    if (!currentPath || currentPath.length <= 3) {
      return currentPath;
    }

    // For a path with more than 3 items, show first item, ellipsis, and last two items
    const collapsedPath = [
      currentPath[0],
      strings.notes.breadcrumbs.ellipsis, // Ellipsis placeholder
      currentPath[currentPath.length - 2],
      currentPath[currentPath.length - 1],
    ];

    return collapsedPath;
  }, [currentPath]);

  // Get the hidden middle items for dropdown
  const hiddenItems = React.useMemo(() => {
    if (!currentPath || currentPath.length <= 3) {
      return [];
    }

    // Get all items between first and last two
    return currentPath.slice(1, currentPath.length - 2);
  }, [currentPath]);

  // Handle toggling the public status of a note
  const handleTogglePublic = async (isPublic: boolean) => {
    if (!currentNote) return;

    try {
      await updateNote({
        id: currentNote.id,
        isPublic: isPublic,
      });
    } catch (error) {
      console.error("Error updating note public status:", error);
      throw error;
    }
  };

  return (
    <header className="flex items-center h-16 shrink-0 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb className="flex-grow">
        <BreadcrumbList>
          {/* Add root "Notes" link that always goes to /notes */}
          <BreadcrumbItem className="hidden md:block">
            <Link
              href="/notes"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Notes
            </Link>
          </BreadcrumbItem>
          {displayPath && displayPath.length > 0 && (
            <BreadcrumbSeparator className="hidden md:block" />
          )}

          {displayPath?.map((pathPart, index) => {
            // Special handling for the ellipsis item
            if (pathPart === "...") {
              return (
                <React.Fragment key="ellipsis">
                  <BreadcrumbItem className="hidden md:block">
                    <HoverCard openDelay={100} closeDelay={100}>
                      <HoverCardTrigger className="cursor-default">
                        {pathPart}
                      </HoverCardTrigger>
                      {hiddenItems.length > 0 && (
                        <HoverCardContent
                          className="w-fit p-1"
                          align="start"
                          side="bottom"
                        >
                          <div className="flex flex-col">
                            {hiddenItems.map((item, i) => (
                              <div
                                key={i}
                                className="px-3 py-1 text-sm whitespace-nowrap hover:bg-stone-100 dark:hover:bg-stone-700 rounded cursor-pointer"
                                onClick={() =>
                                  handleBreadcrumbClick(item, i + 1)
                                }
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                        </HoverCardContent>
                      )}
                    </HoverCard>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </React.Fragment>
              );
            }

            // Regular breadcrumb items
            return (
              <React.Fragment key={`${pathPart}-${index}`}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleBreadcrumbClick(pathPart, index);
                    }}
                  >
                    {pathPart}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < displayPath.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Creation date button - only show when viewing a note */}
      {!isViewingFolder && currentNote && currentNote.creationDate && (
        <Button
          variant="ghost"
          size="sm"
          className="mr-2 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
          onClick={() => handleDateClick(currentNote.creationDate)}
        >
          <CalendarIcon className="h-3.5 w-3.5" />
          <span>Created: {formatCreationDate(currentNote.creationDate)}</span>
        </Button>
      )}

      {/* Public note toggle - only show when viewing a note */}
      {!isViewingFolder && currentNote && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              aria-label={
                currentNote.isPublic ? "Public note" : "Make note public"
              }
            >
              <Globe
                className={`h-4 w-4 ${currentNote.isPublic ? "text-blue-500" : "text-muted-foreground"}`}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4" align="end">
            <PublicNoteToggle
              note={currentNote}
              onToggle={handleTogglePublic}
            />
          </PopoverContent>
        </Popover>
      )}

      {/* Share button - only show when viewing a note (not a folder) */}
      {!isViewingFolder && currentNote && (
        <ShareNoteButton noteId={currentNote.id} noteTitle={currentNote.name} />
      )}
    </header>
  );
}
