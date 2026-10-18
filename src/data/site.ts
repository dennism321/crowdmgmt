export const SITE = {
  name: "crowdMGMT",
  legal: "crowdMGMT®",
  tagline: "Helping brands + artists stand out in a crowd since 2010.",
  email: "ContactUs@crowdMGMT.com",
  instagram: "https://www.instagram.com/crowdmgmt/",
  instagramHandle: "@crowdMGMT",
  founderInstagram: "https://www.instagram.com/EJ_Jamele",
  founderHandle: "@EJ_Jamele",
  location: "New York, NY",
  hashtag: "#BrandsInGoodHands",
  links: {
    resume: "https://www.crowdmgmt.com/resume",
    consulting: "https://www.crowdmgmt.com/consulting",
    ej: "https://www.crowdmgmt.com/ej",
    capabilities: "https://www.crowdmgmt.com/capabilities",
    glamAlerts: "https://www.crowdmgmt.com/glamalerts",
  },
};

export const NAV = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Roster", href: "#roster" },
  { label: "Our Story", href: "#story" },
  { label: "Résumé", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export const MISSION =
  "To provide support, collaboration opportunities, encouragement, and elite guidance to our clients as we work together to achieve their dreams and stand out in a crowd.";

export const COMMITMENT = [
  "At crowdMGMT®, we don’t just manage talent or produce moments. We build movements rooted in intention and alignment. Since 2010, our mission has been clear: to help artists and brands stand out in a crowd by standing firm in who they are.",
  "Represented by the circle in our branding, our work is guided by principles of inclusion, collaboration, and an unbreakable commitment to excellence. A promise with no end.",
  "With a proven track record of campaigns, partnerships, and productions, we bring more than experience. We bring vision. Every project reflects our dedication to purposeful branding, cultural relevance, and authentic storytelling. For us, success isn’t just about being seen. It’s about being seen authentically.",
];

export type Service = {
  id: string;
  title: string;
  kicker: string;
  body: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    id: "talent",
    title: "Talent + Brand MGMT",
    kicker: "Full-service MGMT",
    body: "We are a full-service MGMT team and oversee every facet of our client's businesses. We provide talent MGMT services for musicians, actors, fashion stylists, influencers, directors, glam artists & celebrities. Brand MGMT includes a vast scope of services that we proudly provide and curate to compliment each client's unique needs & goals.",
    bullets: ["Musicians & actors", "Glam artists & stylists", "Influencers & directors"],
  },
  {
    id: "production",
    title: "Full-Service Production",
    kicker: "Photo & video",
    body: "We deliver full-service photo and video production with expert crews, stylists, directors, and visionary artists. Through precise project management and post-production, we ensure every project exceeds creative and brand goals — from social media content to TV & Super Bowl commercial campaigns.",
    bullets: ["Expert crews & directors", "Post-production", "Social to Super Bowl spots"],
  },
  {
    id: "sales",
    title: "Project Sales",
    kicker: "Content to platforms",
    body: "We connect standout content to top TV networks, streaming platforms, and commercial outlets. Delivering major-agency reach with boutique-level attention, we specialize in Commercial, TV, SVOD, and brand activation sales.",
    bullets: ["TV networks", "Streaming / SVOD", "Brand activation sales"],
  },
  {
    id: "brand",
    title: "Brand + Image Development",
    kicker: "Strategy & story",
    body: "We elevate brands through strategic branding, reputation management, and authentic storytelling. Our approach crafts compelling narratives and consistent messaging that captivate audiences and drive lasting results.",
    bullets: ["Strategic branding", "Reputation management", "Authentic storytelling"],
  },
  {
    id: "bookings",
    title: "Talent Bookings",
    kicker: "Celebrities to speakers",
    body: "We specialize in talent booking and coordination, securing top celebrities, speakers, creatives, and industry experts. From music performances and collaborations to ERG/DEI programming and full GLAM services, we manage every detail for seamless events, shoots, and productions.",
    bullets: ["Celebrities & speakers", "ERG/DEI programming", "Full GLAM services"],
  },
  {
    id: "sponsorship",
    title: "Sponsorship + Experiential Activations",
    kicker: "Brands × culture",
    body: "We connect brands to culture through strategic product placement, influencer and celebrity partnerships, and beauty/lifestyle integrations. Our experiential activations and high-visibility content drive maximum ROI, earned media, and cultural impact.",
    bullets: ["Product placement", "Celebrity partnerships", "Experiential activations"],
  },
];

