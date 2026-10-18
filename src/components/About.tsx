import { Quote } from "lucide-react";
import { COMMITMENT, HIGHLIGHTS, MISSION } from "@/data/site";
import { Reveal, SectionHeading } from "./ui";

function PromiseCircle() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
      <div className="absolute inset-0 rounded-full border border-white/10" />
      <div className="absolute inset-[11%] rounded-full border border-dashed border-white/10" />
      <div className="absolute inset-[22%] rounded-full border border-white/10" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
        <defs>
          <linearGradient id="arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff4757" />
            <stop offset="100%" stopColor="#7c5cff" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="49.5" fill="none" stroke="url(#arc)" strokeWidth="0.7" strokeDasharray="70 241" strokeLinecap="round" />
        <circle cx="50" cy="0.5" r="1.4" fill="#ff4757" />
      </svg>
      <svg viewBox="0 0 100 100" className="absolute inset-[11%] h-[78%] w-[78%] animate-spin-slow [animation-direction:reverse]" aria-hidden>
        <circle cx="50" cy="50" r="49.5" fill="none" stroke="#a68dff" strokeOpacity="0.6" strokeWidth="0.8" strokeDasharray="30 280" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-[30%] rounded-full bg-coral-500/50 blur-3xl" />
      <div className="absolute inset-[30%] grid place-items-center rounded-full bg-gradient-to-br from-coral-400 via-coral-500 to-coral-600 text-center shadow-[0_0_90px_rgba(255,71,87,0.55)]">
        <span className="font-serif text-xl italic leading-tight text-white sm:text-2xl">
          A promise
          <br />
          with no end.
        </span>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="About crowdMGMT"
              title="We don’t just manage talent. We build"
              accent="movements."
              body="We are a strategic MGMT group that has created a global community of artists that encourage one another. We specialize in elite Brand and Talent MGMT & Production with a Beauty & Lifestyle focus."
            />

            <Reveal delay={0.1} className="mt-10">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-7 sm:p-8">
                <Quote className="absolute right-6 top-6 h-10 w-10 text-coral-500/30" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-coral-300">Our mission</p>
                <p className="mt-4 font-display text-xl font-semibold leading-snug text-white sm:text-2xl">{MISSION}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <PromiseCircle />
          </Reveal>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-iris-300">Our commitment</p>
            <h3 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
              Seen — <span className="font-serif font-normal italic text-gradient">authentically.</span>
            </h3>
          </Reveal>
          <div className="space-y-5">
            {COMMITMENT.map((p, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p className="text-base leading-relaxed text-white/65 sm:text-lg">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.label} delay={0.06 * i} className="bg-ink-950 p-6 sm:p-8">
              <p className="font-display text-4xl font-bold text-gradient sm:text-5xl">{h.value}</p>
              <p className="mt-3 text-sm leading-snug text-white/55">{h.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
