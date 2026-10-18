import { ROSTER, SERVICES, SITE } from "@/data/site";
import type { ContactTab } from "./forms";
import { PORTFOLIO_GOOGLE_FORM, mailtoHref } from "./forms";

export type ChatAction =
  | { type: "form"; tab: ContactTab; label: string; artist?: string }
  | { type: "scroll"; id: string; label: string }
  | { type: "link"; href: string; label: string };

export type BotReply = { text: string; actions?: ChatAction[]; quick?: string[] };

export const WELCOME: BotReply = {
  text: "Hi! 👋 I’m the **crowdMGMT Concierge**. I can help you book an artist, explore our services, submit your portfolio for representation, or join our GLAM sponsorship alerts.\n\nWhat brings you here today?",
  quick: ["Book an artist", "Your services", "Seeking representation", "Sponsorship alerts", "Contact info"],
};

const DEFAULT_QUICK = ["Book an artist", "Your services", "Who’s on the roster?", "Contact info"];

/* ------------------------------------------------------------------ */
/* Text helpers                                                        */
/* ------------------------------------------------------------------ */
const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9@+&.\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function lev(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 1) return 2;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

function hasTerm(text: string, tokens: string[], term: string) {
  if (term.includes(" ")) return text.includes(term);
  if (tokens.includes(term)) return true;
  // very short terms ("hi", "yo", "ej", "vs") must match exactly
  if (term.length <= 3) return false;
  // light stemming + typo tolerance
  if (tokens.some((t) => t.startsWith(term) && t.length - term.length <= 3)) return true;
  if (term.length >= 5) return tokens.some((t) => t.length >= 4 && lev(t, term) <= 1);
  return false;
}

/* ------------------------------------------------------------------ */
/* Knowledge                                                           */
/* ------------------------------------------------------------------ */
const CELEBS: { keys: string[]; name: string; artist: string }[] = [
  { keys: ["ciara"], name: "Ciara", artist: "Yolonda Frederick-Thompson" },
  { keys: ["mary j", "blige"], name: "Mary J. Blige", artist: "Merrell Hollis" },
  { keys: ["travis scott", "travis"], name: "Travis Scott", artist: "Merrell Hollis" },
  { keys: ["ariana", "grande"], name: "Ariana Grande", artist: "Brandon Pietsch" },
  { keys: ["batiste"], name: "Jon Batiste", artist: "Madge Earle" },
  { keys: ["taraji"], name: "Taraji P. Henson", artist: "James Anthony" },
  { keys: ["niecy"], name: "Niecy Nash-Betts", artist: "Naima Jamal" },
  { keys: ["sophia bush"], name: "Sophia Bush", artist: "Gabi Lopez" },
  { keys: ["momsen"], name: "Taylor Momsen", artist: "Brandon Pietsch" },
  { keys: ["ne-yo", "neyo", "ne yo"], name: "Ne-Yo", artist: "Merrell Hollis" },
  { keys: ["yahya"], name: "Yahya Abdul-Mateen II", artist: "Merrell Hollis" },
  { keys: ["jessica divine"], name: "Jessica Divine", artist: "T. Cooper" },
];

const ARTIST_KEYS: Record<string, string[]> = {
  "Yolonda Frederick-Thompson": ["yolonda", "frederick"],
  "Merrell Hollis": ["merrell", "hollis"],
  "Brandon Pietsch": ["brandon", "pietsch", "bdonnn"],
  "Madge Earle": ["madge", "earle"],
  "T. Cooper": ["t. cooper", "t cooper", "tcooper", "cooper"],
  "James Anthony": ["james anthony"],
  "Naima Jamal": ["naima"],
  "Gabi Lopez": ["gabi"],
  "Simone Tisci": ["simone", "tisci"],
};

const first = (name: string) => name.split(" ")[0];

type Intent = { id: string; terms: string[]; phrases?: string[]; reply: () => BotReply };

