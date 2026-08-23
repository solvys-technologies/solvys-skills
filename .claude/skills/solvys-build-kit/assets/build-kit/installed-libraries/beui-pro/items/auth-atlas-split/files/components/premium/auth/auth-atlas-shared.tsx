"use client";

import DottedMap, {
  type MapData,
  type Point,
} from "dotted-map/without-countries";
import { Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  type FormEvent,
  type ReactNode,
  useId,
  useMemo,
  useState,
} from "react";
import {
  type ButtonState,
  StatefulButton,
} from "@/components/motion/button/stateful";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import atlasMap from "./auth-atlas-map.json";
import { GithubIcon } from "./social-icons";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ACTIVITY_LOCATIONS = [
  { lat: 37.7749, lng: -122.4194 },
  { lat: 40.7128, lng: -74.006 },
  { lat: -23.5505, lng: -46.6333 },
  { lat: 51.5072, lng: -0.1276 },
  { lat: 6.5244, lng: 3.3792 },
  { lat: -26.2041, lng: 28.0473 },
  { lat: 25.2048, lng: 55.2708 },
  { lat: 19.076, lng: 72.8777 },
  { lat: 1.3521, lng: 103.8198 },
  { lat: 35.6762, lng: 139.6503 },
  { lat: -33.8688, lng: 151.2093 },
] as const;

const CONNECTIONS = [
  [0, 1],
  [1, 3],
  [2, 3],
  [3, 4],
  [3, 6],
  [4, 5],
  [6, 7],
  [7, 8],
  [8, 9],
  [8, 10],
] as const;

export type AtlasAuthFormProps = {
  brand?: string;
  logoSrc?: string;
  title?: string;
  description?: string;
  className?: string;
};

export function AtlasAuthForm({
  brand = "Northstar",
  logoSrc = "/beui-mark.png",
  title = "Create your free account",
  description = "Save your work, collaborate with your team, and pick up anywhere.",
  className,
}: AtlasAuthFormProps) {
  const reduce = useReducedMotion();
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState<ButtonState>("idle");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!EMAIL.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setState("loading");
    setTimeout(() => setState("success"), 950);
  }

  const reveal = (delay: number) =>
    reduce ? { duration: 0 } : { duration: 0.55, delay, ease: EASE_OUT };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={reveal(0.12)}
      className={cn("w-full max-w-sm", className)}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reveal(0.18)}
        className="mb-6"
      >
        {/* biome-ignore lint/performance/noImgElement: configurable product mark */}
        <img
          src={logoSrc}
          alt={`${brand} logo`}
          className="size-9 rounded-xl"
        />
      </motion.div>

      <h1 className="text-balance font-semibold text-2xl text-foreground tracking-[-0.03em]">
        {title}
      </h1>
      <p className="mt-2 max-w-xs text-pretty text-muted-foreground text-sm leading-6">
        {description}
      </p>

      <div className="mt-7 grid grid-cols-2 gap-2.5">
        <SocialButton icon={<GoogleMonoIcon className="size-4" />}>
          Google
        </SocialButton>
        <SocialButton icon={<GithubIcon className="size-4 text-foreground" />}>
          GitHub
        </SocialButton>
      </div>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-muted-foreground text-xs">or</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} noValidate>
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <div
          className={cn(
            "flex h-11 items-center gap-3 rounded-xl border bg-background px-3.5 transition-[border-color,box-shadow] duration-200 focus-within:border-foreground/35 focus-within:ring-2 focus-within:ring-foreground/5",
            error ? "border-destructive" : "border-border",
          )}
        >
          <Mail className="size-4 shrink-0 text-muted-foreground" />
          <input
            id={inputId}
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError("");
              if (state !== "idle") setState("idle");
            }}
            placeholder="Email address"
            className="min-w-0 flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
          />
        </div>
        <div className="min-h-5 pt-1.5">
          {error ? (
            <motion.p
              id={`${inputId}-error`}
              initial={reduce ? false : { opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive text-xs"
            >
              {error}
            </motion.p>
          ) : null}
        </div>

        <StatefulButton
          type="submit"
          state={state}
          size="lg"
          className="h-11 w-full rounded-xl text-sm"
          loadingText="Creating account"
          successText="Account ready"
        >
          Continue with email
        </StatefulButton>
      </form>

      <p className="mt-4 text-muted-foreground text-sm">
        Already have an account?{" "}
        <button
          type="button"
          className="min-h-10 font-medium text-foreground underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Sign in
        </button>
      </p>
    </motion.div>
  );
}

function SocialButton({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background font-medium text-foreground text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {icon}
      {children}
    </button>
  );
}

function GoogleMonoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <path
        d="M20.3 12.2c0-.7-.1-1.3-.2-1.9H12v3.4h4.6a4 4 0 0 1-1.7 2.6v2.2h2.9c1.7-1.6 2.5-3.7 2.5-6.3Z"
        fill="currentColor"
      />
      <path
        d="M12 20.6a8.6 8.6 0 1 1 5.8-14.9l-2.4 2.4A5.2 5.2 0 1 0 12 17.2c1.3 0 2.3-.3 2.9-.9l2.9 2.2a8.6 8.6 0 0 1-5.8 2.1Z"
        fill="currentColor"
        opacity=".68"
      />
    </svg>
  );
}

export function AtlasGraphic({
  vivid = false,
  className,
}: {
  vivid?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const routeGradientId = useId().replaceAll(":", "");
  const signalColor = "#2563eb";
  const { points, pins, routes, width, height } = useMemo(() => {
    const map = new DottedMap({ map: atlasMap as MapData });
    const basePoints = map.getPoints();
    const nextPins = ACTIVITY_LOCATIONS.map(({ lat, lng }) =>
      map.addPin({ lat, lng }),
    ).filter((point): point is Point => Boolean(point));
    const nextRoutes = CONNECTIONS.flatMap(([startIndex, endIndex]) => {
      const start = nextPins[startIndex];
      const end = nextPins[endIndex];
      if (!start || !end) return [];

      const midX = (start.x + end.x) / 2;
      const lift = Math.min(8, 2.2 + Math.abs(end.x - start.x) * 0.07);
      const midY = (start.y + end.y) / 2 - lift;

      return [
        {
          d: `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`,
        },
      ];
    });

    return {
      points: basePoints,
      pins: nextPins,
      routes: nextRoutes,
      width: map.image.width,
      height: map.image.height,
    };
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={
        reduce ? { duration: 0 } : { duration: 1.1, delay: 0.2, ease: EASE_OUT }
      }
      className={cn(
        "relative aspect-[1.78/1]",
        vivid ? "text-white" : "text-muted-foreground",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Dotted world map"
        className="h-full w-full overflow-visible"
      >
        <g opacity={vivid ? 0.95 : 0.26}>
          {points.map((point) => (
            <circle
              key={`${point.x}-${point.y}`}
              cx={point.x}
              cy={point.y}
              r={vivid ? 0.34 : 0.31}
              fill="currentColor"
            />
          ))}
        </g>

        <defs>
          <linearGradient
            id={routeGradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={signalColor} stopOpacity="0" />
            <stop offset="16%" stopColor={signalColor} stopOpacity="0.9" />
            <stop offset="84%" stopColor={signalColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={signalColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        <g>
          {routes.map((route, index) => (
            <g key={route.d}>
              <motion.path
                d={route.d}
                fill="none"
                stroke={`url(#${routeGradientId})`}
                strokeWidth={vivid ? 0.18 : 0.13}
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={
                  reduce
                    ? { pathLength: 1, opacity: vivid ? 0.34 : 0.13 }
                    : {
                        pathLength: [0, 1, 1],
                        opacity: [0, vivid ? 0.58 : 0.24, 0],
                      }
                }
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        duration: 3.4,
                        delay: 0.6 + index * 0.22,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 2.2,
                        ease: EASE_OUT,
                      }
                }
              />
              {!reduce ? (
                <circle r={vivid ? 0.38 : 0.3} fill={signalColor}>
                  <animateMotion
                    path={route.d}
                    dur={`${3.1 + (index % 3) * 0.35}s`}
                    begin={`${0.8 + index * 0.24}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ) : null}
            </g>
          ))}
        </g>

        {pins.map((point, index) => (
          <g key={`${point.x}-${point.y}`}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="1.2"
              fill="none"
              stroke={signalColor}
              strokeWidth="0.18"
              initial={reduce ? false : { opacity: 0, scale: 0.4 }}
              animate={
                reduce
                  ? { opacity: vivid ? 0.4 : 0.16 }
                  : {
                      opacity: [0, vivid ? 0.45 : 0.18, 0],
                      scale: [0.4, 1, 1.45],
                    }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      duration: 2.8,
                      delay: 0.65 + index * 0.12,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 1.8,
                      ease: EASE_OUT,
                    }
              }
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
              }}
            />
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="0.55"
              fill={signalColor}
              initial={reduce ? false : { opacity: 0, scale: 0 }}
              animate={{ opacity: vivid ? 0.9 : 0.75, scale: 1 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      duration: 0.45,
                      delay: 0.5 + index * 0.08,
                      ease: EASE_OUT,
                    }
              }
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
              }}
            />
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
