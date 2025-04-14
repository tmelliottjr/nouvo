"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/custom-alert-dialog";
import strings from "@/lib/strings";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ConfirmVariant = "danger" | "warning" | "info";

interface ConfirmOptions {
  title: string;
  description: string;
  variant?: ConfirmVariant;
  confirmText?: string;
  cancelText?: string;
}

interface ConfirmContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextValue | undefined>(
  undefined
);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    options: ConfirmOptions;
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setDialog({
        isOpen: true,
        options,
        resolve,
      });
    });
  }, []);

  const handleClose = useCallback(
    (result: boolean) => {
      if (dialog) {
        dialog.resolve(result);
        setDialog(null);
      }
    },
    [dialog]
  );

  const contextValue = useMemo(() => ({ confirm }), [confirm]);

  return (
    <ConfirmContext.Provider value={contextValue}>
      {children}
      {dialog && (
        <AlertDialog
          open={dialog.isOpen}
          onOpenChange={(open) => {
            if (!open) handleClose(false);
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{dialog.options.title}</AlertDialogTitle>
              <AlertDialogDescription>
                {dialog.options.description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => handleClose(false)}>
                {dialog.options.cancelText || strings.common.cancel}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleClose(true)}
                className={
                  dialog.options.variant === "danger"
                    ? "bg-red-600 hover:bg-red-700"
                    : dialog.options.variant === "warning"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : ""
                }
              >
                {dialog.options.confirmText || strings.common.delete}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm(): ConfirmContextValue {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context;
}
