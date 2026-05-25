import type { AIContext } from "../types";

export function buildRecommendationPrompt(ctx: AIContext): string {
  const cartBlock =
    ctx.cart.items.length > 0
      ? `CARRITO ACTUAL (usalo para upsell y cross-sell sin duplicar lo que ya tiene):
${ctx.cart.items.map((i) => `  - ${i.title} x${i.qty} ($${i.price})`).join("\n")}
Subtotal: $${ctx.cart.subtotal}`
      : "CARRITO: vacío.";

  const products = ctx.relevantProducts.length
    ? `PRODUCTOS RELEVANTES PARA ESTE TURNO (priorizá estos; NO menciones otros que no estén acá):
${ctx.relevantProducts
  .map((p) => {
    const min = Math.min(...p.weights.map((w) => w.price));
    const max = Math.max(...p.weights.map((w) => w.price));
    const price = min === max ? `$${min}` : `$${min}–$${max}`;
    return `  • ${p.title} — ${price} — /producto/${p.handle}\n    ${p.description.slice(0, 140)}`;
  })
  .join("\n")}`
    : "PRODUCTOS RELEVANTES: ninguno detectado todavía. Pedí más contexto al usuario.";

  const recipes = ctx.relevantRecipes.length
    ? `RECETAS RELEVANTES:
${ctx.relevantRecipes
  .map(
    (r) =>
      `  • ${r.name} (${r.timeMinutes}min) — ${r.description}\n    Ingredientes: ${r.ingredients.slice(0, 4).join(", ")}…`,
  )
  .join("\n")}`
    : "";

  const intent = ctx.intent.tags.length
    ? `INTENCIÓN DETECTADA: ${ctx.intent.tags.slice(0, 3).join(", ")}`
    : "INTENCIÓN: aún sin definir.";

  const memory =
    ctx.memory.viewedProducts.length > 0
      ? `VISTOS RECIENTEMENTE: ${ctx.memory.viewedProducts.slice(-3).join(", ")}`
      : "";

  return [intent, cartBlock, products, recipes, memory]
    .filter(Boolean)
    .join("\n\n");
}
