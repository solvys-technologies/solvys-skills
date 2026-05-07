# React recipes

Self-contained patterns for the 9 transitions. Each snippet assumes `transitions.css` is imported globally and `cn()` is your classnames helper.

## 1. Notification badge

```tsx
function BellWithBadge({ unread }: { unread: number }) {
  return (
    <button className="relative">
      <BellIcon />
      <span className="t-badge" data-open={unread > 0 ? "true" : "false"}>
        <span className="t-badge-dot">{unread}</span>
      </span>
    </button>
  );
}
```

## 2. Menu dropdown

The two-step close (`is-open` -> `is-closing` -> remove) lets the close animation play before unmount.

```tsx
function FilterMenu({ open, onClose, children }: Props) {
  const [closing, setClosing] = useState(false);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (wasOpen.current && !open) {
      setClosing(true);
      const t = setTimeout(() => setClosing(false), 150); // --t-dropdown-close-dur
      return () => clearTimeout(t);
    }
    wasOpen.current = open;
  }, [open]);

  if (!open && !closing) return null;
  return (
    <div
      className={cn("t-dropdown", { "is-open": open && !closing, "is-closing": closing })}
      data-origin="top-right"
    >
      {children}
    </div>
  );
}
```

## 3. Panel reveal

```tsx
<div className="t-panel-slide" data-open={expanded ? "true" : "false"}>
  {body}
</div>
```

For a tall panel, pass a CSS variable to override the slide distance:

```tsx
<div className="t-panel-slide" data-open={open ? "true" : "false"} style={{ "--t-panel-translate-y": "32px" } as CSSProperties}>
```

## 4. Card resize

Just add `t-resize` to anything whose width/height changes:

```tsx
<div className={cn("t-resize", expanded ? "h-[280px] w-[420px]" : "h-[120px] w-[280px]")}>
```

## 5. Icon swap

```tsx
<span className="t-icon-swap" data-state={open ? "b" : "a"}>
  <ChevronDown className="t-icon h-4 w-4" data-icon="a" />
  <ChevronUp className="t-icon h-4 w-4" data-icon="b" />
</span>
```

## 6. Text states swap

```tsx
function SwapText({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const last = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || last.current === value) return;
    el.classList.add("is-exit");
    const dur = 200; // --t-text-swap-dur
    const t = setTimeout(() => {
      el.textContent = value;
      last.current = value;
      el.classList.remove("is-exit");
      el.classList.add("is-enter-start");
      // force reflow
      void el.offsetHeight;
      el.classList.remove("is-enter-start");
    }, dur);
    return () => clearTimeout(t);
  }, [value]);

  return <span ref={ref} className="t-text-swap">{last.current}</span>;
}
```

## 7. Modal

Same two-step pattern as dropdown. Pair with a backdrop element you fade independently.

```tsx
<div className={cn("t-modal", { "is-open": open && !closing, "is-closing": closing })} role="dialog">
  {body}
</div>
```

## 8. Page slide

For step wizards or split-state views:

```tsx
<div className="t-page-slide" data-page={String(page)}>
  <section className="t-page" data-page-id="1">{stepOne}</section>
  <section className="t-page" data-page-id="2">{stepTwo}</section>
</div>
```

## 9. Number pop-in (digit group)

For a Doto-like numeric display where the value can change:

```tsx
function DigitGroup({ value, animate }: { value: string; animate: boolean }) {
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => { if (animate) setAnimKey((k) => k + 1); }, [value, animate]);

  const chars = value.split("");
  return (
    <span key={animKey} className={cn("t-digit-group", animate && "is-animating")}>
      {chars.map((ch, i) => {
        const stagger = chars.length - i; // last char stagger=1, etc
        return (
          <span
            key={i}
            className="t-digit"
            data-stagger={stagger >= 1 && stagger <= 4 ? String(stagger) : undefined}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}
```

## Common pitfalls

- **Do not nest `.t-modal` inside another scaling parent.** The `transform: scale()` will compound.
- **Do not apply `t-panel-slide` to an element whose height is animated by the parent.** Choose one or the other.
- **Number pop-in needs a key bump or a class drop+force-reflow+re-add to replay.** Just toggling `is-animating` off->on without a reflow won't restart the keyframes.
- **Page slide expects exactly two `.t-page` siblings** with `data-page-id="1"` and `"2"`.
