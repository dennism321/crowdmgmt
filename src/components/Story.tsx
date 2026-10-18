import { ArrowUpRight, GraduationCap, Mail } from "lucide-react";
import { SITE, STORY } from "@/data/site";
import { mailtoHref } from "@/lib/forms";
import { InstagramIcon, Reveal, SectionHeading } from "./ui";

const MARKERS = ["2010", "Selective", "Inclusive", "Today"];

export default function Story() {
  return (
    <section id="story" className="relative overflow-x-clip py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-[30rem] w-[30rem] rounded-full bg-iris-500/15 blur-[120px]" />
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Our story"
            title="Born as a"
            accent="rebellion."
            body="With just two clients and a dream, EJ Jamele bet on himself — and on the belief that real success comes from investing deeply in each artist’s unique journey."
          />

          <Reveal delay={0.1} className="mt-10">
            <div className="rounded-[1.75rem] border border-white/10 bg-ink-900/80 p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full bg-brand-gradient font-display text-xl font-bold">
                  EJ
                  <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-ink-900 bg-mint" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold">EJ Jamele</p>
                  <p className="text-sm text-white/55">Founder & CEO · Producer · Brand Architect</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-white/60">
                An accomplished producer and talent manager with 15+ years in the business, EJ leads the crowdMGMT team,
                serving clients from Vogue, Vanity Fair and ESSENCE to Ciara, Missy Elliott, Balmain, Versace and L’Oréal.
                He’s a regular speaker and executive contributor at The Makeup Show.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <a href={SITE.links.ej} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold transition hover:bg-white/10">
                  Full bio <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a href={SITE.founderInstagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold transition hover:bg-white/10">
                  <InstagramIcon className="h-3.5 w-3.5" /> {SITE.founderHandle}
                </a>
                <a href={SITE.links.consulting} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink-950 transition hover:bg-coral-500 hover:text-white">
                  <GraduationCap className="h-3.5 w-3.5" /> Consulting with EJ
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="relative">
          <div className="absolute bottom-4 left-[11px] top-4 w-px bg-gradient-to-b from-coral-500 via-iris-500/60 to-transparent" />
          <div className="space-y-12">
            {STORY.map((p, i) => (
              <Reveal key={i} delay={0.05}>
                <div className="relative pl-12">
                  <span className="absolute left-0 top-1 grid h-6 w-6 place-items-center rounded-full border border-white/20 bg-ink-950">
                    <span className="h-2 w-2 rounded-full bg-coral-500" />
                  </span>
                  <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-coral-300">{MARKERS[i]}</p>
                  <p className="mt-3 text-base leading-relaxed text-white/70 sm:text-[17px]">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 pl-12">
            <blockquote className="font-serif text-3xl italic leading-snug text-white sm:text-4xl">
              “Authenticity, collaboration, and thoughtful brand management create careers and impact that{" "}
              <span className="text-gradient">last.</span>”
            </blockquote>
            <a
              href={mailtoHref("Consultation inquiry for EJ Jamele")}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-coral-300"
            >
              <Mail className="h-4 w-4" /> Ask about 1:1 & group consultations
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
