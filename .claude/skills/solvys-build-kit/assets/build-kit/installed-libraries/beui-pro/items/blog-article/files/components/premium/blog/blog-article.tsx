"use client";

import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { BLOG_POSTS, FEATURED_POST } from "./blog-data";
import { StoryCover } from "./story-cover";

export type BlogArticleProps = {
  publication?: string;
  className?: string;
};

export function BlogArticle({
  publication = "Fieldnotes",
  className,
}: BlogArticleProps) {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: reduce ? 0 : 0.45, ease: EASE_OUT, delay },
  });

  return (
    <div
      className={cn(
        "min-h-screen w-full bg-background font-sans text-foreground",
        className,
      )}
    >
      <header className="border-border border-b">
        <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-8">
          <a
            href="#article-top"
            className="font-semibold text-base tracking-[-0.025em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            {publication}
          </a>
          <ButtonLink href="#article-newsletter" size="sm" variant="outline">
            Subscribe
          </ButtonLink>
        </div>
      </header>

      <main id="article-top">
        <article>
          <header className="mx-auto w-full max-w-5xl px-4 pt-12 pb-10 sm:px-8 sm:pt-20 sm:pb-14">
            <motion.a
              href="#article-top"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: EASE_OUT }}
              className="inline-flex min-h-10 items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              All stories
            </motion.a>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.5, ease: EASE_OUT }}
              className="mt-10"
            >
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.14em]">
                {FEATURED_POST.category} / {FEATURED_POST.readTime}
              </p>
              <h1 className="mt-5 max-w-4xl text-balance font-semibold text-4xl leading-[1.03] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                {FEATURED_POST.title}
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground leading-8">
                {FEATURED_POST.excerpt}
              </p>
              <div className="mt-8 flex items-center gap-3 border-border border-t pt-5 text-sm">
                <span className="grid size-10 place-items-center rounded-full bg-muted font-semibold">
                  MP
                </span>
                <div>
                  <p className="font-medium">{FEATURED_POST.author}</p>
                  <p className="text-muted-foreground">Writer and wanderer</p>
                </div>
              </div>
            </motion.div>
          </header>

          <motion.div
            {...reveal()}
            className="mx-auto w-full max-w-6xl px-4 sm:px-8"
          >
            <StoryCover
              variant="window"
              className="aspect-[16/10] max-h-[44rem] w-full"
            />
          </motion.div>

          <div className="mx-auto grid w-full max-w-5xl gap-12 px-4 py-14 sm:px-8 sm:py-20 lg:grid-cols-[11rem_minmax(0,42rem)] lg:justify-between">
            <aside className="hidden lg:block">
              <div className="sticky top-8 border-border border-t pt-4">
                <p className="font-medium text-xs uppercase tracking-[0.13em]">
                  In this story
                </p>
                <nav className="mt-4 flex flex-col gap-3 text-muted-foreground text-sm">
                  <a
                    href="#arrival"
                    className="transition-colors hover:text-foreground"
                  >
                    Arrival
                  </a>
                  <a
                    href="#unplanned"
                    className="transition-colors hover:text-foreground"
                  >
                    Leaving space
                  </a>
                  <a
                    href="#home"
                    className="transition-colors hover:text-foreground"
                  >
                    What came home
                  </a>
                </nav>
              </div>
            </aside>

            <div className="text-[1.05rem] leading-8">
              <motion.section id="arrival" {...reveal()}>
                <p className="text-muted-foreground text-sm">01 / Arrival</p>
                <h2 className="mt-3 font-semibold text-3xl tracking-[-0.04em]">
                  We arrived with one reservation
                </h2>
                <p className="mt-6">
                  The room was above a bakery and across from a square that
                  became louder at dinner, then completely still by midnight. We
                  had booked the first night and written down the address of a
                  market. That was the entire plan.
                </p>
                <p className="mt-6">
                  At first, the empty days felt irresponsible. By the second
                  morning, they felt generous. Breakfast could last until the
                  cups were cold. A street could be followed because the light
                  looked good at the end of it.
                </p>
              </motion.section>

              <motion.blockquote
                {...reveal(0.05)}
                className="my-12 border-border border-y py-8 text-balance font-medium text-2xl leading-9 tracking-[-0.025em] sm:text-3xl sm:leading-10"
              >
                “The day became less about finding the best thing and more about
                noticing the thing already in front of us.”
              </motion.blockquote>

              <motion.section id="unplanned" {...reveal()}>
                <p className="text-muted-foreground text-sm">
                  02 / Leaving space
                </p>
                <h2 className="mt-3 font-semibold text-3xl tracking-[-0.04em]">
                  A good day can remain unfinished
                </h2>
                <p className="mt-6">
                  We returned to the same lunch counter three times. The owner
                  stopped offering us the menu and brought whatever had just
                  come out of the kitchen. We learned the route home by the
                  sound of chairs being stacked in the square.
                </p>
                <p className="mt-6">
                  None of it would have made a useful checklist. Together, it
                  gave the week a shape: repeated places, familiar faces, and
                  enough room for each day to change its mind.
                </p>
              </motion.section>

              <motion.section id="home" {...reveal()} className="mt-12">
                <p className="text-muted-foreground text-sm">
                  03 / What came home
                </p>
                <h2 className="mt-3 font-semibold text-3xl tracking-[-0.04em]">
                  Fewer recommendations, better memories
                </h2>
                <p className="mt-6">
                  We brought back a paper bag from the bakery, a receipt from
                  the lunch counter, and the name of a song someone played from
                  an upstairs window. Small evidence of a week we had not tried
                  to optimize.
                </p>
              </motion.section>
            </div>
          </div>
        </article>

        <section className="border-border border-t">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-8 sm:py-20">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-muted-foreground text-sm">Keep reading</p>
                <h2 className="mt-1 font-semibold text-2xl tracking-[-0.035em]">
                  More from the journal
                </h2>
              </div>
              <a
                href="#article-top"
                className="hidden min-h-10 items-center gap-2 font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground sm:inline-flex"
              >
                All stories
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {BLOG_POSTS.slice(0, 2).map((post) => (
                <a
                  key={post.slug}
                  href="#article-top"
                  className="group grid gap-5 border-border border-t pt-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground sm:grid-cols-[9rem_1fr]"
                >
                  <StoryCover variant={post.cover} className="aspect-square" />
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-[0.13em]">
                      {post.category} / {post.readTime}
                    </p>
                    <h3 className="mt-3 text-balance font-semibold text-xl leading-tight tracking-[-0.03em]">
                      {post.title}
                    </h3>
                    <p className="mt-4 flex items-center gap-2 font-medium text-sm">
                      Read next
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="article-newsletter" className="border-border border-t">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-7 px-4 py-12 sm:px-8 sm:py-16 md:flex-row md:items-center">
            <div>
              <p className="text-muted-foreground text-sm">The Sunday letter</p>
              <h2 className="mt-2 font-semibold text-2xl tracking-[-0.035em]">
                New stories, no busy inbox.
              </h2>
            </div>
            <ButtonLink href="#article-top" size="lg">
              Subscribe
              <Mail className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </section>
      </main>
    </div>
  );
}
