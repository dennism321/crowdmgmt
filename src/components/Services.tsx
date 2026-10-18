import { ArrowUpRight, Clapperboard, Gem, Megaphone, Mic, MonitorPlay, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SERVICES } from "@/data/site";
import { openContactForm, scrollToId } from "@/lib/forms";
import { Reveal, SectionHeading } from "./ui";

const ICONS: Record<string, LucideIcon> = {
  talent: Users,
  production: Clapperboard,
  sales: MonitorPlay,
  brand: Gem,
  bookings: Mic,
  sponsorship: Megaphone,
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,71,87,0.10),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="Six disciplines."
            accent="One crowd."
            body="From managing careers to producing Super Bowl spots, everything a brand or artist needs to stand out — under one roof."
          />
          <Reveal>
            <button
              onClick={() => openContactForm("contact")}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold transition hover:border-white/40 hover:bg-white/5"
            >
              Start a project <ArrowUpRight className="h-4 w-4" />
            </button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.id] ?? Users;
            return (
              <Reveal key={s.id} delay={0.06 * (i % 3)}>
                <article className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-900/80 p-7 transition duration-500 hover:-translate-y-1 hover:border-white/20 sm:p-8">
                  <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-gradient opacity-0 blur-3xl transition duration-700 group-hover:opacity-25" />
                  <div className="relative flex items-start justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-coral-300 transition duration-500 group-hover:border-transparent group-hover:bg-brand-gradient group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-sm text-white/30">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="relative mt-8 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/45">{s.kicker}</p>
                  <h3 className="relative mt-2 font-display text-2xl font-bold leading-tight">{s.title}</h3>
                  <p className="relative mt-4 text-[15px] leading-relaxed text-white/60">{s.body}</p>
                  <ul className="relative mt-6 flex flex-wrap gap-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
                        {b}
                      </li>
                    ))}
                  </ul>
                  {s.id === "sponsorship" && (
                    <button
                      onClick={() => scrollToId("glam")}
                      className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-coral-300 hover:text-coral-400"
                    >
                      For exclusive opportunities, join our VIP list <ArrowUpRight className="h-4 w-4" />
                    </button>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
