"use client";

import { cn } from "@/lib/utils";
import { useSpring, useTransition } from "@react-spring/web";
import React, { ReactNode, useEffect, useRef } from "react";
import { Button } from "./button";

// Types for the components
interface AlertDialogProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface AlertDialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface AlertDialogTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

interface AlertDialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

interface AlertDialogActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

interface AlertDialogCancelProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

// Root AlertDialog component
export function AlertDialog({
  children,
  open,
  onOpenChange,
}: AlertDialogProps) {
  // Use React Spring transitions with proper exit animation handling
  const transitions = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 280, friction: 20 },
  });

  return transitions(
    (styles, item) =>
      item !== undefined && (
        <div className="fixed inset-0 z-50">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(
                child as React.ReactElement<AlertDialogContentProps>,
                {
                  onOpenChange,
                  open,
                }
              );
            }
            return child;
          })}
        </div>
      )
  );
}

// Alert Dialog Content
export function AlertDialogContent({
  children,
  className,
  open,
  onOpenChange,
  ...props
}: AlertDialogContentProps & { open?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  // Handle clicks outside the dialog
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onOpenChange) {
      onOpenChange(false);
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onOpenChange) {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onOpenChange]);

  // Use springs for both the backdrop and content
  const backdropSpring = useSpring({
    opacity: open ? 1 : 0,
    config: {
      tension: 280,
      friction: 20,
    },
  });

  // Use a separate spring for the content animation
  const contentSpring = useSpring({
    opacity: open ? 1 : 0,
    transform: open
      ? "scale(1) translateY(0px)"
      : "scale(0.95) translateY(10px)",
    config: {
      tension: 280,
      friction: 20,
    },
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-center justify-center"
      onClick={handleOverlayClick}
      style={{ opacity: backdropSpring.opacity.toString() }}
    >
      <div
        ref={ref}
        className={cn(
          "grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full",
          className
        )}
        style={{
          opacity: contentSpring.opacity.toString(),
          transform: contentSpring.transform.toString(),
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

// Header component
export function AlertDialogHeader({
  className,
  ...props
}: AlertDialogHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className
      )}
      {...props}
    />
  );
}

// Footer component
export function AlertDialogFooter({
  className,
  ...props
}: AlertDialogFooterProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  );
}

// Title component
export function AlertDialogTitle({
  className,
  ...props
}: AlertDialogTitleProps) {
  return (
    <h2
      className={cn("text-lg font-semibold text-foreground", className)}
      {...props}
    />
  );
}

// Description component
export function AlertDialogDescription({
  className,
  ...props
}: AlertDialogDescriptionProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

// Action button component
export function AlertDialogAction({
  className,
  ...props
}: AlertDialogActionProps) {
  return <Button className={cn(className)} {...props} />;
}

// Cancel button component
export function AlertDialogCancel({
  className,
  ...props
}: AlertDialogCancelProps) {
  return (
    <Button
      variant="outline"
      className={cn("mt-2 sm:mt-0", className)}
      {...props}
    />
  );
}
