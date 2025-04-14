import { ReactNode } from "react";

interface EmptyStateProps {
  message: string;
  icon?: ReactNode;
}

export function EmptyState({ message, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-stone-500 dark:text-stone-400">
      {icon && <div className="mb-4">{icon}</div>}
      <p className="text-center">{message}</p>
    </div>
  );
}