export const STORY = [
  "In 2010, frustrated by an industry that prioritized profits over artistry, EJ Jamele founded crowdMGMT with a bold vision: to create a judgment-free, collaborative space where talent and brands could work together to build authentic, lasting careers. Working in a corporate agency that focused on quick commissions rather than artist development, EJ knew there had to be a better way. With just two clients and a dream, he bet on himself and his belief that real success comes from investing deeply in each artist’s unique journey.",
  "crowdMGMT was born as a rebellion against an industry trend that sacrificed long-term growth for short-term gains. While others chased volume and rapid profits, EJ focused on being selective — managing fewer artists and giving them the personalized attention needed for sustainable, meaningful careers. At the same time, he recognized that strong, strategic brand management is an essential tool in helping both artists and brands build a lasting identity and ensure long-term success.",
  "From the start, crowdMGMT has championed POC and LGBTQ+ artists, breaking down barriers in the entertainment, lifestyle, and beauty industries. By prioritizing career development and brand strategy over fleeting trends, we’ve helped our clients create iconic moments that resonate across culture, grow their influence sustainably, and even make history with a cherished list of “firsts.”",
  "Our firm thrives on the belief that true excellence comes from a customized blend of professional organization and creative freedom. We reject the volume-based model, choosing instead to focus on long-term success. Today, crowdMGMT remains a leader in artist development and brand strategy, proving that authenticity, collaboration, and thoughtful brand management create careers and impact that last.",
];

export const HIGHLIGHTS = [
  { value: "2010", label: "Founded in NYC with two clients and a dream" },
  { value: "15+", label: "Years building careers, brands & iconic moments" },
  { value: "6", label: "Integrated services under one roof" },
  { value: "∞", label: "The circle — a promise with no end" },
];

/** MGMT vs. the traditional agency model — based on our review of leading beauty & talent agency sites. */
export const COMPARISON = [
  { topic: "Roster model", agency: "Large, volume-based rosters", crowd: "Selective boutique roster with personalized attention" },
  { topic: "Primary focus", agency: "Quick bookings & commissions", crowd: "Long-term career development & brand strategy" },
  { topic: "Scope", agency: "Editorial & commercial bookings", crowd: "Talent + Brand MGMT, bookings, sponsorships & activations" },
  { topic: "Production", agency: "Usually outsourced", crowd: "In-house photo & video — crowdMGMT + Productions" },
  { topic: "Content sales", agency: "Rarely offered", crowd: "Commercial, TV, SVOD & brand activation sales" },
  { topic: "Culture", agency: "Competitive & transactional", crowd: "Judgment-free, collaborative community championing POC & LGBTQ+ artists" },
];

export type Discipline = "Makeup" | "Hair" | "Grooming" | "Photography" | "Creative Direction";

export type Artist = {
  name: string;
  role: string;
  disciplines: Discipline[];
  credits: string;
  image: string; // work id
  handle?: string;
};

export const ROSTER: Artist[] = [
  { name: "Yolonda Frederick-Thompson", role: "Celebrity Makeup Artist", disciplines: ["Makeup"], credits: "Ciara · Met Gala · Vanity Fair Oscar Party", image: "w15", handle: "yolondafrederick" },
  { name: "Merrell Hollis", role: "Makeup · Grooming · Creative Direction", disciplines: ["Makeup", "Grooming", "Creative Direction"], credits: "Mary J. Blige · Travis Scott · Ne-Yo", image: "w05", handle: "merrellhollis" },
  { name: "Brandon Pietsch", role: "Hair & Color Artist", disciplines: ["Hair"], credits: "Ariana Grande · Taylor Momsen · L’Oréal Pro", image: "w03", handle: "bdonnn" },
  { name: "Madge Earle", role: "Groomer", disciplines: ["Grooming"], credits: "Jon Batiste · Julez Smith for UGG", image: "w14", handle: "iammadgeearle" },
  { name: "T. Cooper", role: "Hair & Makeup Artist", disciplines: ["Hair", "Makeup"], credits: "Jessica Divine · Glamour Bulgaria", image: "w09", handle: "tcooperbeauty" },
  { name: "James Anthony", role: "Photographer", disciplines: ["Photography"], credits: "Taraji P. Henson · Skylar Diggins", image: "w25", handle: "iamjamesanthony" },
  { name: "Naima Jamal", role: "Makeup Artist", disciplines: ["Makeup"], credits: "Niecy Nash-Betts · Jumpman · HBA Nominee", image: "w28", handle: "allinadayswerk" },
  { name: "Gabi Lopez", role: "Hair Stylist", disciplines: ["Hair"], credits: "Sophia Bush", image: "w19", handle: "gabilopezhair" },
  { name: "Simone Tisci", role: "Creative Director", disciplines: ["Creative Direction"], credits: "Album cover art & campaign creative", image: "w04" },
];

