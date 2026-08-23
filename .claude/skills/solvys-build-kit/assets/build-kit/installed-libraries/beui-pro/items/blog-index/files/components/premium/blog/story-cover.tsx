import { cn } from "@/lib/utils";

const GRID_CELLS = Array.from(
  { length: 16 },
  (_, index) => `cover-grid-cell-${index + 1}`,
);

export type StoryCoverProps = {
  variant?: "window" | "steps" | "orbit" | "tiles";
  className?: string;
};

export function StoryCover({ variant = "window", className }: StoryCoverProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-muted text-foreground",
        className,
      )}
      aria-hidden="true"
    >
      <BackgroundGrid />
      {variant === "window" ? <WindowArtwork /> : null}
      {variant === "steps" ? <StepsArtwork /> : null}
      {variant === "orbit" ? <OrbitArtwork /> : null}
      {variant === "tiles" ? <TilesArtwork /> : null}
    </div>
  );
}

function BackgroundGrid() {
  return (
    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-70">
      {GRID_CELLS.map((cell) => (
        <span
          key={cell}
          className="border-border border-r border-b last:border-r-0"
        />
      ))}
    </div>
  );
}

function WindowArtwork() {
  return (
    <div className="absolute inset-[12%] grid grid-cols-[1fr_0.68fr] border border-border bg-background/80 p-[5%]">
      <div className="border-border border-r">
        <div className="h-full w-[72%] border border-border bg-card" />
      </div>
      <div className="flex flex-col justify-between pl-[12%]">
        <span className="h-px w-full bg-border" />
        <span className="aspect-square w-1/2 self-end rounded-full border border-border bg-background" />
        <span className="h-px w-2/3 bg-border" />
      </div>
    </div>
  );
}

function StepsArtwork() {
  return (
    <div className="absolute inset-[12%] flex items-end justify-center gap-[4%] border border-border bg-background/70 p-[7%]">
      {[38, 58, 78, 100].map((height) => (
        <span
          key={height}
          className="w-[18%] border border-border bg-card"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

function OrbitArtwork() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <span className="absolute size-[70%] rounded-full border border-border" />
      <span className="absolute size-[46%] rounded-full border border-border bg-background/70" />
      <span className="size-[15%] rounded-full bg-foreground" />
      <span className="absolute top-[19%] right-[25%] size-[8%] rounded-full border border-border bg-background" />
    </div>
  );
}

function TilesArtwork() {
  return (
    <div className="absolute inset-[12%] grid grid-cols-3 grid-rows-3 gap-[3%]">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((tile) => (
        <span
          key={tile}
          className={cn(
            "border border-border bg-background/80",
            tile === 4 && "bg-foreground",
          )}
        />
      ))}
    </div>
  );
}
