import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, Pause, Play } from "lucide-react";
import { work } from "@/data/work";
import { SITE } from "@/data/site";
import { cn } from "@/utils/cn";
import Lightbox from "./Lightbox";
import { InstagramIcon, SectionHeading } from "./ui";

const SPEED = 42; // px per second

export default function WorkConveyor() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const x = useRef(0);
  const setWidth = useRef(1);
  const nudge = useRef(0);
  const velocity = useRef(0);
  const hovering = useRef(false);
  const dragging = useRef(false);
  const dragMoved = useRef(false);
  const playingRef = useRef(true);
  const lightboxOpen = useRef(false);

  const [playing, setPlaying] = useState(true);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);
  useEffect(() => {
    lightboxOpen.current = active !== null;
  }, [active]);

  // Measure one set of cards
  useEffect(() => {
    const measure = () => {
      if (setRef.current) setWidth.current = Math.max(1, setRef.current.offsetWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (setRef.current) ro.observe(setRef.current);
    return () => ro.disconnect();
  }, []);

  // Animation loop
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      playingRef.current = false;
      setPlaying(false);
    }
    let raf = 0;
    let last = performance.now();
    let lastIdx = -1;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;

      if (!dragging.current) {
        if (Math.abs(nudge.current) > 0.4) {
          const step = nudge.current * Math.min(1, dt * 9);
          x.current += step;
          nudge.current -= step;
        } else {
          nudge.current = 0;
          if (playingRef.current && !hovering.current && !lightboxOpen.current) {
            x.current -= SPEED * dt;
          }
        }
        if (Math.abs(velocity.current) > 5) {
          x.current += velocity.current * dt;
          velocity.current *= Math.pow(0.04, dt);
        } else velocity.current = 0;
      }

      const w = setWidth.current;
      if (x.current <= -w) x.current += w;
      if (x.current > 0) x.current -= w;

      if (trackRef.current) trackRef.current.style.transform = `translate3d(${x.current}px,0,0)`;

      const ratio = -x.current / w;
      const idx = Math.floor(ratio * work.length + 0.0001) % work.length;
      if (idx !== lastIdx) {
        lastIdx = idx;
        if (counterRef.current) counterRef.current.textContent = String(idx + 1).padStart(2, "0");
      }
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.max(0.02, ratio)})`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Dragging (mouse + touch) — window listeners keep card clicks reliable
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    dragging.current = true;
    dragMoved.current = false;
    velocity.current = 0;
    nudge.current = 0;
    const startX = e.clientX;
    const startPos = x.current;
    let lastX = e.clientX;
    let lastT = performance.now();
    let v = 0;

    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      if (Math.abs(dx) > 6) dragMoved.current = true;
      x.current = startPos + dx;
      const now = performance.now();
      const dtt = Math.max(1, now - lastT);
      v = ((ev.clientX - lastX) / dtt) * 1000;
      lastX = ev.clientX;
      lastT = now;
    };
    const up = () => {
      dragging.current = false;
      velocity.current = Math.max(-2600, Math.min(2600, v));
      // allow the click that follows this pointerup to be suppressed, then reset
      window.setTimeout(() => (dragMoved.current = false), 0);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  const step = (dir: 1 | -1) => {
    const card = setRef.current?.firstElementChild as HTMLElement | null;
    const amount = card ? card.offsetWidth + 20 : 320;
    nudge.current += -dir * amount;
  };

  const openAt = useCallback((i: number) => {
    if (dragMoved.current) return;
    setActive(i);
  }, []);

  const renderSet = (copy: number) =>
    work.map((item, i) => (
      <button
        key={`${copy}-${item.id}`}
        type="button"
        tabIndex={copy === 0 ? 0 : -1}
        aria-hidden={copy !== 0}
        onClick={() => openAt(i)}
        className={cn(
          "group relative mr-5 w-[240px] shrink-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-800 text-left outline-none transition-[box-shadow,border-color] duration-500 focus-visible:border-coral-400 focus-visible:ring-4 focus-visible:ring-coral-500/25 sm:w-[290px]",
          i % 2 === 1 ? "mt-10" : "mt-0",
          "hover:border-white/25 hover:shadow-[0_30px_80px_-30px_rgba(255,71,87,0.55)]",
        )}
      >
        <img
          src={item.src}
          alt={item.title}
          draggable={false}
          loading="lazy"
          className="aspect-[4/5] w-full select-none object-cover transition duration-[1.2s] ease-out group-hover:scale-[1.07]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition group-hover:opacity-100" />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/85 backdrop-blur">
          {item.category}
        </span>
        <span className="absolute right-4 top-4 grid h-9 w-9 scale-75 place-items-center rounded-full bg-white text-ink-950 opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100">
          <Expand className="h-4 w-4" />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-display text-[15px] font-bold leading-snug text-white">{item.title}</p>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/60">{item.credit}</p>
        </div>
      </button>
    ));

  return (
    <section id="work" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[30rem] bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.14),transparent_65%)]" />

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <SectionHeading
          eyebrow="Latest work"
          title="Moments we’re"
          accent="PROUD of."
          body="Red carpets, magazine covers, residencies, campaigns and music videos — a rolling look at recent work from the crowdMGMT roster, straight from our feed."
        />
        <div className="flex items-center gap-2">
          <button
            onClick={() => step(-1)}
            className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white transition hover:border-white/40 hover:bg-white/5"
            aria-label="Previous images"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink-950 transition hover:bg-coral-500 hover:text-white"
            aria-label={playing ? "Pause conveyor" : "Play conveyor"}
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button
            onClick={() => step(1)}
            className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white transition hover:border-white/40 hover:bg-white/5"
            aria-label="Next images"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Conveyor */}
      <div
        ref={viewportRef}
        className="relative mt-14 cursor-grab select-none mask-fade-x active:cursor-grabbing"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onMouseEnter={() => (hovering.current = true)}
        onMouseLeave={() => (hovering.current = false)}
        onFocus={() => (hovering.current = true)}
        onBlur={() => (hovering.current = false)}
        aria-roledescription="carousel"
        aria-label="crowdMGMT recent work"
      >
        <div ref={trackRef} className="flex w-max items-start will-change-transform">
          <div ref={setRef} className="flex shrink-0 items-start">
            {renderSet(0)}
          </div>
          <div className="flex shrink-0 items-start">{renderSet(1)}</div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-white">
            <span ref={counterRef}>01</span>
            <span className="text-white/35"> / {String(work.length).padStart(2, "0")}</span>
          </span>
          <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/10 sm:w-64">
            <div ref={progressRef} className="h-full origin-left bg-brand-gradient" style={{ transform: "scaleX(0.02)" }} />
          </div>
          <span className="hidden text-xs text-white/40 md:inline">Drag, swipe or tap any image</span>
        </div>
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-coral-300"
        >
          <InstagramIcon className="h-4 w-4" /> Follow {SITE.instagramHandle} <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <Lightbox items={work} index={active} onClose={() => setActive(null)} onChange={setActive} />
    </section>
  );
}
