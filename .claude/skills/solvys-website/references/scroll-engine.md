# Scroll runtime

The shipped runtime is `engine/scrollcraft.js` from the Creative Real Estate
Deals build: vanilla JavaScript, zero dependencies, zero DOM generation. The
engine does not build the page. You author real semantic HTML and mark it up
with `data-sc-*` attributes, and the engine drives it from a single scroll value
on a single `requestAnimationFrame` loop.

Treat the file as the source of truth for the shipped recipe. This reference
records its contract so a run can author markup against it without rereading the
implementation.

Copy the engine into the site as `public/engine/scrollcraft.js` and load it as a
plain script. Do not rewrite it, wrap it in a framework, or replace it with an
animation library.

## Why this shape

A runtime that generates its own DOM from a config object makes every site it
touches look identical. That is the failure mode this engine exists to avoid.
Authoring real markup keeps each client's page its own document.

## Single playhead

Every scrubbed clip on the page is driven by one smoothed playhead. Scroll only
writes a target. A standalone rAF loop walks the current time toward that target
at a fixed fraction per frame.

This matters because wheel events do not arrive at a constant rate. A 1:1 write
reproduces every gap in them, so a trackpad flick reads as a stutter. The
default smoothing fraction is `0.18`, set by `data-sc-lerp`, and it is `1.0`
under reduced motion, which is no smoothing at all. Never set it to `0`.

## Acts

An act is the unit of scroll time.

```html
<section data-sc-act="pin" data-sc-span="2.5"> ... </section>
```

| Attribute | Meaning |
| --- | --- |
| `data-sc-act` | `scrub`, `pin`, `pan`, or `flow`. Default `flow`. |
| `data-sc-span` | Viewport-heights of scroll this act owns. Pinned acts only. Default `1.5`. |
| `data-sc-dwell` | Monotone remap that settles the camera mid-act and moves faster at the edges. |
| `data-sc-clip-map="travel"` | Opts a pinned act out of full-life clip mapping. |
| `data-sc-lerp` | Playhead smoothing fraction. |
| `data-sc-progress` | Element that receives overall progress. |

Every act publishes normalized progress `0..1` as `--sc-p` on the act element,
so CSS can read it directly. Use it for CSS-only movement instead of adding
another JavaScript listener.

By default a scrub clip is mapped across the stage's entire on-screen life, not
across its pinned travel. A pinned stage is visible for a viewport before the pin
begins and a viewport after it ends. Mapped to pinned travel only, the clip sits
on its first frame through the whole entry and its last frame through the whole
exit, and the reader watches a still image while the page moves. Pair the act
with `data-sc-dwell` so the fast motion lands on the two slides and the settle
lands inside the pin where the copy is.

## Devices

What progress drives:

| Attribute | On | Effect |
| --- | --- | --- |
| `data-sc-scrub` | `<video>` | Progress scrubs `currentTime`. Blob-loaded so it seeks without HTTP range support. |
| `data-sc-sequence="a/{i}.webp:120:1"` | `<canvas>` | Progress scrubs an image sequence, as path template, frame count, start index. |
| `data-sc-pan="0.6"` | wide rail in a `pan` act | Progress drives horizontal travel. Value is an extra travel multiplier. |
| `data-sc-parallax="-0.2"` | any | `translateY` by rate times act progress times viewport. Negative recedes. |
| `data-sc-cue="0.1 0.5"` | any | Opacity and rise keyed to progress. One value is enter and hold. Two is enter to leave. A third sets the hold point. |
| `data-sc-kinetic="lines"` | text | `lines`, `words`, or `chars`. Splits the element and staggers its reveal across the cue window. |
| `data-sc-reveal="up"` | any | `up`, `down`, `left`, `right`, or `iris`. Clip-path wipe. |
| `data-sc-count="0 4200"` | any | Number bloom across the cue window. Outside an act it ticks once on entry over `data-sc-count-ms`, default `1400`. |
| `data-sc-in` | flow section | Reveal that fires once on entry. Content that re-hides on scroll-up is a defect, not an effect. |
| `data-sc-stagger="60"` | parent | Staggers children of a `data-sc-in` reveal. |
| `data-sc-drift="#07090c"` | any | Page background interpolates toward this colour while the act is on screen. |

