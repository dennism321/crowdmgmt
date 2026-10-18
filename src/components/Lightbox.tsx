import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CalendarCheck, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { WorkItem } from "@/data/work";
import { ROSTER } from "@/data/site";
import { openContactForm } from "@/lib/forms";
import { InstagramIcon } from "./ui";

type Props = {
  items: WorkItem[];
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
};

export default function Lightbox({ items, index, onClose, onChange }: Props) {
  const item = index !== null ? items[index] : null;

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % items.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, items.length, onChange, onClose]);

  const artist = item ? ROSTER.find((a) => item.credit.includes(a.name)) : undefined;

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur-xl sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/15 sm:right-8 sm:top-8"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="grid max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900 shadow-2xl md:grid-cols-[1.1fr_1fr]"
          >
            <div className="relative bg-black">
              <img
                src={item.src}
                alt={item.title}
                className="h-full max-h-[56vh] w-full object-contain md:max-h-[86vh]"
              />
            </div>
            <div className="flex flex-col justify-between gap-8 p-6 sm:p-10">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-coral-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-coral-300">
                    {item.category}
                  </span>
                  <span className="font-mono text-xs text-white/40">
                    {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold leading-tight sm:text-3xl">{item.title}</h3>
                <p className="mt-3 text-white/60">{item.credit}</p>
                <p className="mt-1 text-sm text-white/40">with crowdMGMT + Productions · #BrandsInGoodHands</p>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
                  >
                    <InstagramIcon className="h-4 w-4" /> View post <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => {
                      onClose();
                      openContactForm("booking", artist?.name);
                    }}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-semibold"
                  >
                    <CalendarCheck className="h-4 w-4" /> {artist ? `Book ${artist.name.split(" ")[0]}` : "Book an Artist"}
                  </button>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => onChange((index - 1 + items.length) % items.length)}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" /> Prev
                  </button>
                  <button
                    onClick={() => onChange((index + 1) % items.length)}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
