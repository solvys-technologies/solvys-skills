import { useEffect, useId, useRef, type ReactNode } from "react";

type WorkbenchDrawerProps = { open: boolean; title: string; controls?: ReactNode; children: ReactNode; note?: string; noteLabel?: string; onNoteChange?: (value: string) => void; onClose: () => void };

export function WorkbenchDrawer({ open, title, controls, children, note, noteLabel = "Notes", onNoteChange, onClose }: WorkbenchDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  return (
    <dialog ref={dialogRef} className="solvys-kit-drawer" aria-labelledby={titleId} onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <header className="solvys-kit-drawer__bar"><h2 id={titleId}>{title}</h2><div className="solvys-kit-drawer__controls">{controls}</div><button type="button" onClick={onClose} aria-label={`Close ${title}`}>Close</button></header>
      <div className="solvys-kit-drawer__body">{children}</div>
      {onNoteChange ? <label className="solvys-kit-drawer__notes"><span>{noteLabel}</span><textarea value={note ?? ""} onChange={(event) => onNoteChange(event.target.value)} /></label> : null}
    </dialog>
  );
}