Pointer devices, gated to `(hover: hover) and (pointer: fine)` and disabled
under reduced motion:

| Attribute | Effect |
| --- | --- |
| `data-sc-tilt="8"` | 3D tilt toward the pointer, spring-damped, in degrees. |
| `data-sc-magnet="0.35"` | Element drifts toward the pointer inside its bounds. |
| `data-sc-spotlight` | Publishes `--sc-mx` and `--sc-my`, `0..1`, for a light that follows the pointer. |

Touch never fires these.

## Worldflight

Acts cut the page into pinned blocks. That is right for a page of chapters and
wrong for one continuous camera move, because the reader hits the end of an act,
the stage unsticks, a static page slides past, and the next act begins again.

Worldflight removes the seams by removing the blocks. There is one fixed stage
for the whole page. The only element in document flow is a spacer whose height
the engine sets to the sum of the segment weights plus one viewport, so the last
flight can finish. Scroll drives the film timeline and the overlay opacity, and
nothing else moves.

Use worldflight for a continuous journey: a Miami-to-Earth pullback, or any
single camera move across the whole page.

```html
<div data-sc-mode="worldflight" data-sc-seam="0.12">
  <div data-sc-world>
    <div data-sc-segment data-sc-w="1.4" data-sc-linger="0.3"
         data-sc-waypoint="Approach">
      <img class="sc-world__poster" src="p1.webp" alt="">
      <video data-sc-src="leg1.mp4" data-sc-src-mobile="leg1-m.mp4"></video>
    </div>
  </div>
  <div data-sc-world-copy>
    <div data-sc-copy data-sc-window="hero"> ... </div>
    <div data-sc-copy data-sc-window="0.34 0.56"> ... </div>
    <div data-sc-copy data-sc-window="finale"> ... </div>
  </div>
  <div data-sc-spacer aria-hidden="true"></div>
</div>
```

| Attribute | Meaning |
| --- | --- |
| `data-sc-mode="worldflight"` | Page mode for one continuous flight. |
| `data-sc-seam` | Crossfade band in viewport-heights of scroll. Default `0.12`. |
| `data-sc-w` | Viewport-heights this segment owns. Default `1.3`. |
| `data-sc-linger` | Dwell remap for this leg only. Capped at `0.6`. |
| `data-sc-waypoint` | Label published on `--sc-seg` and the `sc:waypoint` event, so a page can draw its own route rail. The engine draws none. |
| `data-sc-window` | On a copy block: `hero`, `finale`, or `from to [in [out]]` as fractions of the whole track. |

Every clip stays mounted for the life of the page. Segments crossfade by opacity
over the seam band. Nothing ever swaps a `src`, because a src swap is a black
frame and a black frame is the cut this mode exists to avoid.

Above roughly `0.6`, `linger` makes the camera visibly stop dead mid-leg, which
reads as a stall rather than a hold. Keep it at or below `0.6`.

## Reversibility

The narrative must reverse smoothly when the reader scrolls upward. Three
mechanisms deliver it, and all three must stay intact:

- The dwell and linger remaps are fixed at both endpoints: `f(0)=0` and `f(1)=1`.
  That is what keeps the seam frames between consecutive clips matched and the
  chain invisible in both directions.
- The playhead follows a target rather than following scroll directly, so
  direction changes are smoothed.
- Clip mapping spans the stage's full on-screen life, so the entry and exit
  halves are driven content rather than frozen frames.

Test reversal explicitly. Scroll to the end, then back to the top, and confirm
the narrative retraces rather than snapping.

## Reduced motion

Fewer and gentler, not zero. Cues still fade, because comprehension survives a
fade. Translation collapses. Video clips are never fetched and the poster holds.
Pointer devices are inert.

A worldflight still tells its whole story: the posters cross-dissolve through the
same seams and the same copy windows. Verify that the reduced-motion page is
readable end to end with no stage stranded on an empty frame.

## Authoring checklist

- Semantic markup first. Attributes second.
- One act per narrative beat, or one worldflight for a continuous move.
- Copy blocks carry their own window so text and imagery stay in step.
- Posters on every clip so the first paint and the reduced-motion path both have
  a frame.
- Mobile sources via `data-sc-src-mobile` for the heavier legs.
- No `data-sc-lerp="0"`.
- No src swapping between segments.