export const RESUME_BRANDS = [
  "VOGUE", "VANITY FAIR", "ESSENCE", "BET", "L’ORÉAL", "LANCÔME", "CHANEL", "VERSACE", "BALMAIN",
  "LOUIS VUITTON", "MARC JACOBS", "TOMMY HILFIGER", "NIKE", "NBA", "NFL", "PEPSI", "GOOGLE",
  "DISNEY+", "PEACOCK", "VH1", "MTV", "BRAVO", "E!", "OWN", "ABC", "CBS", "NBC", "FX", "GQ",
  "PEOPLE", "PAPER", "SKIMS", "NEUTROGENA", "SHEA MOISTURE", "ATLANTIC RECORDS", "WARNER BROS.",
];

export const RESUME_TALENT = [
  "Ciara", "Mary J. Blige", "Ariana Grande", "Travis Scott", "Kim Kardashian", "Kylie Jenner",
  "Jennifer Lopez", "Taraji P. Henson", "Megan Thee Stallion", "Sabrina Carpenter", "Usher",
  "Tyra Banks", "Michael B. Jordan", "Lupita Nyong’o", "Mariah Carey", "Christina Aguilera",
  "Kelly Rowland", "Gabrielle Union", "Missy Elliott", "Regina King", "Chadwick Boseman",
  "Normani", "Kehlani", "Jhené Aiko", "Rita Ora", "Tiffany Haddish", "Yara Shahidi", "Danai Gurira",
  "Letitia Wright", "Demi Lovato", "Lori Harvey", "Russell Wilson",
];

export const TESTIMONIALS = [
  {
    quote: "My call with crowdMGMT was the first time I’ve left a call feeling excited and invigorated.",
    full: "I’ve left many calls about management/representation feeling bummed and underwhelmed. My call with crowdMGMT was the first time I’ve left a call feeling excited and invigorated.",
    name: "Jacen Bowman",
    title: "Celebrity Makeup Artist",
  },
  {
    quote: "When I have EJ and crowdMGMT it’s an automatic confidence booster.",
    full: "I’m so glad EJ is coming [to this event], now I feel like I have my mojo. Sometimes I feel like a fish out of water at events but when I have EJ and crowdMGMT it’s an automatic confidence booster.",
    name: "Yolonda Frederick-Thompson",
    title: "Celebrity Makeup Artist, Beauty Product Inventor + Skincare Expert",
  },
  {
    quote: "He pulls together a stellar team and I love it.",
    full: "I’ve really enjoyed working with EJ. He pulls together a stellar team and I love it. I’m communicating to everyone how proud we are of the work EJ is doing. Hats off to the team, teamwork makes the dream work.",
    name: "Dr. Holly Carter",
    title: "CEO, Releve Entertainment",
  },
  {
    quote: "He’s got the best people, he’s got the talent locked.",
    full: "EJ’s got me on lock. The way I’ve been connected with him and his artists, he’s got the best people, he’s got the talent locked.",
    name: "Dawn Richard",
    title: "Singer, Songwriter & Fashion Authority",
  },
  {
    quote: "What you’re doing with your team is incredible EJ!",
    full: "What you’re doing with your team is incredible EJ!",
    name: "Bevy Smith",
    title: "TV/Radio Host, Best Selling Author, Public Speaker, Actress",
  },
  {
    quote: "Thank you so much for being so gracious with your network.",
    full: "You are truly the sweetest EJ. Thank you so much for being so gracious with your network.",
    name: "Shoniqua Shandai",
    title: "NAACP Award Nominated Actress, Harlem",
  },
  {
    quote: "Yep… they’re the real deal.",
    full: "Have you ever met someone and instantly thought, “Yep… they’re the real deal”? That’s exactly how I felt about EJ Jamele.",
    name: "Grace Redman",
    title: "Entrepreneur, Corporate Success Coach & Podcast Host",
  },
];

export const CONTACT_COPY = {
  artists:
    "Our artists' demanding schedules take them to all the corners of the globe to work their dream jobs on stages, magazine editorial sets, performances, speaking engagements, film sets, TV sets, red carpet appearances, film premieres, advertising campaigns and much more.",
  portfolios:
    "Online portfolios are accessible on our website for each artist we represent. To book an artist or arrange for a custom online portfolio, please contact us so we can set up a call that fits your schedule.",
  representation:
    "If you are an artist seeking representation at crowdMGMT, we review digital portfolios on an ongoing basis. Please submit your portfolio, website and social media links below. Thank you.",
  team:
    "All positions are currently filled, but we are growing quickly, so if you'd like to share your resume or pitch an idea to us please do. For considerations please use the APPLY NOW form below. Thank you!",
  glam:
    "Please sign up below to receive GLAM brand opportunity alerts about sponsorship, product placement, celebrity, editorial & high-profile opportunities like red carpets and more. We would love to work with you in an on-going fashion. Thank you!",
  thanks: "Thank you so much! We'll be in touch soon!",
};
