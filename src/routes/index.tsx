import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Sprout, HandHeart, Truck } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { ProductCard } from "@/components/joka/ProductCard";

export const Route = createFileRoute("/")({
  component: Home,
});

const HERO_IMG =
  "https://images.unsplash.com/photo-1505253468034-514d2507d914?auto=format&fit=crop&w=1800&q=80";

const CATEGORY_IMAGES: Record<string, string> = {
  cremas:
    "https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=900&q=80",
  granolas:
    "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=900&q=80",
  "frutos-secos":
    "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=900&q=80",
  semillas:
    "https://images.unsplash.com/photo-1612257999780-d4d4f2dadcd0?auto=format&fit=crop&w=900&q=80",
  naturales:
    "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80",
  combos:
    "https://images.unsplash.com/photo-1495546968767-f0573cca821e?auto=format&fit=crop&w=900&q=80",
};

function Home() {
  const featured = PRODUCTS.slice(0, 8);
  return (
    <>
      {/* HERO */}
      <section className="relative -mt-16 md:-mt-20 h-[88vh] min-h-[560px] overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Mesa con productos naturales"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/70 via-foreground/30 to-transparent" />
        <div className="relative h-full container-joka flex flex-col justify-end pb-20 md:pb-28 fade-in-up">
          <span className="inline-flex items-center gap-2 self-start text-xs uppercase tracking-[0.18em] text-background/85 mb-5">
            <Leaf className="w-3.5 h-3.5" /> Tienda natural uruguaya
          </span>
          <h1 className="text-background font-display font-semibold text-5xl md:text-7xl leading-[0.95] max-w-3xl">
            Nutrición real <br />
            <span className="italic font-normal text-honey">
              para tu día a día.
            </span>
          </h1>
          <p className="mt-6 text-background/85 max-w-xl text-base md:text-lg">
            Cremas, granolas, frutos secos y semillas elaborados con
            ingredientes reales. Sin agregados raros. Hechos con calma.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/tienda"
              className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3.5 font-medium hover:bg-honey hover:text-foreground transition"
            >
              Comprar ahora <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/historia"
              className="inline-flex items-center gap-2 rounded-full border border-background/40 text-background px-6 py-3.5 font-medium hover:bg-background/10 transition"
            >
              Conocé JOKA
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y bg-secondary/40">
        <div className="container-joka grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
          {[
            { icon: Leaf, label: "100% natural" },
            { icon: Sprout, label: "Sin agregados raros" },
            { icon: Truck, label: "Envíos a todo Uruguay" },
            { icon: HandHeart, label: "Hecho con cuidado" },
          ].map((it) => (
            <div
              key={it.label}
              className="flex items-center gap-3 text-sm text-foreground/80"
            >
              <it.icon className="w-5 h-5 text-olive-deep" />
              <span>{it.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-joka py-20 md:py-28">
        <div className="flex items-end justify-between mb-10 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Explorá por categoría
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold max-w-2xl">
              Lo que comés cuenta. Elegí natural.
            </h2>
          </div>
          <Link
            to="/tienda"
            className="hidden md:inline-flex items-center gap-1 text-sm hover:gap-2 transition-all"
          >
            Ver todo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.slug}
              to="/tienda"
              search={{ cat: c.slug }}
              className={`group relative rounded-3xl overflow-hidden bg-card hover-lift ${
                i === 0 ? "md:row-span-2 md:col-span-2 aspect-[4/3]" : "aspect-square"
              } img-zoom`}
            >
              <img
                src={CATEGORY_IMAGES[c.slug]}
                alt={c.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 md:p-7 text-background">
                <p className="text-[11px] uppercase tracking-[0.18em] opacity-80">
                  {c.desc}
                </p>
                <h3 className="font-display text-2xl md:text-4xl font-semibold mt-1">
                  {c.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container-joka pb-20 md:pb-28">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-semibold">
            Los más vendidos
          </h2>
          <Link
            to="/tienda"
            className="text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
          >
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="container-joka pb-24">
        <div className="rounded-3xl overflow-hidden bg-primary text-primary-foreground grid md:grid-cols-2">
          <div className="p-10 md:p-16 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.18em] opacity-70 mb-3">
              Nuestro compromiso
            </p>
            <h3 className="font-display text-3xl md:text-5xl font-semibold leading-tight">
              Ingredientes reales para días reales.
            </h3>
            <p className="mt-5 opacity-85 max-w-md">
              Trabajamos directo con productores locales. Sin azúcares
              agregados, sin conservantes raros, sin promesas vacías. Solo
              comida que te hace bien.
            </p>
            <Link
              to="/tienda"
              className="mt-8 self-start inline-flex items-center gap-2 rounded-full bg-honey text-foreground px-6 py-3 font-medium hover:opacity-90 transition"
            >
              Elegí natural <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative min-h-[320px] md:min-h-[480px] img-zoom">
            <img
              src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=1400&q=80"
              alt="Productores locales"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
