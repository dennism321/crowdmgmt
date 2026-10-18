import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/* Logo — "cr●wd MGMT" with the signature red circle                  */
/* ------------------------------------------------------------------ */
export function Logo({ className, sub = false }: { className?: string; sub?: boolean }) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span aria-hidden className="flex items-baseline font-display font-bold tracking-tight">
        <span>cr</span>
        <Dot className="mx-[0.03em] h-[0.5em] w-[0.5em]" />
        <span>wd</span>
        <span className="ml-[0.16em] font-semibold text-white/60">MGMT</span>
      </span>
      {sub && (
        <span aria-hidden className="mt-[0.35em] text-[0.36em] font-medium uppercase tracking-[0.5em] text-white/45">
          + Productions
        </span>
      )}
      <span className="sr-only">crowdMGMT</span>
    </span>
  );
}

export function Dot({ className, glow = true }: { className?: string; glow?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block shrink-0 rounded-full bg-coral-500",
        glow && "shadow-[0_0_22px_rgba(255,71,87,0.65)]",
        className,
      )}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Reveal on scroll                                                    */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70 backdrop-blur",
        className,
      )}
    >
      <Dot className="h-1.5 w-1.5" glow={false} />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  body,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  accent?: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance sm:text-5xl lg:text-6xl">
        {title}{" "}
        {accent && <span className="font-serif text-[1.08em] font-normal italic text-gradient">{accent}</span>}
      </h2>
      {body && <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">{body}</p>}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee (CSS driven, seamless)                                      */
/* ------------------------------------------------------------------ */
export function Marquee({
  children,
  reverse = false,
  duration = 40,
  vertical = false,
  className,
  trackClassName,
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  vertical?: boolean;
  className?: string;
  trackClassName?: string;
}) {
  const anim = vertical
    ? reverse
      ? "animate-marquee-down"
      : "animate-marquee-up"
    : reverse
      ? "animate-marquee-reverse"
      : "animate-marquee";
  return (
    <div className={cn("marquee-group overflow-hidden", className)}>
      <div
        className={cn("marquee-track flex", vertical ? "h-max flex-col" : "w-max", anim, trackClassName)}
        style={{ animationDuration: `${duration}s` } as CSSProperties}
      >
        <div className={cn("flex shrink-0", vertical ? "flex-col" : "items-center")}>{children}</div>
        <div aria-hidden className={cn("flex shrink-0", vertical ? "flex-col" : "items-center")}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Rotating circular text badge                                        */
/* ------------------------------------------------------------------ */
export function SpinBadge({ className, text }: { className?: string; text: string }) {
  return (
    <div className={cn("relative grid place-items-center", className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-white/80 font-display text-[11px] font-semibold uppercase">
          <textPath href="#badge-circle" textLength="486" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <Dot className="h-[34%] w-[34%]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Instagram glyph (brand icons aren't shipped with lucide)            */
/* ------------------------------------------------------------------ */
export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */
export const btnPrimary =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(255,71,87,0.7)] transition hover:shadow-[0_14px_50px_-8px_rgba(255,71,87,0.85)] hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral-500/30";

export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/[0.08] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/15";
