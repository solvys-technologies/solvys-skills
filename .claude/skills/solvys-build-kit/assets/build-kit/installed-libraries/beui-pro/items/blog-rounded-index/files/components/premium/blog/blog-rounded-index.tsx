"use client";

import { ArrowRight, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

type RoundedStory = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  imageAlt: string;
};

const FEATURED_STORY: RoundedStory = {
  slug: "the-room-before-opening",
  title: "The room before opening",
  excerpt:
    "A cafe has a different rhythm before the first order. We spent a morning with the people who prepare that quiet hour.",
  category: "Places",
  readTime: "7 min read",
  image:
    "https://images.unsplash.com/photo-1528598754407-20e385ee7b31?auto=format&fit=crop&fm=webp&q=82&w=1800",
  imageAlt: "A quiet cafe interior lit by tall windows",
};

const STORIES: readonly RoundedStory[] = [
  {
    slug: "a-market-wakes-in-color",
    title: "A market wakes in color",
    excerpt:
      "Following the small decisions behind a flower stall, from the first bucket to the final bouquet.",
    category: "People",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1753982861969-295e79c4bf78?auto=format&fit=crop&fm=webp&q=82&w=1200",
    imageAlt: "A florist arranging bouquets at a market stall",
  },
  {
    slug: "what-the-hands-remember",
    title: "What the hands remember",
    excerpt:
      "Inside a pottery practice shaped by repetition, useful mistakes, and knowing when to stop.",
    category: "Craft",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1781389005078-d9e413d89c94?auto=format&fit=crop&fm=webp&q=82&w=1200",
    imageAlt: "An artisan shaping clay by hand at a worktable",
  },
  {
    slug: "the-shelf-that-finds-you",
    title: "The shelf that finds you",
    excerpt:
      "A Lisbon bookseller on arranging a room for wandering rather than searching.",
    category: "Places",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1755613495591-5b86c76a9df6?auto=format&fit=crop&fm=webp&q=82&w=1200",
    imageAlt: "A warmly lit independent bookstore in Lisbon",
  },
];

export type BlogRoundedIndexProps = {
  publication?: string;
  className?: string;
};

export function BlogRoundedIndex({ className }: BlogRoundedIndexProps) {
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
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
      <main id="rounded-blog-top">
        <section className="mx-auto w-full max-w-6xl px-4 pt-14 pb-10 sm:px-8 sm:pt-20 sm:pb-14">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: EASE_OUT }}
            className="border-border border-b pb-10 sm:pb-12"
          >
            <p className="font-medium text-muted-foreground text-sm uppercase tracking-[0.12em]">
              Journal / Issue 04
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-12">
              <h1 className="max-w-3xl text-balance font-semibold text-4xl leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Stories for slower attention.
              </h1>
              <p className="max-w-md text-pretty text-muted-foreground leading-7 md:pb-1">
                Field reports about thoughtful work, familiar places, and the
                people who notice what others pass by.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 sm:px-8">
          <motion.article {...reveal()}>
            <a
              href="#rounded-article"
              className="group grid rounded-[1.25rem] border border-border/60 bg-background p-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:h-[31rem] md:grid-cols-[1.08fr_0.92fr]"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-[0.875rem] md:aspect-auto md:min-h-0">
                {/* biome-ignore lint/performance/noImgElement: distributed page stays portable without requiring consumer Next image host configuration. */}
                <motion.img
                  src={FEATURED_STORY.image}
                  alt={FEATURED_STORY.imageAlt}
                  width={1800}
                  height={1350}
                  className="h-full w-full object-cover"
                  whileHover={
                    reduce || !canHover ? undefined : { scale: 1.025 }
                  }
                  transition={{ duration: reduce ? 0 : 0.45, ease: EASE_OUT }}
                />
              </div>
              <div className="flex flex-col justify-between p-5 sm:p-8 lg:p-9">
                <div>
                  <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.14em]">
                    Featured / {FEATURED_STORY.category}
                  </p>
                  <h2 className="mt-5 text-balance font-semibold text-3xl leading-tight tracking-[-0.045em] sm:text-4xl">
                    {FEATURED_STORY.title}
                  </h2>
                  <p className="mt-4 max-w-md text-pretty text-muted-foreground leading-7">
                    {FEATURED_STORY.excerpt}
                  </p>
                </div>
                <div className="mt-10 flex items-center justify-between gap-5 border-border border-t pt-5">
                  <span className="text-muted-foreground text-sm">
                    {FEATURED_STORY.readTime}
                  </span>
                  <span className="grid size-10 place-items-center rounded-full bg-muted text-foreground">
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </a>
          </motion.article>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-8 sm:py-20">
          <div className="flex items-end justify-between gap-5 border-border border-b pb-5">
            <div>
              <p className="text-muted-foreground text-sm">New this week</p>
              <h2 className="mt-1 font-semibold text-2xl tracking-[-0.035em]">
                Recent stories
              </h2>
            </div>
            <a
              href="#rounded-blog-top"
              className="hidden min-h-10 items-center gap-2 font-medium text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:inline-flex"
            >
              Browse archive
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid gap-5 pt-7 md:grid-cols-3">
            {STORIES.map((story, index) => (
              <motion.article
                key={story.slug}
                {...reveal(index * 0.05)}
                whileHover={
                  reduce || !canHover
                    ? undefined
                    : { transform: "translateY(-3px)" }
                }
              >
                <a
                  href="#rounded-article"
                  className="group flex h-full flex-col rounded-2xl border border-border/60 bg-background p-2.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-xl">
                    {/* biome-ignore lint/performance/noImgElement: distributed page stays portable without requiring consumer Next image host configuration. */}
                    <motion.img
                      src={story.image}
                      alt={story.imageAlt}
                      width={1200}
                      height={900}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      whileHover={
                        reduce || !canHover ? undefined : { scale: 1.025 }
                      }
                      transition={{
                        duration: reduce ? 0 : 0.45,
                        ease: EASE_OUT,
                      }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-2.5 pt-5 pb-3">
                    <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.13em]">
                      {story.category} / {story.readTime}
                    </p>
                    <h3 className="mt-3 text-balance font-semibold text-xl leading-tight tracking-[-0.03em]">
                      {story.title}
                    </h3>
                    <p className="mt-3 text-pretty text-muted-foreground text-sm leading-6">
                      {story.excerpt}
                    </p>
                    <p className="mt-auto flex items-center gap-2 pt-6 font-medium text-sm">
                      Read story
                      <ArrowRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </p>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          id="rounded-newsletter"
          className="px-4 pb-16 sm:px-8 sm:pb-24"
        >
          <motion.div
            {...reveal()}
            className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-7 rounded-[1.25rem] border border-border/60 bg-background p-6 sm:p-9 md:flex-row md:items-center"
          >
            <div>
              <p className="text-muted-foreground text-sm">
                Every other Sunday
              </p>
              <h2 className="mt-2 max-w-lg text-balance font-semibold text-2xl tracking-[-0.035em] sm:text-3xl">
                One thoughtful story for your morning.
              </h2>
            </div>
            <ButtonLink href="#rounded-blog-top" size="lg">
              Join the journal
              <Mail className="size-4" aria-hidden="true" />
            </ButtonLink>
          </motion.div>
        </section>

        <span id="rounded-article" className="sr-only">
          Article preview
        </span>
      </main>
    </div>
  );
}
