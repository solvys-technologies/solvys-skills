"use client";

import { ArrowLeft, ArrowRight, Check, Mail } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  type ButtonState,
  StatefulButton,
} from "@/components/motion/button/stateful";
import { EASE_OUT, SPRING_BOUNCE } from "@/lib/ease";
import { cn } from "@/lib/utils";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LENGTH = 6;
const RESEND_SECONDS = 30;

export type AuthOtpProps = {
  brand?: string;
  logoSrc?: string;
  className?: string;
};

function maskEmail(email: string) {
  const [user, domain] = email.split("@");
  if (!domain) return email;
  const head = user.slice(0, 1);
  return `${head}${"•".repeat(Math.max(user.length - 1, 2))}@${domain}`;
}

export function AuthOtp({
  brand = "beUI",
  logoSrc = "/beui-mark.png",
  className,
}: AuthOtpProps) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [sendState, setSendState] = useState<ButtonState>("idle");
  const [code, setCode] = useState<string[]>(() => Array(LENGTH).fill(""));
  const [verifyState, setVerifyState] = useState<ButtonState>("idle");
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const boxes = useRef<(HTMLInputElement | null)[]>([]);

  const verified = verifyState === "success";

  useEffect(() => {
    if (step !== "code" || seconds <= 0) return;
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [step, seconds]);

  function sendCode(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL.test(email)) {
      setSendState("error");
      return;
    }
    setSendState("loading");
    setTimeout(() => {
      setSendState("idle");
      setStep("code");
      setSeconds(RESEND_SECONDS);
      setTimeout(() => boxes.current[0]?.focus(), 60);
    }, 900);
  }

  function setDigit(i: number, value: string) {
    const char = value.replace(/\D/g, "").slice(-1);
    setCode((prev) => {
      const next = [...prev];
      next[i] = char;
      return next;
    });
    if (char && i < LENGTH - 1) boxes.current[i + 1]?.focus();
    if (verifyState === "error") setVerifyState("idle");
  }

  function onKeyDown(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      boxes.current[i - 1]?.focus();
    }
  }

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!text) return;
    const next = Array(LENGTH).fill("");
    for (let i = 0; i < Math.min(LENGTH, text.length); i++) next[i] = text[i];
    setCode(next);
    boxes.current[Math.min(text.length, LENGTH - 1)]?.focus();
  }

  function verify(e: FormEvent) {
    e.preventDefault();
    if (code.some((c) => !c)) {
      setVerifyState("error");
      return;
    }
    setVerifyState("loading");
    setTimeout(() => setVerifyState("success"), 1100);
  }

  const slide = (dir: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, x: dir * 24 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: dir * -24 },
          transition: { duration: 0.32, ease: EASE_OUT },
        };

  return (
    <section
      className={cn(
        "grid min-h-screen w-full place-items-center px-4 py-16",
        className,
      )}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={
          reduce ? { duration: 0 } : { duration: 0.6, ease: EASE_OUT }
        }
        className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-border p-7 backdrop-blur-xl sm:p-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          {step === "email" ? (
            <motion.div key="email" {...slide(1)}>
              <div className="flex flex-col items-center text-center">
                {/* biome-ignore lint/performance/noImgElement: small brand mark */}
                <img
                  src={logoSrc}
                  alt={brand}
                  className="size-11 rounded-2xl"
                />
                <h1 className="mt-4 font-serif text-2xl text-foreground">
                  Sign in to {brand}
                </h1>
                <p className="mt-1.5 text-pretty text-muted-foreground text-sm">
                  Enter your email and we'll send a six-digit code — no password
                  needed.
                </p>
              </div>

              <form onSubmit={sendCode} className="mt-6 flex flex-col gap-3">
                <div className="flex h-11 items-center gap-2.5 rounded-xl border border-border/70 bg-background px-3.5 transition-colors focus-within:ring-2 focus-within:ring-foreground/30">
                  <Mail className="size-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (sendState === "error") setSendState("idle");
                    }}
                    placeholder="you@company.com"
                    className="min-w-0 flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground/70"
                  />
                </div>

                <StatefulButton
                  type="submit"
                  state={sendState === "error" ? "idle" : sendState}
                  size="lg"
                  className="w-full rounded-full"
                  loadingText="Sending code"
                >
                  Continue
                  <ArrowRight className="size-4" />
                </StatefulButton>

                <p className="h-4 text-center text-rose-500 text-xs">
                  {sendState === "error" ? "Enter a valid email address." : ""}
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div key="code" {...slide(-1)}>
              {/* Mail badge — hidden once verified so only the success state shows. */}
              {verified ? null : (
                <div className="flex flex-col items-center text-center">
                  <span className="grid size-12 place-items-center rounded-full border border-border bg-muted/60 text-foreground">
                    <Mail className="size-5" />
                  </span>
                  <h1 className="mt-4 font-serif text-2xl text-foreground">
                    Check your inbox
                  </h1>
                  <p className="mt-1.5 text-pretty text-muted-foreground text-sm">
                    We sent a code to{" "}
                    <span className="font-medium text-foreground">
                      {maskEmail(email)}
                    </span>
                  </p>
                </div>
              )}

              <AnimatePresence mode="wait" initial={false}>
                {verified ? (
                  <motion.div
                    key="done"
                    initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={reduce ? { duration: 0 } : SPRING_BOUNCE}
                    className="mt-8 flex flex-col items-center"
                  >
                    <motion.span
                      initial={reduce ? false : { scale: 0.4, rotate: -12 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={reduce ? { duration: 0 } : SPRING_BOUNCE}
                      className="grid size-14 place-items-center rounded-full bg-emerald-500 text-white"
                    >
                      <Check className="size-7" />
                    </motion.span>
                    <p className="mt-4 font-serif text-foreground text-lg">
                      You're verified
                    </p>
                    <p className="mt-1 text-muted-foreground text-sm">
                      Taking you to {brand}…
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    onSubmit={verify}
                    className="mt-6 flex flex-col gap-4"
                  >
                    <div className="flex justify-center gap-2">
                      {code.map((digit, i) => (
                        <input
                          // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length code boxes
                          key={i}
                          ref={(el) => {
                            boxes.current[i] = el;
                          }}
                          value={digit}
                          onChange={(e) => setDigit(i, e.target.value)}
                          onKeyDown={(e) => onKeyDown(i, e)}
                          onPaste={onPaste}
                          inputMode="numeric"
                          maxLength={1}
                          aria-label={`Digit ${i + 1}`}
                          className={cn(
                            "size-12 rounded-xl border bg-background text-center font-serif text-foreground text-xl outline-none transition-all focus-visible:ring-2 focus-visible:ring-foreground/30",
                            verifyState === "error"
                              ? "border-rose-500/60"
                              : digit
                                ? "border-foreground/40 bg-foreground/[0.04]"
                                : "border-border/70",
                          )}
                        />
                      ))}
                    </div>

                    <StatefulButton
                      type="submit"
                      state={verifyState === "error" ? "idle" : verifyState}
                      size="lg"
                      className="w-full rounded-full"
                      loadingText="Verifying"
                      successText="Verified"
                    >
                      Verify
                    </StatefulButton>

                    <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-xs">
                      {seconds > 0 ? (
                        <span>Resend code in {seconds}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setSeconds(RESEND_SECONDS);
                            setCode(Array(LENGTH).fill(""));
                            boxes.current[0]?.focus();
                          }}
                          className="font-medium text-foreground underline underline-offset-2"
                        >
                          Resend code
                        </button>
                      )}
                      <span aria-hidden>·</span>
                      <button
                        type="button"
                        onClick={() => {
                          setStep("email");
                          setCode(Array(LENGTH).fill(""));
                          setVerifyState("idle");
                        }}
                        className="inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-foreground/80"
                      >
                        <ArrowLeft className="size-3" />
                        Change email
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
