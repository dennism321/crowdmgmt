import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV, SITE } from "@/data/site";
import { openContactForm } from "@/lib/forms";
import { cn } from "@/utils/cn";
import { InstagramIcon as Instagram, Logo } from "./ui";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            className={cn(
              "flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5",
              scrolled
                ? "border-white/10 bg-ink-900/70 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl"
                : "border-transparent bg-transparent",
            )}
            aria-label="Main"
          >
            <a href="#top" className="text-[22px] text-white" aria-label="crowdMGMT home">
              <Logo />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {NAV.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={cn(
                        "relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
                        isActive ? "text-white" : "text-white/60 hover:text-white",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-white/[0.08]"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                        />
                      )}
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="crowdMGMT on Instagram"
                className="hidden h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 transition hover:border-white/25 hover:text-white sm:grid"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <button
                onClick={() => openContactForm("booking")}
                className="hidden items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-ink-950 transition hover:bg-coral-500 hover:text-white sm:inline-flex"
              >
                Book an Artist <ArrowUpRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-ink-950/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="text-[22px]">
                <Logo />
              </span>
              <button
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-1 px-8">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-white/5 py-4 font-display text-3xl font-bold"
                  >
                    {item.label}
                    <ArrowUpRight className="h-6 w-6 text-coral-400" />
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="space-y-3 px-8 pb-10">
              <button
                onClick={() => {
                  setOpen(false);
                  openContactForm("booking");
                }}
                className="w-full rounded-full bg-brand-gradient py-4 text-sm font-semibold"
              >
                Book an Artist
              </button>
              <a href={`mailto:${SITE.email}`} className="block text-center text-sm text-white/60">
                {SITE.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
