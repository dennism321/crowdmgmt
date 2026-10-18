import { Camera, Gem, Megaphone, Sparkles, Star } from "lucide-react";
import { CONTACT_COPY } from "@/data/site";
import { DynamicForm, type FieldDef } from "./FormKit";
import { Reveal } from "./ui";

const FIELDS: FieldDef[] = [
  { name: "firstName", label: "First name", placeholder: "First name", required: true, autoComplete: "given-name" },
  { name: "lastName", label: "Last name", placeholder: "Last name", required: true, autoComplete: "family-name" },
  { name: "email", label: "Email", type: "email", placeholder: "Email", required: true, autoComplete: "email", full: true },
];

const PERKS = [
  { icon: Gem, label: "Sponsorships" },
  { icon: Megaphone, label: "Product placement" },
  { icon: Star, label: "Celebrity moments" },
  { icon: Camera, label: "Editorial" },
  { icon: Sparkles, label: "Red carpets" },
];

export default function GlamAlerts() {
  return (
    <section id="glam" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-ink-900">
            <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-coral-500/30 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-32 right-0 h-[26rem] w-[26rem] rounded-full bg-iris-500/30 blur-[120px]" />
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 mask-fade-y" />

            <div className="relative grid gap-12 p-7 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:p-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-950">
                  <Sparkles className="h-3.5 w-3.5 text-coral-500" /> VIP list
                </span>
                <h2 className="mt-6 font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
                  GLAM Brand <span className="font-serif font-normal italic text-gradient">Sponsorship</span> Alerts
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">{CONTACT_COPY.glam}</p>
                <ul className="mt-8 flex flex-wrap gap-2.5">
                  {PERKS.map(({ icon: Icon, label }) => (
                    <li key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white/80 backdrop-blur">
                      <Icon className="h-4 w-4 text-coral-300" /> {label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-ink-950/60 p-6 backdrop-blur-xl sm:p-8">
                <p className="font-display text-xl font-bold">Sign up for opportunity alerts</p>
                <p className="mt-1 text-sm text-white/50">Exclusive opportunities, sent straight to your inbox.</p>
                <div className="mt-6">
                  <DynamicForm kind="glam" fields={FIELDS} idPrefix="glam" submitLabel="Submit" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
