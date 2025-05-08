"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Types for Google Calendar events
export interface CalendarEvent {
  id: string;
  dbId?: string; // Database ID for the event
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  calendarId: string;
  calendarName: string;
  color: string;
  allDay: boolean;
  note?: {
    id: string;
    name: string;
    content?: string;
  } | null;
}

// Interface for calendar item from Google Calendar API
interface CalendarItem {
  id: string;
  selected: boolean;
  name: string;
  color: string;
  isPrimary?: boolean;
  providerId?: string;
}

interface CalendarContextType {
  events: CalendarEvent[];
  isLoading: boolean;
  error: string | null;
  fetchEvents: (date: Date) => Promise<void>;
  isIntegrationEnabled: boolean;
  setIsIntegrationEnabled: (enabled: boolean) => Promise<void>;
  selectedCalendars: string[];
  calendarList: CalendarItem[];
  fetchCalendarList: () => Promise<void>;
  updateCalendarSelection: (id: string, selected: boolean) => Promise<void>;
  saveCalendars: (calendars: CalendarItem[]) => Promise<void>;
  createEventNote: (eventId: string) => Promise<any>;
  linkExistingNoteToEvent: (eventId: string, noteId: string) => Promise<any>;
  unlinkEventNote: (eventId: string) => Promise<void>;
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [calendarList, setCalendarList] = useState<CalendarItem[]>([]);
  const [isIntegrationEnabled, setIsIntegrationEnabledState] = useState(true);

  // Fetch calendar integration settings on mount
  useEffect(() => {
    const fetchCalendarSettings = async () => {
      try {
        const response = await fetch("/api/calendar/settings");

        if (response.ok) {
          const data = await response.json();
          setIsIntegrationEnabledState(data.isEnabled);
        }
      } catch (error) {
        console.error("Error fetching calendar integration settings:", error);
      }
    };

    fetchCalendarSettings();
  }, []);

  // Update calendar integration settings
  const setIsIntegrationEnabled = async (enabled: boolean): Promise<void> => {
    try {
      setIsIntegrationEnabledState(enabled);

      const response = await fetch("/api/calendar/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isEnabled: enabled }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update settings: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating calendar integration settings:", error);
      setError("Failed to update integration settings.");
      // Revert state if API call fails
      setIsIntegrationEnabledState(!enabled);
    }
  };

  // Get selected calendar IDs
  const selectedCalendars = calendarList
    .filter((calendar) => calendar.selected)
    .map((calendar) => calendar.id);

  // Save multiple calendars to the database
  const saveCalendars = async (calendars: CalendarItem[]): Promise<void> => {
    try {
      const response = await fetch("/api/calendar/user-calendars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ calendars }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save calendars: ${response.statusText}`);
      }

      const savedCalendars = await response.json();
      setCalendarList(savedCalendars);
    } catch (error) {
      console.error("Error saving calendars:", error);
      setError("Failed to save calendars.");
    }
  };

  // Fetch user's calendar list from database and Google Calendar API
  const fetchCalendarList = async (): Promise<void> => {
    if (!isIntegrationEnabled) {
      setCalendarList([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // First, try to get existing saved calendars from our database
      const savedCalendarsResponse = await fetch(
        "/api/calendar/user-calendars"
      );
      let existingCalendars: CalendarItem[] = [];

      if (savedCalendarsResponse.ok) {
        existingCalendars = await savedCalendarsResponse.json();
      }

      // Then, fetch fresh calendar list from Google Calendar API
      const response = await fetch("/api/calendar/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // If API fails but we have existing calendars, use those
        if (existingCalendars.length > 0) {
          setCalendarList(existingCalendars);
          return;
        }
        throw new Error(`Failed to fetch calendars: ${response.statusText}`);
      }

      const data = await response.json();

      // Map API response to our CalendarItem interface and merge with existing settings
      const newCalendars: CalendarItem[] = data.items.map((cal: any) => {
        // Look for existing calendar settings
        const existingCal = existingCalendars.find((c) => c.id === cal.id);

        return {
          id: cal.id,
          name: cal.summary,
          color: cal.backgroundColor || "#039BE5",
          selected: existingCal ? existingCal.selected : true, // Use existing selection or default to true
          isPrimary: cal.primary || false,
          providerId: "google",
        };
      });

      setCalendarList(newCalendars);

      // Save the newly fetched calendars to the database for persistence
      await saveCalendars(newCalendars);
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
      // Update local state first for immediate UI feedback
      const updatedCalendarList = calendarList.map((calendar) =>
        calendar.id === id ? { ...calendar, selected } : calendar
      );

      setCalendarList(updatedCalendarList);

      // Update in the database
      const calendar = calendarList.find((cal) => cal.id === id);

      if (calendar) {
        const response = await fetch("/api/calendar/user-calendars", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            providerId: calendar.providerId || "google",
            selected,
            color: calendar.color,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update calendar selection");
        }
      }
    } catch (error) {
      console.error("Error updating calendar selection:", error);
      setError("Failed to update calendar selection.");

      // Revert local state if API call fails
      const revertedList = calendarList.map((calendar) =>
        calendar.id === id ? { ...calendar, selected: !selected } : calendar
      );
      setCalendarList(revertedList);
    }
  };

  // Create a new note for an event
  const createEventNote = async (eventId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/calendar/events", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          createNote: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create note: ${response.statusText}`);
      }

      const data = await response.json();

      // Update the local events state to reflect the new note
      setEvents(
        events.map((event) =>
          event.dbId === eventId ? { ...event, note: data.note } : event
        )
      );

      return data.note;
    } catch (error) {
      console.error("Error creating event note:", error);
      setError("Failed to create note for this event.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Link an existing note to an event
  const linkExistingNoteToEvent = async (eventId: string, noteId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/calendar/events", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          noteId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to link note: ${response.statusText}`);
      }

      const data = await response.json();

      // Update the local events state to reflect the linked note
      setEvents(
        events.map((event) =>
          event.dbId === eventId ? { ...event, note: data.note } : event
        )
      );

      return data.note;
    } catch (error) {
      console.error("Error linking note to event:", error);
      setError("Failed to link note to this event.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Unlink a note from an event
  const unlinkEventNote = async (eventId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/calendar/events", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to unlink note: ${response.statusText}`);
      }

      // Update the local events state to remove the note reference
      setEvents(
        events.map((event) =>
          event.dbId === eventId ? { ...event, note: null } : event
        )
      );
    } catch (error) {
      console.error("Error unlinking event note:", error);
      setError("Failed to unlink note from this event.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch events for a specific day from Google Calendar API
  const fetchEvents = async (date: Date): Promise<void> => {
    if (!isIntegrationEnabled) {
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

      // Set the events directly from our processed API response
      setEvents(data.events || []);
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
        setIsIntegrationEnabled,
        selectedCalendars,
        calendarList,
        fetchCalendarList,
        updateCalendarSelection,
        saveCalendars,
        createEventNote,
        linkExistingNoteToEvent,
        unlinkEventNote,
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
