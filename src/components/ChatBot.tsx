import { Fragment, useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MessageCircle, RotateCcw, SendHorizontal, Sparkles, X } from "lucide-react";
import { WELCOME, getBotReply, type BotReply, type ChatAction } from "@/lib/chatbot";
import { openContactForm, scrollToId } from "@/lib/forms";
import { cn } from "@/utils/cn";
import { Dot } from "./ui";

type Msg = { id: string; from: "bot" | "user"; time: number } & Partial<BotReply> & { text: string };

const STORE = "crowd-chat-v1";
const uid = () => Math.random().toString(36).slice(2, 10);

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="font-semibold text-white">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

const fmt = (t: number) => new Date(t).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORE);
      if (saved) return JSON.parse(saved) as Msg[];
    } catch {
      /* ignore */
    }
    return [{ id: uid(), from: "bot", time: Date.now(), ...WELCOME }];
  });
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE, JSON.stringify(messages.slice(-60)));
    } catch {
      /* ignore */
    }
  }, [messages]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  // Proactive teaser
  useEffect(() => {
    if (sessionStorage.getItem("crowd-chat-teased")) return;
    const id = window.setTimeout(() => {
      setTeaser(true);
      sessionStorage.setItem("crowd-chat-teased", "1");
    }, 6000);
    return () => window.clearTimeout(id);
  }, []);

  // On phones the teaser sits over page content, so let it get out of the way
  useEffect(() => {
    if (!teaser || window.innerWidth >= 640) return;
    const hide = () => setTeaser(false);
    const id = window.setTimeout(hide, 8000);
    window.addEventListener("scroll", hide, { passive: true, once: true });
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("scroll", hide);
    };
  }, [teaser]);

  useEffect(() => {
    if (!open) return;
    setTeaser(false);
    const t = window.setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { id: uid(), from: "user", text, time: Date.now() }]);
    setInput("");
    setTyping(true);
    const reply = getBotReply(text);
    const delay = Math.min(1500, 550 + reply.text.length * 4);
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: uid(), from: "bot", time: Date.now(), ...reply }]);
      setTyping(false);
    }, delay);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const runAction = (a: ChatAction) => {
    const small = window.innerWidth < 640;
    if (a.type === "form") {
      openContactForm(a.tab, a.artist);
      if (small) setOpen(false);
    } else if (a.type === "scroll") {
      scrollToId(a.id);
      if (small) setOpen(false);
    } else {
      window.open(a.href, a.href.startsWith("mailto:") ? "_self" : "_blank", "noopener");
    }
  };

  const reset = () => setMessages([{ id: uid(), from: "bot", time: Date.now(), ...WELCOME }]);

  const lastBot = [...messages].reverse().find((m) => m.from === "bot");

  return (
    <>
      {/* Teaser bubble */}
      <AnimatePresence>
        {teaser && !open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-[6.25rem] right-4 z-[65] max-w-[17rem] rounded-2xl rounded-br-md border border-white/10 bg-white p-4 pr-11 text-sm text-ink-950 shadow-2xl sm:right-6"
          >
            <button onClick={() => setTeaser(false)} className="absolute right-0.5 top-0.5 grid h-10 w-10 place-items-center text-ink-950/40 hover:text-ink-950" aria-label="Dismiss">
              <X className="h-4 w-4" />
            </button>
            <button onClick={() => setOpen(true)} className="text-left">
              <span className="font-semibold">Need to book an artist? ✨</span>
              <span className="mt-1 block text-ink-950/60">Ask our concierge anything about crowdMGMT.</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-4 z-[66] grid h-16 w-16 place-items-center rounded-full bg-brand-gradient text-white shadow-[0_15px_45px_-10px_rgba(255,71,87,0.8)] transition hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
        aria-label={open ? "Close chat" : "Open chat with crowdMGMT Concierge"}
        aria-expanded={open}
      >
        {!open && <span className="absolute inset-0 animate-ping-slow rounded-full bg-coral-500/50" />}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={open ? "x" : "chat"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="relative">
            {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </motion.span>
        </AnimatePresence>
        {teaser && !open && <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full border-2 border-ink-950 bg-mint" />}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-[6.5rem] right-3 z-[66] flex h-[min(640px,calc(100svh-8.5rem))] w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-900/95 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:right-6 sm:w-[400px]"
            role="dialog"
            aria-label="crowdMGMT Concierge chat"
          >
            {/* Header */}
            <div className="relative overflow-hidden border-b border-white/10 px-5 py-4">
              <div className="absolute inset-0 bg-gradient-to-r from-coral-500/25 via-fuchsia-500/10 to-iris-500/25" />
              <div className="relative flex items-center gap-3">
                <div className="relative grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-ink-950">
                  <Dot className="h-4 w-4" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-ink-900 bg-mint" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 font-display text-[15px] font-bold">
                    crowdMGMT Concierge <Sparkles className="h-3.5 w-3.5 text-coral-300" />
                  </p>
                  <p className="text-xs text-white/55">Online · replies instantly</p>
                </div>
                <button onClick={reset} className="grid h-9 w-9 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white" aria-label="Restart conversation" title="Restart">
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white" aria-label="Close chat">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={listRef} className="thin-scroll flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
              {messages.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className={cn("flex flex-col", m.from === "user" ? "items-end" : "items-start")}>
                  <div
                    className={cn(
                      "max-w-[86%] whitespace-pre-line rounded-[1.25rem] px-4 py-3 text-[14px] leading-relaxed",
                      m.from === "user" ? "rounded-br-md bg-brand-gradient text-white" : "rounded-bl-md border border-white/[0.08] bg-white/[0.06] text-white/80",
                    )}
                  >
                    <RichText text={m.text} />
                  </div>
                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-2 flex max-w-[92%] flex-wrap gap-2">
                      {m.actions.map((a) => (
                        <button
                          key={a.label}
                          onClick={() => runAction(a)}
                          className="inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-ink-950 transition hover:bg-coral-500 hover:text-white"
                        >
                          {a.label} <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                      ))}
                    </div>
                  )}
                  <span className="mt-1.5 px-1 text-[10px] text-white/30">{fmt(m.time)}</span>
                </motion.div>
              ))}
              {typing && (
                <div className="flex items-center gap-1.5 self-start rounded-[1.25rem] rounded-bl-md border border-white/[0.08] bg-white/[0.06] px-4 py-3.5" aria-label="Concierge is typing">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-2 w-2 animate-bounce-dot rounded-full bg-white/70" style={{ animationDelay: `${d * 0.15}s` }} />
                  ))}
                </div>
              )}
            </div>

            {/* Quick replies */}
            {!typing && lastBot?.quick && lastBot.quick.length > 0 && (
              <div className="no-scrollbar flex gap-2 overflow-x-auto border-t border-white/[0.06] px-4 py-3">
                {lastBot.quick.map((q) => (
                  <button key={q} onClick={() => send(q)} className="shrink-0 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-white/80 transition hover:border-coral-400/60 hover:bg-coral-500/10 hover:text-white">
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-white/10 p-3">
              <label htmlFor="chat-input" className="sr-only">
                Message
              </label>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about bookings, services, alerts…"
                autoComplete="off"
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-coral-400/60 focus:ring-4 focus:ring-coral-500/15"
              />
              <button type="submit" disabled={!input.trim() || typing} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-gradient text-white transition hover:brightness-110 disabled:opacity-40" aria-label="Send message">
                <SendHorizontal className="h-4 w-4" />
              </button>
            </form>
            <p className="pb-3 text-center text-[10px] text-white/30">Automated assistant · For details email ContactUs@crowdMGMT.com</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
