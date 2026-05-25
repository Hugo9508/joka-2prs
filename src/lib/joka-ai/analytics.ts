import type { IntentTag } from "./types";

const KEY = "joka-assist-analytics";

type AnalyticsState = {
  questions: Array<{ q: string; ts: number }>;
  intentCounts: Partial<Record<IntentTag, number>>;
  recommendedCounts: Record<string, number>; // handle → count
};

const empty: AnalyticsState = {
  questions: [],
  intentCounts: {},
  recommendedCounts: {},
};

function load(): AnalyticsState {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...empty, ...(JSON.parse(raw) as AnalyticsState) } : empty;
  } catch {
    return empty;
  }
}

function save(s: AnalyticsState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

export function trackQuestion(q: string, intents: IntentTag[]) {
  const s = load();
  s.questions = [...s.questions, { q: q.slice(0, 200), ts: Date.now() }].slice(-50);
  for (const t of intents) s.intentCounts[t] = (s.intentCounts[t] ?? 0) + 1;
  save(s);
}

export function trackRecommendations(handles: string[]) {
  const s = load();
  for (const h of handles) s.recommendedCounts[h] = (s.recommendedCounts[h] ?? 0) + 1;
  save(s);
}

export function getAnalytics() {
  return load();
}
