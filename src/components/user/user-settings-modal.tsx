"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAuth } from "@/state-providers/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

// Form schema for validation
const profileFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
});

// Add validation for password change
const passwordChangeSchema = profileFormSchema
  .extend({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface UserSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserSettingsModal({
  open,
  onOpenChange,
}: UserSettingsModalProps) {
  const { user, fetchSession } = useAuth();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Initialize the form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(
      isChangingPassword ? passwordChangeSchema : profileFormSchema
    ),
    defaultValues: {
      name: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Load user data when available
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Update user profile (name and email)
      if (values.name !== user?.name || values.email !== user?.email) {
        const profileResponse = await fetch("/api/auth/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
          }),
        });

        if (!profileResponse.ok) {
          const errorData = await profileResponse.json();
          throw new Error(errorData.error || "Failed to update profile");
        }
      }

      // Update password if changing
      if (isChangingPassword && values.currentPassword && values.newPassword) {
        const passwordResponse = await fetch("/api/auth/password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          }),
        });

        if (!passwordResponse.ok) {
          const errorData = await passwordResponse.json();
          throw new Error(errorData.error || "Failed to update password");
        }
      }

      // Refresh session to get updated user data
      await fetchSession();

      setSuccess("Profile updated successfully");

      // Reset password fields if we were changing password
      if (isChangingPassword) {
        setIsChangingPassword(false);
        form.setValue("currentPassword", "");
        form.setValue("newPassword", "");
        form.setValue("confirmPassword", "");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get initials from the user's name
  const getInitials = () => {
    if (!user?.name) return "U";

    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
          <DialogDescription>Update your profile information</DialogDescription>
        </DialogHeader>

        <div className="flex justify-center mb-6">
          <Avatar className="h-20 w-20">
            {user?.image ? (
              <AvatarImage src={user.image} alt={user?.name || "User"} />
            ) : (
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-medium">
                {getInitials()}
              </AvatarFallback>
            )}
          </Avatar>
        </div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <Label
                      htmlFor="name"
                      className={cn(error && "text-destructive")}
                    >
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      {...field}
                      className={cn(error && "border-destructive")}
                    />
                    {error && (
                      <p className="text-sm font-medium text-destructive mt-1">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <Label
                      htmlFor="email"
                      className={cn(error && "text-destructive")}
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      placeholder="your.email@example.com"
                      type="email"
                      {...field}
                      className={cn(error && "border-destructive")}
                    />
                    {error && (
                      <p className="text-sm font-medium text-destructive mt-1">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsChangingPassword(!isChangingPassword)}
                size="sm"
              >
                {isChangingPassword ? "Cancel" : "Change Password"}
              </Button>
            </div>

            {isChangingPassword && (
              <>
                <div className="space-y-2">
                  <Controller
                    control={form.control}
                    name="currentPassword"
                    render={({ field, fieldState: { error } }) => (
                      <div>
                        <Label
                          htmlFor="currentPassword"
                          className={cn(error && "text-destructive")}
                        >
                          Current Password
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          {...field}
                          className={cn(error && "border-destructive")}
                        />
                        {error && (
                          <p className="text-sm font-medium text-destructive mt-1">
                            {error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Controller
                    control={form.control}
                    name="newPassword"
                    render={({ field, fieldState: { error } }) => (
                      <div>
                        <Label
                          htmlFor="newPassword"
                          className={cn(error && "text-destructive")}
                        >
                          New Password
                        </Label>
                        <Input
                          id="newPassword"
                          type="password"
                          {...field}
                          className={cn(error && "border-destructive")}
                        />
                        {error && (
                          <p className="text-sm font-medium text-destructive mt-1">
                            {error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Controller
                    control={form.control}
                    name="confirmPassword"
                    render={({ field, fieldState: { error } }) => (
                      <div>
                        <Label
                          htmlFor="confirmPassword"
                          className={cn(error && "text-destructive")}
                        >
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          {...field}
                          className={cn(error && "border-destructive")}
                        />
                        {error && (
                          <p className="text-sm font-medium text-destructive mt-1">
                            {error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </>
            )}

            {error && (
              <div className="text-sm font-medium text-destructive">
                {error}
              </div>
            )}
            {success && (
              <div className="text-sm font-medium text-green-600">
                {success}
              </div>
            )}

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
