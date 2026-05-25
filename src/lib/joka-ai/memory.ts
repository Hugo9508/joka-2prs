import type { ConversationMemory, IntentTag } from "./types";

const KEY = "joka-assist-memory";
const MAX_MESSAGES = 8;
const MAX_LIST = 10;

const empty: ConversationMemory = {
  recentMessages: [],
  viewedProducts: [],
  recommendedProducts: [],
  detectedIntents: [],
};

export function loadMemory(): ConversationMemory {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...(JSON.parse(raw) as ConversationMemory) };
  } catch {
    return empty;
  }
}

export function saveMemory(m: ConversationMemory) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(m));
  } catch {
    /* ignore */
  }
}

export function recordMessage(role: "user" | "assistant", text: string) {
  const m = loadMemory();
  m.recentMessages = [
    ...m.recentMessages,
    { role, text: text.slice(0, 400), ts: Date.now() },
  ].slice(-MAX_MESSAGES);
  saveMemory(m);
}

export function recordViewedProduct(handle: string) {
  const m = loadMemory();
  m.viewedProducts = [...m.viewedProducts.filter((h) => h !== handle), handle].slice(
    -MAX_LIST,
  );
  saveMemory(m);
}

export function recordRecommendation(handles: string[]) {
  const m = loadMemory();
  const merged = [...m.recommendedProducts, ...handles];
  m.recommendedProducts = Array.from(new Set(merged)).slice(-MAX_LIST);
  saveMemory(m);
}

export function recordIntents(tags: IntentTag[]) {
  const m = loadMemory();
  m.detectedIntents = Array.from(new Set([...m.detectedIntents, ...tags])).slice(
    -MAX_LIST,
  );
  saveMemory(m);
}

export function clearMemory() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
