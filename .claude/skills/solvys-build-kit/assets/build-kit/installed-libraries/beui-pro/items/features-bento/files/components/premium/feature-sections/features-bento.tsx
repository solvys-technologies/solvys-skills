"use client";

import {
  AlertTriangle,
  Braces,
  Brain,
  Check,
  FileText,
  Globe,
  Mail,
  Sparkles,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT, SPRING_BOUNCE } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { Grainient } from "./grainient";

export type FeaturesBentoProps = {
  eyebrow?: string;
  title?: string[];
  subtext?: string;
  className?: string;
};

export function FeaturesBento({
  eyebrow = "Why agents",
  title = ["Everything your agent needs,", "wired up out of the box."],
  subtext = "Tools, memory, streaming, and tracing — ship a production agent without stitching the plumbing together yourself.",
  className,
}: FeaturesBentoProps) {
  const reduce = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { margin: "-15% 0px" });
  // Scripted loops only run while on-screen and motion is allowed.
  const still = !!reduce || !inView;

  return (
    <section className={cn("w-full px-4 py-20 sm:px-8", className)}>
      <div className="mx-auto w-full max-w-6xl">
        {/* Header. */}
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-widest">
              {eyebrow}
            </p>
          ) : null}
          <TextReveal
            as="h2"
            text={title}
            split="word"
            blur={10}
            className="mt-5 text-balance font-medium text-4xl text-foreground leading-none tracking-tight"
          />
          {subtext ? (
            <p className="mt-4 max-w-xl text-pretty text-muted-foreground text-sm leading-7">
              {subtext}
            </p>
          ) : null}
        </div>

        {/* Bento grid. */}
        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-6"
        >
          <Cell
            reduce={reduce}
            index={0}
            className="sm:col-span-2 lg:col-span-4"
          >
            <ConversationCell still={still} />
            <Caption
              title="Watch the agent reason"
              body="It plans, calls the right tools, and reports back — the full loop, streamed step by step."
            />
          </Cell>

          <Cell
            reduce={reduce}
            index={1}
            className="sm:col-span-2 lg:col-span-2"
          >
            <ConnectCell still={still} />
            <Caption
              title="Add a tool in one line"
              body="Plug in any MCP server or function — the agent discovers and calls it automatically."
            />
          </Cell>

          <Cell reduce={reduce} index={2} className="lg:col-span-2">
            <MemoryCell still={still} />
            <Caption
              title="Remembers what matters"
              body="Long-term memory and retrieval, baked in across runs."
            />
          </Cell>

          <Cell reduce={reduce} index={3} className="lg:col-span-2">
            <StructuredCell still={still} />
            <Caption
              title="Returns structured output"
              body="Schema-valid, typed JSON every time — ready to use downstream."
            />
          </Cell>

          <Cell reduce={reduce} index={4} className="lg:col-span-2">
            <ApprovalCell still={still} />
            <Caption
              title="Pauses for approval"
              body="Asks before risky actions — approve or edit each step."
            />
          </Cell>
        </div>
      </div>
    </section>
  );
}

function Cell({
  children,
  className,
  reduce,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  reduce: boolean | null;
  index: number;
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 22, filter: "blur(6px)" }}
      whileInView={
        reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "-60px" }}
      transition={
        reduce
          ? undefined
          : {
              duration: 0.5,
              ease: EASE_OUT,
              delay: Math.min(index * 0.08, 0.32),
            }
      }
      className={cn(
        "relative flex flex-col overflow-hidden rounded-3xl border border-border/50 p-3",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

function Caption({ title, body }: { title: string; body: string }) {
  return (
    <div className="shrink-0 mt-3">
      <h3 className="font-medium text-foreground text-xl">{title}</h3>
      <p className="mt-1 text-pretty text-muted-foreground text-sm leading-6">
        {body}
      </p>
    </div>
  );
}

// Translucent surface that reads over the animated shader backdrops.
const GLASS =
  "border border-white/20 bg-white/15 backdrop-blur-md shadow-[0_20px_40px_-28px_rgba(0,0,0,0.5)]";

// Re-mount a subtree on an interval so the scripted sequence replays.
function useReplay(still: boolean, duration: number) {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (still) return;
    const id = setInterval(() => setCycle((c) => c + 1), duration);
    return () => clearInterval(id);
  }, [still, duration]);
  return cycle;
}

/* ── Featured: agent conversation over a Grainient backdrop. ─────────── */

const AGENT_TOOLS = [
  { label: "web_search", icon: Globe },
  { label: "read_page", icon: FileText },
  { label: "send_email", icon: Mail },
];