const INTENTS: Intent[] = [
  {
    id: "greeting",
    terms: ["hi", "hello", "hey", "hiya", "yo", "sup", "greetings", "howdy"],
    phrases: ["good morning", "good afternoon", "good evening", "whats up"],
    reply: () => ({ text: "Hey there! ✨ Welcome to crowdMGMT. How can I help you stand out today?", quick: ["Book an artist", "Your services", "Seeking representation", "Sponsorship alerts"] }),
  },
  {
    id: "thanks",
    terms: ["thanks", "thank", "thx", "ty", "appreciate", "awesome", "perfect", "amazing"],
    reply: () => ({ text: "You’re so welcome! 💫 Anything else I can help with? Remember, your brand is in good hands. #BrandsInGoodHands", quick: DEFAULT_QUICK }),
  },
  {
    id: "bye",
    terms: ["bye", "goodbye", "cya", "later"],
    phrases: ["see you", "thats all", "that is all"],
    reply: () => ({ text: "Thanks for stopping by! AVANTI! 🔴 We’re always a message away at **ContactUs@crowdMGMT.com**." }),
  },
  {
    id: "pricing",
    terms: ["price", "pricing", "cost", "rate", "rates", "fee", "fees", "budget", "quote", "expensive", "charge"],
    phrases: ["how much", "get a quote", "a quote for"],
    reply: () => ({
      text: "Rates vary by artist, scope, usage, dates and location, so every quote is custom. Share your project details in the booking form and the team will follow up with options that fit your budget.",
      actions: [{ type: "form", tab: "booking", label: "Request a quote" }],
    }),
  },
  {
    id: "careers",
    terms: ["job", "jobs", "career", "careers", "internship", "intern", "employment", "position", "positions", "vacancy"],
    phrases: ["work for you", "work for crowdmgmt", "work at", "join the team", "join your team", "my resume", "send resume", "submit resume", "are you hiring", "pitch an idea", "apply now"],
    reply: () => ({
      text: "We love meeting driven people! **All positions are currently filled**, but we’re growing quickly. If you’d like to share your resume or pitch an idea, please use the **Apply Now** form.",
      actions: [{ type: "form", tab: "careers", label: "Apply now" }],
    }),
  },
  {
    id: "representation",
    terms: ["representation", "represent", "signed", "sign"],
    phrases: ["join your roster", "join the roster", "submit my portfolio", "submit portfolio", "portfolio submission", "manage me", "need a manager", "looking for a manager", "looking for management", "become a client", "be represented", "new talent", "i am an artist", "im an artist", "i am a makeup artist", "im a makeup artist"],
    reply: () => ({
      text: "We review digital portfolios on an ongoing basis! 🎨 Please submit your **portfolio, website and social media links** and our team will take a look.",
      actions: [
        { type: "form", tab: "portfolio", label: "Submit my portfolio" },
        { type: "link", href: PORTFOLIO_GOOGLE_FORM, label: "Open Google Form" },
      ],
    }),
  },
  {
    id: "booking",
    terms: ["book", "booking", "bookings", "hire", "availability", "available", "reserve"],
    phrases: ["book an artist", "book a", "book artist", "book talent", "book someone", "booking an", "need a makeup", "need makeup", "need hair", "need a hair", "need a groomer", "need a photographer", "glam team", "glam for", "makeup artist for", "artist for"],
    reply: () => ({
      text: "Love that! 🔥 Our artists work on stages, editorial sets, red carpets, film & TV sets, campaigns and more. Tell us the artist (or let us recommend one), dates, location and project details, and we’ll set up a call that fits your schedule.",
      actions: [
        { type: "form", tab: "booking", label: "Open booking form" },
        { type: "scroll", id: "roster", label: "Browse the roster" },
      ],
    }),
  },
  {
    id: "sponsorship",
    terms: ["sponsor", "sponsorship", "sponsorships", "placement", "vip", "alerts", "activation", "activations", "experiential", "gifting", "influencer", "partnership", "partnerships", "newsletter", "subscribe"],
    phrases: ["red carpet", "met gala", "glam alerts", "product placement", "brand opportunities", "brand opportunity", "sign up", "signup", "mailing list"],
    reply: () => ({
      text: "Brands — this one’s for you! ✨ Join our **GLAM Brand Sponsorship Alerts** to receive opportunities for sponsorship, product placement, celebrity, editorial & high-profile moments like red carpets. Just add your first name, last name and email.",
      actions: [{ type: "scroll", id: "glam", label: "Join the VIP list" }],
    }),
  },
  {
    id: "production",
    terms: ["production", "produce", "producing", "shoot", "video", "commercial", "commercials", "film", "crew", "director", "content", "post-production", "photoshoot"],
    phrases: ["photo shoot", "super bowl", "music video"],
    reply: () => ({
      text: `**Full-Service Production (photo & video):** ${SERVICES[1].body}`,
      actions: [{ type: "form", tab: "contact", label: "Start a production" }],
    }),
  },
  {
    id: "sales",
    terms: ["sell", "sales", "streaming", "svod", "network", "networks", "distribution", "distributor"],
    phrases: ["project sales", "tv show", "pitch a show", "sell my show"],
    reply: () => ({ text: `**Project Sales:** ${SERVICES[2].body}`, actions: [{ type: "form", tab: "contact", label: "Pitch a project" }] }),
  },
  {
    id: "brand",
    terms: ["branding", "rebrand", "reputation", "storytelling", "narrative"],
    phrases: ["brand strategy", "brand development", "image development", "personal brand"],
    reply: () => ({ text: `**Brand + Image Development:** ${SERVICES[3].body}`, actions: [{ type: "form", tab: "contact", label: "Talk brand strategy" }] }),
  },
  {
    id: "agent",
    terms: ["agent", "agency", "agencies", "difference", "versus", "vs"],
    phrases: ["not an agency", "manager vs agent", "agent vs manager"],
    reply: () => ({
      text: "Great question! crowdMGMT is an **elite brand and talent MGMT firm, not an agency**. Agencies usually focus on bookings and commissions; we oversee every facet of our clients’ businesses — long-term career development, brand strategy, production and project sales — with a selective roster and personal attention.",
      actions: [{ type: "scroll", id: "why", label: "See the difference" }],
    }),
  },
  {
    id: "services",
    terms: ["services", "service", "offer", "offering", "offerings", "capabilities", "provide"],
    phrases: ["what do you do", "what can you do for", "help me with"],
    reply: () => ({
      text: "We offer six integrated services:\n" + SERVICES.map((s, i) => `${i + 1}. **${s.title}**`).join("\n") + "\n\nWant details on any of them?",
      quick: ["Production", "Project sales", "Brand development", "Talent bookings", "Sponsorships"],
      actions: [{ type: "scroll", id: "services", label: "View services" }],
    }),
  },
  {
    id: "talentmgmt",
    terms: ["management", "mgmt", "manager"],
    phrases: ["talent management", "brand management", "talent mgmt", "brand mgmt"],
    reply: () => ({ text: `**Talent + Brand MGMT:** ${SERVICES[0].body}`, actions: [{ type: "form", tab: "portfolio", label: "Seeking representation?" }, { type: "form", tab: "contact", label: "Brand inquiry" }] }),
  },
  {
    id: "consulting",
    terms: ["consult", "consulting", "consultation", "coaching", "coach", "mentor", "mentorship", "advice"],
    phrases: ["one on one", "1:1", "group session", "brand map"],
    reply: () => ({
      text: "EJ Jamele offers **1:1 and group consultations** for artists and creatives building their brand and career. Group sessions are curated based on each member’s expertise and goals. Questions? Email **ContactUs@crowdMGMT.com**.",
      actions: [{ type: "link", href: SITE.links.consulting, label: "Consulting with EJ" }],
    }),
  },
  {
    id: "founder",
    terms: ["ej", "founder", "ceo", "owner", "jamele", "history", "story", "started", "founded", "began", "2010"],
    phrases: ["who started", "who owns", "who runs"],
    reply: () => ({
      text: "In **2010**, frustrated by an industry that prioritized profits over artistry, **EJ Jamele** founded crowdMGMT with just two clients and a dream: a judgment-free, collaborative space where talent and brands build authentic, lasting careers. From the start, crowdMGMT has championed POC and LGBTQ+ artists.",
      actions: [{ type: "scroll", id: "story", label: "Read our story" }, { type: "link", href: SITE.links.ej, label: "EJ’s bio" }],
    }),
  },
  {
    id: "inclusion",
    terms: ["poc", "lgbtq", "lgbtq+", "queer", "diversity", "inclusion", "inclusive", "values", "dei", "erg"],
    reply: () => ({
      text: "Inclusion is at our core. Represented by the circle in our branding, our work is guided by **inclusion, collaboration, and an unbreakable commitment to excellence** — a promise with no end. We’ve championed POC and LGBTQ+ artists since day one, and we also book talent for ERG/DEI programming.",
    }),
  },
  {
    id: "roster",
    terms: ["roster", "artists", "artist", "talent", "makeup", "hair", "groomer", "grooming", "photographer", "stylist", "stylists"],
    phrases: ["who do you represent", "who is on", "whos on"],
    reply: () => ({
      text: "Our roster includes:\n" + ROSTER.map((a) => `• **${a.name}**: ${a.role}`).join("\n") + "\n\n…plus more creatives & talent across beauty, music, TV and film.",
      actions: [{ type: "scroll", id: "roster", label: "Meet the roster" }],
    }),
  },
  {
    id: "clients",
    terms: ["clients", "client", "celebrities", "celebrity", "brands", "resume", "credits", "worked"],
    phrases: ["worked with", "who have you"],
    reply: () => ({
      text: "Our résumé spans Vogue, Vanity Fair, ESSENCE, BET, L’Oréal, Chanel, Versace, Nike and the NBA, plus talent like **Ciara, Mary J. Blige, Ariana Grande, Travis Scott, Taraji P. Henson, the Kardashian-Jenners** and many more.",
      actions: [{ type: "scroll", id: "resume", label: "View résumé" }, { type: "link", href: SITE.links.resume, label: "Full résumé ↗" }],
    }),
  },
  {
    id: "work",
    terms: ["work", "portfolio", "gallery", "pictures", "photos", "images", "instagram", "latest", "recent", "feed"],
    reply: () => ({
      text: "Take a look at our latest moments: red carpets, magazine covers, residencies and campaigns. 📸 Tap any image in the conveyor for full credits.",
      actions: [{ type: "scroll", id: "work", label: "See latest work" }, { type: "link", href: SITE.instagram, label: "@crowdMGMT ↗" }],
    }),
  },
  {
    id: "photocredit",
    terms: [],
    phrases: ["photo credit", "photo credits", "credit request", "image credit"],
    reply: () => ({
      text: "For photo credits, please send details to **ContactUs@crowdMGMT.com** and we’ll take care of it.",
      actions: [{ type: "link", href: mailtoHref("Photo Credit Submission Request"), label: "Email photo credits" }],
    }),
  },
  {
    id: "location",
    terms: ["where", "located", "location", "office", "nyc", "address", "based"],
    phrases: ["new york"],
    reply: () => ({ text: "We’re based in **New York, NY**, and our artists travel to every corner of the globe for stages, sets, red carpets and campaigns. 🌎" }),
  },
  {
    id: "response",
    terms: ["hours", "respond", "response", "reply", "wait"],
    phrases: ["how long", "when will", "hear back"],
    reply: () => ({ text: "We review inquiries and portfolios on an ongoing basis and get back to you as soon as we can. For anything time-sensitive, mention your dates in the subject line." }),
  },
  {
    id: "contact",
    terms: ["contact", "email", "phone", "call", "reach", "human", "person", "someone", "speak"],
    phrases: ["get in touch", "talk to"],
    reply: () => ({
      text: `You can reach the team at **${SITE.email}** or DM us on Instagram **${SITE.instagramHandle}**. Prefer a form? I can open one for you.`,
      actions: [
        { type: "form", tab: "contact", label: "Contact form" },
        { type: "link", href: mailtoHref("Hello, crowdMGMT (from your website)"), label: "Email us" },
      ],
    }),
  },
  {
    id: "about",
    terms: ["about", "crowdmgmt", "company", "mission", "who"],
    phrases: ["who are you", "what is crowdmgmt", "tell me about"],
    reply: () => ({
      text: "crowdMGMT® is a **full-service productions and talent MGMT firm** that’s been mindfully helping brands + artists stand out in a crowd since 2010. We specialize in elite brand and talent MGMT & production with a **beauty & lifestyle** focus.",
      quick: ["Your services", "Our story", "Who’s on the roster?"],
      actions: [{ type: "scroll", id: "about", label: "About us" }],
    }),
  },
  {
    id: "help",
    terms: ["help", "menu", "options", "start"],
    phrases: ["start over", "what can you do"],
    reply: () => ({ text: "Here’s what I can help with:", quick: ["Book an artist", "Your services", "Seeking representation", "Sponsorship alerts", "Careers", "Contact info"] }),
  },
];

