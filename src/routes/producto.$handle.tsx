import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Leaf, Plus, ShieldCheck, Truck } from "lucide-react";
import { PRODUCTS, type Weight } from "@/data/products";
import { useCart } from "@/stores/cart";
import { formatPrice } from "@/lib/format";
import { ProductCard } from "@/components/joka/ProductCard";
import { recordViewedProduct } from "@/lib/joka-ai/memory";

export const Route = createFileRoute("/producto/$handle")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.handle === params.handle);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-joka py-32 text-center">
      <h1 className="font-display text-3xl">Producto no encontrado</h1>
      <Link to="/tienda" className="text-olive-deep underline mt-4 inline-block">
        Volver a la tienda
      </Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [idx, setIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const w = product.weights[idx];
  useEffect(() => {
    recordViewedProduct(product.handle);
  }, [product.handle]);

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.handle !== product.handle,
  ).slice(0, 4);

  return (
    <>
      <section className="container-joka pt-8 md:pt-12 pb-16">
        <Link
          to="/tienda"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Tienda
        </Link>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          <div className="rounded-3xl bg-secondary/40 overflow-hidden aspect-square img-zoom">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap gap-1.5">
              {product.badges.map((b: string) => (
                <span
                  key={b}
                  className="text-[10px] uppercase tracking-wide font-medium bg-secondary px-2.5 py-1 rounded-full"
                >
                  {b}
                </span>
              ))}
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-semibold mt-4 leading-tight">
              {product.title}
            </h1>
            <p className="text-3xl font-display font-semibold mt-4">
              {formatPrice(w.price)}
            </p>
            <p className="text-muted-foreground mt-5 leading-relaxed">
              {product.description}
            </p>

            {product.weights.length > 1 && (
              <div className="mt-7">
                <p className="text-sm font-medium mb-2">Tamaño</p>
                <div className="flex flex-wrap gap-2">
                  {product.weights.map((wt: Weight, i: number) => (
                    <button
                      key={wt.label}
                      data-active={i === idx}
                      onClick={() => setIdx(i)}
                      className="chip"
                    >
                      {wt.label} · {formatPrice(wt.price)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center border rounded-full">
                <button
                  className="px-3 py-2.5"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="w-8 text-center tabular-nums">{qty}</span>
                <button
                  className="px-3 py-2.5"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() =>
                  add(
                    {
                      id: `${product.handle}__${w.label}`,
                      handle: product.handle,
                      title: product.title,
                      image: product.image,
                      weightLabel: w.label,
                      price: w.price,
                    },
                    qty,
                  )
                }
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 font-medium hover:opacity-90 transition"
              >
                <Plus className="w-4 h-4" /> Añadir al carrito
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-10 pt-8 border-t text-xs text-muted-foreground">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Leaf className="w-4 h-4 text-olive-deep" />
                100% natural
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Truck className="w-4 h-4 text-olive-deep" />
                Envío Uruguay
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <ShieldCheck className="w-4 h-4 text-olive-deep" />
                Compra segura
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-joka pb-24">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-8">
            Te puede gustar
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
