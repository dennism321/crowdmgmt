import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { work } from "@/data/work";
import { openContactForm, scrollToId } from "@/lib/forms";
import { Dot, Marquee, SpinBadge, btnGhost, btnPrimary } from "./ui";

const colA = work.filter((_, i) => i % 2 === 0).slice(0, 7);
const colB = work.filter((_, i) => i % 2 === 1).slice(0, 7);

function HeroCard({ src, title }: { src: string; title: string }) {
  return (
    <figure className="group relative mb-4 overflow-hidden rounded-[1.6rem] border border-white/10 bg-ink-800">
      <img src={src} alt={title} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 pt-12 text-[12px] font-medium leading-snug text-white/90">
        {title}
      </figcaption>
    </figure>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:min-h-[100svh] lg:pt-0">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-y opacity-60" />
        <div className="absolute -left-40 top-10 h-[34rem] w-[34rem] animate-blob rounded-full bg-coral-500/25 blur-[120px]" />
        <div className="absolute right-[-10rem] top-40 h-[30rem] w-[30rem] animate-blob rounded-full bg-iris-500/25 blur-[120px] [animation-delay:-6s]" />
        <div className="absolute bottom-[-12rem] left-1/3 h-[26rem] w-[26rem] animate-blob rounded-full bg-fuchsia-500/15 blur-[120px] [animation-delay:-12s]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:min-h-[100svh] lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8">
        {/* Copy */}
        <div className="relative z-10 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] py-1.5 pl-1.5 pr-4 text-xs text-white/70 backdrop-blur"
          >
            <span className="rounded-full bg-coral-500/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-coral-300">
              Est. 2010
            </span>
            Talent MGMT · Production · New York
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="mt-7 font-display text-[2.9rem] font-bold leading-[0.98] tracking-tight text-balance sm:text-6xl lg:text-[5.2rem]"
          >
            Helping brands <span className="font-serif font-normal italic text-white/90">+</span> artists stand out
            in a{" "}
            <span className="inline-flex items-baseline whitespace-nowrap">
              <span className="text-gradient">cr</span>
              <Dot className="mx-[0.04em] h-[0.52em] w-[0.52em]" />
              <span className="text-gradient">wd.</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="mt-7 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
          >
            crowdMGMT® is a full-service productions and talent MGMT firm that’s been mindfully helping brands +
            artists stand out in a crowd since 2010 — with a résumé and network we are{" "}
            <span className="inline-flex items-baseline font-semibold text-white">
              PR
              <Dot className="mx-[0.06em] h-[0.6em] w-[0.6em]" glow={false} />
              UD
            </span>{" "}
            of.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <button onClick={() => openContactForm("booking")} className={btnPrimary}>
              Book an Artist
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button onClick={() => scrollToId("glam")} className={btnGhost}>
              <Sparkles className="h-4 w-4 text-coral-300" /> Join the VIP List
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {[work[0], work[3], work[2], work[4]].map((w) => (
                <img
                  key={w.id}
                  src={w.src}
                  alt=""
                  className="h-11 w-11 rounded-full border-2 border-ink-950 object-cover"
                />
              ))}
            </div>
            <p className="text-sm leading-snug text-white/55">
              On set with <span className="text-white">Ciara, Mary J. Blige,</span>
              <br className="hidden sm:block" /> <span className="text-white">Ariana Grande, Travis Scott</span> & more.
            </p>
          </motion.div>
        </div>

        {/* Visual: dual vertical conveyors */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          className="relative hidden h-[100svh] lg:block"
        >
          <div className="absolute inset-0 grid grid-cols-2 gap-4 mask-fade-y">
            <Marquee vertical duration={55} className="h-full">
              {colA.map((w) => (
                <HeroCard key={w.id} src={w.src} title={w.title} />
              ))}
            </Marquee>
            <Marquee vertical reverse duration={60} className="h-full">
              {colB.map((w) => (
                <HeroCard key={w.id} src={w.src} title={w.title} />
              ))}
            </Marquee>
          </div>
          <SpinBadge
            text="Brands in good hands • Stand out in a crowd • "
            className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-ink-950/70 backdrop-blur-xl"
          />
        </motion.div>
      </div>

      {/* Mobile image strip */}
      <div className="mt-14 lg:hidden">
        <Marquee duration={45} className="mask-fade-x">
          {work.slice(0, 10).map((w) => (
            <img
              key={w.id}
              src={w.src}
              alt={w.title}
              className="mr-3 h-56 w-44 rounded-2xl border border-white/10 object-cover"
            />
          ))}
        </Marquee>
      </div>

      <a
        href="#clients"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40 transition hover:text-white lg:flex"
      >
        <ArrowDown className="h-4 w-4 animate-bounce" /> Scroll
      </a>
    </section>
  );
}
