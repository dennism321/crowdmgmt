import { Check, Minus } from "lucide-react";
import { COMPARISON } from "@/data/site";
import { Logo, Reveal, SectionHeading } from "./ui";

export default function Compare() {
  return (
    <section id="why" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Why crowdMGMT"
          title="MGMT —"
          accent="not an agency."
          body="Most beauty and talent agencies are built around bookings. crowdMGMT was built around careers: a strategic MGMT group with its own production house, project sales and brand strategy, all working for the long game."
        />

        {/* Desktop table */}
        <Reveal className="mt-16 hidden md:block">
          <div className="relative grid grid-cols-[1fr_1.1fr_1.3fr] overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900/70">
            <div className="border-b border-white/10 p-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">
              What matters
            </div>
            <div className="border-b border-white/10 p-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">
              Traditional agency model
            </div>
            <div className="relative border-b border-white/10 bg-gradient-to-b from-coral-500/15 to-iris-500/10 p-6">
              <span className="text-xl">
                <Logo />
              </span>
            </div>

            {COMPARISON.map((row, i) => (
              <div key={row.topic} className="contents">
                <div className={`p-6 font-display font-semibold ${i < COMPARISON.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
                  {row.topic}
                </div>
                <div className={`flex items-start gap-3 p-6 text-white/50 ${i < COMPARISON.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
                  <Minus className="mt-0.5 h-4 w-4 shrink-0 text-white/30" />
                  {row.agency}
                </div>
                <div
                  className={`flex items-start gap-3 bg-gradient-to-b from-coral-500/[0.07] to-iris-500/[0.05] p-6 text-white ${
                    i < COMPARISON.length - 1 ? "border-b border-white/[0.06]" : ""
                  }`}
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-gradient">
                    <Check className="h-3 w-3" />
                  </span>
                  {row.crowd}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Mobile cards */}
        <div className="mt-12 space-y-4 md:hidden">
          {COMPARISON.map((row, i) => (
            <Reveal key={row.topic} delay={0.04 * i}>
              <div className="rounded-3xl border border-white/10 bg-ink-900/70 p-6">
                <p className="font-display text-lg font-bold">{row.topic}</p>
                <p className="mt-3 flex gap-2 text-sm text-white/45">
                  <Minus className="mt-0.5 h-4 w-4 shrink-0" /> {row.agency}
                </p>
                <p className="mt-2 flex gap-2 text-sm text-white">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-coral-400" /> {row.crowd}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
