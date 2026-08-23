"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  createContext,
  type ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { EASE_OUT, SPRING_BOUNCE } from "@/lib/ease";
import { cn } from "@/lib/utils";

type DropdownRenderState = {
  open: boolean;
};

type DropdownItemLayoutProps = {
  label?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  trailing?: ReactNode;
  shortcut?: ReactNode;
  selected?: boolean;
  children?: ReactNode;
};

type SubmenuState = {
  rect: DOMRect | null;
  open: (element: HTMLElement) => void;
  scheduleClose: () => void;
  clearCloseTimer: () => void;
};

const DropdownSubmenuContext = createContext<SubmenuState | null>(null);

export type DropdownProps = {
  children: ReactNode;
  className?: string;
};

export function Dropdown({ children, className }: DropdownProps) {
  return (
    <Menu as="div" className={cn("relative inline-block text-left", className)}>
      {children}
    </Menu>
  );
}

export type DropdownTriggerProps = {
  label?: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode | ((state: DropdownRenderState) => ReactNode);
};

export function DropdownTrigger({
  label = "Options",
  disabled,
  className,
  children,
}: DropdownTriggerProps) {
  return (
    <MenuButton
      aria-label={label}
      disabled={disabled}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-card px-3 font-medium text-foreground text-sm transition-colors",
        "hover:border-border-strong disabled:pointer-events-none disabled:opacity-50",
        "outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 data-focus:outline-none data-focus:ring-0 data-open:ring-0",
        className,
      )}
    >
      {({ open }) => (
        <>
          {typeof children === "function"
            ? children({ open })
            : (children ?? (
                <>
                  <span>{label}</span>
                  <ChevronDown
                    className={cn(
                      "size-4 text-muted-foreground transition-transform",
                      open && "rotate-180",
                    )}
                  />
                </>
              ))}
        </>
      )}
    </MenuButton>
  );
}

export type DropdownContentProps = {
  children: ReactNode;
  align?: "start" | "end";
  side?: "top" | "bottom";
  portal?: boolean;
  className?: string;
};

export function DropdownContent({
  children,
  align = "start",
  side = "bottom",
  portal = false,
  className,
}: DropdownContentProps) {
  return (
    <MenuItems
      transition
      portal={portal}
      anchor={
        portal
          ? {
              to: `${side} ${align}` as
                | "top start"
                | "top end"
                | "bottom start"
                | "bottom end",
              gap: 8,
              padding: 12,
            }
          : undefined
      }
      className={cn(
        "z-50 w-72 overflow-visible rounded-2xl border border-border-strong/50 bg-background p-1.5 shadow-[0_24px_80px_-36px_rgb(0_0_0_/_0.8),inset_0_1px_0_rgb(255_255_255_/_0.05)] backdrop-blur-xl",
        "outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 data-focus:outline-none data-focus:ring-0",
        "transition data-closed:scale-95 data-closed:opacity-0",
        "data-enter:duration-200 data-enter:ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        "data-leave:duration-150 data-leave:ease-[cubic-bezier(0.4,0,1,1)]",
        side === "top"
          ? "origin-bottom data-closed:translate-y-1"
          : "origin-top data-closed:-translate-y-1",
        !portal && [
          "absolute",
          side === "top" ? "bottom-full mb-2" : "top-full mt-2",
          align === "end" ? "right-0" : "left-0",
        ],
        className,
      )}
    >
      {children}
    </MenuItems>
  );
}

export type DropdownItemProps = DropdownItemLayoutProps & {
  disabled?: boolean;
  danger?: boolean;
  closeOnSelect?: boolean;
  onSelect?: () => void;
  className?: string;
};

export function DropdownItem({
  label,
  description,
  icon,
  trailing,
  shortcut,
  selected,
  children,
  disabled,
  danger,
  closeOnSelect = true,
  onSelect,
  className,
}: DropdownItemProps) {
  return (
    <MenuItem disabled={disabled}>
      {({ close, focus, disabled: itemDisabled }) => (
        <button
          type="button"
          disabled={itemDisabled}
          onClick={(event) => {
            if (!closeOnSelect) {
              event.preventDefault();
            }

            onSelect?.();

            if (closeOnSelect) {
              close();
            }
          }}
          className={cn(
            "flex min-h-8 w-full items-center gap-1 rounded-lg px-2 text-left transition-colors",
            focus && "bg-primary/5",
            itemDisabled && "pointer-events-none opacity-50",
            danger ? "text-destructive" : "text-foreground",
            className,
          )}
        >
          <DropdownItemContent
            label={label}
            description={description}
            icon={icon}
            trailing={trailing}
            shortcut={shortcut}
            selected={selected}
          >
            {children}
          </DropdownItemContent>
        </button>
      )}
    </MenuItem>
  );
}

export type DropdownLabelProps = {
  children: ReactNode;
  className?: string;
};

export function DropdownLabel({ children, className }: DropdownLabelProps) {
  return (
    <p
      className={cn(
        "px-2.5 py-1.5 font-medium text-muted-foreground text-xs",
        className,
      )}
      data-slot="dropdown-section-label"
    >
      {children}
    </p>
  );
}

export type DropdownSeparatorProps = {
  className?: string;
};

export function DropdownSeparator({ className }: DropdownSeparatorProps) {
  return <hr className={cn("my-1 h-px border-0 bg-border", className)} />;
}

export type DropdownSubmenuProps = {
  children: ReactNode;
};