function ConversationCell({ still }: { still: boolean }) {
  const cycle = useReplay(still, 6800);
  const rise = (delay: number) =>
    still
      ? {}
      : {
          initial: { opacity: 0, y: 8, filter: "blur(4px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.4, ease: EASE_OUT, delay },
        };

  return (
    <div className="relative h-[24rem] overflow-hidden rounded-2xl">
      <Grainient
        className="absolute inset-0"
        color1="#aab4ff"
        color2="#4f6ef7"
        color3="#3b54e0"
        grainAmount={0.08}
        contrast={1.2}
        zoom={0.9}
      />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <motion.div
          key={cycle}
          className="flex w-full max-w-sm flex-col gap-2.5"
        >
          {/* User ask. */}
          <motion.div
            {...rise(0.1)}
            className="max-w-[88%] self-end rounded-2xl rounded-br-sm bg-white px-3.5 py-2 font-medium text-neutral-900 text-xs shadow-lg"
          >
            Find recent AI papers and email me a summary.
          </motion.div>

          {/* Agent working: tools check off one by one. */}
          <motion.div
            {...rise(0.55)}
            className={cn(GLASS, "self-start rounded-2xl rounded-bl-sm p-3")}
          >
            <div className="mb-2 flex items-center gap-2 text-white text-xs">
              <span className="grid size-4 place-items-center rounded-full bg-white/25">
                <Sparkles className="size-2.5" />
              </span>
              <span className="font-medium">Working</span>
              <Dots still={still} />
            </div>
            <div className="flex flex-col gap-1.5">
              {AGENT_TOOLS.map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.label}
                    className="flex items-center gap-2 text-white text-xs"
                  >
                    <Icon className="size-3.5 shrink-0 text-white/70" />
                    <span className="flex-1 font-mono text-[11px]">
                      {tool.label}
                    </span>
                    <motion.span
                      {...(still
                        ? {}
                        : {
                            initial: { scale: 0 },
                            animate: { scale: 1 },
                            transition: {
                              ...SPRING_BOUNCE,
                              delay: 1.3 + i * 0.5,
                            },
                          })}
                      className="grid size-4 shrink-0 place-items-center rounded-full bg-emerald-400 text-neutral-900"
                    >
                      <Check className="size-2.5" />
                    </motion.span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Agent reply. */}
          <motion.div
            {...rise(3.1)}
            className={cn(
              GLASS,
              "max-w-[92%] self-start rounded-2xl rounded-bl-sm px-3.5 py-2 text-white text-xs",
            )}
          >
            Sent 5 papers to your inbox — summary included.
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function Dots({ still }: { still: boolean }) {
  if (still) {
    return (
      <span className="flex gap-1">
        {["1", "2", "3"].map((k) => (
          <span key={k} className="size-1 rounded-full bg-white/50" />
        ))}
      </span>
    );
  }
  return (
    <span className="flex gap-1">
      {["1", "2", "3"].map((k, i) => (
        <motion.span
          key={k}
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.18,
          }}
          className="size-1 rounded-full bg-white"
        />
      ))}
    </span>
  );
}

/* ── Connect: dark terminal floating over a Grainient backdrop. ──────── */

const TOOLS_ADD = [
  "web-search",
  "code-runner",
  "postgres",
  "gmail",
  "slack-mcp",
];

