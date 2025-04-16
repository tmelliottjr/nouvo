"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NoteShare, useAuth } from "@/state-providers/use-auth";
import {
  CopyIcon,
  Link2Icon,
  ShareIcon,
  TrashIcon,
  UsersIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

interface ShareNoteButtonProps {
  noteId: string;
  noteTitle: string;
}

export function ShareNoteButton({ noteId, noteTitle }: ShareNoteButtonProps) {
  const { user, shareNote, getSharedNoteAccess, revokeAccess } = useAuth();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showManageDialog, setShowManageDialog] = useState(false);
  const [permission, setPermission] = useState<"read" | "write">("read");
  const [shareUrl, setShareUrl] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sharedWith, setSharedWith] = useState<NoteShare[]>([]);
  const [error, setError] = useState("");

  // Load existing shares when manage dialog opens
  useEffect(() => {
    if (showManageDialog) {
      loadSharedUsers();
    }
  }, [showManageDialog]);

  // Load users with access to this note
  const loadSharedUsers = async () => {
    setIsLoading(true);
    try {
      const shares = await getSharedNoteAccess(noteId);
      setSharedWith(shares);
    } catch (error) {
      console.error("Error loading shared users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle share button click
  const handleShareClick = () => {
    setShowShareDialog(true);
    setUserEmail("");
    setError("");

    // Generate a shareable URL
    const baseUrl = window.location.origin;
    setShareUrl(`${baseUrl}/shared/${noteId}`);
  };

  // Handle copying the URL to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Handle sharing with a specific user
  const handleShare = async () => {
    if (!userEmail.trim()) {
      setError("Please enter an email address");
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const success = await shareNote(noteId, userEmail, permission);

      if (success) {
        setShowShareDialog(false);
        // Show the manage dialog after successful share
        setShowManageDialog(true);
      } else {
        setError("Failed to share the note. Please try again.");
      }
    } catch (error) {
      console.error("Error sharing note:", error);
      setError("An error occurred while sharing the note");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle revoking access
  const handleRevokeAccess = async (userId: string) => {
    setIsLoading(true);

    try {
      const success = await revokeAccess(noteId, userId);

      if (success) {
        // Refresh the list of shared users
        await loadSharedUsers();
      }
    } catch (error) {
      console.error("Error revoking access:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <ShareIcon className="h-4 w-4 mr-2" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setPermission("read");
              handleShareClick();
            }}
          >
            <Link2Icon className="h-4 w-4 mr-2" />
            Share with someone
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setShowManageDialog(true);
            }}
          >
            <UsersIcon className="h-4 w-4 mr-2" />
            Manage access
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share "{noteTitle}"</DialogTitle>
            <DialogDescription>
              Share this note with a specific user by email
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="user-email">User email</Label>
              <Input
                id="user-email"
                type="email"
                placeholder="colleague@example.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>

            <div className="space-y-2">
              <Label>Permission level</Label>
              <div className="flex gap-2">
                <Badge
                  variant={permission === "read" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setPermission("read")}
                >
                  Read-only
                </Badge>
                <Badge
                  variant={permission === "write" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setPermission("write")}
                >
                  Can edit
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {permission === "read"
                  ? "User will only be able to view this note"
                  : "User will be able to view and edit this note"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="share-url">Or share via link</Label>
              <div className="flex gap-2">
                <Input
                  id="share-url"
                  value={shareUrl}
                  readOnly
                  className="flex-1"
                />
                <Button size="sm" onClick={handleCopyLink}>
                  {copied ? (
                    "Copied!"
                  ) : (
                    <>
                      <CopyIcon className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Anyone with the link can access this note if they have a Noevo
                account
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowShareDialog(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleShare} disabled={isLoading}>
              {isLoading ? "Sharing..." : "Share"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Access Dialog */}
      <Dialog open={showManageDialog} onOpenChange={setShowManageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Access</DialogTitle>
            <DialogDescription>
              Control who has access to "{noteTitle}"
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 h-[300px] overflow-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : sharedWith.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <UsersIcon className="mx-auto h-8 w-8 mb-2 opacity-50" />
                <p>This note hasn't been shared with anyone yet</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Access</TableHead>
                    <TableHead className="w-[60px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sharedWith.map((share) => (
                    <TableRow key={share.userId}>
                      <TableCell className="font-medium">
                        {share.userEmail}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {share.permission === "read"
                            ? "Read-only"
                            : "Can edit"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRevokeAccess(share.userId)}
                          disabled={isLoading}
                        >
                          <TrashIcon className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" asChild>
              <div
                onClick={() => {
                  setShowManageDialog(false);
                  setShowShareDialog(true);
                }}
              >
                Share with more people
              </div>
            </Button>
            <Button
              variant="default"
              onClick={() => setShowManageDialog(false)}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
