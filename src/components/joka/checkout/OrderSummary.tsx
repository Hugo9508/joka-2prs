import { useState } from "react";
import { ShieldCheck, Tag } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/stores/cart";
import type { PriceBreakdown } from "@/lib/checkout/pricing";
import type { DeliveryMethod } from "@/lib/checkout/constants";

export function OrderSummary({
  items,
  pricing,
  delivery,
}: {
  items: CartItem[];
  pricing: PriceBreakdown;
  delivery: DeliveryMethod;
}) {
  const [coupon, setCoupon] = useState("");

  return (
    <aside className="lg:sticky lg:top-28 self-start space-y-5 rounded-3xl border bg-card p-6 h-fit">
      <h2 className="font-display text-lg font-semibold">Tu pedido</h2>
      <ul className="space-y-4">
        {items.map((i) => (
          <li key={i.id} className="flex gap-3">
            <div className="relative">
              <img
                src={i.image}
                alt={i.title}
                className="w-14 h-14 rounded-xl object-cover bg-secondary"
              />
              <span className="absolute -top-2 -right-2 grid place-items-center w-5 h-5 rounded-full bg-foreground text-background text-[10px]">
                {i.qty}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm leading-tight line-clamp-2">{i.title}</p>
              <p className="text-xs text-muted-foreground">{i.weightLabel}</p>
            </div>
            <p className="text-sm font-medium tabular-nums">
              {formatPrice(i.price * i.qty)}
            </p>
          </li>
        ))}
      </ul>

      <div className="pt-4 border-t flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Cupón"
            className="w-full pl-8 pr-3 py-2.5 text-sm rounded-full border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          type="button"
          className="rounded-full border px-4 text-sm hover:bg-muted transition"
        >
          Aplicar
        </button>
      </div>

      <div className="space-y-2 pt-4 border-t text-sm">
        <Row label="Subtotal" value={formatPrice(pricing.subtotal)} />
        {delivery === "pickup" ? (
          <Row
            label="Envío"
            value="Retiro en local"
            valueClassName="text-olive-deep"
          />
        ) : pricing.freeShipping ? (
          <Row label="Envío" value="Gratis" valueClassName="text-olive-deep" />
        ) : (
          <Row label="Envío" value={formatPrice(pricing.shipping)} />
        )}
        {delivery === "shipping" && !pricing.freeShipping && (
          <p className="text-[11px] text-muted-foreground">
            Te faltan {formatPrice(pricing.amountToFreeShipping)} para envío
            gratis.
          </p>
        )}
        <Row
          label="Total"
          value={formatPrice(pricing.total)}
          className="text-base font-display font-semibold pt-2 border-t mt-2"
        />
      </div>

      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="w-3.5 h-3.5 text-olive-deep" />
        Compra protegida · 100% seguro
      </p>
    </aside>
  );
}

function Row({
  label,
  value,
  className = "",
  valueClassName = "",
}: {
  label: string;
  value: string;
  className?: string;
  valueClassName?: string;
}) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span className="text-muted-foreground">{label}</span>
      <span className={`tabular-nums ${valueClassName}`}>{value}</span>
    </div>
  );
}
