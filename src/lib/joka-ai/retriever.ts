import { PRODUCTS, type Product } from "@/data/products";
import { RECIPES, type Recipe } from "@/data/recipes";
import { detectIntent } from "./intent";
import { recommendProducts, recommendRecipes } from "./recommendationEngine";
import type { AIContext, CartSnapshot, ConversationMemory } from "./types";

/**
 * Retriever abstraction. Today it scores in-memory JSON.
 * Tomorrow this can be swapped for pgvector / OpenAI embeddings
 * without touching the prompt layer.
 */
export interface Retriever {
  retrieve(input: {
    query: string;
    cart: CartSnapshot;
    memory: ConversationMemory;
  }): Promise<AIContext>;
}

export class LocalRetriever implements Retriever {
  async retrieve({
    query,
    cart,
    memory,
  }: {
    query: string;
    cart: CartSnapshot;
    memory: ConversationMemory;
  }): Promise<AIContext> {
    const intent = detectIntent(query);
    const recs = recommendProducts(intent, cart, memory, 5);
    const relevantProducts: Product[] = recs.map((r) => r.product);
    // Always include cart items in context
    for (const i of cart.items) {
      const p = PRODUCTS.find((x) => x.handle === i.handle);
      if (p && !relevantProducts.some((rp) => rp.handle === p.handle)) {
        relevantProducts.push(p);
      }
    }
    const relevantRecipes: Recipe[] =
      intent.tags.length > 0 ? recommendRecipes(intent, cart, 2) : RECIPES.slice(0, 1);

    return { intent, cart, memory, relevantProducts, relevantRecipes };
  }
}

export const retriever: Retriever = new LocalRetriever();
