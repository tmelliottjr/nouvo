"use client";

import { CalendarDayView } from "@/components/notes/calendar-day-view";
import { isValid, parseISO } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CalendarDatePage() {
  const router = useRouter();
  const [date, setDate] = useState<Date | null>(null);
  const params = useParams();

  useEffect(() => {
    try {
      // Try to parse the date parameter
      const parsedDate = parseISO(`${params.date}T00:00:00`);

      if (isValid(parsedDate)) {
        setDate(parsedDate);
      } else {
        // If invalid date, redirect to today's date
        router.replace(
          `/notes/calendar/${new Date().toISOString().split("T")[0]}`
        );
      }
    } catch (error) {
      console.error("Error parsing date:", error);
      // Redirect to today's date on error
      router.replace(
        `/notes/calendar/${new Date().toISOString().split("T")[0]}`
      );
    }
  }, []);

  if (!date) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return <CalendarDayView date={date} />;
}
