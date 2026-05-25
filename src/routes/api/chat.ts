import { createFileRoute } from "@tanstack/react-router";
import "@tanstack/react-start";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { assemblePrompt } from "@/lib/joka-ai/prompts";
import { retriever } from "@/lib/joka-ai/retriever";
import { getModel } from "@/lib/joka-ai/aiService";
import type { CartSnapshot, ConversationMemory } from "@/lib/joka-ai/types";

type ChatBody = {
  messages?: unknown;
  cart?: CartSnapshot;
  memory?: ConversationMemory;
};

const EMPTY_CART: CartSnapshot = { items: [], subtotal: 0 };
const EMPTY_MEM: ConversationMemory = {
  recentMessages: [],
  viewedProducts: [],
  recommendedProducts: [],
  detectedIntents: [],
};

function lastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role !== "user") continue;
    return m.parts
      .map((p) => (p.type === "text" ? p.text : ""))
      .join(" ")
      .trim();
  }
  return "";
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const { messages, cart, memory } = (await request.json()) as ChatBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const msgs = messages as UIMessage[];
        const query = lastUserText(msgs);

        try {
          // Dynamic context injection: only relevant products + cart + memory.
          const ctx = await retriever.retrieve({
            query,
            cart: cart ?? EMPTY_CART,
            memory: memory ?? EMPTY_MEM,
          });
          const system = assemblePrompt(ctx);
          const model = getModel();

          const result = streamText({
            model,
            system,
            messages: await convertToModelMessages(msgs),
          });
          return result.toUIMessageStreamResponse({
            originalMessages: msgs,
          });
        } catch (err) {
          const msg = err instanceof Error ? err.message : "AI error";
          return new Response(JSON.stringify({ error: msg }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
