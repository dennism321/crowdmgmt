import { ArrowUpRight, Mail } from "lucide-react";
import { NAV, SERVICES, SITE } from "@/data/site";
import helmet from "@/assets/techathos-helmet.svg";
import { mailtoHref, scrollToId } from "@/lib/forms";
import { Dot, InstagramIcon, Logo, Reveal } from "./ui";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink-950 pt-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-coral-500/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-10 border-b border-white/[0.07] pb-16 lg:flex-row lg:items-end">
          <div className="min-w-0 max-w-full">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/40">Ready when you are</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
              Ready to stand out <span className="font-serif font-normal italic text-gradient">in a crowd?</span>
            </h2>
            <a href={mailtoHref("Hello, crowdMGMT (from your website)")} className="group mt-8 inline-flex max-w-full items-center gap-3 font-display text-lg font-semibold text-white/85 transition hover:text-white sm:text-2xl">
              <Mail className="h-6 w-6 text-coral-400" />
              <span className="min-w-0 break-all bg-gradient-to-r from-coral-400 to-iris-400 bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-all duration-500 group-hover:bg-[length:100%_2px]">{SITE.email}</span>
            </a>
          </div>
          <button onClick={() => scrollToId("contact")} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-ink-950 transition hover:bg-coral-500 hover:text-white">
            Start a conversation <ArrowUpRight className="h-4 w-4" />
          </button>
        </Reveal>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          <div>
            <span className="text-3xl">
              <Logo sub />
            </span>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/50">
              Elite brand & talent MGMT and full-service production with a beauty & lifestyle focus. Helping brands + artists stand out in a crowd since 2010.
            </p>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white">
              <InstagramIcon className="h-4 w-4" /> {SITE.instagramHandle}
            </a>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">Explore</p>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-white/65 transition hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#glam" className="text-sm text-white/65 transition hover:text-white">
                  GLAM Sponsorship Alerts
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">Services</p>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="text-sm text-white/65 transition hover:text-white">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">Connect</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={mailtoHref("Hello, crowdMGMT (from your website)")} className="text-white/65 transition hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="text-white/65">{SITE.location}</li>
              <li>
                <a href={SITE.founderInstagram} target="_blank" rel="noreferrer" className="text-white/65 transition hover:text-white">
                  EJ Jamele · {SITE.founderHandle}
                </a>
              </li>
              <li>
                <a href={SITE.links.consulting} target="_blank" rel="noreferrer" className="text-white/65 transition hover:text-white">
                  Consulting with EJ
                </a>
              </li>
              <li>
                <a href={SITE.links.capabilities} target="_blank" rel="noreferrer" className="text-white/65 transition hover:text-white">
                  Capabilities deck
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/[0.07] py-8 text-xs text-white/40 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
          <p>
            © {year} crowd MGMT®. All rights reserved. For Photo Credits: Send to{" "}
            <a href={mailtoHref("Photo Credit Submission Request")} className="text-white/65 underline-offset-2 hover:text-white hover:underline">
              {SITE.email}
            </a>
          </p>
          <a
            href="https://techathos.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 self-start tracking-wide transition-colors hover:text-white md:self-auto md:justify-self-center"
          >
            Powered by
            <span
              aria-hidden
              className="h-[18px] w-[18px] bg-current transition-colors group-hover:bg-brand-gradient"
              style={{ mask: `url("${helmet}") center / contain no-repeat`, WebkitMask: `url("${helmet}") center / contain no-repeat` }}
            />
            <span className="font-semibold text-white/55 transition-colors group-hover:text-white">TechAthos</span>
          </a>
          <p className="font-semibold tracking-wide text-white/55 md:justify-self-end">{SITE.hashtag}</p>
        </div>
      </div>

      {/* Giant wordmark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[0.22em] flex items-baseline justify-center whitespace-nowrap font-display text-[24vw] font-extrabold leading-none tracking-tighter text-white/[0.04]">
          cr<Dot className="mx-[0.02em] h-[0.5em] w-[0.5em] opacity-80" glow={false} />wd
        </p>
      </div>
    </footer>
  );
}
