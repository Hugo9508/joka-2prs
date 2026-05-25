import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/stores/cart";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const [idx, setIdx] = useState(0);
  const add = useCart((s) => s.add);
  const w = product.weights[idx];

  return (
    <div className="group flex flex-col rounded-2xl bg-card border hover-lift overflow-hidden">
      <Link
        to="/producto/$handle"
        params={{ handle: product.handle }}
        className="block relative aspect-square bg-secondary/30 img-zoom"
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.badges.slice(0, 2).map((b) => (
            <span
              key={b}
              className="text-[10px] uppercase tracking-wide font-medium bg-background/85 backdrop-blur px-2 py-1 rounded-full text-foreground/80"
            >
              {b}
            </span>
          ))}
        </div>
      </Link>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <Link
          to="/producto/$handle"
          params={{ handle: product.handle }}
          className="font-display text-base leading-tight font-medium hover:text-olive-deep transition line-clamp-2 min-h-[2.5rem]"
        >
          {product.title}
        </Link>

        {product.weights.length > 1 && (
          <div className="flex flex-wrap gap-1.5">
            {product.weights.map((wt, i) => (
              <button
                key={wt.label}
                data-active={i === idx}
                className="chip"
                onClick={() => setIdx(i)}
              >
                {wt.label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-lg font-semibold">
            {formatPrice(w.price)}
          </span>
          <button
            onClick={() =>
              add({
                id: `${product.handle}__${w.label}`,
                handle: product.handle,
                title: product.title,
                image: product.image,
                weightLabel: w.label,
                price: w.price,
              })
            }
            className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium px-3 py-2 hover:opacity-90 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}
