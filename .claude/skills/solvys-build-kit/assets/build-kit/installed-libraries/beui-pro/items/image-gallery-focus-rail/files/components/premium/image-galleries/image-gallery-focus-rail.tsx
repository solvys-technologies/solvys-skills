"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { type GalleryImage, IMAGE_GALLERY_IMAGES } from "./image-gallery-data";
import { useGalleryCycle } from "./use-gallery-cycle";

export type ImageGalleryFocusRailProps = {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  images?: GalleryImage[];
  interval?: number;
  className?: string;
};

const DEFAULT_TITLE = (
  <>
    <span className="block">Move through images</span>
    <span className="block">one frame at a time</span>
  </>
);

export function ImageGalleryFocusRail({
  eyebrow = "Spaces in focus",
  title = DEFAULT_TITLE,
  description = "Select a frame or let the gallery quietly move the focus for you",
  images = IMAGE_GALLERY_IMAGES.slice(0, 6),
  interval = 4200,
  className,
}: ImageGalleryFocusRailProps) {
  const galleryImages =
    images.length > 0 ? images.slice(0, 6) : IMAGE_GALLERY_IMAGES.slice(0, 6);
  const { activeIndex, containerRef, reduceMotion, selectIndex } =
    useGalleryCycle(galleryImages.length, interval);

  return (
    <section
      ref={containerRef}
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-8 sm:py-24",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        <header className="grid gap-6 pb-9 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16">
          <div>
            {eyebrow ? (
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-5 max-w-3xl text-balance font-medium text-4xl leading-[1.02] tracking-[-0.045em]">
                {title}
              </h2>
            ) : null}
          </div>
          <div className="md:justify-self-end">
            {description ? (
              <p className="max-w-md text-pretty text-muted-foreground leading-7">
                {description}
              </p>
            ) : null}
            <p className="mt-5 font-mono text-muted-foreground text-xs tabular-nums tracking-[0.12em]">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(galleryImages.length).padStart(2, "0")}
            </p>
          </div>
        </header>

        <div className="flex h-[38rem] flex-col gap-2 border-border border-y py-2 md:h-[35rem] md:flex-row">
          {galleryImages.map((image, index) => {
            const isActive = activeIndex === index;
            const label = image.label ?? image.alt;

            return (
              <motion.button
                key={image.id}
                type="button"
                layout
                aria-label={`Show ${label}`}
                aria-pressed={isActive}
                onClick={() => selectIndex(index)}
                animate={{ flexGrow: isActive ? 4.4 : 1 }}
                transition={reduceMotion ? { duration: 0 } : SPRING_LAYOUT}
                className="group relative min-h-0 min-w-0 basis-0 cursor-pointer overflow-hidden bg-muted text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {/* biome-ignore lint/performance/noImgElement: distributed gallery accepts consumer-hosted images without requiring Next image host configuration. */}
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={1600}
                  loading="lazy"
                  animate={{
                    scale: reduceMotion ? 1 : isActive ? 1 : 1.045,
                  }}
                  transition={reduceMotion ? { duration: 0 } : SPRING_LAYOUT}
                  className="h-full w-full object-cover"
                />

                {isActive ? (
                  <motion.span
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: 10, filter: "blur(6px)" }
                    }
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.4, delay: 0.12 }
                    }
                    className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-4 bg-background/80 p-4 text-foreground backdrop-blur-md"
                  >
                    <span className="font-medium text-sm">{label}</span>
                    {image.location ? (
                      <span className="text-muted-foreground text-xs">
                        {image.location}
                      </span>
                    ) : null}
                  </motion.span>
                ) : null}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
