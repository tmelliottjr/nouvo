"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { NoteNode, TreeNode } from "@/lib/seed-data";
import { CalendarEvent, useCalendar } from "@/state-providers/use-calendar";
import { useNotes } from "@/state-providers/use-notes";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { CalendarClock, Clock, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CalendarDayViewProps {
  date: Date;
}

export function CalendarDayView({ date }: CalendarDayViewProps) {
  const { treeData, addNote } = useNotes();
  const { events, fetchEvents, isLoading, isIntegrationEnabled } =
    useCalendar();
  const [notesForDay, setNotesForDay] = useState<NoteNode[]>([]);
  const [isCreatingNote, setIsCreatingNote] = useState(false);

  // Format the date
  const formattedDate = format(date, "EEEE, MMMM d, yyyy");
  const dateKey = format(date, "yyyy-MM-dd");

  // Find notes created on this day
  useEffect(() => {
    const notes: NoteNode[] = [];

    Object.values(treeData).forEach((node: TreeNode) => {
      if (node.type === "note") {
        const note = node as NoteNode;
        if (note.creationDate) {
          const noteDate = new Date(note.creationDate);
          const noteDateKey = format(noteDate, "yyyy-MM-dd");

          if (noteDateKey === dateKey) {
            notes.push(note);
          }
        }
      }
    });

    // Sort notes by creation time
    notes.sort((a, b) => {
      if (!a.creationDate || !b.creationDate) return 0;
      return (
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
      );
    });

    setNotesForDay(notes);
  }, [treeData, dateKey]);

  // Fetch calendar events for this day
  useEffect(() => {
    fetchEvents(date);
  }, [date, fetchEvents]);

  // Create a new note for this day
  const handleCreateNote = async () => {
    setIsCreatingNote(true);
    try {
      const noteDate = new Date(date);
      noteDate.setHours(new Date().getHours(), new Date().getMinutes());

      // TODO: Implement the logic to create a new note
      const newNote = null;

      if (newNote) {
        // Navigate to the new note
        window.location.href = `/notes/${newNote.id}`;
      }
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setIsCreatingNote(false);
    }
  };

  // Combine and sort all items (events and notes) chronologically
  const timelineItems = [...events].sort((a, b) => {
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });

  return (
    <div className="flex flex-col h-full w-full overflow-hidden p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">{formattedDate}</h1>
        <p className="text-muted-foreground text-sm">
          {format(date, "cccc")} ·{" "}
          {formatDistanceToNow(date, { addSuffix: true })}
        </p>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 min-w-0 overflow-y-auto pr-4">
          {/* Timeline of events */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CalendarClock className="h-5 w-5" />
              Calendar
            </h2>

            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : (
              <>
                {isIntegrationEnabled ? (
                  <>
                    {timelineItems.length === 0 ? (
                      <div className="text-center py-8 bg-muted/20 rounded-lg">
                        <p className="text-muted-foreground">
                          No events scheduled for today
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {timelineItems.map((event) => (
                          <CalendarEventCard key={event.id} event={event} />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8 bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">
                      Google Calendar not connected
                    </p>
                    <Link
                      href="/settings"
                      className="text-primary text-sm hover:underline mt-1 inline-block"
                    >
                      Connect in Settings
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Notes section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Notes</h2>
              <Button
                size="sm"
                onClick={handleCreateNote}
                disabled={isCreatingNote}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                {isCreatingNote ? "Creating..." : "New Note"}
              </Button>
            </div>

            {notesForDay.length === 0 ? (
              <div className="text-center py-8 bg-muted/20 rounded-lg">
                <p className="text-muted-foreground">
                  No notes created on this day
                </p>
                <Button
                  variant="link"
                  className="mt-1"
                  onClick={handleCreateNote}
                  disabled={isCreatingNote}
                >
                  Create a note
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {notesForDay.map((note) => (
                  <Link
                    key={note.id}
                    href={`/notes/${note.id}`}
                    className="block"
                  >
                    <div className="border rounded-lg p-3 hover:border-primary transition-colors">
                      <h3 className="font-medium">{note.name}</h3>
                      {note.creationDate && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Created{" "}
                          {format(new Date(note.creationDate), "h:mm a")}
                        </p>
                      )}
                      {note.tags && note.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {note.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Component to display a single calendar event
function CalendarEventCard({ event }: { event: CalendarEvent }) {
  const startTime = parseISO(event.startTime);
  const endTime = parseISO(event.endTime);

  return (
    <div
      className="border rounded-lg p-3 hover:border-primary transition-colors"
      style={{ borderLeftColor: event.color, borderLeftWidth: "4px" }}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium">{event.title}</h3>
        <Badge variant="outline" className="text-xs">
          {event.calendarName}
        </Badge>
      </div>

      <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        <span>
          {event.allDay
            ? "All day"
            : `${format(startTime, "h:mm a")} - ${format(endTime, "h:mm a")}`}
        </span>
      </div>

      {event.location && (
        <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{event.location}</span>
        </div>
      )}

      {event.description && (
        <p className="mt-2 text-sm line-clamp-2">{event.description}</p>
      )}
    </div>
  );
}
