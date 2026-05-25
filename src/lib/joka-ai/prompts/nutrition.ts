import { NUTRITION } from "@/data/knowledge";

export const NUTRITION_PROMPT = `CONOCIMIENTO NUTRICIONAL (usá solo esta info, no inventes):
${NUTRITION.map((n) => `- ${n.topic}: ${n.content}`).join("\n")}
`;
