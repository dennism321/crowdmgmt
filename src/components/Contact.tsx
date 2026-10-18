import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Briefcase, CalendarCheck, Camera, ExternalLink, FolderOpen, Mail, MapPin, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CONTACT_COPY, ROSTER, SITE } from "@/data/site";
import {
  FORM_SUBJECTS,
  OPEN_FORM_EVENT,
  PORTFOLIO_GOOGLE_FORM,
  mailtoHref,
  type ContactTab,
  type OpenFormDetail,
} from "@/lib/forms";
import { cn } from "@/utils/cn";
import { DynamicForm, type FieldDef } from "./FormKit";
import { InstagramIcon, Reveal, SectionHeading } from "./ui";

const NOT_SURE = "Not sure yet — please recommend";

const BOOKING: FieldDef[] = [
  { name: "name", label: "Your name", required: true, autoComplete: "name", placeholder: "Full name" },
  { name: "company", label: "Company / Brand", autoComplete: "organization", placeholder: "Brand, network or agency" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", placeholder: "you@company.com" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", placeholder: "(555) 555-5555" },
  { name: "artist", label: "Artist requested", type: "select", options: [...ROSTER.map((a) => a.name), NOT_SURE], placeholder: "Choose an artist" },
  {
    name: "service",
    label: "Type of booking",
    type: "select",
    required: true,
    options: ["Editorial / Magazine", "Red Carpet / Event", "Advertising Campaign", "TV / Film", "Music Video / Tour", "Speaking Engagement", "Brand Activation", "Other"],
  },
  { name: "date", label: "Date(s)", type: "date" },
  { name: "location", label: "Location", placeholder: "City / venue" },
  { name: "budget", label: "Budget range", type: "select", options: ["Under $2,500", "$2,500 – $10,000", "$10,000 – $25,000", "$25,000+", "Prefer to discuss"], full: true },
  { name: "details", label: "Project details", type: "textarea", required: true, placeholder: "Tell us about the talent, call times, usage and creative…" },
];

const GENERAL: FieldDef[] = [
  { name: "name", label: "Name", required: true, autoComplete: "name", placeholder: "Full name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", placeholder: "you@email.com" },
  {
    name: "topic",
    label: "What can we help with?",
    type: "select",
    full: true,
    options: [
      "Talent + Brand MGMT",
      "Full-Service Production (Photo & Video)",
      "Project Sales",
      "Brand + Image Development",
      "Talent Bookings",
      "Sponsorship + Experiential Activations",
      "Roster & Capabilities Deck",
      "Consulting with EJ",
      "Press / Media",
      "Photo Credit Submission",
      "Other",
    ],
  },
  { name: "message", label: "Message", type: "textarea", required: true, placeholder: "Hello, crowdMGMT…" },
];

