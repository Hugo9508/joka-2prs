import { createFileRoute, Link } from "@tanstack/react-router";
import historiaHero from "@/assets/historia-hero.jpg";

export const Route = createFileRoute("/historia")({
  component: Historia,
  head: () => ({
    meta: [
      { title: "Nuestra historia · JOKA" },
      {
        name: "description",
        content:
          "JOKA nació en Uruguay con una idea simple: comida real, sin agregados raros, hecha con calma.",
      },
    ],
  }),
});

function Historia() {
  return (
    <>
      <section className="container-joka pt-16 md:pt-24 pb-12 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">
          Nuestra historia
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.02]">
          Comida real, hecha con calma.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          JOKA nació en Uruguay con una idea simple: cuando los ingredientes son
          buenos, sobra todo lo demás. Por eso elaboramos cada producto con
          materias primas seleccionadas, sin azúcares innecesarios ni
          conservantes raros.
        </p>
      </section>

      <section className="container-joka pb-20">
        <div className="rounded-3xl overflow-hidden aspect-[16/9] img-zoom">
          <img
            src={historiaHero}
            alt="Familia compartiendo alimentos naturales con semillas y frutos secos en la cocina"
            className="w-full h-full object-cover"
            width={1536}
            height={864}
          />
        </div>
      </section>

      <section className="container-joka pb-24 grid md:grid-cols-3 gap-10">
        {[
          {
            t: "Lo natural primero",
            d: "Trabajamos con productores locales y procesos simples. Nada raro.",
          },
          {
            t: "Sabor, sin atajos",
            d: "Cada receta se ajusta hasta que sentimos que está lista. Sin apuros.",
          },
          {
            t: "Para tu día a día",
            d: "Comida que entra fácil en tu rutina: desayuno, snack, post-entreno.",
          },
        ].map((b) => (
          <div key={b.t}>
            <h3 className="font-display text-xl font-semibold">{b.t}</h3>
            <p className="text-muted-foreground mt-2">{b.d}</p>
          </div>
        ))}
      </section>

      <section className="container-joka pb-32 text-center">
        <Link
          to="/tienda"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 font-medium hover:opacity-90 transition"
        >
          Explorá el catálogo
        </Link>
      </section>
    </>
  );
}
