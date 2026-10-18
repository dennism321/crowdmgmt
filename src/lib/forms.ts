export const CONTACT_EMAIL = "ContactUs@crowdMGMT.com";

/**
 * Optional form backend (e.g. a Formspree / Getform / custom API URL).
 * When left empty, submitting a form opens the visitor's email app with a
 * pre-filled message to ContactUs@crowdMGMT.com — the same destination the
 * original crowdMGMT.com buttons use.
 */
export const FORM_ENDPOINT = "";

export const PORTFOLIO_GOOGLE_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSeHf7oJ79sRp_vo2AeVmcHsLpoNQoySnPVR0KpC2SnmXa15IQ/viewform";

export type FormKind = "booking" | "contact" | "portfolio" | "careers" | "glam";

export const FORM_SUBJECTS: Record<FormKind, string> = {
  booking: "Artist Booking Inquiry",
  contact: "Hello, crowdMGMT (from your website)",
  portfolio: "Portfolio Submission — Representation",
  careers: "Working for crowdMGMT: Employment Opportunity",
  glam: "GLAM Brand Sponsorship Alerts — Sign Up",
};

export function mailtoHref(subject: string, body = "") {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${CONTACT_EMAIL}?${params.join("&")}`;
}

export async function submitForm(
  kind: FormKind,
  fields: Record<string, string>,
): Promise<"sent" | "mailto"> {
  const subject = FORM_SUBJECTS[kind];
  const clean = Object.fromEntries(
    Object.entries(fields).filter(([, v]) => v && v.trim().length > 0),
  );

  if (FORM_ENDPOINT) {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ form: kind, subject, ...clean }),
    });
    if (!res.ok) throw new Error("Submission failed");
    return "sent";
  }

  const body =
    Object.entries(clean)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n") + "\n\n— Sent from the crowdMGMT website";
  window.location.href = mailtoHref(subject, body);
  return "mailto";
}

/* ------------------------------------------------------------------ */
/* Tiny event bus so the navbar, roster and chatbot can open a form    */
/* ------------------------------------------------------------------ */

export type ContactTab = Exclude<FormKind, "glam">;

export type OpenFormDetail = {
  tab: ContactTab;
  artist?: string;
};

export const OPEN_FORM_EVENT = "crowd:open-form";

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function openContactForm(tab: ContactTab, artist?: string) {
  window.dispatchEvent(
    new CustomEvent<OpenFormDetail>(OPEN_FORM_EVENT, { detail: { tab, artist } }),
  );
  window.setTimeout(() => scrollToId("contact"), 30);
}
