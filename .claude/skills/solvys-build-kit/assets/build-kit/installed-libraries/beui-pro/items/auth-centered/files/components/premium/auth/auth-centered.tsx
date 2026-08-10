"use client";

import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type FormEvent, type ReactNode, useState } from "react";
import {
  type ButtonState,
  StatefulButton,
} from "@/components/motion/button/stateful";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { GithubIcon, GoogleIcon } from "./social-icons";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type Mode = "signin" | "signup";

export type AuthCenteredProps = {
  brand?: string;
  logoSrc?: string;
  className?: string;
};

export function AuthCentered({
  brand = "beUI",
  logoSrc = "/beui-mark.png",
  className,
}: AuthCenteredProps) {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [state, setState] = useState<ButtonState>("idle");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const isSignup = mode === "signup";

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: { email?: string; password?: string } = {};
    if (!EMAIL.test(email)) next.email = "Enter a valid email address.";
    if (password.length < 6) next.password = "Use at least 6 characters.";
    if (next.email || next.password) {
      setErrors(next);
      return;
    }
    setErrors({});
    setState("loading");
    setTimeout(() => setState("success"), 1100);
  }

  // Rolling motion-blur swap for the heading + subtext as the tab changes.
  const swap = (children: ReactNode) =>
    reduce ? (
      children
    ) : (
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
          transition={{ duration: 0.32, ease: EASE_OUT }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );

  return (
    <section
      className={cn(
        "relative grid min-h-screen w-full place-items-center overflow-hidden px-4 py-16",
        className,
      )}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={
          reduce ? { duration: 0 } : { duration: 0.6, ease: EASE_OUT }
        }
        className="relative w-full max-w-md rounded-[1.75rem] border border-border p-7 backdrop-blur-xl sm:p-8"
      >
        {/* Brand. */}
        <div className="flex flex-col items-center text-center">
          {/* biome-ignore lint/performance/noImgElement: small brand mark */}
          <img src={logoSrc} alt={brand} className="size-11 rounded-2xl" />
          <div className="mt-4">
            {swap(
              <>
                <h1 className="text-foreground text-2xl">
                  {isSignup ? "Create your account" : "Welcome back"}
                </h1>
                <p className="mt-1.5 text-muted-foreground text-sm">
                  {isSignup
                    ? `Start building with ${brand} today.`
                    : `Sign in to continue to ${brand}.`}
                </p>
              </>,
            )}
          </div>
        </div>

        {/* Mode toggle — reuses the shared Tabs primitive. */}
        <Tabs
          value={mode}
          onValueChange={(v) => {
            setMode(v as Mode);
            setState("idle");
          }}
          variant="pill"
          className="mt-6 flex justify-center"
        >
          <TabsList className="border border-border/70 bg-background/60">
            <TabsTrigger value="signin" className="px-6">
              Sign in
            </TabsTrigger>
            <TabsTrigger value="signup" className="px-6">
              Sign up
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Social. */}
        <div className="mt-6 grid grid-cols-2 gap-2.5">
          <SocialButton icon={<GoogleIcon className="size-4" />}>
            Google
          </SocialButton>
          <SocialButton
            icon={<GithubIcon className="size-4 text-foreground" />}
          >
            GitHub
          </SocialButton>
        </div>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-muted-foreground/70 text-xs">
            or continue with email
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        {/* Form — spacing baked into each row so the collapsing name field
            animates as one smooth height change (no flex-gap jump). */}
        <form onSubmit={onSubmit} className="flex flex-col">
          <AnimatePresence initial={false}>
            {isSignup ? (
              <motion.div
                key="name"
                initial={reduce ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                transition={
                  reduce ? { duration: 0 } : { duration: 0.32, ease: EASE_OUT }
                }
                className="overflow-hidden"
              >
                <div className="pb-3">
                  <InputRow icon={<User className="size-4" />}>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className={inputClass}
                    />
                  </InputRow>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="pb-3">
            <InputRow
              icon={<Mail className="size-4" />}
              invalid={!!errors.email}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email)
                    setErrors((p) => ({ ...p, email: undefined }));
                }}
                placeholder="you@company.com"
                className={inputClass}
              />
            </InputRow>
            <FieldError message={errors.email} />
          </div>

          <InputRow
            icon={<Lock className="size-4" />}
            invalid={!!errors.password}
          >
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password)
                  setErrors((p) => ({ ...p, password: undefined }));
              }}
              placeholder="Password"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
            >
              {show ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </InputRow>
          <FieldError message={errors.password} />

          <div className="h-7">
            <AnimatePresence initial={false}>
              {!isSignup ? (
                <motion.div
                  key="forgot"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex justify-end pt-2"
                >
                  <a
                    href="/"
                    className="text-muted-foreground text-xs transition-colors hover:text-foreground"
                  >
                    Forgot password?
                  </a>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <StatefulButton
            type="submit"
            state={state}
            size="lg"
            className="mt-4 w-full rounded-full"
            loadingText={isSignup ? "Creating" : "Signing in"}
            successText={isSignup ? "Account created" : "Signed in"}
          >
            {isSignup ? "Create account" : "Sign in"}
          </StatefulButton>
        </form>

        <p className="text-center text-muted-foreground/80 text-xs leading-5">
          By continuing you agree to our{" "}
          <a href="/" className="text-foreground underline underline-offset-2">
            Terms
          </a>{" "}
          and{" "}
          <a href="/" className="text-foreground underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>
      </motion.div>
    </section>
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
      className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-background/60 font-medium text-foreground text-sm transition-colors hover:bg-muted"
    >
      {icon}
      {children}
    </button>
  );
}

function InputRow({
  icon,
  invalid,
  children,
}: {
  icon: ReactNode;
  invalid?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex h-11 items-center gap-2.5 rounded-xl border bg-background px-3.5 transition-colors focus-within:ring-2 focus-within:ring-foreground/30",
        invalid ? "border-rose-500/60" : "border-border/70",
      )}
    >
      <span className={cn(invalid ? "text-rose-500" : "text-muted-foreground")}>
        {icon}
      </span>
      {children}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message ? (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="overflow-hidden pt-1.5 text-rose-500 text-xs"
        >
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

const inputClass =
  "min-w-0 flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground/70";
