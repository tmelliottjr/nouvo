"use client";

import { CalendarSettings } from "@/components/settings/calendar-settings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TagBadge } from "@/components/ui/tag-badge";
import { useConfirm } from "@/hooks/use-confirm";
import { useNotes } from "@/state-providers/use-notes";
import {
  DEFAULT_TAG_COLORS,
  useTagsSettings,
} from "@/state-providers/use-tags-settings";
import { Check, ChevronLeft, Plus, Tag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  return (
    <div className="h-full w-full">
      <SettingsContent />
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="overflow-auto h-full">
      <div className="flex flex-col h-full">
        <header className="flex items-center h-16 px-4 border-b">
          <Link
            href="/notes"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground mr-4"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
          <h1 className="text-xl font-semibold">Settings</h1>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Tabs defaultValue="tags" className="max-w-4xl mx-auto">
            <TabsList>
              <TabsTrigger value="tags">Tags</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
            </TabsList>
            <TabsContent value="tags" className="py-4">
              <TagsSettings />
            </TabsContent>
            <TabsContent value="calendar" className="py-4">
              <CalendarSettings />
            </TabsContent>
            <TabsContent value="general" className="py-4">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Configure general application settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    More settings coming soon
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

function TagsSettings() {
  const { tags, addTag, updateTag, removeTag } = useTagsSettings();
  const { treeData } = useNotes();
  const { confirm } = useConfirm();
  const [newTagName, setNewTagName] = useState("");
  const [selectedTagIndex, setSelectedTagIndex] = useState<number | null>(null);
  const [selectedPresetColorIndex, setSelectedPresetColorIndex] = useState<
    number | null
  >(null);

  // Update color picker when tag is selected
  useEffect(() => {
    if (selectedTagIndex !== null) {
      const selectedTag = tags[selectedTagIndex];
      const selectedColor = selectedTag.color;

      // Check if the color matches any preset
      const presetIndex = DEFAULT_TAG_COLORS.findIndex(
        (color) => color === selectedColor
      );

      if (presetIndex !== -1) {
        setSelectedPresetColorIndex(presetIndex);
      } else {
        setSelectedPresetColorIndex(null);
      }
    }
  }, [selectedTagIndex, tags]);

  // Count notes that use each tag
  const tagUsageCount = tags.reduce(
    (acc, tag) => {
      acc[tag.name] = Object.values(treeData)
        .filter((node) => node.type === "note")
        .filter((note) => note.tags?.includes(tag.name)).length;
      return acc;
    },
    {} as Record<string, number>
  );

  const handleAddTag = () => {
    if (newTagName.trim() === "") return;

    // If no preset color is selected, use the first one as default
    const colorIndex =
      selectedPresetColorIndex !== null ? selectedPresetColorIndex : 0;

    addTag({
      name: newTagName.trim().toLowerCase(),
      color: DEFAULT_TAG_COLORS[colorIndex],
    });

    setNewTagName("");
  };

  const handlePresetColorSelect = (colorIndex: number, tagName?: string) => {
    setSelectedPresetColorIndex(colorIndex);

    if (tagName) {
      const color = DEFAULT_TAG_COLORS[colorIndex];
      updateTag(tagName, { color });
    }
  };

  const handleRemoveTag = async (tagName: string) => {
    const result = await confirm({
      title: "Remove Tag",
      description: `Are you sure you want to remove the "${tagName}" tag? This will remove the tag from any notes using it.`,
      variant: "danger",
      confirmText: "Remove",
      cancelText: "Cancel",
    });

    if (result) {
      removeTag(tagName);
      if (selectedTagIndex !== null) {
        setSelectedTagIndex(null);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tag Management</CardTitle>
        <CardDescription>
          Customize tags to organize your notes. Choose from 10 preset colors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-end gap-2">
            <div className="space-y-1 flex-1">
              <Label htmlFor="tag-name">Add New Tag</Label>
              <Input
                id="tag-name"
                placeholder="Enter tag name"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddTag();
                }}
              />
            </div>
            <Button onClick={handleAddTag} className="flex gap-1 items-center">
              <Plus className="h-4 w-4" />
              <span>Add Tag</span>
            </Button>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left section: Available Tags */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Available Tags</h3>
              <div className="max-h-96 overflow-y-auto rounded-md bg-secondary/20 p-1">
                {tags.length === 0 ? (
                  <div className="text-muted-foreground text-sm p-3 text-center">
                    No tags added yet
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {tags.map((tag, index) => (
                      <li key={tag.name}>
                        <Button
                          variant={
                            selectedTagIndex === index ? "secondary" : "ghost"
                          }
                          className={`w-full justify-between group relative h-auto py-2 ${
                            selectedTagIndex === index
                              ? "border-l-4 border-l-primary pl-2"
                              : ""
                          }`}
                          onClick={() => setSelectedTagIndex(index)}
                        >
                          <div className="flex items-center">
                            <TagBadge name={tag.name} color={tag.color} />
                            {tagUsageCount[tag.name] > 0 && (
                              <Badge
                                variant="secondary"
                                className="ml-2 text-xs"
                              >
                                {tagUsageCount[tag.name]}
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center">
                            {selectedTagIndex === index && (
                              <Check className="h-4 w-4 mr-2 text-primary" />
                            )}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveTag(tag.name);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Right section: Color Selection */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Color Settings</h3>
              <div className="rounded-md bg-secondary/20 p-4">
                {selectedTagIndex !== null ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Select a Color</Label>
                      <div className="grid grid-cols-5 gap-2">
                        {DEFAULT_TAG_COLORS.map((color, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`w-full aspect-square rounded-md flex items-center justify-center transition-all ${
                              selectedPresetColorIndex === idx
                                ? "ring-2 ring-offset-2 ring-primary"
                                : "hover:scale-110"
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() =>
                              handlePresetColorSelect(
                                idx,
                                tags[selectedTagIndex].name
                              )
                            }
                            title={`Color ${idx + 1}`}
                          >
                            {selectedPresetColorIndex === idx && (
                              <Check className="h-4 w-4 text-white drop-shadow-sm" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-center">
                    <Tag className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Select a tag to customize its color
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
