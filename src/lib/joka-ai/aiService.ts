import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";
import { createOpenAI } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";

/**
 * Resolves the active language model.
 * - Default: Lovable AI Gateway → openai/gpt-5 (uses LOVABLE_API_KEY).
 * - Set USE_DIRECT_OPENAI=1 to use the direct OpenAI client (uses OPENAI_API_KEY).
 *
 * Both paths return an AI-SDK LanguageModel so the rest of the pipeline
 * (streamText, tools, structured output) doesn't change.
 */
export function getModel(): LanguageModel {
  const useDirect = process.env.USE_DIRECT_OPENAI === "1";
  if (useDirect && process.env.OPENAI_API_KEY) {
    const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
    return openai("gpt-4o-mini");
  }
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  const gateway = createLovableAiGatewayProvider(key);
  return gateway("openai/gpt-5");
}
