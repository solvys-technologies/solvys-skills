"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { type GalleryImage, IMAGE_GALLERY_IMAGES } from "./image-gallery-data";
import { useGalleryCycle } from "./use-gallery-cycle";

export type ImageGalleryMorphingMosaicProps = {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  images?: GalleryImage[];
  interval?: number;
  className?: string;
};

const DEFAULT_TITLE = (
  <>
    <span className="block">Every frame gets</span>
    <span className="block">its moment</span>
  </>
);

export function ImageGalleryMorphingMosaic({
  eyebrow = "Living collection",
  title = DEFAULT_TITLE,
  description = "A shifting editorial mosaic that reshapes itself around the selected image",
  images = IMAGE_GALLERY_IMAGES.slice(0, 5),
  interval = 4600,
  className,
}: ImageGalleryMorphingMosaicProps) {
  const galleryImages =
    images.length > 0 ? images.slice(0, 5) : IMAGE_GALLERY_IMAGES.slice(0, 5);
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
        <header className="mx-auto max-w-3xl text-center">
          {eyebrow ? (
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="mt-5 text-balance font-medium text-4xl leading-[1.02] tracking-[-0.045em]">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mx-auto mt-5 max-w-xl text-pretty text-muted-foreground leading-7">
              {description}
            </p>
          ) : null}
        </header>

        <div className="mt-10 grid h-[36rem] grid-cols-2 grid-rows-4 gap-2 border-border border-y py-2 sm:gap-3 sm:py-3 lg:h-[40rem] lg:grid-cols-12 lg:grid-rows-2">
          {galleryImages.map((image, index) => {
            const relativePosition =
              (index - activeIndex + galleryImages.length) %
              galleryImages.length;
            const isActive = relativePosition === 0;
            const label = image.label ?? image.alt;

            return (
              <motion.button
                key={image.id}
                type="button"
                layout
                aria-label={`Focus ${label}`}
                aria-pressed={isActive}
                onClick={() => selectIndex(index)}
                transition={reduceMotion ? { duration: 0 } : SPRING_LAYOUT}
                style={{ order: relativePosition }}
                className={cn(
                  "group relative cursor-pointer overflow-hidden bg-muted text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "col-span-2 row-span-2 lg:col-span-6 lg:row-span-2"
                    : "col-span-1 row-span-1 lg:col-span-3 lg:row-span-1",
                )}
              >
                {/* biome-ignore lint/performance/noImgElement: distributed gallery accepts consumer-hosted images without requiring Next image host configuration. */}
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={1600}
                  loading="lazy"
                  animate={{
                    opacity: isActive ? 1 : 0.82,
                    scale: reduceMotion ? 1 : isActive ? 1.01 : 1.07,
                  }}
                  transition={reduceMotion ? { duration: 0 } : SPRING_LAYOUT}
                  className="h-full w-full object-cover"
                />

                {isActive ? (
                  <motion.span
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: 12, filter: "blur(8px)" }
                    }
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.42, delay: 0.14 }
                    }
                    className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-4 bg-background/80 p-4 text-foreground backdrop-blur-md sm:p-5"
                  >
                    <span className="font-medium">{label}</span>
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

        <fieldset className="mt-5 flex justify-center gap-2">
          <legend className="sr-only">Choose an image</legend>
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              aria-label={`Show ${image.label ?? image.alt}`}
              aria-pressed={activeIndex === index}
              onClick={() => selectIndex(index)}
              className={cn(
                "h-10 min-w-10 border border-border px-3 font-mono text-xs tabular-nums outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                activeIndex === index
                  ? "bg-foreground text-background"
                  : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </fieldset>
      </div>
    </section>
  );
}
