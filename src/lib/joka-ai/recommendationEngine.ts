import { PRODUCTS, CATEGORIES, type Product } from "@/data/products";
import { RECIPES, type Recipe } from "@/data/recipes";
import type {
  AIIntent,
  CartSnapshot,
  ConversationMemory,
  IntentTag,
  ProductRecommendation,
} from "./types";

// Map each intent tag → catalogue tokens we expect in product text.
const INTENT_TO_TOKENS: Record<IntentTag, string[]> = {
  proteina: ["mani", "almendras", "zapallo", "chia", "castañas", "caju"],
  energia: ["mani", "frutos", "miel", "cacao", "granola"],
  fibra: ["chia", "lino", "avena", "granola"],
  desayuno: ["granola", "avena", "mani", "miel", "almendras"],
  snack: ["frutos", "mix", "mani", "almendras", "caju"],
  postre: ["mani", "almendras", "cacao", "miel"],
  entreno: ["mani", "zapallo", "cacao", "almendras"],
  noche: ["chia", "lino", "almendras"],
  digestion: ["chia", "lino", "avena"],
  vegano: ["crema", "granola", "semillas", "frutos", "cacao", "avena"],
  antioxidante: ["cacao"],
  regalo: ["combo", "pack"],
  envio: [],
  pago: [],
  checkout: [],
  marca: [],
};

// Complement map: product category → categories that pair well.
const COMPLEMENTS: Record<string, string[]> = {
  cremas: ["granolas", "naturales"],
  granolas: ["cremas", "frutos-secos"],
  "frutos-secos": ["semillas", "naturales"],
  semillas: ["granolas", "naturales"],
  naturales: ["semillas", "frutos-secos"],
  combos: [],
};

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function scoreProduct(p: Product, intent: AIIntent): number {
  const hay = normalize(`${p.title} ${p.description} ${p.category}`);
  let score = 0;
  for (const tag of intent.tags) {
    const weight = intent.weights[tag] ?? 1;
    const tokens = INTENT_TO_TOKENS[tag] ?? [];
    for (const tok of tokens) {
      if (hay.includes(tok)) score += weight;
    }
  }
  return score;
}

function reasonFor(intent: AIIntent): string {
  const top = intent.tags.slice(0, 2).join(" + ");
  return top ? `Coincide con: ${top}` : "Popular en JOKA";
}

export function recommendProducts(
  intent: AIIntent,
  cart: CartSnapshot,
  memory: ConversationMemory,
  max = 5,
): ProductRecommendation[] {
  const inCart = new Set(cart.items.map((i) => i.handle));
  const recs: ProductRecommendation[] = [];

  // 1. Primary recommendations by intent score
  const scored = PRODUCTS.map((p) => ({ p, s: scoreProduct(p, intent) }))
    .filter((x) => x.s > 0 && !inCart.has(x.p.handle))
    .sort((a, b) => b.s - a.s);

  for (const { p, s } of scored.slice(0, max)) {
    recs.push({
      product: p,
      score: s,
      reason: reasonFor(intent),
      type: "primary",
    });
  }

  // 2. Cross-sell / complements from cart
  const cartCategories = new Set(
    cart.items
      .map((i) => PRODUCTS.find((p) => p.handle === i.handle)?.category)
      .filter(Boolean) as string[],
  );
  const complementCats = new Set<string>();
  cartCategories.forEach((c) =>
    (COMPLEMENTS[c] ?? []).forEach((x) => complementCats.add(x)),
  );

  for (const cat of complementCats) {
    const candidate = PRODUCTS.find(
      (p) =>
        p.category === cat &&
        !inCart.has(p.handle) &&
        !recs.some((r) => r.product.handle === p.handle),
    );
    if (candidate) {
      recs.push({
        product: candidate,
        score: 1,
        reason: `Combina con ${cartCategories.size > 1 ? "tu selección" : "lo que ya tenés en el carrito"}`,
        type: "cross-sell",
      });
    }
  }

  // 3. Upsell: if cart has small-format crema, suggest 800g version
  for (const item of cart.items) {
    const big = PRODUCTS.find(
      (p) =>
        p.category === "cremas" &&
        p.handle !== item.handle &&
        normalize(p.title).includes(normalize(item.title).split(" - ")[0]) &&
        p.weights.some((w) => w.label.includes("800")),
    );
    if (big && !recs.some((r) => r.product.handle === big.handle)) {
      recs.push({
        product: big,
        score: 1,
        reason: "Mejor precio por gramo en formato grande",
        type: "upsell",
      });
    }
  }

  // 4. Memory boost: products already viewed get small visibility
  for (const handle of memory.viewedProducts.slice(-3)) {
    const p = PRODUCTS.find((x) => x.handle === handle);
    if (p && !recs.some((r) => r.product.handle === p.handle) && !inCart.has(p.handle)) {
      recs.push({
        product: p,
        score: 0.5,
        reason: "Lo viste recientemente",
        type: "complement",
      });
    }
  }

  return recs.slice(0, max + 2);
}

export function recommendRecipes(
  intent: AIIntent,
  cart: CartSnapshot,
  max = 2,
): Recipe[] {
  const cartHandles = new Set(cart.items.map((i) => i.handle));
  return RECIPES.map((r) => {
    let s = 0;
    for (const tag of r.tags) if (intent.tags.includes(tag as IntentTag)) s += 2;
    for (const h of r.relatedProducts) if (cartHandles.has(h)) s += 3;
    return { r, s };
  })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, max)
    .map((x) => x.r);
}

export function listCategories() {
  return CATEGORIES;
}
