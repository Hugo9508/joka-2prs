import { useCart } from "@/stores/cart";
import { loadMemory } from "./memory";
import type { CartSnapshot, ConversationMemory } from "./types";

export function getCartContext(): CartSnapshot {
  const { items, subtotal } = useCart.getState();
  return {
    items: items.map((i) => ({
      handle: i.handle,
      title: i.title,
      qty: i.qty,
      price: i.price,
    })),
    subtotal: subtotal(),
  };
}

export function getMemoryContext(): ConversationMemory {
  return loadMemory();
}
