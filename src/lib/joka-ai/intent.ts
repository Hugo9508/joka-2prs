import type { AIIntent, IntentTag } from "./types";

// Semantic synonyms / aliases → intent tag, with weight per match.
const INTENT_LEXICON: Record<IntentTag, { aliases: string[]; weight: number }> =
  {
    proteina: {
      aliases: ["proteina", "proteína", "musculo", "músculo", "fuerza", "gym", "gimnasio", "fit", "recuperacion", "recuperación"],
      weight: 3,
    },
    energia: {
      aliases: ["energia", "energía", "cansado", "cansancio", "vitalidad", "boost", "rendimiento", "foco", "concentracion", "concentración"],
      weight: 2.5,
    },
    fibra: {
      aliases: ["fibra", "transito", "tránsito", "intestino", "constipacion", "constipación", "regular"],
      weight: 2.5,
    },
    desayuno: {
      aliases: ["desayuno", "mañana", "manana", "breakfast", "empezar el dia", "empezar el día"],
      weight: 2,
    },
    snack: {
      aliases: ["snack", "merienda", "picar", "picoteo", "entre horas", "media tarde", "media manana", "media mañana"],
      weight: 2,
    },
    postre: {
      aliases: ["postre", "dulce", "antojo", "chocolate", "rico", "delicioso"],
      weight: 1.8,
    },
    entreno: {
      aliases: ["entreno", "entrenamiento", "deporte", "correr", "running", "ciclismo", "crossfit", "pre entreno", "post entreno", "pre-entreno", "post-entreno"],
      weight: 3,
    },
    noche: {
      aliases: ["noche", "cena", "antes de dormir", "liviano", "ligero", "ligera"],
      weight: 2,
    },
    digestion: {
      aliases: ["digestion", "digestión", "estomago", "estómago", "pesadez", "hinchazon", "hinchazón", "liviano", "ligero"],
      weight: 2,
    },
    vegano: {
      aliases: ["vegano", "vegana", "vegetal", "plant based", "plant-based", "vegetariano"],
      weight: 2,
    },
    antioxidante: {
      aliases: ["antioxidante", "antiage", "antiedad", "piel", "salud"],
      weight: 1.5,
    },
    regalo: {
      aliases: ["regalo", "regalar", "obsequio", "presente", "combo para regalo"],
      weight: 2,
    },
    envio: {
      aliases: ["envio", "envío", "shipping", "delivery", "entrega", "llega", "demora"],
      weight: 3,
    },
    pago: {
      aliases: ["pago", "pagar", "cuotas", "tarjeta", "mercado pago", "transferencia", "efectivo"],
      weight: 3,
    },
    checkout: {
      aliases: ["checkout", "finalizar compra", "comprar", "como compro", "como pago", "carrito"],
      weight: 3,
    },
    marca: {
      aliases: ["joka", "marca", "quienes son", "historia", "filosofia", "filosofía"],
      weight: 1.5,
    },
  };

// Implications: matching certain intents activates secondary ones.
const IMPLICATIONS: Partial<Record<IntentTag, IntentTag[]>> = {
  entreno: ["proteina", "snack"],
  energia: ["snack", "desayuno"],
  noche: ["digestion"],
  digestion: ["fibra"],
};

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function detectIntent(raw: string): AIIntent {
  const text = " " + normalize(raw) + " ";
  const weights: Partial<Record<IntentTag, number>> = {};

  for (const [tag, { aliases, weight }] of Object.entries(INTENT_LEXICON) as [
    IntentTag,
    { aliases: string[]; weight: number },
  ][]) {
    for (const alias of aliases) {
      if (text.includes(` ${normalize(alias)} `) || text.includes(normalize(alias))) {
        weights[tag] = (weights[tag] ?? 0) + weight;
        break;
      }
    }
  }

  // Apply implications with partial weight
  for (const [tag, implied] of Object.entries(IMPLICATIONS) as [
    IntentTag,
    IntentTag[],
  ][]) {
    if (weights[tag]) {
      for (const i of implied) {
        weights[i] = (weights[i] ?? 0) + weights[tag]! * 0.4;
      }
    }
  }

  const tags = (Object.keys(weights) as IntentTag[]).sort(
    (a, b) => (weights[b] ?? 0) - (weights[a] ?? 0),
  );

  return { tags, weights, raw };
}
