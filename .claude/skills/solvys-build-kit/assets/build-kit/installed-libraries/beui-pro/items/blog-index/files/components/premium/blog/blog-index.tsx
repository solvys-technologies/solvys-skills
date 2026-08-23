"use client";

import { ArrowRight, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";
import { BLOG_POSTS, type BlogCategory, FEATURED_POST } from "./blog-data";
import { StoryCover } from "./story-cover";

const FILTERS = ["All", "Places", "Food", "People"] as const;
type Filter = (typeof FILTERS)[number];

export type BlogIndexProps = {
  publication?: string;
  className?: string;
};

export function BlogIndex({ className }: BlogIndexProps) {
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const [filter, setFilter] = useState<Filter>("All");
  const posts = useMemo(
    () =>
      filter === "All"
        ? BLOG_POSTS
        : BLOG_POSTS.filter((post) => post.category === filter),
    [filter],
  );

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: reduce ? 0 : 0.45, ease: EASE_OUT, delay },
  });

  return (
    <div
      className={cn(
        "min-h-screen w-full bg-background font-sans text-foreground",
        className,
      )}
    >
      <main id="blog-top">
        <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-8 sm:py-20">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: EASE_OUT }}
            className="flex max-w-4xl flex-col gap-5"
          >
            <p className="font-medium text-muted-foreground text-sm">
              Independent stories about everyday life
            </p>
            <h1 className="text-balance font-semibold text-4xl leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Pay attention to what stays with you.
            </h1>
            <p className="max-w-2xl text-pretty text-base text-muted-foreground leading-7 sm:text-lg">
              A quiet journal about places, people, and the small rituals that
              make a day feel like your own.
            </p>
          </motion.div>
        </section>

        <motion.section
          {...reveal()}
          aria-labelledby="featured-story"
          className="border-border border-y"
        >
          <a
            href="#article"
            className="group mx-auto grid w-full max-w-6xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground md:grid-cols-[1.12fr_0.88fr]"
          >
            <StoryCover
              variant={FEATURED_POST.cover}
              className="aspect-[4/3] border-border border-b md:aspect-auto md:min-h-[32rem] md:border-r md:border-b-0"
            />
            <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-14">
              <div>
                <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.14em]">
                  Featured / {FEATURED_POST.category}
                </p>
                <h2
                  id="featured-story"
                  className="mt-5 text-balance font-semibold text-3xl leading-tight tracking-[-0.045em] sm:text-5xl"
                >
                  {FEATURED_POST.title}
                </h2>
                <p className="mt-5 max-w-lg text-pretty text-muted-foreground leading-7">
                  {FEATURED_POST.excerpt}
                </p>
              </div>
              <div className="mt-12 flex items-end justify-between gap-6 border-border border-t pt-5">
                <p className="text-sm">
                  {FEATURED_POST.author}
                  <span className="text-muted-foreground">
                    {" "}
                    / {FEATURED_POST.readTime}
                  </span>
                </p>
                <ArrowRight
                  className="size-5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            </div>
          </a>
        </motion.section>

        <section
          id="stories"
          className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-8 sm:py-20"
        >
          <div className="flex flex-col justify-between gap-6 border-border border-b pb-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-muted-foreground text-sm">The latest</p>
              <h2 className="mt-1 font-semibold text-2xl tracking-[-0.035em]">
                Recent stories
              </h2>
            </div>
            <fieldset
              className="flex flex-wrap gap-1"
              aria-label="Filter stories"
            >
              {FILTERS.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                  className={cn(
                    "min-h-10 border px-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    filter === item
                      ? "border-foreground bg-foreground text-background"
                      : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                  )}
                >
                  {item}
                </button>
              ))}
            </fieldset>
          </div>

          <motion.div
            layout
            className="grid gap-x-6 gap-y-12 pt-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {posts.map((post, index) => (
              <motion.article
                layout
                key={post.slug}
                {...reveal(index * 0.04)}
                whileHover={
                  reduce || !canHover
                    ? undefined
                    : { transform: "translateY(-4px)" }
                }
                className="group"
              >
                <a
                  href="#article"
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <StoryCover variant={post.cover} className="aspect-[4/3]" />
                  <p className="mt-5 font-medium text-muted-foreground text-xs uppercase tracking-[0.13em]">
                    {post.category} / {post.readTime}
                  </p>
                  <h3 className="mt-3 text-balance font-semibold text-2xl leading-tight tracking-[-0.035em]">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-pretty text-muted-foreground leading-6">
                    {post.excerpt}
                  </p>
                  <p className="mt-5 flex items-center gap-2 font-medium text-sm">
                    Read story
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </p>
                </a>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section id="newsletter" className="border-border border-t">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-7 px-4 py-12 sm:px-8 sm:py-16 md:flex-row md:items-center">
            <div>
              <p className="text-muted-foreground text-sm">A note on Sundays</p>
              <h2 className="mt-2 text-balance font-semibold text-2xl tracking-[-0.035em] sm:text-3xl">
                One good story, delivered quietly.
              </h2>
            </div>
            <ButtonLink href="#blog-top" size="lg">
              Join the journal
              <Mail className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </section>
      </main>
    </div>
  );
}

export type { BlogCategory };
