import type { Product } from "@/data/products";
import type { Recipe } from "@/data/recipes";

export type IntentTag =
  | "proteina"
  | "energia"
  | "fibra"
  | "desayuno"
  | "snack"
  | "postre"
  | "entreno"
  | "noche"
  | "digestion"
  | "vegano"
  | "antioxidante"
  | "regalo"
  | "envio"
  | "pago"
  | "checkout"
  | "marca";

export type AIIntent = {
  tags: IntentTag[];
  weights: Partial<Record<IntentTag, number>>;
  raw: string;
};

export type ProductRecommendation = {
  product: Product;
  score: number;
  reason: string;
  type: "primary" | "upsell" | "cross-sell" | "complement";
};

export type CartSnapshot = {
  items: Array<{ handle: string; title: string; qty: number; price: number }>;
  subtotal: number;
};

export type ConversationMemory = {
  recentMessages: Array<{ role: "user" | "assistant"; text: string; ts: number }>;
  viewedProducts: string[]; // handles
  recommendedProducts: string[]; // handles
  detectedIntents: IntentTag[];
};

export type AIContext = {
  intent: AIIntent;
  cart: CartSnapshot;
  memory: ConversationMemory;
  relevantProducts: Product[];
  relevantRecipes: Recipe[];
};

export type PromptModule = "system" | "checkout" | "nutrition" | "recommendation";
