export type Weight = { label: string; price: number };
export type Product = {
  handle: string;
  title: string;
  category: string;
  badges: string[];
  image: string;
  description: string;
  weights: Weight[];
};

export const CATEGORIES = [
  { slug: "cremas", name: "Cremas", desc: "Untables 100% naturales" },
  { slug: "granolas", name: "Granolas", desc: "Para empezar bien el día" },
  { slug: "frutos-secos", name: "Frutos secos", desc: "Energía real" },
  { slug: "semillas", name: "Semillas", desc: "Nutrición concentrada" },
  { slug: "naturales", name: "Naturales", desc: "Avena, cacao, miel y más" },
  { slug: "combos", name: "Combos", desc: "Más variedad, mejor precio" },
] as const;

export const PRODUCTS: Product[] = [
  {
    "handle": "crema-de-castanas-de-caju-235-g",
    "title": "Crema de Castañas de Caju - 235 g",
    "category": "cremas",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/files/8CD47BA1-27AF-4E68-AD58-30C150A9F745.jpg?v=1757964584",
    "description": "Crema de castañas de cajú: natural, saludable y deliciosa Descubrí la crema de castañas de cajú, una mantequilla 100% natural, sin azúcar y llena de sabor. Perfecta para untar, cocinar o preparar postres irresistibles. Sin azúcar, lista para disfrutar La crema de cajú sin azúcar ",
    "weights": [
      {
        "label": "235 g",
        "price": 420.0
      }
    ]
  },
  {
    "handle": "crema-de-almendras-235-g",
    "title": "Crema de almendras - 235 g",
    "category": "cremas",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/files/DFB6C2EB-CD46-4796-9405-F6D19BD1ECB4.jpg?v=1757964057",
    "description": "Crema de almendras: un alimento versátil y saludable La crema de almendras o mantequilla de almendras es una alternativa natural y nutritiva, rica en proteínas y grasas saludables. Ideal para desayunos, recetas saladas o postres, aporta sabor y energía sin aditivos innecesarios. ",
    "weights": [
      {
        "label": "235 g",
        "price": 420.0
      }
    ]
  },
  {
    "handle": "crema-de-mani-natural-800-g",
    "title": "Crema de maní - Natural 800 g",
    "category": "cremas",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/files/33C52C6B-C6FA-483C-937B-7FB16B9EA08B_eb313a40-e1c1-4f37-a560-3e043c93bad5.jpg?v=1724423446",
    "description": "Crema de Maní Natural - 800 g La crema de maní JOKA está elaborada con maní 100% natural seleccionado para lograr una textura cremosa y un sabor original exquisito. Alimento saludable y versátil Es un alimento saludable, sin azúcar agregada, ideal para disfrutar en tostadas, licu",
    "weights": [
      {
        "label": "800 g",
        "price": 410.0
      }
    ]
  },
  {
    "handle": "crema-de-mani-natural-190-g",
    "title": "Crema de maní - Natural 190 g",
    "category": "cremas",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/5E1F5BD9-32FA-4DB0-9121-83A04895E069_f3925e7f-f205-4254-86a3-985e318bcae3.jpg?v=1692362970",
    "description": "Crema de Maní Natural - 190 g La crema de maní JOKA está elaborada con maní 100% natural seleccionado para lograr una textura cremosa y un sabor original exquisito. Alimento saludable y versátil Es un alimento saludable, sin azúcar agregada, ideal para disfrutar en tostadas, licu",
    "weights": [
      {
        "label": "190 g",
        "price": 145.0
      }
    ]
  },
  {
    "handle": "crema-de-mani-natural-4-kg",
    "title": "Crema de maní - Natural 4 kg",
    "category": "cremas",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/831246CE-7072-4403-ADD8-C2D336874706_e0c147b3-383a-4b2c-bab2-e133f9becf76.jpg?v=1692362845",
    "description": "Crema de Maní Natural - 4 kg La crema de maní JOKA está elaborada con maní 100% natural seleccionado para lograr una textura cremosa y un sabor original exquisito. Alimento saludable y versátil Es un alimento saludable, sin azúcar agregada, ideal para disfrutar en tostadas, licua",
    "weights": [
      {
        "label": "4 kg",
        "price": 1300.0
      }
    ]
  },
  {
    "handle": "crema-de-mani-coco-680-g",
    "title": "Crema de maní - Coco 680 g",
    "category": "cremas",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/files/WhatsAppImage2023-08-11at11.01.22.jpg?v=1692628953",
    "description": "Crema de Maní Coco - 680 g La crema de maní coco está elaborada con maní 100% natural que, además de contar con una textura cremosa, se caracteriza por un sabor sutil a coco exquisito. Alimento saludable y versátil Es un alimento saludable, sin azúcar agregada, ideal para disfrut",
    "weights": [
      {
        "label": "680 g",
        "price": 375.0
      }
    ]
  },
  {
    "handle": "crema-de-mani-proteica-680-g",
    "title": "Crema de maní - Proteica  680 gr",
    "category": "cremas",
    "badges": [
      "Natural",
      "Proteico"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/C23AEA73-650D-49D2-81DF-562BA4DDD797_046d3c43-e888-4151-8ff9-63cc20618367.jpg?v=1692362638",
    "description": "Crema de Maní Proteica - 680 g La crema de maní proteica sabor vainilla JOKA es una combinación de whey protein y maní 100% natural que, además de tener una textura cremosa, posee un sabor a vainilla exquisito. Alimento saludable y versátil Es un alimento saludable, sin azúcar ag",
    "weights": [
      {
        "label": "680 g",
        "price": 375.0
      }
    ]
  },
  {
    "handle": "crema-de-mani-natural-680-g",
    "title": "Crema de maní - Natural 680 g",
    "category": "cremas",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/2661B970-3DA7-4DCA-89F2-10AE45F03BBB_b6e6d3d1-114f-49a2-bae5-bdc90e0574c3.jpg?v=1692362786",
    "description": "Crema de Maní Natural - 680 g La crema de maní JOKA está elaborada con maní 100% natural seleccionado para lograr una textura cremosa y un sabor original exquisito. Alimento saludable y versátil Es un alimento saludable, sin azúcar agregada, ideal para disfrutar en tostadas, licu",
    "weights": [
      {
        "label": "680 g",
        "price": 375.0
      }
    ]
  },
  {
    "handle": "cacao-puro-1-kg-250-gr",
    "title": "Cacao puro (1 kg - 250 gr)",
    "category": "naturales",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/5B012947-AF19-4E1A-A32A-3C59D1BAFB1A.jpg?v=1692305484",
    "description": "Propiedades y beneficios del cacao El cacao es considerado uno de los grandes superalimentos gracias a su alta concentración de antioxidantes, ayudando a combatir el envejecimiento celular y fortalecer el sistema inmunológico. Rico en minerales esenciales Además de sus antioxidan",
    "weights": [
      {
        "label": "1 Kg",
        "price": 720.0
      },
      {
        "label": "250 g",
        "price": 165.0
      },
      {
        "label": "500 g",
        "price": 398.0
      }
    ]
  },
  {
    "handle": "semillas-de-zapallo-1-kg-250-g",
    "title": "Semillas de zapallo - (1 kg - 250 g)",
    "category": "semillas",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/73CB89B6-0B7B-407C-9972-811FAE5683E2_f1985b69-26a5-4c25-ab9d-816745493154.jpg?v=1692306418",
    "description": "Beneficios de las semillas de calabaza Las semillas de calabaza son reconocidas por sus múltiples beneficios nutricionales. Son una excelente fuente de vitaminas A y B, magnesio, zinc y antioxidantes, que ayudan a mejorar la energía, fortalecer el sistema inmune y cuidar la salud",
    "weights": [
      {
        "label": "1 Kg",
        "price": 630.0
      },
      {
        "label": "250 gr",
        "price": 210.0
      },
      {
        "label": "500 gr",
        "price": 350.0
      }
    ]
  },
  {
    "handle": "nueces-en-cuartos-claras",
    "title": "Nueces mariposa (1 kg - 250 g)",
    "category": "frutos-secos",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/nuezencuartos.jpg?v=1660238712",
    "description": "Beneficios de las nueces en cuartos Las nueces en cuartos son una excelente fuente de ácidos grasos saludables, antioxidantes, proteínas y minerales como magnesio, fósforo y zinc. Incorporarlas a tu dieta ayuda a mejorar la salud cardiovascular, y aportar energía de forma natural",
    "weights": [
      {
        "label": "1 Kg",
        "price": 715.0
      },
      {
        "label": "100 gr",
        "price": 135.0
      },
      {
        "label": "500 gr",
        "price": 500.0
      }
    ]
  },
  {
    "handle": "miel",
    "title": "Miel Pura (1 kg)",
    "category": "naturales",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/314769E3-02DF-46F1-A562-CD35204ACE8D.jpg?v=1692305199",
    "description": "Miel Natural Pura Sin Aditivos Descubrí el sabor auténtico de nuestra miel natural pura, 100% sin aditivos. Ideal para endulzar tus alimentos de manera saludable y disfrutar de todos sus beneficios. Composición Nutricional de la Miel Nuestra miel contiene azúcares naturales y una",
    "weights": [
      {
        "label": "1 kg",
        "price": 390.0
      }
    ]
  },
  {
    "handle": "mani-repelado-tostado-sin-sal-1-kg-250-g",
    "title": "Maní Repelado Tostado Sin Sal (1 kg - 250 g)",
    "category": "frutos-secos",
    "badges": [
      "Natural",
      "Sin sal"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/FF6547E2-E5C7-4F28-BAA9-1DD6DF391003_a1ebc43e-94d9-496b-bfb8-9bf18a7ede7b.jpg?v=1692362240",
    "description": "Beneficios de comer maní sin sal Salud cardiovascular Comer maní sin sal es bueno para el corazón, ayuda a controlar el colesterol y aporta grasas saludables. Energía y nutrición Rico en proteínas y antioxidantes, el maní brinda energía natural y fortalece el organismo. Snack sal",
    "weights": [
      {
        "label": "1 kg",
        "price": 230.0
      },
      {
        "label": "100 gr",
        "price": 28.0
      },
      {
        "label": "500 gr",
        "price": 130.0
      }
    ]
  },
  {
    "handle": "copia-de-crema-de-mani-proteica-190g",
    "title": "Crema de maní - Proteica 190 g",
    "category": "cremas",
    "badges": [
      "Natural",
      "Proteico"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/CE821F36-C9A2-45CD-BDC2-6C69183E7EB7_94f26675-8996-4b94-a9ed-7e886b7cbbb5.jpg?v=1692362562",
    "description": "Crema de Maní Proteica - 190 g La crema de maní proteica sabor vainilla JOKA es una combinación de whey protein y maní 100% natural que, además de tener una textura cremosa, posee un sabor a vainilla exquisito. Alimento saludable y versátil Es un alimento saludable, sin azúcar ag",
    "weights": [
      {
        "label": "190 g",
        "price": 145.0
      }
    ]
  },
  {
    "handle": "copia-de-copia-de-crema-de-mani-coco-190-g",
    "title": "Crema de maní - Coco 190 g",
    "category": "cremas",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/cremademanicoco190.jpg?v=1642433404",
    "description": "Crema de Maní Coco - 190 g La crema de maní coco está elaborada con maní 100% natural que, además de contar con una textura cremosa, se caracteriza por un sabor sutil a coco exquisito. Alimento saludable y versátil Es un alimento saludable, sin azúcar agregada, ideal para disfrut",
    "weights": [
      {
        "label": "190 g",
        "price": 145.0
      }
    ]
  },
  {
    "handle": "copia-de-crema-de-mani-chocolate-190-g",
    "title": "Crema de maní - Chocolate  190 g",
    "category": "cremas",
    "badges": [
      "Natural",
      "Con chocolate"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/3740F4CA-F287-44CC-8303-925CE99083BF_b691bb2c-33f4-4534-9de3-11bbb618c419.jpg?v=1692305899",
    "description": "Crema de Maní Chocolate - 190 g La crema de maní chocolate es la mezcla perfecta entre cacao y maní 100% natural que, además de tener una textura cremosa, posee un sutil sabor a chocolate exquisito para aquellos amantes del chocolate. Alimento saludable y versátil Es un alimento ",
    "weights": [
      {
        "label": "190 g",
        "price": 145.0
      }
    ]
  },
  {
    "handle": "copia-de-combo-l",
    "title": "Combo L",
    "category": "combos",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/211320DE-701C-442D-ACBB-0C0985D68424.jpg?v=1692305628",
    "description": "Combo saludable con granola, cremas y frutos secos Este combo es ideal para quienes disfrutan de toda nuestra línea de productos. Incluye 1 kg de granola, 2 cremas de maní a elección, 500 g de almendras, castañas de cajú, avena arrollada y 250 g de semillas de chía, lino y giraso",
    "weights": [
      {
        "label": "Único",
        "price": 1806.0
      }
    ]
  },
  {
    "handle": "combo-xl",
    "title": "Combo XL",
    "category": "combos",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/0AB1AC5D-1338-4CF0-B79A-1FB2475A1CD7.jpg?v=1692305827",
    "description": "Combo saludable familiar con granola, cremas y frutos secos Este combo es perfecto para quienes disfrutan de toda nuestra línea de productos. Incluye 2 granolas de 1 kg, 4 cremas de maní a elección, 1 kg de almendras, castañas de cajú, avena arrollada y 500 g de semillas de chía,",
    "weights": [
      {
        "label": "Único",
        "price": 3620.0
      }
    ]
  },
  {
    "handle": "pasas-de-uva-especiales",
    "title": "Pasas de uva especiales (1 kg - 250 g)",
    "category": "naturales",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/CD95C60F-FD9A-483B-BE5B-75F659E0DD15.jpg?v=1692363209",
    "description": "Pasas de uva propiedades Las pasas de uva son una excelente fuente de fibra e hidratos de carbono, ideales para aportar energía natural. También contienen minerales esenciales como calcio, potasio, hierro y magnesio, además de un pequeño aporte de vitamina C que fortalece las def",
    "weights": [
      {
        "label": "1 kg",
        "price": 340.0
      },
      {
        "label": "250 g",
        "price": 110.0
      },
      {
        "label": "500 g",
        "price": 190.0
      }
    ]
  },
  {
    "handle": "copia-de-combo-mix-granolas-x-4-500g",
    "title": "Combo Mix granolas x 4 (500g)",
    "category": "combos",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/B8A99D23-2D47-496E-89CC-B70E79FE575B.jpg?v=1692305783",
    "description": "Combo especial de granolas Este combo es ideal para los amantes de la granola. Incluye 4 paquetes de 500 g a elección, para que disfrutes desayunos y meriendas nutritivas y llenas de energía. Beneficios del combo Perfecto para compartir con amigos o familia, podés armarlo a tu gu",
    "weights": [
      {
        "label": "500g",
        "price": 1080.0
      }
    ]
  },
  {
    "handle": "combo-mix-cremas-x-4",
    "title": "Combo mix Cremas de maní x 4",
    "category": "combos",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/B76CE7B8-4EF9-44F1-A4F8-75A17C42025B.jpg?v=1692305700",
    "description": "Combo especial de cremas de maní Este combo es ideal para los amantes de la crema de maní. Incluye 4 frascos de 350 g a elección para que disfrutes en desayunos, meriendas o en recetas saludables. Beneficios del combo Perfecto para compartir con amigos o familia, podés elegir tus",
    "weights": [
      {
        "label": "Único",
        "price": 714.0
      }
    ]
  },
  {
    "handle": "combo-mix-granolas-x-4",
    "title": "Combo Mix granolas x 4 (1 Kg)",
    "category": "combos",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/49185947-82D8-4F11-868D-A4254A310F37.jpg?v=1692305731",
    "description": "Combo especial de granolas Este combo es ideal para los amantes de la granola. Incluye 4 paquetes de 1 kg a elección, para que disfrutes desayunos y meriendas nutritivas y llenas de energía. Beneficios del combo Perfecto para compartir con amigos o familia, podés armarlo a tu gus",
    "weights": [
      {
        "label": "1 Kg",
        "price": 1750.0
      }
    ]
  },
  {
    "handle": "avena-arrollada-1kg-500-gr",
    "title": "Avena Arrollada ( 1kg - 500 g)",
    "category": "naturales",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/588831D2-F795-423B-85B9-18F5071A729F.jpg?v=1692305449",
    "description": "Propiedades de la avena arrollada La avena arrollada es un cereal completo que aporta hidratos de carbono de absorción lenta, fibra, proteínas y minerales esenciales como magnesio, hierro, cobre y zinc. También contiene vitaminas del grupo B y pequeñas cantidades de calcio y ácid",
    "weights": [
      {
        "label": "1kg",
        "price": 110.0
      },
      {
        "label": "500 gr",
        "price": 60.0
      }
    ]
  },
  {
    "handle": "semillas-de-lino-1-kg-500-gr",
    "title": "Semillas de Lino (1 kg - 250 g)",
    "category": "semillas",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/4432BD05-27E2-42EA-B79A-FAA2F38B1C0B_152182e3-307c-4999-8068-79861afa8439.jpg?v=1692306476",
    "description": "Semillas de lino propiedades Las semillas de lino son ricas en ácidos grasos omega 3 y 6, fibra, vitamina E, vitaminas del grupo B y minerales esenciales como hierro, zinc y fósforo. Aportan nutrientes clave para el cuidado de la salud y la energía diaria. ¿Las semillas de lino p",
    "weights": [
      {
        "label": "1kg",
        "price": 175.0
      },
      {
        "label": "250 g",
        "price": 50.0
      },
      {
        "label": "500 gr",
        "price": 90.0
      }
    ]
  },
  {
    "handle": "semillas-de-chia-1kg",
    "title": "Semillas de chía (1 kg - 250 g)",
    "category": "semillas",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/529BA169-D46E-48D2-B793-0541E7B73AAD_326485d1-9575-4793-acfa-86b7747b42ba.jpg?v=1692306664",
    "description": "Chía propiedades nutricionales La chía es una semilla muy completa: rica en ácidos grasos omega 3 y omega 6 en la proporción ideal para el organismo (3:1). También es fuente de minerales como calcio, magnesio y boro, esenciales para la salud ósea y el bienestar general. Beneficio",
    "weights": [
      {
        "label": "1kg",
        "price": 340.0
      },
      {
        "label": "250 gr",
        "price": 100.0
      },
      {
        "label": "500 gr",
        "price": 180.0
      }
    ]
  },
  {
    "handle": "almendras-peladas-tostadas-1kg",
    "title": "Almendras Peladas Tostadas Sin Sal (1 kg - 250 g)",
    "category": "frutos-secos",
    "badges": [
      "Natural",
      "Sin sal"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/6DB0D06C-61A9-4FFD-9037-DCBAFBCE7467_d07c08cb-845f-4019-b6f6-3b7ec937df01.jpg?v=1692305334",
    "description": "Beneficios de las almendras tostadas Las almendras poseen un alto contenido de grasas saludables monoinsaturadas, fibra, proteína y nutrientes esenciales. Ricas en antioxidantes, ayudan a proteger las células del daño oxidativo y aportan energía natural para tu día. Además, su bu",
    "weights": [
      {
        "label": "1 kg",
        "price": 980.0
      },
      {
        "label": "100 gr",
        "price": 135.0
      },
      {
        "label": "500 gr",
        "price": 560.0
      }
    ]
  },
  {
    "handle": "semillas-de-girasol-peladas",
    "title": "Semillas de girasol peladas - (1 kg - 250 g)",
    "category": "semillas",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/4B69B137-85D1-40F0-8B88-8F88BF8F9269_645c0fe0-7692-4cd2-aff1-2041a323b871.jpg?v=1692306551",
    "description": "Beneficios de comer semillas de girasol Las semillas de girasol son una excelente fuente de vitamina E, un poderoso antioxidante que protege contra enfermedades cardiovasculares y complicaciones por diabetes. Además, aportan fibra, proteínas, grasas saludables y minerales esencia",
    "weights": [
      {
        "label": "1 kg",
        "price": 240.0
      },
      {
        "label": "250 g",
        "price": 70.0
      },
      {
        "label": "500 gr",
        "price": 130.0
      }
    ]
  },
  {
    "handle": "castanas-de-caju-tostadas-sin-sal",
    "title": "Castañas de cajú tostadas Sin sal (1 kg - 250 g)",
    "category": "frutos-secos",
    "badges": [
      "Natural",
      "Sin sal"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/29E5E54E-457C-4F89-9D30-E3C8688CBC6E_2395ffde-3140-4e05-ada1-cdc0f8d7bf1c.jpg?v=1692305597",
    "description": "Beneficios y propiedades de las castañas de cajú No solo para disfrutar en una picada, las castañas de cajú son una valiosa fuente de ácidos grasos insaturados. Ayudan a equilibrar el colesterol y triglicéridos, son antioxidantes y favorecen el restablecimiento de calcio en los h",
    "weights": [
      {
        "label": "1kg",
        "price": 960.0
      },
      {
        "label": "250 gr",
        "price": 100.0
      },
      {
        "label": "500 gr",
        "price": 540.0
      }
    ]
  },
  {
    "handle": "granola-pasas-de-uva",
    "title": "Granola - Pasas de uva (1 kg - 500 gr)",
    "category": "granolas",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/532F14FF-2C84-4CB4-83EF-A65DE34BCBE9_1a214e74-a914-4762-973b-6153e98e1f7a.jpg?v=1692362408",
    "description": "Granola Saludable y Artesanal La granola JOKA con pasas de uva está hecha con ingredientes seleccionados: avena, almendras, castañas de cajú, semillas de girasol, lino, chía y chips de chocolate. Una mezcla crocante, naturalmente dulce y llena de energía. Beneficios Aporta fibra ",
    "weights": [
      {
        "label": "1 Kg",
        "price": 500.0
      },
      {
        "label": "500 g",
        "price": 300.0
      }
    ]
  },
  {
    "handle": "granola-chips-de-chocolate",
    "title": "Granola - Chips de chocolate (1 kg - 500 gr)",
    "category": "granolas",
    "badges": [
      "Natural",
      "Con chocolate"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/C7428F3B-32E3-4763-BEE7-D0EF6B4089A3_0b867ff4-e8b3-42a5-aab1-1ef6f91d6668.jpg?v=1692362484",
    "description": "Granola Saludable y Artesanal La granola JOKA con chips de chocolate está hecha con ingredientes seleccionados: avena, almendras, castañas de cajú, semillas de girasol, lino, chía y chips de chocolate. Una mezcla crocante, naturalmente dulce y llena de energía. Beneficios Aporta ",
    "weights": [
      {
        "label": "1 Kg",
        "price": 500.0
      },
      {
        "label": "500 gr",
        "price": 300.0
      }
    ]
  },
  {
    "handle": "granola-tradicional",
    "title": "Granola - Tradicional (1 kg - 500 gr)",
    "category": "granolas",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/40F50257-12B4-48FD-94FE-B21AB4A27A7A.jpg?v=1692362282",
    "description": "Granola Saludable y Artesanal La granola JOKA tradicional está hecha con ingredientes seleccionados: avena, almendras, castañas de cajú, semillas de girasol, lino y chía. Una mezcla crocante, naturalmente dulce y llena de energía. Beneficios Aporta fibra y proteínas vegetales, es",
    "weights": [
      {
        "label": "1 Kg",
        "price": 500.0
      },
      {
        "label": "500 gr",
        "price": 500.0
      }
    ]
  },
  {
    "handle": "crema-de-mani-proteica-350-g",
    "title": "Crema de maní - Proteica  350 gr",
    "category": "cremas",
    "badges": [
      "Natural",
      "Proteico"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/DDF0116C-82F9-4212-9CC8-5F91D19C3FD0_2044b5a7-a072-442f-b0aa-021d01db9a94.jpg?v=1692362721",
    "description": "Crema de Maní Proteica - 350 g La crema de maní proteica sabor vainilla JOKA es una combinación de whey protein y maní 100% natural que, además de tener una textura cremosa, posee un sabor a vainilla exquisito. Alimento saludable y versátil Es un alimento saludable, sin azúcar ag",
    "weights": [
      {
        "label": "350 g",
        "price": 210.0
      }
    ]
  },
  {
    "handle": "crema-de-mani-natural",
    "title": "Crema de maní - Natural 350 g",
    "category": "cremas",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/products/2076022E-2A25-484D-B905-11595399E447_932790a8-fabc-421e-940c-16dac89a78c5.jpg?v=1692362909",
    "description": "Crema de Maní Natural - 350 g La crema de maní JOKA está elaborada con maní 100% natural seleccionado para lograr una textura cremosa y un sabor original exquisito. Alimento saludable y versátil Es un alimento saludable, sin azúcar agregada, ideal para disfrutar en tostadas, licu",
    "weights": [
      {
        "label": "350 g",
        "price": 210.0
      }
    ]
  },
  {
    "handle": "crema-de-mani-coco-350-g",
    "title": "Crema de maní - Coco 350 g",
    "category": "cremas",
    "badges": [
      "Natural"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/files/66297ABF-74D6-4511-A60D-B1ED85368C9F_212921ba-bca9-4458-bd69-26814d6c8a26.jpg?v=1718369765",
    "description": "Crema de Maní Coco - 350 g La crema de maní coco está elaborada con maní 100% natural que, además de contar con una textura cremosa, se caracteriza por un sabor sutil a coco exquisito. Alimento saludable y versátil Es un alimento saludable, sin azúcar agregada, ideal para disfrut",
    "weights": [
      {
        "label": "350 g",
        "price": 210.0
      }
    ]
  },
  {
    "handle": "crema-de-mani-chocolate-350-gr",
    "title": "Crema de maní - Chocolate  350 g",
    "category": "cremas",
    "badges": [
      "Natural",
      "Con chocolate"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0553/3928/6723/files/d1a24ddd-8ab6-47ae-9e3b-555548ba5af0_png.png?v=1762185210",
    "description": "Crema de Maní Chocolate - 350 g La crema de maní chocolate es la mezcla perfecta entre cacao y maní 100% natural que, además de tener una textura cremosa, posee un sutil sabor a chocolate exquisito para aquellos amantes del chocolate. Alimento saludable y versátil Es un alimento ",
    "weights": [
      {
        "label": "350 g",
        "price": 210.0
      }
    ]
  }
] ;
