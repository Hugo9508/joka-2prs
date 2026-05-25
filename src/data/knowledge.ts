export type KnowledgeEntry = {
  topic: string;
  content: string;
  tags: string[];
};

export const BRAND = {
  name: "JOKA",
  tagline: "Nutrición real para tu día a día",
  origin: "Uruguay",
  values: [
    "Ingredientes 100% naturales",
    "Sin azúcar agregada en cremas",
    "Producción local y consciente",
    "Sabor real, sin atajos",
  ],
};

export const SHIPPING = {
  coverage: "Envíos a todo Uruguay.",
  montevideo: "Entrega en Montevideo en 24-48hs hábiles.",
  interior: "Interior: 2-5 días hábiles vía agencia.",
  freeFrom: 1500,
  freeFromLabel: "Envío gratis en compras desde $1.500.",
};

export const PAYMENTS = {
  methods: ["Tarjetas de crédito/débito", "Mercado Pago", "Transferencia", "Efectivo al recibir (Montevideo)"],
  installments: "Hasta 6 cuotas sin recargo con tarjetas seleccionadas.",
};

export const NUTRITION: KnowledgeEntry[] = [
  {
    topic: "Crema de maní",
    content:
      "Alta en proteína vegetal (~25g/100g) y grasas saludables. Ideal para deportistas, desayunos y meriendas. Sin azúcar agregada ni aceites hidrogenados.",
    tags: ["proteína", "deporte", "desayuno"],
  },
  {
    topic: "Semillas de chía",
    content:
      "Ricas en omega 3, fibra soluble y calcio. Ayudan a la digestión y la saciedad. Hidratar 10 minutos antes de consumir.",
    tags: ["omega3", "fibra", "digestión"],
  },
  {
    topic: "Semillas de lino",
    content:
      "Excelente fuente de fibra y lignanos. Mejor consumirlas molidas para aprovechar sus nutrientes.",
    tags: ["fibra", "hormonal", "digestión"],
  },
  {
    topic: "Semillas de zapallo",
    content:
      "Aportan magnesio, zinc y proteína. Buen snack para foco mental y recuperación.",
    tags: ["magnesio", "proteína", "snack"],
  },
  {
    topic: "Granola",
    content:
      "Mezcla de avena, frutos secos y semillas tostadas. Energía sostenida sin picos de azúcar.",
    tags: ["desayuno", "energía"],
  },
  {
    topic: "Cacao puro",
    content:
      "Antioxidante natural, fuente de magnesio y precursor del buen humor (teobromina).",
    tags: ["antioxidante", "energía", "humor"],
  },
];

export const FAQS: KnowledgeEntry[] = [
  {
    topic: "¿Cómo conservo las cremas?",
    content:
      "En lugar fresco y seco. Una vez abierto, podés guardarlo en heladera para mantener su textura. Es normal que se separe el aceite: mezclá antes de usar.",
    tags: ["conservación", "cremas"],
  },
  {
    topic: "¿Son aptas vegano?",
    content:
      "Las cremas, granolas, semillas y frutos secos son 100% de origen vegetal. La miel no.",
    tags: ["vegano", "dietas"],
  },
  {
    topic: "¿Tienen gluten?",
    content:
      "Los productos no contienen gluten en su fórmula, pero se elaboran en un espacio compartido. No están certificados libres de gluten.",
    tags: ["gluten", "celíaco"],
  },
  {
    topic: "¿Cómo finalizo mi compra?",
    content:
      "Agregá productos al carrito y andá a /checkout. Completás tus datos y elegís medio de pago. Recibís confirmación por email.",
    tags: ["checkout", "compra"],
  },
];
