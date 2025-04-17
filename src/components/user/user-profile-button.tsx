"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAuth } from "@/state-providers/use-auth";
import { LogOut, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { UserSettingsModal } from "./user-settings-modal";

interface UserProfileButtonProps {
  onClick?: () => void;
}

export function UserProfileButton({ onClick }: UserProfileButtonProps) {
  const { user, logout } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);

  if (!user) return null;

  // Get initials from the user's name
  const getInitials = () => {
    if (!user.name) return "U";

    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setSettingsOpen(true);
    }
  };

  return (
    <>
      <HoverCard openDelay={200} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start p-2 h-auto hover:bg-stone-100 dark:hover:bg-stone-800"
            onClick={handleClick}
          >
            <Avatar className="h-8 w-8 mr-2">
              {user.image ? (
                <AvatarImage src={user.image} alt={user.name || user.email} />
              ) : (
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col items-start text-left">
              <span className="text-sm font-medium truncate max-w-[140px]">
                {user.name || user.email}
              </span>
            </div>
          </Button>
        </HoverCardTrigger>

        <HoverCardContent className="w-56 p-2" align="start">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Avatar className="h-10 w-10">
                {user.image ? (
                  <AvatarImage src={user.image} alt={user.name || user.email} />
                ) : (
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="space-y-1">
                {user.name && (
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                )}
                <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-1 pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="justify-start h-auto py-1.5"
                onClick={() => setSettingsOpen(true)}
              >
                <UserIcon className="mr-2 h-3.5 w-3.5" />
                Profile Settings
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="justify-start h-auto py-1.5 text-destructive hover:text-destructive"
                onClick={() => logout()}
              >
                <LogOut className="mr-2 h-3.5 w-3.5" />
                Logout
              </Button>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      <UserSettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