export function DropdownSubmenu({ children }: DropdownSubmenuProps) {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  function clearCloseTimer() {
    if (closeTimerRef.current === null) {
      return;
    }

    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setRect(null);
      closeTimerRef.current = null;
    }, 120);
  }

  function open(element: HTMLElement) {
    clearCloseTimer();
    setRect(element.getBoundingClientRect());
  }

  return (
    <DropdownSubmenuContext.Provider
      value={{ rect, open, scheduleClose, clearCloseTimer }}
    >
      {children}
    </DropdownSubmenuContext.Provider>
  );
}

export type DropdownSubmenuTriggerProps = DropdownItemLayoutProps & {
  disabled?: boolean;
  danger?: boolean;
  onSelect?: () => void;
  className?: string;
};

export function DropdownSubmenuTrigger({
  label,
  description,
  icon,
  trailing,
  shortcut,
  selected,
  children,
  disabled,
  danger,
  onSelect,
  className,
}: DropdownSubmenuTriggerProps) {
  const submenu = useDropdownSubmenu();

  return (
    <MenuItem disabled={disabled}>
      {({ focus, disabled: itemDisabled }) => (
        <button
          type="button"
          disabled={itemDisabled}
          aria-haspopup="menu"
          onFocus={(event) => submenu.open(event.currentTarget)}
          // Hover open/close is mouse-only. On touch, pointerenter fires on tap
          // and pointerleave on lift, which would flash the submenu open then
          // shut — so touch opens it via onClick instead.
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse")
              submenu.open(event.currentTarget);
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") submenu.scheduleClose();
          }}
          onClick={(event) => {
            event.preventDefault();
            submenu.open(event.currentTarget);
            onSelect?.();
          }}
          className={cn(
            "flex min-h-12 w-full items-center gap-2 rounded-xl px-1 text-left transition-colors",
            focus && "bg-primary/5",
            itemDisabled && "pointer-events-none opacity-50",
            danger ? "text-destructive" : "text-foreground",
            className,
          )}
        >
          <DropdownItemContent
            label={label}
            description={description}
            icon={icon}
            trailing={trailing}
            shortcut={shortcut}
            selected={selected}
          >
            {children}
          </DropdownItemContent>
        </button>
      )}
    </MenuItem>
  );
}

export type DropdownSubmenuContentProps = {
  children: ReactNode;
  className?: string;
  width?: number;
  sideOffset?: number;
  alignOffset?: number;
  viewportPadding?: number;
};

export function DropdownSubmenuContent({
  children,
  className,
  width = 256,
  sideOffset = 8,
  alignOffset = 0,
  viewportPadding = 12,
}: DropdownSubmenuContentProps) {
  const submenu = useDropdownSubmenu();

  if (typeof document === "undefined") {
    return null;
  }

  const rect = submenu.rect;
  const hasRightSpace = rect
    ? rect.right + sideOffset + width <= window.innerWidth - viewportPadding
    : true;
  const left = rect
    ? hasRightSpace
      ? rect.right + sideOffset
      : Math.max(viewportPadding, rect.left - width - sideOffset)
    : 0;

  return createPortal(
    <AnimatePresence>
      {rect ? (
        <motion.div
          key="submenu"
          role="menu"
          onPointerEnter={submenu.clearCloseTimer}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") submenu.scheduleClose();
          }}
          initial={{ opacity: 0, scale: 0.94, x: hasRightSpace ? -6 : 6 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{
            opacity: 0,
            scale: 0.97,
            x: hasRightSpace ? -4 : 4,
            transition: { duration: 0.12, ease: EASE_OUT },
          }}
          transition={SPRING_BOUNCE}
          className={cn(
            "fixed z-[70] rounded-2xl border border-border-strong/50 bg-background p-2 shadow-[0_24px_80px_-36px_rgb(0_0_0_/_0.8),inset_0_1px_0_rgb(255_255_255_/_0.05)] outline-none ring-0 backdrop-blur-xl",
            className,
          )}
          style={{
            left,
            top: Math.max(viewportPadding, rect.top + alignOffset),
            width,
            transformOrigin: hasRightSpace ? "left center" : "right center",
          }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function useDropdownSubmenu() {
  const context = useContext(DropdownSubmenuContext);

  if (!context) {
    throw new Error(
      "DropdownSubmenuTrigger and DropdownSubmenuContent must be used inside DropdownSubmenu",
    );
  }

  return context;
}

function DropdownItemContent({
  label,
  description,
  icon,
  trailing,
  shortcut,
  selected,
  children,
}: DropdownItemLayoutProps) {
  if (children) {
    return <>{children}</>;
  }

  return (
    <>
      {icon ? (
        <span
          className="grid size-7 shrink-0 place-items-center text-muted-foreground"
          data-slot="dropdown-icon"
        >
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span
          className="block truncate font-medium text-sm"
          data-slot="dropdown-label"
        >
          {label}
        </span>
        {description ? (
          <span
            className="block truncate text-muted-foreground text-xs"
            data-slot="dropdown-description"
          >
            {description}
          </span>
        ) : null}
      </span>
      {trailing ? (
        <span
          className="grid min-h-6 shrink-0 place-items-center text-muted-foreground"
          data-slot="dropdown-trailing"
        >
          {trailing}
        </span>
      ) : shortcut ? (
        <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
          {shortcut}
        </kbd>
      ) : null}
      {selected ? <Check className="size-4 text-accent" /> : null}
    </>
  );
}
