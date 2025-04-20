"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/state-providers/use-auth";
import { useCalendar } from "@/state-providers/use-calendar";
import { CalendarClock, Check, ExternalLink, RefreshCw, X } from "lucide-react";
import { useEffect, useState } from "react";

// Types for Google Calendar integration
interface GoogleCalendar {
  id: string;
  summary: string;
  description?: string;
  backgroundColor: string;
  selected: boolean;
}

export function CalendarSettings() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [googleAuthStatus, setGoogleAuthStatus] = useState<{
    connected: boolean;
    email?: string;
    accessToken?: string;
  }>({
    connected: false,
  });

  // Use our calendar context
  const {
    isIntegrationEnabled,
    calendarList,
    fetchCalendarList,
    updateCalendarSelection,
  } = useCalendar();

  // Check Google auth status when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      checkGoogleAuthStatus();
    }
  }, [isAuthenticated]);

  // Check if user has connected Google account
  const checkGoogleAuthStatus = async () => {
    try {
      // This would be an API call to check if the user has connected their Google account
      const response = await fetch("/api/auth/google/status");
      const data = await response.json();

      setGoogleAuthStatus({
        connected: data.connected,
        email: data.email,
        accessToken: data.accessToken,
      });
    } catch (error) {
      console.error("Error checking Google auth status:", error);
      setGoogleAuthStatus({ connected: false });
    }
  };

  // Load calendars when component mounts if the user is authenticated
  // and integration is enabled
  useEffect(() => {
    // Fetch available calendars from Google
    const fetchCalendarListFromAPI = async () => {
      try {
        setIsLoading(true);
        await fetchCalendarList();
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching calendars:", error);
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Failed to load calendars. Please try again.",
          variant: "destructive",
        });
      }
    };
    if (
      isAuthenticated &&
      googleAuthStatus.connected &&
      googleAuthStatus.accessToken &&
      isIntegrationEnabled
    ) {
      fetchCalendarListFromAPI();
    }
  }, [
    fetchCalendarList,
    googleAuthStatus,
    isAuthenticated,
    isIntegrationEnabled,
    toast,
  ]);

  // Connect Google Calendar account
  const handleConnectGoogleCalendar = async () => {
    try {
      setIsLoading(true);
      console.log("Connecting to Google Calendar...");
      // Use Better Auth's social signin with Google provider
      const theGoods = await authClient.linkSocial({
        provider: "google",
        // Request calendar scope
        scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
      });

      console.log("Google Calendar connected:", theGoods);

      // After successful authentication, check status again
      await checkGoogleAuthStatus();
      setIsLoading(false);
    } catch (error) {
      console.error("Error connecting to Google Calendar:", error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to connect Google Calendar. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Disconnect Google Calendar account
  const handleDisconnectGoogleCalendar = async () => {
    try {
      setIsLoading(true);

      // Clear stored calendar data from localStorage
      localStorage.removeItem("googleCalendars");
      localStorage.removeItem("calendarIntegrationEnabled");

      // Call API to disconnect Google account
      await fetch("/api/auth/google/disconnect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Update local state
      setGoogleAuthStatus({ connected: false });

      setIsLoading(false);
      toast({
        title: "Success",
        description: "Google Calendar disconnected successfully.",
      });
    } catch (error) {
      console.error("Error disconnecting from Google Calendar:", error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to disconnect Google Calendar. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Toggle calendar selection
  const toggleCalendarSelection = async (
    calendarId: string,
    selected: boolean
  ) => {
    try {
      await updateCalendarSelection(calendarId, selected);
      toast({
        title: "Success",
        description: "Calendar settings updated successfully.",
      });
    } catch (error) {
      console.error("Error updating calendar selection:", error);
      toast({
        title: "Error",
        description: "Failed to update calendar settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Sync calendars manually
  const handleSync = async () => {
    try {
      setIsSyncing(true);
      // Refetch calendar list
      await fetchCalendarList();
      setIsSyncing(false);
      toast({
        title: "Success",
        description: "Calendars synchronized successfully.",
      });
    } catch (error) {
      console.error("Error syncing calendars:", error);
      setIsSyncing(false);
      toast({
        title: "Error",
        description: "Failed to sync calendars. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Toggle calendar integration
  const handleToggleIntegration = (enabled: boolean) => {
    localStorage.setItem("calendarIntegrationEnabled", String(enabled));

    // Force a page reload to update the useSyncExternalStore state
    window.location.reload();

    toast({
      title: enabled ? "Integration Enabled" : "Integration Disabled",
      description: enabled
        ? "Calendar events will now appear in your Noevo calendar."
        : "Calendar events will no longer appear in your Noevo calendar.",
    });
  };

  const isConnected = googleAuthStatus.connected;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5" />
          Calendar Integration
        </CardTitle>
        <CardDescription>
          Connect your Google Calendar to see events in Noevo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Account Connection */}
        <div>
          <h3 className="text-lg font-medium mb-4">Google Calendar</h3>

          {!isConnected ? (
            <div className="flex flex-col gap-4">
              <p className="text-muted-foreground">
                Connect your Google Calendar to see your events in Noevo.
              </p>
              <div>
                <Button
                  onClick={handleConnectGoogleCalendar}
                  disabled={isLoading || authLoading}
                  className="gap-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>Connect Google Calendar</>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Connected account info */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 font-medium">
                      <Check className="h-4 w-4 text-green-500" />
                      Connected
                    </div>
                    <span className="text-sm text-muted-foreground">
                      as {googleAuthStatus.email}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSync}
                    disabled={isSyncing}
                  >
                    {isSyncing ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    <span className="ml-2">Sync Now</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDisconnectGoogleCalendar}
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                    <span className="ml-2">Disconnect</span>
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Enable/Disable integration */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Enable Calendar Integration</h4>
                  <p className="text-sm text-muted-foreground">
                    Show Google Calendar events in Noevo calendar view
                  </p>
                </div>
                <Switch
                  checked={isIntegrationEnabled}
                  onCheckedChange={handleToggleIntegration}
                  disabled={isLoading}
                />
              </div>

              {/* Calendar selection */}
              {isIntegrationEnabled && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-3">
                      Select Calendars to Display
                    </h4>
                    <div className="space-y-2">
                      {calendarList.length > 0 ? (
                        calendarList.map((calendar) => (
                          <div
                            key={calendar.id}
                            className="flex items-center justify-between p-2 border rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{
                                  backgroundColor: calendar.color,
                                }}
                              />
                              <span className="font-medium">
                                {calendar.name}
                              </span>
                            </div>
                            <Switch
                              checked={calendar.selected}
                              onCheckedChange={(checked) =>
                                toggleCalendarSelection(calendar.id, checked)
                              }
                            />
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-muted-foreground py-4">
                          {isLoading ? (
                            <div className="flex justify-center items-center gap-2">
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              <span>Loading calendars...</span>
                            </div>
                          ) : (
                            <span>No calendars found. Try syncing again.</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              {/* Sync settings */}
              <div>
                <h4 className="font-medium mb-3">Sync Settings</h4>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sync-frequency">Sync Frequency</Label>
                      <Select defaultValue="hourly">
                        <SelectTrigger id="sync-frequency" className="mt-1">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="manual">Manual only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="event-window">Event Window</Label>
                      <Select defaultValue="30days">
                        <SelectTrigger id="event-window" className="mt-1">
                          <SelectValue placeholder="Select window" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7days">7 days</SelectItem>
                          <SelectItem value="14days">14 days</SelectItem>
                          <SelectItem value="30days">30 days</SelectItem>
                          <SelectItem value="90days">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Google Calendar documentation link */}
        <div className="pt-4 border-t">
          <a
            href="https://support.google.com/calendar/answer/37083"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
          >
            <span>Learn more about Google Calendar integration</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
