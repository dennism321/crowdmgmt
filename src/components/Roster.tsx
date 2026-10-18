import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CalendarCheck } from "lucide-react";
import { CONTACT_COPY, ROSTER, type Discipline } from "@/data/site";
import { workById } from "@/data/work";
import { openContactForm } from "@/lib/forms";
import { cn } from "@/utils/cn";
import { InstagramIcon, Reveal, SectionHeading } from "./ui";

const FILTERS: ("All" | Discipline)[] = ["All", "Makeup", "Hair", "Grooming", "Photography", "Creative Direction"];

export default function Roster() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const list = filter === "All" ? ROSTER : ROSTER.filter((a) => a.disciplines.includes(filter));

  return (
    <section id="roster" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <SectionHeading eyebrow="The roster" title="Artists in" accent="good hands." />
          <Reveal>
            <p className="text-base leading-relaxed text-white/60">{CONTACT_COPY.artists}</p>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1" role="tablist" aria-label="Filter roster">
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
                  filter === f
                    ? "border-transparent text-ink-950"
                    : "border-white/10 text-white/65 hover:border-white/25 hover:text-white",
                )}
              >
                {filter === f && (
                  <motion.span layoutId="roster-pill" className="absolute inset-0 -z-0 rounded-full bg-white" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                )}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((a) => {
              const img = workById[a.image];
              return (
                <motion.article
                  layout
                  key={a.name}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-900"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={img?.src}
                      alt={`${a.name} — ${img?.title ?? a.role}`}
                      loading="lazy"
                      className="h-full w-full object-cover grayscale-[35%] transition duration-[1.2s] ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                      {a.disciplines.map((d) => (
                        <span key={d} className="rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest backdrop-blur">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-xs font-medium text-coral-300">{a.role}</p>
                    <h3 className="mt-1 font-display text-2xl font-bold leading-tight">{a.name}</h3>
                    <p className="mt-1.5 text-sm text-white/55">{a.credits}</p>
                    <div className="mt-4 flex items-center gap-2 transition duration-500 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
                      <button
                        onClick={() => openContactForm("booking", a.name)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink-950 transition hover:bg-coral-500 hover:text-white"
                      >
                        <CalendarCheck className="h-3.5 w-3.5" /> Book {a.name.split(" ")[0]}
                      </button>
                      {a.handle && (
                        <a
                          href={`https://www.instagram.com/${a.handle}/`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${a.name} on Instagram`}
                          className="grid h-8 w-8 place-items-center rounded-full border border-white/20 text-white/80 transition hover:bg-white/10"
                        >
                          <InstagramIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-10">
          <div className="flex flex-col gap-5 rounded-[1.75rem] border border-white/10 bg-gradient-to-r from-coral-500/10 via-transparent to-iris-500/10 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">Viewing portfolios</p>
              <p className="mt-2 text-white/75">{CONTACT_COPY.portfolios}</p>
            </div>
            <button
              onClick={() => openContactForm("booking")}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-coral-500 hover:text-white"
            >
              Request a portfolio <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
