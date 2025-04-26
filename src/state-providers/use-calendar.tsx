"use client";

import { createContext, useContext, useState } from "react";

// Types for Google Calendar events
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  calendarId: string;
  calendarName: string;
  color: string;
  allDay: boolean;
}

// Interface for calendar item from Google Calendar API
interface CalendarItem {
  id: string;
  selected: boolean;
  name: string;
  color: string;
}

interface CalendarContextType {
  events: CalendarEvent[];
  isLoading: boolean;
  error: string | null;
  fetchEvents: (date: Date) => Promise<void>;
  isIntegrationEnabled: boolean;
  selectedCalendars: string[];
  calendarList: CalendarItem[];
  fetchCalendarList: () => Promise<void>;
  updateCalendarSelection: (id: string, selected: boolean) => Promise<void>;
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [calendarList, setCalendarList] = useState<CalendarItem[]>([]);

  const isIntegrationEnabled = true;

  // Use useSyncExternalStore for integration enabled state
  // const isIntegrationEnabled = useSyncExternalStore(
  //   (callback) => {
  //     // Subscribe function
  //     if (typeof window !== "undefined") {
  //       window.addEventListener("storage", callback);
  //       return () => window.removeEventListener("storage", callback);
  //     }
  //     return () => {};
  //   },
  //   // Get snapshot function
  //   () => {
  //     if (typeof window !== "undefined") {
  //       return window.localStorage.getItem("calendarIntegrationEnabled") === "true";
  //     }
  //     return false;
  //   },
  //   // Server snapshot
  //   () => false
  // );

  const calendarsString =
    '[{"id":"primary","summary":"Primary Calendar","backgroundColor":"#4285F4","selected":true},{"id":"work","summary":"Work","description":"Work schedule and meetings","backgroundColor":"#0B8043","selected":false},{"id":"personal","summary":"Personal","description":"Personal events","backgroundColor":"#D50000","selected":true},{"id":"holidays","summary":"Holidays","description":"Public holidays","backgroundColor":"#8E24AA","selected":true}]';
  const calendars = JSON.parse(calendarsString) as CalendarItem[];
  const selectedCalendars = calendars
    .filter((calendar) => calendar.selected)
    .map((calendar) => calendar.id);

  // Fetch user's calendar list from Google Calendar API
  const fetchCalendarList = async (): Promise<void> => {
    if (!isIntegrationEnabled) {
      setCalendarList([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Call Google Calendar API endpoint to get the list of calendars
      const response = await fetch("/api/calendar/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch calendars: ${response.statusText}`);
      }

      const data = await response.json();

      console.log("Fetched calendar list:", data);

      // Map API response to our CalendarItem interface
      const calendars: CalendarItem[] = data.items.map((cal: any) => ({
        id: cal.id,
        name: cal.summary,
        color: cal.backgroundColor || "#039BE5",
        selected: true, // Default to selected
      }));

      setCalendarList(calendars);

      // Store calendars in window.localStorage
      // This should be in a database
    } catch (error) {
      console.error("Error fetching calendar list:", error);
      setError("Failed to load calendar list. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Update calendar selection
  const updateCalendarSelection = async (
    id: string,
    selected: boolean
  ): Promise<void> => {
    try {
      const updatedCalendarList = calendarList.map((calendar) =>
        calendar.id === id ? { ...calendar, selected } : calendar
      );

      setCalendarList(updatedCalendarList);
    } catch (error) {
      console.error("Error updating calendar selection:", error);
      setError("Failed to update calendar selection.");
    }
  };

  // Fetch events for a specific day from Google Calendar API
  const fetchEvents = async (date: Date): Promise<void> => {
    if (!isIntegrationEnabled || selectedCalendars.length === 0) {
      setEvents([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Format date for API request (YYYY-MM-DD)
      const dateStr = date.toISOString().split("T")[0];

      // Construct API request with timeMin and timeMax
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      // Call our API endpoint which proxies to Google Calendar API
      const response = await fetch("/api/calendar/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeMin: startOfDay.toISOString(),
          timeMax: endOfDay.toISOString(),
          calendarIds: selectedCalendars,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.statusText}`);
      }

      const data = await response.json();

      // Map Google Calendar events to our CalendarEvent interface
      const calendarEvents: CalendarEvent[] = [];

      // Process each calendar's events
      for (const calId in data.events) {
        if (data.events.hasOwnProperty(calId)) {
          const calendar = calendarList.find((cal) => cal.id === calId);
          const calendarName = calendar?.name || "Unknown Calendar";
          const calendarColor = calendar?.color || "#039BE5";

          const calendarEvents = data.events[calId].map((event: any) => {
            const allDay = !event.start.dateTime;
            const startTime = allDay
              ? `${event.start.date}T00:00:00`
              : event.start.dateTime;
            const endTime = allDay
              ? `${event.end.date}T23:59:59`
              : event.end.dateTime;

            return {
              id: event.id,
              title: event.summary,
              description: event.description || "",
              startTime,
              endTime,
              location: event.location || "",
              calendarId: calId,
              calendarName,
              color: calendarColor,
              allDay,
            };
          });

          calendarEvents.push(...calendarEvents);
        }
      }

      setEvents(calendarEvents);
    } catch (error) {
      console.error("Error fetching calendar events:", error);
      setError("Failed to load calendar events. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        events,
        isLoading,
        error,
        fetchEvents,
        isIntegrationEnabled,
        selectedCalendars,
        calendarList,
        fetchCalendarList,
        updateCalendarSelection,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}
