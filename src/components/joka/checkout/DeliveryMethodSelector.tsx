import { Truck, Store } from "lucide-react";
import type { DeliveryMethod } from "@/lib/checkout/constants";

const OPTIONS: Array<{
  value: DeliveryMethod;
  icon: typeof Truck;
  title: string;
  hint: string;
}> = [
  {
    value: "shipping",
    icon: Truck,
    title: "Envío a domicilio",
    hint: "Llega en 24–72hs",
  },
  {
    value: "pickup",
    icon: Store,
    title: "Retiro en el local",
    hint: "Sin costo de envío",
  },
];

export function DeliveryMethodSelector({
  value,
  onChange,
}: {
  value: DeliveryMethod;
  onChange: (m: DeliveryMethod) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Método de entrega"
      className="sticky top-20 z-10 grid grid-cols-2 gap-2 p-1.5 rounded-2xl border bg-card/90 backdrop-blur"
    >
      {OPTIONS.map(({ value: v, icon: Icon, title, hint }) => {
        const active = value === v;
        return (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(v)}
            className={`group flex items-center gap-3 rounded-xl px-3 sm:px-4 py-3 text-left transition ${
              active
                ? "bg-primary text-primary-foreground shadow-soft"
                : "hover:bg-muted text-foreground"
            }`}
          >
            <span
              className={`grid place-items-center w-9 h-9 rounded-full shrink-0 ${
                active ? "bg-primary-foreground/15" : "bg-secondary"
              }`}
            >
              <Icon className="w-4 h-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium leading-tight">
                {title}
              </span>
              <span
                className={`block text-[11px] truncate ${
                  active ? "opacity-80" : "text-muted-foreground"
                }`}
              >
                {hint}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
