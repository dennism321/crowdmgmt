import { ArrowUpRight, FileText } from "lucide-react";
import { RESUME_TALENT, SITE } from "@/data/site";
import { openContactForm } from "@/lib/forms";
import { Marquee, Reveal, SectionHeading, btnGhost, btnPrimary } from "./ui";

export default function Resume() {
  const third = Math.ceil(RESUME_TALENT.length / 3);
  const rows = [RESUME_TALENT.slice(0, third), RESUME_TALENT.slice(third, third * 2), RESUME_TALENT.slice(third * 2)];

  return (
    <section id="resume" className="relative overflow-hidden border-y border-white/[0.06] bg-ink-900/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Résumé"
          title="Iconic moments in pop-culture, beauty"
          accent="& lifestyle."
          body="Since 2010, crowdMGMT has been at the forefront of innovative brand development and collaboration. We are honored and grateful that our services have provided key contributions for prestigious celebrities, networks, editorial & media outlets, production companies and lifestyle & beauty brands you will surely recognize."
        />
      </div>

      <div className="mt-16 space-y-3 sm:space-y-5">
        {rows.map((row, r) => (
          <Marquee key={r} reverse={r % 2 === 1} duration={70 + r * 8}>
            {row.map((name, i) => (
              <span key={name} className="flex items-center">
                <span
                  className={
                    (i + r) % 2 === 0
                      ? "px-5 font-display text-4xl font-bold tracking-tight text-white sm:px-8 sm:text-6xl lg:text-7xl"
                      : "px-5 font-display text-4xl font-bold tracking-tight text-outline sm:px-8 sm:text-6xl lg:text-7xl"
                  }
                >
                  {name}
                </span>
                <span className="h-3 w-3 rounded-full bg-coral-500 sm:h-4 sm:w-4" />
              </span>
            ))}
          </Marquee>
        ))}
      </div>

      <Reveal className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-center gap-3 px-4 sm:flex-row">
        <a href={SITE.links.resume} target="_blank" rel="noreferrer" className={btnPrimary}>
          See the full résumé <ArrowUpRight className="h-4 w-4" />
        </a>
        <button onClick={() => openContactForm("contact")} className={btnGhost}>
          <FileText className="h-4 w-4" /> Request roster & capabilities deck
        </button>
      </Reveal>
    </section>
  );
}
