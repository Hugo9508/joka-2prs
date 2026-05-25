import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import { Sprout, X, Send, Sparkles } from "lucide-react";
import {
  getCartContext,
  getMemoryContext,
} from "@/lib/joka-ai/contextBuilder";
import {
  recordIntents,
  recordMessage,
  recordRecommendation,
} from "@/lib/joka-ai/memory";
import { detectIntent } from "@/lib/joka-ai/intent";
import { trackQuestion, trackRecommendations } from "@/lib/joka-ai/analytics";
import { InlineProductCard } from "@/components/joka/InlineProductCard";
import { MockOrderCard } from "@/components/joka/MockOrderCard";
import { useCart } from "@/stores/cart";

const STORAGE_KEY = "joka-assist-messages";

const CONFIRM_RE =
  /\b(s[ií]|dale|lo quiero|los quiero|comprar|compro|pagar|pago|confirmo|confirmar|finaliz(ar|o)|checkout)\b/i;

const QUICK = [
  "Algo proteico para post entreno",
  "Liviano para la noche",
  "Ideas para el desayuno",
  "¿Cómo es el envío?",
];

function loadInitial(): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as UIMessage[]) : [];
  } catch {
    return [];
  }
}

// Extract /producto/<handle> references from assistant markdown
function extractProductHandles(text: string): string[] {
  const re = /\/producto\/([a-z0-9-]+)/gi;
  const out = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) out.add(m[1]);
  return Array.from(out);
}

export function JokaAssist() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <JokaAssistInner />;
}

function JokaAssistInner() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showOrder, setShowOrder] = useState(false);
  const cartCount = useCart((s) => s.count());
  const [initial] = useState<UIMessage[]>(() => loadInitial());
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    id: "joka-assist",
    messages: initial,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: ({ messages, id, body }) => ({
        body: {
          id,
          messages,
          cart: getCartContext(),
          memory: getMemoryContext(),
          ...body,
        },
      }),
    }),
  });

  // Persist transcript
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
  }, [messages]);

  // Memory + analytics on completed assistant messages
  useEffect(() => {
    if (status !== "ready" || messages.length === 0) return;
    const last = messages[messages.length - 1];
    const text = last.parts
      .map((p) => (p.type === "text" ? p.text : ""))
      .join("");
    if (!text) return;
    recordMessage(last.role === "user" ? "user" : "assistant", text);
    if (last.role === "assistant") {
      const handles = extractProductHandles(text);
      if (handles.length) {
        recordRecommendation(handles);
        trackRecommendations(handles);
      }
    }
  }, [status, messages]);

  // Autoscroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open, status]);

  const loading = status === "submitted" || status === "streaming";

  const submit = async (text: string) => {
    const value = text.trim();
    if (!value || loading) return;
    setInput("");
    const intent = detectIntent(value);
    recordIntents(intent.tags);
    trackQuestion(value, intent.tags);
    // SDR close: confirm + items in cart → trigger mock checkout card.
    const isConfirm = CONFIRM_RE.test(value) && cartCount > 0;
    if (isConfirm) setShowOrder(true);
    else setShowOrder(false);
    await sendMessage({ text: value });
  };

  // Suggested follow-ups based on last assistant message
  const suggestions = useMemo(() => {
    const last = messages[messages.length - 1];
    if (!last || last.role !== "assistant") return [] as string[];
    const text = last.parts
      .map((p) => (p.type === "text" ? p.text : ""))
      .join("")
      .toLowerCase();
    const s: string[] = [];
    if (text.includes("crema")) s.push("¿Qué granola combina?");
    if (text.includes("granola")) s.push("Sugerime una receta rápida");
    if (text.includes("envío") || text.includes("envio"))
      s.push("¿Cómo finalizo la compra?");
    if (text.includes("/producto/")) s.push("¿Tenés algo más liviano?");
    if (s.length === 0) s.push("Sugerime un combo");
    return s.slice(0, 3);
  }, [messages]);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-40 grid place-items-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-soft hover:scale-105 transition"
        aria-label="Abrir JOKA Assist"
      >
        {open ? <X className="w-5 h-5" /> : <Sprout className="w-5 h-5" />}
      </button>

      <div
        className={`fixed bottom-24 right-3 sm:right-5 z-40 w-[calc(100vw-1.5rem)] sm:w-[380px] max-h-[min(640px,calc(100vh-7rem))] rounded-3xl bg-card border shadow-soft overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        }`}
      >
        <header className="flex items-center gap-3 px-5 py-4 border-b bg-card/60">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-primary text-primary-foreground">
            <Sparkles className="w-4 h-4" />
          </span>
          <div className="flex-1">
            <p className="font-display font-semibold leading-tight">
              JOKA Assist
            </p>
            <p className="text-[11px] text-muted-foreground">
              Tu asesor de bienestar · GPT en vivo
            </p>
          </div>
        </header>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
        >
          {messages.length === 0 && (
            <div className="text-sm text-foreground/80 space-y-3">
              <p>
                Hola, soy <b>JOKA Assist</b>. Te ayudo a elegir algo rico y
                natural.
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => submit(q)}
                    className="chip"
                    data-active="false"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => {
            const text = m.parts
              .map((p) => (p.type === "text" ? p.text : ""))
              .join("");
            if (m.role === "user") {
              return (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary text-primary-foreground px-3.5 py-2 text-sm whitespace-pre-wrap">
                    {text}
                  </div>
                </div>
              );
            }
            const handles = extractProductHandles(text);
            return (
              <div key={m.id} className="space-y-1">
                <div className="text-sm leading-relaxed prose prose-sm max-w-none [&_p]:my-1.5 [&_ul]:my-1.5 [&_li]:my-0.5 [&_a]:text-olive-deep [&_a]:underline text-foreground">
                  <ReactMarkdown>{text}</ReactMarkdown>
                </div>
                {handles.slice(0, 3).map((h) => (
                  <InlineProductCard key={h} handle={h} />
                ))}
              </div>
            );
          })}

          {status === "submitted" && (
            <div className="space-y-2">
              <div className="h-3 w-24 rounded-full bg-muted animate-pulse" />
              <div className="h-3 w-48 rounded-full bg-muted animate-pulse" />
              <div className="h-3 w-40 rounded-full bg-muted animate-pulse" />
            </div>
          )}

          {status === "streaming" && (
            <div className="text-xs text-muted-foreground inline-flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" />
              <span
                className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse"
                style={{ animationDelay: "120ms" }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse"
                style={{ animationDelay: "240ms" }}
              />
              Escribiendo…
            </div>
          )}

          {showOrder && !loading && <MockOrderCard />}

          {error && (
            <div className="text-xs text-destructive bg-destructive/10 rounded-xl px-3 py-2">
              No pude conectar con JOKA Assist. Intentá de nuevo en unos
              segundos.
            </div>
          )}

          {!loading && suggestions.length > 0 && messages.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="chip"
                  data-active="false"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(input);
          }}
          className="border-t bg-card/60 p-3 flex items-end gap-2"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(input);
              }
            }}
            rows={1}
            placeholder="Preguntale algo a JOKA…"
            className="flex-1 resize-none rounded-2xl bg-background border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring max-h-32"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="grid place-items-center w-10 h-10 rounded-full bg-primary text-primary-foreground disabled:opacity-50 hover:opacity-90 transition"
            aria-label="Enviar"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
}
