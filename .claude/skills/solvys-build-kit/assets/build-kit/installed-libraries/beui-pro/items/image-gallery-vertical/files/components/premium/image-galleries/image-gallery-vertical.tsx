"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { type GalleryImage, IMAGE_GALLERY_IMAGES } from "./image-gallery-data";

export type ImageGalleryVerticalProps = {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  images?: GalleryImage[];
  columnCount?: number;
  speed?: number;
  className?: string;
};

const COPIES = ["primary", "duplicate"] as const;
const DEFAULT_TITLE = (
  <>
    <span className="block">A living archive</span>
    <span className="block">of considered work</span>
  </>
);

type GalleryStyle = CSSProperties & {
  "--gallery-columns": number;
};

export function ImageGalleryVertical({
  eyebrow = "Selected spaces",
  title = DEFAULT_TITLE,
  description = "An image-led collection moving with a quiet, continuous rhythm",
  images = IMAGE_GALLERY_IMAGES,
  columnCount = 4,
  speed = 34,
  className,
}: ImageGalleryVerticalProps) {
  const reduceMotion = useReducedMotion();
  const galleryImages = images.length > 0 ? images : IMAGE_GALLERY_IMAGES;
  const resolvedColumnCount = Math.min(
    Math.max(2, Math.round(columnCount)),
    5,
    galleryImages.length,
  );
  const columns = distribute(galleryImages, resolvedColumnCount);
  const galleryStyle: GalleryStyle = {
    "--gallery-columns": resolvedColumnCount,
  };

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-8 sm:py-24",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE_OUT }}
          className="grid gap-6 border-border border-b pb-8 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16"
        >
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
          {description ? (
            <p className="max-w-lg text-pretty text-muted-foreground leading-7 md:justify-self-end">
              {description}
            </p>
          ) : null}
        </motion.header>

        <GalleryColumns
          columns={distribute(galleryImages, Math.min(2, galleryImages.length))}
          reduceMotion={reduceMotion}
          speed={speed}
          className="grid lg:hidden"
        />
        <GalleryColumns
          columns={columns}
          reduceMotion={reduceMotion}
          speed={speed}
          className="hidden lg:grid lg:[grid-template-columns:repeat(var(--gallery-columns),minmax(0,1fr))]"
          style={galleryStyle}
        />
      </div>

      <style>{`
        @keyframes image-gallery-up {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(0, -50%, 0); }
        }
        @keyframes image-gallery-down {
          from { transform: translate3d(0, -50%, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
      `}</style>
    </section>
  );
}

function GalleryColumns({
  columns,
  reduceMotion,
  speed,
  className,
  style,
}: {
  columns: GalleryImage[][];
  reduceMotion: boolean | null;
  speed: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "mt-5 h-[36rem] grid-cols-2 gap-2 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_7%,black_93%,transparent)] sm:h-[42rem] sm:gap-3",
        className,
      )}
      style={style}
    >
      {columns.map((column, columnIndex) => {
        const direction = columnIndex % 2 === 0 ? "up" : "down";
        const duration = Math.max(12, speed + columnIndex * 3);

        return (
          <div
            key={column.map((image) => image.id).join("-")}
            className="overflow-hidden"
          >
            <div
              className="flex will-change-transform flex-col"
              style={{
                animationName: reduceMotion
                  ? "none"
                  : direction === "up"
                    ? "image-gallery-up"
                    : "image-gallery-down",
                animationDuration: `${duration}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
              }}
            >
              {COPIES.map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === "duplicate"}
                  className="flex flex-col gap-2 pb-2 sm:gap-3 sm:pb-3"
                >
                  {column.map((image) => (
                    <figure
                      key={`${copy}-${image.id}`}
                      className="relative overflow-hidden bg-muted"
                      style={{ aspectRatio: image.aspectRatio ?? 0.8 }}
                    >
                      {/* biome-ignore lint/performance/noImgElement: distributed gallery accepts consumer-hosted images without requiring Next image host configuration. */}
                      <img
                        src={image.src}
                        alt={copy === "primary" ? image.alt : ""}
                        width={900}
                        height={1200}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function distribute(
  images: GalleryImage[],
  columnCount: number,
): GalleryImage[][] {
  const columns = Array.from(
    { length: columnCount },
    () => [] as GalleryImage[],
  );

  images.forEach((image, index) => {
    columns[index % columnCount]?.push(image);
  });

  return columns;
}