/* ------------------------------------------------------------------ */
/* Engine                                                              */
/* ------------------------------------------------------------------ */
export function getBotReply(input: string): BotReply {
  const text = normalize(input);
  const tokens = text.split(" ");
  if (!text) return { text: "Say hello any time 👋", quick: DEFAULT_QUICK };

  // Celebrity → artist mapping
  const celeb = CELEBS.find((c) => c.keys.some((k) => hasTerm(text, tokens, k)));
  if (celeb) {
    const a = ROSTER.find((r) => r.name === celeb.artist);
    return {
      text: `**${celeb.artist}** (${a?.role ?? "crowdMGMT artist"}) has worked with **${celeb.name}** through crowdMGMT + Productions. Want to see the work or book ${first(celeb.artist)}?`,
      actions: [
        { type: "form", tab: "booking", label: `Book ${first(celeb.artist)}`, artist: celeb.artist },
        { type: "scroll", id: "work", label: "See the work" },
      ],
    };
  }

  // Artist mention
  const artistName = Object.entries(ARTIST_KEYS).find(([, keys]) => keys.some((k) => hasTerm(text, tokens, k)))?.[0];
  if (artistName) {
    const a = ROSTER.find((r) => r.name === artistName)!;
    return {
      text: `**${a.name}**, ${a.role}. Notable work: ${a.credits}. Would you like to check availability?`,
      actions: [
        { type: "form", tab: "booking", label: `Book ${first(a.name)}`, artist: a.name },
        ...(a.handle ? [{ type: "link" as const, href: `https://www.instagram.com/${a.handle}/`, label: `@${a.handle} ↗` }] : []),
      ],
    };
  }

  // Intent scoring
  let best: { intent: Intent; score: number } | null = null;
  for (const intent of INTENTS) {
    let score = 0;
    intent.phrases?.forEach((p) => {
      if (text.includes(p)) score += 3;
    });
    intent.terms.forEach((t) => {
      if (hasTerm(text, tokens, t)) score += t.length <= 3 ? 0.9 : 1.2;
    });
    // short greetings only win when the message is short
    if (intent.id === "greeting" && tokens.length > 4) score *= 0.3;
    if (score > 0 && (!best || score > best.score)) best = { intent, score };
  }

  if (best) return best.intent.reply();

  return {
    text: `I’m still learning! 🤍 I can help with **booking artists, representation, services, sponsorship alerts, careers** or **contact info**. You can also email us at **${SITE.email}**.`,
    quick: ["Book an artist", "Your services", "Seeking representation", "Contact info"],
    actions: [{ type: "link", href: mailtoHref("Hello, crowdMGMT (from your website)"), label: "Email the team" }],
  };
}
