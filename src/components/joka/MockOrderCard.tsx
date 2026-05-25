import { useMemo, useState } from "react";
import { Copy, ExternalLink, Check } from "lucide-react";
import { useCart } from "@/stores/cart";
import { formatPrice } from "@/lib/format";

function randomOrderId() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

/** Pure-CSS QR-looking grid (decorative, mock). */
function MockQR() {
  const cells = useMemo(() => {
    // Deterministic-ish per mount pseudo grid
    return Array.from({ length: 169 }, () => Math.random() > 0.55);
  }, []);
  return (
    <div className="relative grid grid-cols-13 gap-[2px] p-2 bg-white rounded-xl w-[156px] h-[156px]" style={{ gridTemplateColumns: "repeat(13, 1fr)" }}>
      {cells.map((on, i) => (
        <div
          key={i}
          className={on ? "bg-foreground rounded-[1px]" : "bg-transparent"}
        />
      ))}
      {/* Corner finders */}
      {[
        "top-2 left-2",
        "top-2 right-2",
        "bottom-2 left-2",
      ].map((pos) => (
        <div
          key={pos}
          className={`absolute ${pos} w-7 h-7 border-[3px] border-foreground rounded-md bg-white`}
        >
          <div className="m-1 w-3 h-3 bg-foreground rounded-sm" />
        </div>
      ))}
    </div>
  );
}

export function MockOrderCard() {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);
  const [orderId] = useState(() => randomOrderId());
  const [copied, setCopied] = useState(false);
  const [paid, setPaid] = useState(false);
  const link = `https://pay.mock/joka/order-${orderId}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  if (items.length === 0 && !paid) {
    return (
      <div className="rounded-2xl border bg-card p-3 text-xs text-muted-foreground">
        Tu carrito está vacío. Sumale algo y armamos el pedido.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-card p-4 space-y-3 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Pedido
        </p>
        <p className="text-xs font-mono">#{orderId}</p>
      </div>

      <ul className="space-y-1.5 text-sm">
        {items.map((i) => (
          <li key={i.id} className="flex justify-between gap-3">
            <span className="truncate">
              {i.title}{" "}
              <span className="text-muted-foreground">×{i.qty}</span>
            </span>
            <span className="font-medium tabular-nums">
              {formatPrice(i.price * i.qty)}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between text-sm font-semibold border-t pt-2">
        <span>Total</span>
        <span className="tabular-nums">{formatPrice(subtotal)}</span>
      </div>

      <div className="flex gap-3 items-center">
        <MockQR />
        <div className="flex-1 space-y-2 text-xs">
          <p className="text-muted-foreground">QR de pago mock</p>
          <p className="font-mono break-all text-[10px] bg-muted rounded-lg p-2">
            {link}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            setPaid(true);
            setTimeout(() => clear(), 500);
          }}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium px-3 py-2 hover:opacity-90"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Abrir link de pago
        </a>
        <button
          onClick={copy}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border bg-background text-xs font-medium px-3 py-2 hover:bg-muted"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" /> Copiado
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" /> Copiar link
            </>
          )}
        </button>
      </div>
    </div>
  );
}
