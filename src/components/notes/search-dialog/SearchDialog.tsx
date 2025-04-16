"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DirectCalendar,
  DirectRangeCalendar,
} from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  SuggestionItem,
  SuggestionsDropdown,
} from "@/components/ui/suggestions-dropdown";
import { TagBadge } from "@/components/ui/tag-badge";
import { TokenizedInput } from "@/components/ui/tokenized-input";
import { SearchField, useSearch } from "@/state-providers/tag-search-provider";
import { useNotes } from "@/state-providers/use-notes";
import { useTagsSettings } from "@/state-providers/use-tags-settings";
import { format } from "date-fns";
import { CalendarIcon, FolderIcon, InfoIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Search field definitions for autocomplete
const SEARCH_FIELDS: Array<{
  id: SearchField;
  name: string;
  description: string;
  prefix: string;
  color: string;
}> = [
  {
    id: "title",
    name: "Title",
    description: "Search in note titles",
    prefix: "title:",
    color: "#3b82f6", // blue-500
  },
  {
    id: "content",
    name: "Content",
    description: "Search in note contents",
    prefix: "content:",
    color: "#10b981", // emerald-500
  },
  {
    id: "tag",
    name: "Tag",
    description: "Search by note tags",
    prefix: "tag:",
    color: "#8b5cf6", // purple-500
  },
  {
    id: "created",
    name: "Created",
    description: "Search by creation date",
    prefix: "created:",
    color: "#f59e0b", // amber-500
  },
];

// Field colors for tokens
const FIELD_COLORS: Record<SearchField & { default: string }, string> = {
  title: "#3b82f6",
  content: "#10b981",
  tag: "#8b5cf6",
  created: "#f59e0b",
  default: "#615fff", // A bright color for default tokens
};

// Date operator options
const DATE_OPERATORS = [
  { id: "equals", label: "On", example: "MM/DD/YYYY" },
  { id: "before", label: "Before", example: "≤MM/DD/YYYY" },
  { id: "after", label: "After", example: "≥MM/DD/YYYY" },
  { id: "between", label: "Between", example: "MM/DD/YYYY-MM/DD/YYYY" },
];

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const { tags } = useTagsSettings();
  const {
    searchText,
    setSearchText,
    searchTokens,
    results,
    clearSearch,
    isSearching,
    tokensToSearchString,
  } = useSearch();

  const { selectNote, treeData } = useNotes();
  const router = useRouter();

  // Find tag settings and get color (similar to EditorToolbar)
  const getTagColor = (tagName: string): string => {
    const tagSetting = tags.find((t) => t.name === tagName);

    if (tagSetting) {
      return tagSetting.color;
    }

    // Use default color if tag doesn't have settings yet
    const tagIndex = tags.length;
    // 
    return "#615fff"; // Default color for tags
  };

  const [state, setState] = useState({
    inputValue: "",
    showFieldSuggestions: false,
    highlightedFieldIndex: -1,
    showTagSuggestions: false,
    highlightedTagIndex: -1,
    filteredTags: [] as string[],
    showDateOperators: false,
    highlightedDateOpIndex: -1,
    showDatePicker: false,
    selectedDateOperator: null as string | null,
    selectedDate: null as Date | null,
    dateRangeEnd: null as Date | null,
    isSelectingEndDate: false,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // Reset UI state when dialog closes
  useEffect(() => {
    if (!open) {
      setState({
        inputValue: "",
        showFieldSuggestions: false,
        highlightedFieldIndex: -1,
        showTagSuggestions: false,
        highlightedTagIndex: -1,
        showDateOperators: false,
        highlightedDateOpIndex: -1,
        showDatePicker: false,
        selectedDateOperator: null,
        selectedDate: null,
        dateRangeEnd: null,
        isSelectingEndDate: false,
        filteredTags: [],
      });
    } else {
      // Focus the input when the dialog opens
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [open]);

  // Helper to reset all suggestion states
  const resetAllSuggestions = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      showFieldSuggestions: false,
      highlightedFieldIndex: -1,
      showTagSuggestions: false,
      highlightedTagIndex: -1,
      showDateOperators: false,
      highlightedDateOpIndex: -1,
      showDatePicker: false,
    }));
  }, []);

  // Calculate note paths for search results
  const notePaths = useMemo(() => {
    const paths: Record<string, string> = {};

    results.forEach((note) => {
      let path = "";
      if (note.parentId) {
        const pathParts: string[] = [];
        let currentId: string | null = note.parentId;

        while (currentId) {
          const parent = treeData[currentId] as
            | { name: string; parentId: string | null }
            | undefined;
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

  // Format dates in a user-friendly way
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy");
  }, []);

  // Handle input change and check for autocomplete triggers
  const handleInputChange = useCallback(
    (value: string) => {
      setState((prevState) => ({ ...prevState, inputValue: value }));

      // Reset all suggestion states first
      resetAllSuggestions();

      // Check if we're typing a field prefix
      const fieldMatch = value.match(/(?:^|\s)([a-z]+):?$/i);
      if (fieldMatch) {
        const prefix = fieldMatch[1].toLowerCase();
        const matchingFields = SEARCH_FIELDS.filter((field) =>
          field.id.startsWith(prefix)
        );

        if (matchingFields.length > 0) {
          setState((prevState) => ({
            ...prevState,
            showFieldSuggestions: true,
            highlightedFieldIndex: 0,
          }));
        }
        return;
      }

      // Check if we're at created: and should show date operators
      if (value.match(/created:$/i)) {
        setState((prevState) => ({
          ...prevState,
          showDateOperators: true,
          highlightedDateOpIndex: 0,
        }));
        return;
      }

      // Check if we're at tag: and should show tag suggestions
      const tagMatch = value.match(/tag:([^:\s]*)$/i);
      if (tagMatch && tagMatch[1] !== undefined) {
        const tagPrefix = tagMatch[1].toLowerCase();
        const matchingTags = tags
          .map((tag) => tag.name)
          .filter((tag) => tag.toLowerCase().includes(tagPrefix));

        setState((prevState) => ({
          ...prevState,
          filteredTags: matchingTags,
          showTagSuggestions: true,
          highlightedTagIndex: matchingTags.length > 0 ? 0 : -1,
        }));
        return;
      }
    },
    [resetAllSuggestions, tags]
  );

  // Map search fields to suggestion items
  const fieldSuggestions: SuggestionItem[] = useMemo(() => {
    return SEARCH_FIELDS.filter((field) => {
      const matchResult = state.inputValue
        ? state.inputValue.match(/(?:^|\s)([a-z]+):?$/i)
        : null;
      const prefix =
        matchResult && matchResult[1] ? matchResult[1].toLowerCase() : "";
      return field.id.startsWith(prefix);
    }).map((field) => ({
      id: field.id,
      label: field.name,
      description: field.description,
      color: field.color,
    }));
  }, [state.inputValue]);

  // Map tags to suggestion items
  const tagSuggestions: SuggestionItem[] = useMemo(() => {
    return (state.filteredTags || []).map((tag) => ({
      id: tag,
      label: tag,
      color: getTagColor(tag),
    }));
  }, [state.filteredTags, getTagColor]);

  // Map date operators to suggestion items
  const dateOperatorSuggestions: SuggestionItem[] = useMemo(() => {
    return DATE_OPERATORS.map((op) => ({
      id: op.id,
      label: op.label,
      description: op.example,
    }));
  }, []);

  // Handle selection of a field from autocomplete
  const handleFieldSelection = useCallback(
    (field: SuggestionItem) => {
      // Replace the partial field with the full field prefix
      const selectedField = SEARCH_FIELDS.find((f) => f.id === field.id);
      if (!selectedField) return;

      const match = state.inputValue.match(/(?:^|\s)([a-z]+):?$/i);
      if (match) {
        const prefix = match[1];
        const startPos = state.inputValue.lastIndexOf(prefix);

        const newValue =
          state.inputValue.substring(0, startPos) + selectedField.prefix;
        setState((prevState) => ({ ...prevState, inputValue: newValue }));
        resetAllSuggestions();

        // If created field, show date operators
        if (field.id === "created") {
          setState((prevState) => ({
            ...prevState,
            showDateOperators: true,
            highlightedDateOpIndex: 0,
          }));
        }

        // If tag field, show tag suggestions
        if (field.id === "tag") {
          setState((prevState) => ({
            ...prevState,
            filteredTags: tags.map((t) => t.name),
            showTagSuggestions: true,
            highlightedTagIndex: 0,
          }));
        }

        // Focus and position cursor at the end
        if (inputRef.current) {
          inputRef.current.focus();
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.selectionStart = newValue.length;
              inputRef.current.selectionEnd = newValue.length;
            }
          }, 0);
        }
      }
    },
    [state.inputValue, resetAllSuggestions, tags]
  );

  // Handle selection of a tag from suggestions
  const handleTagSelection = useCallback(
    (tag: SuggestionItem) => {
      const tagMatch = state.inputValue.match(/tag:([^:\s]*)$/i);
      if (tagMatch) {
        const beforeTag = state.inputValue.substring(
          0,
          state.inputValue.lastIndexOf("tag:") + 4
        );
        const newValue = `${beforeTag}${tag.id}`;

        // Apply the tag and update search
        setState((prevState) => ({ ...prevState, inputValue: "" }));
        const fullSearchText = searchText
          ? `${searchText} ${newValue}`
          : newValue;
        setSearchText(fullSearchText);
        resetAllSuggestions();
      }
    },
    [state.inputValue, resetAllSuggestions, searchText, setSearchText]
  );

  // Apply the selected date to the search input
  const applySelectedDate = useCallback(() => {
    if (!state.selectedDateOperator || !state.selectedDate) {
      console.log("No date operator or date selected");
      return;
    }

    let dateValue = "";

    if (state.selectedDateOperator === "between" && state.dateRangeEnd) {
      // For between operator, format as "MM/dd/yyyy - MM/dd/yyyy"
      dateValue = `${format(state.selectedDate, "MM/dd/yyyy")}-${format(
        state.dateRangeEnd,
        "MM/dd/yyyy"
      )}`;
    } else {
      // For other operators, just need the single date
      const prefix =
        state.selectedDateOperator === "before"
          ? "<="
          : state.selectedDateOperator === "after"
          ? ">="
          : "";
      dateValue = `${prefix}${format(state.selectedDate, "MM/dd/yyyy")}`;
    }

    // Create a complete search term with the date
    const dateSearchTerm = `created:${dateValue}`;

    // Update the search text which will create the token
    setSearchText(
      searchText ? `${searchText} ${dateSearchTerm}` : dateSearchTerm
    );

    // Clear the date-related state
    setState((prevState) => ({
      ...prevState,
      inputValue: "",
      showDatePicker: false,
      selectedDate: null,
      dateRangeEnd: null,
      selectedDateOperator: null,
      isSelectingEndDate: false,
    }));
  }, [
    state.selectedDate,
    state.dateRangeEnd,
    state.selectedDateOperator,
    setSearchText,
    searchText,
  ]);

  // Handle selection of a date operator
  const handleDateOperatorSelect = useCallback((operator: SuggestionItem) => {
    setState((prevState) => ({
      ...prevState,
      selectedDateOperator: operator.id,
      showDatePicker: true,
      selectedDate: null,
      dateRangeEnd: null,
      isSelectingEndDate: false,
      showFieldSuggestions: false,
      highlightedFieldIndex: -1,
      showTagSuggestions: false,
      highlightedTagIndex: -1,
      showDateOperators: false,
      highlightedDateOpIndex: -1,
    }));
  }, []);

  // Handle note selection
  const handleNoteClick = useCallback(
    (noteId: string) => {
      selectNote(noteId);
      onOpenChange(false); // Close the dialog
      router.push(`/notes/${noteId}`);
    },
    [selectNote, onOpenChange, router]
  );

  // Handle removing a token from the search
  const handleRemoveToken = useCallback(() => {
    const newTokens = [...searchTokens];
    newTokens.splice(-1);
    setSearchText(tokensToSearchString(newTokens));
  }, [searchTokens, setSearchText, tokensToSearchString]);

  // Submit the search when Enter is pressed
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();

        // If field suggestions are shown, select the active one
        if (state.showFieldSuggestions && state.highlightedFieldIndex >= 0) {
          handleFieldSelection(fieldSuggestions[state.highlightedFieldIndex]);
          return;
        }

        // If tag suggestions are shown, select the active one
        if (state.showTagSuggestions && state.highlightedTagIndex >= 0) {
          handleTagSelection(tagSuggestions[state.highlightedTagIndex]);
          return;
        }

        // If date operators are shown, select the active one
        if (state.showDateOperators && state.highlightedDateOpIndex >= 0) {
          handleDateOperatorSelect(
            dateOperatorSuggestions[state.highlightedDateOpIndex]
          );
          return;
        }

        // If calendar is open, apply date
        if (state.showDatePicker && state.selectedDate) {
          applySelectedDate();
          return;
        }

        // Otherwise submit the search
        if (state.inputValue.trim()) {
          const fullSearchText = searchText
            ? `${searchText} ${state.inputValue.trim()}`
            : state.inputValue.trim();
          setSearchText(fullSearchText);
          setState((prevState) => ({ ...prevState, inputValue: "" }));
        }
      } else if (e.key === "Escape") {
        // Close any open popups on Escape
        resetAllSuggestions();
      } else if (
        e.key === "Backspace" &&
        state.inputValue === "" &&
        searchTokens.length > 0
      ) {
        // Only remove the last token when backspace is pressed and input is empty
        handleRemoveToken();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        // Handle navigation in the appropriate suggestions list
        if (state.showFieldSuggestions) {
          setState((prevState) => ({
            ...prevState,
            highlightedFieldIndex: Math.min(
              prevState.highlightedFieldIndex + 1,
              fieldSuggestions.length - 1
            ),
          }));
        } else if (state.showTagSuggestions) {
          setState((prevState) => ({
            ...prevState,
            highlightedTagIndex: Math.min(
              prevState.highlightedTagIndex + 1,
              tagSuggestions.length - 1
            ),
          }));
        } else if (state.showDateOperators) {
          setState((prevState) => ({
            ...prevState,
            highlightedDateOpIndex: Math.min(
              prevState.highlightedDateOpIndex + 1,
              dateOperatorSuggestions.length - 1
            ),
          }));
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        // Handle navigation in the appropriate suggestions list
        if (state.showFieldSuggestions) {
          setState((prevState) => ({
            ...prevState,
            highlightedFieldIndex: Math.max(
              prevState.highlightedFieldIndex - 1,
              0
            ),
          }));
        } else if (state.showTagSuggestions) {
          setState((prevState) => ({
            ...prevState,
            highlightedTagIndex: Math.max(prevState.highlightedTagIndex - 1, 0),
          }));
        } else if (state.showDateOperators) {
          setState((prevState) => ({
            ...prevState,
            highlightedDateOpIndex: Math.max(
              prevState.highlightedDateOpIndex - 1,
              0
            ),
          }));
        }
      }
    },
    [
      state.showFieldSuggestions,
      state.highlightedFieldIndex,
      state.showTagSuggestions,
      state.highlightedTagIndex,
      state.showDateOperators,
      state.highlightedDateOpIndex,
      state.showDatePicker,
      state.selectedDate,
      state.inputValue,
      fieldSuggestions,
      tagSuggestions,
      dateOperatorSuggestions,
      handleFieldSelection,
      handleTagSelection,
      handleDateOperatorSelect,
      applySelectedDate,
      resetAllSuggestions,
      searchText,
      setSearchText,
      searchTokens,
      handleRemoveToken,
    ]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] h-[600px] flex flex-col overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span>Search Notes</span>
          </DialogTitle>
          <DialogDescription>
            Search by text, tags, or date using advanced search syntax.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-2 px-6 py-4 relative">
          <div className="flex items-center gap-2 flex-col sm:flex-row">
            <div className="relative flex-1 w-full">
              <TokenizedInput
                value={state.inputValue}
                tokens={searchTokens}
                fieldColors={FIELD_COLORS}
                onChange={(value) => {
                  // Update the state with the new value
                  setState((prevState) => ({
                    ...prevState,
                    inputValue: value,
                  }));
                  // Trigger suggestions based on the input value
                  handleInputChange(value);
                }}
                onRemoveToken={handleRemoveToken}
                placeholder="Search notes... (e.g. title:ideas, created:>01/01/2025)"
                inputRef={inputRef}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  // Show field suggestions when the input is focused and contains text that might match a field
                  if (state.inputValue.match(/(?:^|\s)([a-z]+):?$/i)) {
                    handleInputChange(state.inputValue);
                  }
                }}
                className="pr-8"
              />

              {(state.inputValue || searchTokens.length > 0) && (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setState((prevState) => ({
                      ...prevState,
                      inputValue: "",
                    }));
                    setSearchText("");
                  }}
                >
                  <XIcon className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              onClick={() => {
                if (state.inputValue.trim()) {
                  const fullSearchText = searchText
                    ? `${searchText} ${state.inputValue.trim()}`
                    : state.inputValue.trim();
                  setSearchText(fullSearchText);
                  setState((prevState) => ({ ...prevState, inputValue: "" }));
                }
              }}
              className="w-full sm:w-auto"
            >
              Search
            </Button>
          </div>

          {/* Field suggestions */}
          {state.showFieldSuggestions && (
            <div className="absolute top-[calc(100%-0.5rem)] left-0 z-10 w-64">
              <SuggestionsDropdown
                items={fieldSuggestions}
                onSelect={handleFieldSelection}
                highlightedIndex={state.highlightedFieldIndex}
                setHighlightedIndex={(index) =>
                  setState((prevState) => ({
                    ...prevState,
                    highlightedFieldIndex: index,
                  }))
                }
                sectionTitle="Search Fields"
              />
            </div>
          )}

          {/* Tag suggestions */}
          {state.showTagSuggestions && (
            <div className="absolute top-[calc(100%-0.5rem)] left-0 z-10 w-64">
              <SuggestionsDropdown
                items={tagSuggestions}
                onSelect={handleTagSelection}
                highlightedIndex={state.highlightedTagIndex}
                setHighlightedIndex={(index) =>
                  setState((prevState) => ({
                    ...prevState,
                    highlightedTagIndex: index,
                  }))
                }
                sectionTitle="Available Tags"
              />
            </div>
          )}

          {/* Date operator selection */}
          {state.showDateOperators && (
            <div className="absolute top-[calc(100%-0.5rem)] left-0 z-10 w-64">
              <SuggestionsDropdown
                items={dateOperatorSuggestions}
                onSelect={handleDateOperatorSelect}
                highlightedIndex={state.highlightedDateOpIndex}
                setHighlightedIndex={(index) =>
                  setState((prevState) => ({
                    ...prevState,
                    highlightedDateOpIndex: index,
                  }))
                }
                sectionTitle="Date Operators"
              />
            </div>
          )}

          {/* Date picker for date selection */}
          {state.showDatePicker && (
            <div className="absolute top-[calc(100%-0.5rem)] left-0 z-10 bg-popover rounded-md border shadow-md">
              <div className="p-2 border-b">
                <div className="text-sm font-medium">
                  {state.selectedDateOperator === "between"
                    ? state.isSelectingEndDate
                      ? "Select end date"
                      : "Select date range"
                    : DATE_OPERATORS.find(
                        (op) => op.id === state.selectedDateOperator
                      )?.label || "Select date"}
                </div>
              </div>
              {/* Use direct calendar components for immediate display */}
              <div className="p-3">
                {state.selectedDateOperator === "between" ? (
                  <DirectRangeCalendar
                    dateRange={{
                      from: state.selectedDate || undefined,
                      to: state.dateRangeEnd || undefined,
                    }}
                    onSelect={(range) => {
                      // Only process if we have at least the start date
                      if (!range.from) return;

                      // If we don't have an end date yet, just update the start date and wait
                      if (!range.to) {
                        setState((prevState) => ({
                          ...prevState,
                          selectedDate: range.from,
                          isSelectingEndDate: true,
                        }));
                        return;
                      }

                      // We have both dates, process them
                      const startDate = range.from;
                      const endDate = range.to;

                      // Format dates in the required format for the search
                      const formattedStartDate = format(
                        startDate,
                        "MM/dd/yyyy"
                      );
                      const formattedEndDate = format(endDate, "MM/dd/yyyy");
                      const dateRange = `${formattedStartDate}-${formattedEndDate}`;

                      // Create the complete search term and apply it directly
                      const dateSearchTerm = `created:${dateRange}`;
                      setSearchText(
                        searchText
                          ? `${searchText} ${dateSearchTerm}`
                          : dateSearchTerm
                      );

                      // Reset all date-related state
                      setState((prevState) => ({
                        ...prevState,
                        showDatePicker: false,
                        inputValue: "",
                        selectedDate: null,
                        dateRangeEnd: null,
                        selectedDateOperator: null,
                        isSelectingEndDate: false,
                      }));
                    }}
                    className="border-none"
                  />
                ) : (
                  <DirectCalendar
                    date={state.selectedDate || undefined}
                    onSelect={(date) => {
                      if (!date) return;

                      // Create date value with appropriate prefix based on the date operator
                      const dateOperator =
                        state.selectedDateOperator || "equals";
                      const prefix =
                        dateOperator === "before"
                          ? "<="
                          : dateOperator === "after"
                          ? ">="
                          : "";

                      // Format the date in the required format
                      const formattedDate = format(date, "MM/dd/yyyy");
                      const dateValue = `${prefix}${formattedDate}`;

                      // Create the complete search term
                      const dateSearchTerm = `created:${dateValue}`;

                      // Update the search text directly
                      setSearchText(
                        searchText
                          ? `${searchText} ${dateSearchTerm}`
                          : dateSearchTerm
                      );

                      // Close the date picker and reset related state
                      setState((prevState) => ({
                        ...prevState,
                        showDatePicker: false,
                        inputValue: "", // Clear input
                        selectedDate: null,
                        selectedDateOperator: null,
                      }));
                    }}
                    className="border-none"
                  />
                )}
              </div>
              <div className="p-2 border-t flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setState((prev) => ({ ...prev, showDatePicker: false }))
                  }
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {searchTokens.length > 0 && (
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="text-xs"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>

        {/* Search Results Section - Now with consistent height */}
        <div className={`flex-1 border-t px-6 flex flex-col overflow-hidden ${isSearching ? "" : "hidden"}`}>
          <div className="flex items-center justify-between py-4">
            <h3 className="text-lg font-medium">Search Results</h3>
            {results.length > 0 && (
              <Badge variant="outline">
                {results.length} {results.length === 1 ? "note" : "notes"}{" "}
                found
              </Badge>
            )}
          </div>

          <div className="overflow-y-auto flex-1 pr-2 min-h-[250px]">
            <div className="space-y-3">
              {results.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-8 h-[250px]">
                  <InfoIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    No notes found with the current search criteria.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try a different search query.
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
                        <div className="flex justify-between items-start flex-wrap gap-1">
                          <h3 className="font-medium">{note.name}</h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <CalendarIcon className="h-3 w-3" />
                            <span>{formatDate(note.creationDate)}</span>
                          </div>
                        </div>

                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <FolderIcon className="h-3 w-3 mr-1" />
                          <span className="truncate">{notePaths[note.id]}</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-2">
                          {note.tags.map((tagName) => (
                            <TagBadge
                              key={tagName}
                              name={tagName}
                              color={getTagColor(tagName)}
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
        </div>

        {/* Empty State - Show when not searching */}
        {!isSearching && (
          <div className="flex-1 flex items-center justify-center border-t">
            <div className="text-center p-8">
              <CalendarIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Search Your Notes</h3>
              <p className="text-muted-foreground max-w-md">
                Enter search terms above to find notes by title, content, tags, or creation date.
              </p>
              <div className="mt-4 text-sm text-muted-foreground">
                <p className="mb-1"><strong>Examples:</strong></p>
                <ul className="text-left inline-block">
                  <li><code>title:meeting</code> - Find notes with "meeting" in the title</li>
                  <li><code>tag:important</code> - Find notes with the "important" tag</li>
                  <li><code>created:>04/01/2025</code> - Find notes created after April 1, 2025</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