function ConnectCell({ still }: { still: boolean }) {
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (still) return;
    const id = setInterval(
      () => setCount((c) => (c >= TOOLS_ADD.length ? 1 : c + 1)),
      1100,
    );
    return () => clearInterval(id);
  }, [still]);

  const shown = still ? TOOLS_ADD.slice(0, 3) : TOOLS_ADD.slice(0, count);

  return (
    <div className="relative h-[24rem] overflow-hidden rounded-2xl p-5">
      <Grainient
        className="absolute inset-0"
        color1="#aab4ff"
        color2="#4f6ef7"
        color3="#3b54e0"
        grainAmount={0.08}
        contrast={1.2}
        zoom={0.9}
      />
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 p-4 font-mono text-xs backdrop-blur-md">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <p className="text-white/45">$ agent tools add</p>
        <div className="mt-2 flex flex-col gap-1.5">
          <AnimatePresence initial={false}>
            {shown.map((tool) => (
              <motion.div
                key={tool}
                initial={still ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: EASE_OUT }}
                className="flex items-center gap-2 text-emerald-300"
              >
                <span className="grid size-3.5 shrink-0 place-items-center rounded-full bg-emerald-400 text-neutral-900">
                  <Check className="size-2.5" />
                </span>
                <span className="text-white/80">connected</span>
                <span className="font-medium text-white">{tool}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ── Memory: a recall list scrolling over a Grainient backdrop. ──────── */

const MEMORY = [
  "Prefers concise answers",
  "Stack: Postgres + Vercel",
  "Timezone GMT+5:30",
  "Default model: Claude",
  "Owns the deploy keys",
];

function MemRow({ text }: { text: string }) {
  return (
    <div
      className={cn(
        GLASS,
        "mb-1.5 flex items-center gap-2 rounded-xl px-3 py-2",
      )}
    >
      <span className="grid size-5 shrink-0 place-items-center rounded-md bg-white/20 text-white/80">
        <Brain className="size-3" />
      </span>
      <span className="truncate text-white text-xs">{text}</span>
    </div>
  );
}

function MemoryCell({ still }: { still: boolean }) {
  // Two labelled copies so the upward scroll loops seamlessly at -50%.
  const rows = [
    ...MEMORY.map((m) => ({ text: m, key: `a-${m}` })),
    ...MEMORY.map((m) => ({ text: m, key: `b-${m}` })),
  ];

  return (
    <div className="relative flex h-[13rem] items-center overflow-hidden rounded-2xl p-5">
      <Grainient
        className="absolute inset-0"
        color1="#7fe7d8"
        color2="#0f9488"
        color3="#0c6b62"
        grainAmount={0.08}
        contrast={1.2}
        zoom={0.9}
      />
      {still ? (
        <div className="relative flex w-full flex-col">
          {MEMORY.slice(0, 3).map((m) => (
            <MemRow key={m} text={m} />
          ))}
        </div>
      ) : (
        <div className="relative h-[9rem] w-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]">
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              duration: MEMORY.length * 1.8,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {rows.map((row) => (
              <MemRow key={row.key} text={row.text} />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}

/* ── Structured: typed JSON output that builds key by key. ───────────── */

const JSON_FIELDS: { key: string; value: string; accent?: boolean }[] = [
  { key: '"intent"', value: '"summarize"' },
  { key: '"sources"', value: "5" },
  { key: '"confidence"', value: "0.94" },
];

function StructuredCell({ still }: { still: boolean }) {
  const cycle = useReplay(still, 3400);
  return (
    <div className="relative flex h-[13rem] items-center justify-center overflow-hidden rounded-2xl p-5">
      <Grainient
        className="absolute inset-0"
        color1="#86efac"
        color2="#22c55e"
        color3="#16a34a"
        grainAmount={0.08}
        contrast={1.2}
        zoom={0.9}
      />
      <div className="relative w-full max-w-[15rem] rounded-2xl border border-white/10 bg-neutral-950/85 p-3.5 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-mono text-white text-xs">
            <Braces className="size-3" /> output.json
          </span>
          <motion.span
            key={cycle}
            {...(still
              ? {}
              : {
                  initial: { scale: 0.7, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  transition: { ...SPRING_BOUNCE, delay: 1.5 },
                })}
            className="inline-flex items-center gap-1 rounded-md bg-emerald-400 px-1.5 py-0.5 text-[10px] text-neutral-900"
          >
            <Check className="size-2.5" /> schema
          </motion.span>
        </div>
        <motion.div
          key={cycle}
          className="mt-2.5 font-mono text-[11px] leading-5"
        >
          <p className="text-white/45">{"{"}</p>
          {JSON_FIELDS.map((field, i) => (
            <motion.p
              key={field.key}
              {...(still
                ? {}
                : {
                    initial: { opacity: 0, y: 4 },
                    animate: { opacity: 1, y: 0 },
                    transition: {
                      duration: 0.28,
                      ease: EASE_OUT,
                      delay: 0.2 + i * 0.4,
                    },
                  })}
              className="pl-3"
            >
              <span className="text-sky-300">{field.key}</span>
              <span className="text-white/45">: </span>
              <span className="text-emerald-300">{field.value}</span>
              {i < JSON_FIELDS.length - 1 ? (
                <span className="text-white/45">,</span>
              ) : null}
            </motion.p>
          ))}
          <p className="text-white/45">{"}"}</p>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Approval: a human-in-the-loop gate that gets approved on loop. ───── */

function ApprovalCell({ still }: { still: boolean }) {
  const cycle = useReplay(still, 3000);
  return (
    <div className="relative flex h-[13rem] items-center justify-center overflow-hidden rounded-2xl p-5">
      <Grainient
        className="absolute inset-0"
        color1="#aab4ff"
        color2="#4f6ef7"
        color3="#3b54e0"
        grainAmount={0.08}
        contrast={1.2}
        zoom={0.9}
      />
      <div
        className={cn(GLASS, "relative w-full max-w-[15rem] rounded-2xl p-3.5")}
      >
        <div className="flex items-center gap-1.5 text-[11px] text-white/80">
          <AlertTriangle className="size-3 text-amber-300" />
          <span className="font-medium">Approval needed</span>
        </div>
        <p className="mt-2 font-mono text-white text-xs">
          deploy → production?
        </p>
        <div className="mt-3 flex gap-2">
          <motion.button
            key={cycle}
            type="button"
            {...(still
              ? {}
              : {
                  initial: { scale: 1 },
                  animate: { scale: [1, 0.93, 1] },
                  transition: { duration: 0.5, ease: EASE_OUT, delay: 1 },
                })}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-400 py-2 font-medium text-[11px] text-neutral-900"
          >
            <motion.span
              key={cycle}
              {...(still
                ? {}
                : {
                    initial: { scale: 0, opacity: 0 },
                    animate: { scale: 1, opacity: 1 },
                    transition: { ...SPRING_BOUNCE, delay: 1.3 },
                  })}
              className="inline-flex"
            >
              <Check className="size-3" />
            </motion.span>
            Approve
          </motion.button>
          <button
            type="button"
            className="flex-1 rounded-lg border border-white/20 bg-white/10 py-2 font-medium text-[11px] text-white"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
