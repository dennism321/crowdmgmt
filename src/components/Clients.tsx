import { RESUME_BRANDS } from "@/data/site";
import { Dot, Marquee } from "./ui";

export default function Clients() {
  const half = Math.ceil(RESUME_BRANDS.length / 2);
  const rowA = RESUME_BRANDS.slice(0, half);
  const rowB = RESUME_BRANDS.slice(half);

  return (
    <section id="clients" className="relative border-y border-white/[0.06] bg-ink-900/60 py-10">
      <p className="mb-7 text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-white/40">
        Collaborations & services résumé includes
      </p>
      <div className="space-y-4 mask-fade-x">
        <Marquee duration={50}>
          {rowA.map((b) => (
            <span key={b} className="flex items-center">
              <span className="px-7 font-display text-2xl font-bold tracking-tight text-white/75 transition hover:text-white sm:text-3xl">
                {b}
              </span>
              <Dot className="h-2 w-2" glow={false} />
            </span>
          ))}
        </Marquee>
        <Marquee duration={55} reverse>
          {rowB.map((b) => (
            <span key={b} className="flex items-center">
              <span className="px-7 font-serif text-2xl italic tracking-wide text-white/50 transition hover:text-white sm:text-3xl">
                {b}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-iris-400/70" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