const PORTFOLIO: FieldDef[] = [
  { name: "name", label: "Full name", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  {
    name: "discipline",
    label: "Discipline",
    type: "select",
    required: true,
    options: ["Makeup Artist", "Hair Stylist", "Groomer", "Fashion Stylist", "Nail Artist", "Photographer", "Director", "Creative Director", "Musician", "Actor", "Influencer / Creator", "Other"],
  },
  { name: "city", label: "Based in", placeholder: "City, State" },
  { name: "portfolio", label: "Portfolio link", type: "url", required: true, placeholder: "https://" },
  { name: "website", label: "Website", type: "url", placeholder: "https://" },
  { name: "instagram", label: "Instagram", required: true, placeholder: "@yourhandle" },
  { name: "social", label: "Other social links", type: "url", placeholder: "TikTok, YouTube, LinkedIn…", full: true },
  { name: "about", label: "Tell us about you", type: "textarea", placeholder: "Notable clients, publications, goals…" },
];

const CAREERS: FieldDef[] = [
  { name: "name", label: "Full name", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  {
    name: "interest",
    label: "Area of interest",
    type: "select",
    options: ["Talent MGMT", "Production", "Brand Partnerships", "Marketing & Social", "Operations", "Internship", "Pitch an idea"],
  },
  { name: "link", label: "Resume / LinkedIn link", type: "url", placeholder: "https://" },
  { name: "pitch", label: "Your pitch", type: "textarea", required: true, placeholder: "Share a bit about you or the idea you’d like to pitch…" },
];

const TABS: { id: ContactTab; label: string; icon: LucideIcon; intro: string }[] = [
  { id: "booking", label: "Book an Artist", icon: CalendarCheck, intro: CONTACT_COPY.portfolios },
  { id: "contact", label: "Contact", icon: MessageCircle, intro: "Brands, networks, press and collaborators: tell us what you’re building and we’ll set up a call that fits your schedule." },
  { id: "portfolio", label: "Portfolio Submission", icon: FolderOpen, intro: CONTACT_COPY.representation },
  { id: "careers", label: "Apply Now", icon: Briefcase, intro: CONTACT_COPY.team },
];

export default function Contact() {
  const [tab, setTab] = useState<ContactTab>("booking");
  const [preset, setPreset] = useState<{ artist?: string; nonce: number }>({ nonce: 0 });

  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent<OpenFormDetail>).detail;
      if (!d) return;
      setTab(d.tab);
      if (d.tab === "booking") setPreset({ artist: d.artist, nonce: Date.now() });
    };
    window.addEventListener(OPEN_FORM_EVENT, handler);
    return () => window.removeEventListener(OPEN_FORM_EVENT, handler);
  }, []);

  const current = TABS.find((t) => t.id === tab)!;

  const info = [
    { icon: Mail, label: "Email", value: SITE.email, href: mailtoHref(FORM_SUBJECTS.contact) },
    { icon: InstagramIcon, label: "Instagram", value: SITE.instagramHandle, href: SITE.instagram },
    { icon: MapPin, label: "Based in", value: SITE.location, href: undefined },
    { icon: Camera, label: "Photo credits", value: `Send to ${SITE.email}`, href: mailtoHref("Photo Credit Submission Request") },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[40rem] bg-[radial-gradient(ellipse_at_bottom,rgba(124,92,255,0.14),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let’s make you"
              accent="stand out."
              body="crowdMGMT is an elite brand and talent MGMT firm; we are not an agency. We believe that collaboration is the key to success & we fully embrace that in everything we do. Contact us to collaborate any time."
            />

            <Reveal delay={0.1} className="mt-10 space-y-3">
              {info.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-coral-300 transition group-hover:bg-brand-gradient group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">{label}</span>
                      <span className="block truncate font-medium text-white">{value}</span>
                    </span>
                    {href && <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-white/30 transition group-hover:text-white" />}
                  </>
                );
                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-ink-900/60 p-3 pr-5 transition hover:border-white/20"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={label} className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-ink-900/60 p-3 pr-5">
                    {inner}
                  </div>
                );
              })}
            </Reveal>

            <Reveal delay={0.15} className="mt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">Prefer email? Quick links</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href={mailtoHref(FORM_SUBJECTS.booking)} className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold transition hover:bg-white/10">Book an Artist</a>
                <a href={mailtoHref(FORM_SUBJECTS.contact)} className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold transition hover:bg-white/10">Contact</a>
                <a href={PORTFOLIO_GOOGLE_FORM} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold transition hover:bg-white/10">
                  Portfolio Submission <ExternalLink className="h-3 w-3" />
                </a>
                <a href={mailtoHref(FORM_SUBJECTS.careers)} className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold transition hover:bg-white/10">APPLY NOW</a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-[2rem] border border-white/10 bg-ink-900/80 p-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur">
              <div className="no-scrollbar flex gap-1 overflow-x-auto rounded-[1.6rem] bg-ink-950/70 p-1.5" role="tablist" aria-label="Contact forms">
                {TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={tab === id}
                    onClick={() => setTab(id)}
                    className={cn(
                      "relative inline-flex shrink-0 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-[1.25rem] px-4 py-3 text-[13px] font-semibold transition",
                      tab === id ? "text-white" : "text-white/50 hover:text-white",
                    )}
                  >
                    {tab === id && <motion.span layoutId="contact-tab" className="absolute inset-0 rounded-[1.25rem] bg-brand-gradient" transition={{ type: "spring", bounce: 0.18, duration: 0.5 }} />}
                    <Icon className="relative h-4 w-4" />
                    <span className="relative">{label}</span>
                  </button>
                ))}
              </div>

              <div className="p-5 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-display text-2xl font-bold">{current.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{current.intro}</p>
                    {tab === "portfolio" && (
                      <a href={PORTFOLIO_GOOGLE_FORM} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-coral-300 hover:text-coral-400">
                        Prefer our original Google Form? Open it here <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    <div className="mt-7">
                      {tab === "booking" && (
                        <DynamicForm
                          key={`booking-${preset.nonce}`}
                          kind="booking"
                          idPrefix="booking"
                          fields={BOOKING}
                          initial={{ artist: preset.artist && ROSTER.some((a) => a.name === preset.artist) ? preset.artist : undefined }}
                          submitLabel="Send booking inquiry"
                        />
                      )}
                      {tab === "contact" && <DynamicForm kind="contact" idPrefix="contact" fields={GENERAL} submitLabel="Send message" />}
                      {tab === "portfolio" && <DynamicForm kind="portfolio" idPrefix="portfolio" fields={PORTFOLIO} submitLabel="Submit portfolio" />}
                      {tab === "careers" && <DynamicForm kind="careers" idPrefix="careers" fields={CAREERS} submitLabel="Apply now" />}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
