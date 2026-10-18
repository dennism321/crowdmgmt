import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/data/site";
import { cn } from "@/utils/cn";
import { Reveal, SectionHeading } from "./ui";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = TESTIMONIALS[i];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 7000);
    return () => window.clearInterval(id);
  }, [paused]);

  const go = (d: number) => setI((v) => (v + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section id="love" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Kind words" title="Straight from" accent="the crowd." />

        <Reveal className="mt-14">
          <div
            className="relative grid overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900/80 lg:grid-cols-[1.5fr_1fr]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative min-h-[22rem] p-8 sm:p-12">
              <span className="pointer-events-none absolute -left-2 -top-10 font-serif text-[12rem] leading-none text-coral-500/15">“</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <p className="font-serif text-3xl italic leading-snug text-white sm:text-4xl lg:text-[2.6rem]">“{t.quote}”</p>
                  <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/50">{t.full}</p>
                  <div className="mt-8 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-gradient font-display text-sm font-bold">
                      {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                    <div>
                      <p className="font-display font-bold">{t.name}</p>
                      <p className="text-xs text-white/50">{t.title}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="mt-10 flex items-center gap-2">
                <button onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:bg-white/10">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={() => go(1)} aria-label="Next testimonial" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:bg-white/10">
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="ml-3 flex gap-1.5">
                  {TESTIMONIALS.map((_, k) => (
                    <button
                      key={k}
                      onClick={() => setI(k)}
                      aria-label={`Show testimonial ${k + 1}`}
                      className={cn("h-1.5 rounded-full transition-all", k === i ? "w-8 bg-coral-500" : "w-1.5 bg-white/25 hover:bg-white/50")}
                    />
                  ))}
                </div>
              </div>
            </div>

            <ul className="hidden border-l border-white/10 lg:block">
              {TESTIMONIALS.map((x, k) => (
                <li key={x.name}>
                  <button
                    onClick={() => setI(k)}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 border-b border-white/[0.06] px-8 py-[1.15rem] text-left transition",
                      k === i ? "bg-white/[0.06]" : "hover:bg-white/[0.03]",
                    )}
                  >
                    <span>
                      <span className={cn("block font-display text-[15px] font-bold", k === i ? "text-white" : "text-white/60")}>{x.name}</span>
                      <span className="block truncate text-xs text-white/40">{x.title}</span>
                    </span>
                    <span className={cn("h-2 w-2 shrink-0 rounded-full transition", k === i ? "bg-coral-500" : "bg-white/15")} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
