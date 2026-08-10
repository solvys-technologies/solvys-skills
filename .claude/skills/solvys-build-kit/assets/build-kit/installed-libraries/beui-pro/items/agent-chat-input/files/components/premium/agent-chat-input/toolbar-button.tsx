"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ToolbarButtonProps {
  label: string;
  active?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export function ToolbarButton({
  label,
  active = false,
  className,
  children,
  onClick,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 min-w-9 items-center justify-center rounded-full text-muted-foreground text-sm transition-colors",
        "hover:bg-primary/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "data-[active=true]:bg-primary/5 data-[active=true]:text-foreground",
        className,
      )}
      data-active={active}
    >
      {children}
    </button>
  );
}
