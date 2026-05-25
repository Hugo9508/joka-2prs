import { Link } from "@tanstack/react-router";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/stores/cart";

export function InlineProductCard({ handle }: { handle: string }) {
  const p = PRODUCTS.find((x) => x.handle === handle);
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);
  if (!p) return null;
  const w = p.weights[0];

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add({
      id: `${p.handle}-${w.label}`,
      handle: p.handle,
      title: p.title,
      image: p.image,
      weightLabel: w.label,
      price: w.price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="mt-2 flex items-center gap-3 rounded-2xl border bg-card p-2.5">
      <Link
        to="/producto/$handle"
        params={{ handle: p.handle }}
        className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-90"
      >
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="w-14 h-14 rounded-xl object-cover bg-secondary shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-tight line-clamp-2">
            {p.title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatPrice(w.price)}
          </p>
        </div>
      </Link>
      <button
        onClick={handleAdd}
        className="shrink-0 inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 hover:opacity-90 transition"
        aria-label={`Añadir ${p.title}`}
      >
        {added ? (
          <>
            <Check className="w-3.5 h-3.5" /> Añadido
          </>
        ) : (
          <>
            <Plus className="w-3.5 h-3.5" /> Añadir
          </>
        )}
      </button>
    </div>
  );
}
