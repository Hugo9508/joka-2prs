export type Recipe = {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  benefits: string[];
  relatedProducts: string[]; // product handles
  tags: string[];
  timeMinutes: number;
};

export const RECIPES: Recipe[] = [
  {
    id: "bowl-proteico-mani",
    name: "Bowl proteico con crema de maní",
    description:
      "Desayuno energético, alto en proteína y fibra. Listo en 5 minutos.",
    ingredients: [
      "1 taza de yogur natural o griego",
      "2 cdas de crema de maní JOKA",
      "1 cda de semillas de chía",
      "1 cda de granola JOKA",
      "1/2 banana en rodajas",
      "Miel a gusto",
    ],
    steps: [
      "Colocá el yogur en un bowl.",
      "Agregá la crema de maní encima.",
      "Sumá la chía, la granola y la banana.",
      "Terminá con un hilo de miel.",
    ],
    benefits: ["Alto en proteína", "Saciante", "Energía sostenida"],
    relatedProducts: [
      "crema-de-mani-natural-800-g",
      "crema-de-mani-natural-235-g",
    ],
    tags: ["desayuno", "proteína", "post-entreno"],
    timeMinutes: 5,
  },
  {
    id: "smoothie-cacao-energia",
    name: "Smoothie de cacao y maní",
    description: "Pre o post entreno, sabor a postre con ingredientes reales.",
    ingredients: [
      "1 banana congelada",
      "1 cda de cacao en polvo",
      "1 cda de crema de maní JOKA",
      "1 vaso de leche (vacuna o vegetal)",
      "1 puñado de avena",
    ],
    steps: ["Licuá todo hasta integrar.", "Serví y disfrutá frío."],
    benefits: ["Energía rápida", "Antioxidantes", "Recuperación muscular"],
    relatedProducts: ["crema-de-mani-natural-235-g"],
    tags: ["smoothie", "entreno", "cacao"],
    timeMinutes: 4,
  },
  {
    id: "mix-trail-oficina",
    name: "Mix de oficina y travesía",
    description: "Snack inteligente para combatir el bajón de la tarde.",
    ingredients: [
      "Almendras",
      "Castañas de cajú",
      "Semillas de zapallo",
      "Pasas o arándanos",
    ],
    steps: [
      "Mezclá partes iguales en un frasco hermético.",
      "Llevá una porción de 30g al trabajo.",
    ],
    benefits: ["Saciedad", "Foco mental", "Sin picos de azúcar"],
    relatedProducts: [],
    tags: ["snack", "trabajo", "viaje"],
    timeMinutes: 2,
  },
  {
    id: "pudin-chia-noche",
    name: "Pudín de chía con frutos rojos",
    description: "Se prepara la noche anterior. Desayuno listo al despertar.",
    ingredients: [
      "3 cdas de semillas de chía",
      "1 taza de leche vegetal",
      "1 cdita de miel",
      "Frutos rojos a gusto",
    ],
    steps: [
      "Mezclá la chía con la leche y la miel.",
      "Llevá a heladera al menos 4 horas.",
      "Servir frío con frutos rojos.",
    ],
    benefits: ["Omega 3", "Fibra", "Digestión liviana"],
    relatedProducts: [],
    tags: ["desayuno", "omega3", "fibra"],
    timeMinutes: 5,
  },
];
