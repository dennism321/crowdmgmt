import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Check, ChevronDown, Loader2, Send } from "lucide-react";
import { CONTACT_EMAIL, submitForm, type FormKind } from "@/lib/forms";
import { cn } from "@/utils/cn";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "url" | "date" | "select" | "textarea";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  full?: boolean;
  autoComplete?: string;
};

const EMAIL_RE = /^.+@.+\.[a-zA-Z]{2,63}$/; // same pattern as the original crowdMGMT forms

export const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[15px] text-white placeholder:text-white/30 outline-none transition focus:border-coral-400/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-coral-500/15";

export function DynamicForm({
  kind,
  fields,
  initial = {},
  submitLabel = "Submit",
  idPrefix,
  dense = false,
}: {
  kind: FormKind;
  fields: FieldDef[];
  initial?: Record<string, string | undefined>;
  submitLabel?: string;
  idPrefix: string;
  dense?: boolean;
}) {
  const blank = () => Object.fromEntries(fields.map((f) => [f.name, initial[f.name] ?? ""])) as Record<string, string>;
  const [values, setValues] = useState<Record<string, string>>(blank);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [mode, setMode] = useState<"sent" | "mailto">("sent");

  const update = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    fields.forEach((f) => {
      const v = (values[f.name] ?? "").trim();
      if (f.required && !v) next[f.name] = `${f.label} is required`;
      else if (f.type === "email" && v && !EMAIL_RE.test(v)) next[f.name] = "Please enter a valid email";
    });
    setErrors(next);
    return Object.values(next).every((x) => !x);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const labeled = Object.fromEntries(fields.map((f) => [f.label, values[f.name] ?? ""]));
      const result = await submitForm(kind, labeled);
      setMode(result);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <SuccessState
        mode={mode}
        onReset={() => {
          setValues(blank());
          setStatus("idle");
        }}
      />
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className={cn("grid gap-4", !dense && "sm:grid-cols-2")}>
      {fields.map((f) => {
        const id = `${idPrefix}-${f.name}`;
        const err = errors[f.name];
        const common = {
          id,
          name: f.name,
          value: values[f.name] ?? "",
          "aria-invalid": !!err,
          "aria-describedby": err ? `${id}-err` : undefined,
          className: cn(inputClass, err && "border-coral-500/80 focus:border-coral-500"),
        };
        return (
          <div key={f.name} className={cn(!dense && (f.full || f.type === "textarea") && "sm:col-span-2")}>
            <label htmlFor={id} className="mb-2 block text-[13px] font-medium text-white/75">
              {f.label} {f.required && <span className="text-coral-400">*</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea
                {...common}
                rows={4}
                placeholder={f.placeholder}
                onChange={(e) => update(f.name, e.target.value)}
                className={cn(common.className, "resize-y")}
              />
            ) : f.type === "select" ? (
              <div className="relative">
                <select {...common} onChange={(e) => update(f.name, e.target.value)} className={cn(common.className, "appearance-none pr-10", !values[f.name] && "text-white/35")}>
                  <option value="">{f.placeholder ?? "Select…"}</option>
                  {f.options?.map((o) => (
                    <option key={o} value={o} className="bg-ink-900 text-white">
                      {o}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              </div>
            ) : (
              <input
                {...common}
                type={f.type === "url" ? "text" : (f.type ?? "text")}
                inputMode={f.type === "url" ? "url" : undefined}
                autoComplete={f.autoComplete}
                placeholder={f.placeholder}
                onChange={(e) => update(f.name, e.target.value)}
              />
            )}
            {err && (
              <p id={`${id}-err`} className="mt-1.5 flex items-center gap-1 text-xs text-coral-300">
                <AlertCircle className="h-3.5 w-3.5" /> {err}
              </p>
            )}
          </div>
        );
      })}

      <div className={cn("flex flex-col gap-3 pt-2", !dense && "sm:col-span-2 sm:flex-row sm:items-center sm:justify-between")}>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-12px_rgba(255,71,87,0.8)] transition hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
        >
          {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />}
          {submitLabel}
        </button>
        <p className="text-xs leading-relaxed text-white/35">
          Sends to <span className="text-white/60">{CONTACT_EMAIL}</span> · we never share your details.
        </p>
      </div>
      {status === "error" && (
        <p className={cn("text-sm text-coral-300", !dense && "sm:col-span-2")}>
          Something went wrong — please email {CONTACT_EMAIL} directly.
        </p>
      )}
    </form>
  );
}

export function SuccessState({ mode, onReset }: { mode: "sent" | "mailto"; onReset: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
      <div className="relative mx-auto grid h-16 w-16 place-items-center">
        <span className="absolute inset-0 animate-ping-slow rounded-full bg-coral-500/40" />
        <span className="relative grid h-16 w-16 place-items-center rounded-full bg-brand-gradient">
          <Check className="h-7 w-7" />
        </span>
      </div>
      <h4 className="mt-6 font-display text-2xl font-bold">Thank you so much!</h4>
      <p className="mt-2 text-white/65">We'll be in touch soon!</p>
      {mode === "mailto" && (
        <p className="mx-auto mt-4 max-w-sm text-xs leading-relaxed text-white/40">
          Your email app should open with everything pre-filled. Just hit send. If it didn’t open, email us at{" "}
          <a className="text-white/70 underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}
      <button onClick={onReset} className="mt-6 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10">
        Send another
      </button>
    </motion.div>
  );
}
