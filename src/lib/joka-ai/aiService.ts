import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";
import { createOpenAI } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";

/**
 * Resolves the active language model.
 * - Default: OpenAI direct (uses OPENAI_API_KEY).
 * - Fallback: Lovable AI Gateway (uses LOVABLE_API_KEY) if no OPENAI_API_KEY.
 *
 * Both paths return an AI-SDK LanguageModel so the rest of the pipeline
 * (streamText, tools, structured output) doesn't change.
 */
export function getModel(): LanguageModel {
  // Priority: OpenAI direct
  if (process.env.OPENAI_API_KEY) {
    const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
    return openai("gpt-4o-mini");
  }
  // Fallback: Lovable AI Gateway
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing OPENAI_API_KEY or LOVABLE_API_KEY");
  const gateway = createLovableAiGatewayProvider(key);
  return gateway("openai/gpt-5");
}
