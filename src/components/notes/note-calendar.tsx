"use client";

import { Button } from "@/components/ui/button";
import { Note, NoteTree, useNotes } from "@/state-providers/use-notes";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function NoteCalendar() {
  const router = useRouter();
  const { noteTree } = useNotes();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [notesOnDates, setNotesOnDates] = useState<Map<string, number>>(
    new Map()
  );

  // Function to format date as YYYY-MM-DD for map keys
  const formatDateKey = (date: Date): string => {
    return format(date, "yyyy-MM-dd");
  };

  // Get all notes from the tree including those in subfolders
  const getAllNotes = useCallback((tree: NoteTree): Note[] => {
    let allNotes: Note[] = [];

    tree.forEach((node) => {
      if ("children" in node) {
        // This is a folder, recurse into it
        allNotes = [...allNotes, ...getAllNotes(node.children)];
      } else {
        // This is a note
        allNotes.push(node);
      }
    });

    return allNotes;
  }, []);

  // Count notes by creation date
  useEffect(() => {
    const notes = getAllNotes(noteTree);
    const dateMap = new Map<string, number>();

    notes.forEach((note) => {
      if (note.creationDate) {
        const dateKey = formatDateKey(new Date(note.creationDate));
        const currentCount = dateMap.get(dateKey) || 0;
        dateMap.set(dateKey, currentCount + 1);
      }
    });

    setNotesOnDates(dateMap);
  }, [noteTree, getAllNotes]);

  // Handle date selection
  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    const dateString = formatDateKey(date);
    router.push(`/notes/calendar/${dateString}`);
  };

  // Go to today
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
    handleSelect(today);
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Get days to display in the calendar
  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  };

  // Get day names for the header (Su, Mo, Tu, etc.)
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Generate calendar grid with proper offsets for the first day of month
  const generateCalendarGrid = () => {
    const daysInMonth = getDaysInMonth();
    const firstDayOfMonth = getDay(startOfMonth(currentMonth)); // 0 for Sunday, 1 for Monday, etc.

    // Create empty slots for days before the first day of month
    const emptySlots = Array(firstDayOfMonth).fill(null);

    return [...emptySlots, ...daysInMonth];
  };

  const calendarGrid = generateCalendarGrid();

  // Check if a date has notes
  const hasNotes = (date: Date | null) => {
    if (!date) return false;
    const dateKey = formatDateKey(date);
    return notesOnDates.has(dateKey);
  };

  return (
    <div className="calendar-widget px-0 py-2 select-none">
      {/* Calendar header with month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-1 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h2 className="text-sm font-medium">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          onClick={nextMonth}
          className="p-1 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day names (Su, Mo, Tu, etc.) */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day, index) => (
          <div
            key={index}
            className="text-center text-xs font-medium text-stone-700 dark:text-stone-300"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarGrid.map((day, index) => {
          if (!day) {
            // Empty cell for days before the start of month
            return <div key={`empty-${index}`} className="h-8 w-8" />;
          }

          const isSelected = isSameDay(day, selectedDate);
          const isTodayDate = isToday(day);
          const dayHasNotes = hasNotes(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);

          return (
            <button
              key={day.toString()}
              onClick={() => handleSelect(day)}
              className={`
                h-8 w-8 relative flex items-center justify-center text-sm rounded-lg
                ${!isCurrentMonth ? "text-stone-400 dark:text-stone-600" : ""}
                ${
                  isSelected
                    ? "border-2 border-primary font-medium"
                    : isTodayDate
                    ? "border-2 border-stone-400 dark:border-stone-500"
                    : "hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800"
                }
                transition-all duration-150
              `}
            >
              <span>{format(day, "d")}</span>
              {dayHasNotes && (
                <div
                  className={`
                  absolute bottom-1 w-1/2 mx-auto h-0.5 rounded-full
                  ${isSelected ? "bg-primary" : "bg-indigo-500"}
                `}
                ></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Today button */}
      <div className="mt-3 text-center">
        <Button
          variant="outline"
          size="sm"
          className="text-xs w-full"
          onClick={goToToday}
        >
          Today
        </Button>
      </div>
    </div>
  );
}
