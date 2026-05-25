import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { ProductCard } from "@/components/joka/ProductCard";

const searchSchema = z.object({
  cat: z.string().optional(),
});

export const Route = createFileRoute("/tienda")({
  validateSearch: searchSchema,
  component: Tienda,
  head: () => ({
    meta: [
      { title: "Tienda · JOKA" },
      {
        name: "description",
        content:
          "Catálogo completo de productos naturales JOKA: cremas, granolas, frutos secos, semillas y combos.",
      },
    ],
  }),
});

function Tienda() {
  const { cat } = Route.useSearch();
  const filtered = cat ? PRODUCTS.filter((p) => p.category === cat) : PRODUCTS;
  const active = CATEGORIES.find((c) => c.slug === cat);

  return (
    <section className="container-joka pt-12 md:pt-20 pb-24">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
          Tienda
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.02]">
          {active ? active.name : "Todo el catálogo"}
        </h1>
        <p className="mt-4 text-muted-foreground text-lg max-w-xl">
          {active?.desc ??
            "Encontrá los favoritos de JOKA. Naturales, simples, deliciosos."}
        </p>
      </div>

      {/* category chips */}
      <div className="mt-8 flex flex-wrap gap-2">
        <Link to="/tienda" className="chip" data-active={!cat}>
          Todo
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            to="/tienda"
            search={{ cat: c.slug }}
            className="chip"
            data-active={cat === c.slug}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.handle} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-20">
          Próximamente más productos en esta categoría.
        </p>
      )}
    </section>
  );
}
