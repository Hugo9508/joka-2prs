import type { AIContext } from "../types";
import { SYSTEM_PROMPT } from "./system";
import { GUARDRAILS } from "./guardrails";
import { NUTRITION_PROMPT } from "./nutrition";
import { CHECKOUT_PROMPT } from "./checkout";
import { buildRecommendationPrompt } from "./recommendation";

/**
 * Assembles the final system prompt for a turn.
 * Modules are stacked so any can be tuned/swapped independently.
 */
export function assemblePrompt(ctx: AIContext): string {
  return [
    SYSTEM_PROMPT,
    GUARDRAILS,
    NUTRITION_PROMPT,
    CHECKOUT_PROMPT,
    buildRecommendationPrompt(ctx),
  ].join("\n\n---\n\n");
}
