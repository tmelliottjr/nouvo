"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  defaultOpen?: boolean;
}

export function DatePicker({
  date,
  onSelect,
  placeholder = "Pick a date",
  className,
  defaultOpen = false,
}: DatePickerProps) {
  return (
    <Popover defaultOpen={defaultOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "MMM dd, yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

// Direct calendar component without the Popover wrapper - for immediate display
export function DirectCalendar({
  date,
  onSelect,
  className,
}: {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  className?: string;
}) {
  return (
    <div className={cn("p-0", className)}>
      <Calendar
        mode="single"
        selected={date}
        onSelect={onSelect}
        initialFocus
      />
    </div>
  );
}

export interface DateRangePickerProps {
  dateRange: { from: Date | undefined; to: Date | undefined };
  onSelect: (range: { from: Date | undefined; to: Date | undefined }) => void;
  placeholder?: string;
  className?: string;
  defaultOpen?: boolean;
}

export function DateRangePicker({
  dateRange,
  onSelect,
  placeholder = "Select date range",
  className,
  defaultOpen = false,
}: DateRangePickerProps) {
  const { from, to } = dateRange;

  return (
    <Popover defaultOpen={defaultOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !from && !to && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {from || to ? (
            <>
              {from ? format(from, "MMM dd, yyyy") : "Start date"}
              {" - "}
              {to ? format(to, "MMM dd, yyyy") : "End date"}
            </>
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={{ from, to }}
          onSelect={onSelect}
          initialFocus
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}

// Direct range calendar component without the Popover wrapper - for immediate display
export function DirectRangeCalendar({
  dateRange,
  onSelect,
  className,
}: {
  dateRange: { from: Date | undefined; to: Date | undefined };
  onSelect: (range: { from: Date | undefined; to: Date | undefined }) => void;
  className?: string;
}) {
  return (
    <div className={cn("p-0", className)}>
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={onSelect}
        initialFocus
        numberOfMonths={2}
      />
    </div>
  );
}
