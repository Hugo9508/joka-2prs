import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Leaf } from "lucide-react";

export const Route = createFileRoute("/gracias")({
  component: Thanks,
  head: () => ({ meta: [{ title: "¡Gracias! · JOKA" }] }),
});

function Thanks() {
  return (
    <section className="container-joka py-24 md:py-32 text-center">
      <div className="grid place-items-center w-20 h-20 mx-auto rounded-full bg-primary text-primary-foreground mb-8">
        <Check className="w-9 h-9" />
      </div>
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
        Pedido confirmado
      </p>
      <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.02]">
        ¡Gracias por elegir natural!
      </h1>
      <p className="text-muted-foreground mt-5 max-w-xl mx-auto text-lg">
        Estamos preparando tu pedido con todo el cuidado. Te enviamos un email
        con los detalles y el seguimiento.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/tienda"
          className="rounded-full bg-foreground text-background px-6 py-3 font-medium hover:opacity-90"
        >
          Volver a la tienda
        </Link>
        <Link
          to="/"
          className="rounded-full border px-6 py-3 font-medium hover:bg-muted inline-flex items-center gap-2"
        >
          <Leaf className="w-4 h-4 text-olive-deep" /> Inicio
        </Link>
      </div>
    </section>
  );
}
