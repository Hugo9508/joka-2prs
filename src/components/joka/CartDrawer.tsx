import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/stores/cart";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, subtotal } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-background shadow-soft flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            <h2 className="font-display text-lg font-semibold">Tu carrito</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-muted"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="h-full grid place-items-center text-center p-8">
              <div>
                <div className="grid place-items-center w-16 h-16 mx-auto rounded-full bg-secondary mb-4">
                  <ShoppingBag className="w-6 h-6 text-olive-deep" />
                </div>
                <p className="font-display text-lg">Tu carrito está vacío</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Encontrá algo rico y natural en la tienda.
                </p>
                <Link
                  to="/tienda"
                  onClick={() => setOpen(false)}
                  className="inline-block mt-6 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium"
                >
                  Ir a la tienda
                </Link>
              </div>
            </div>
          ) : (
            <ul className="divide-y">
              {items.map((it) => (
                <li key={it.id} className="p-4 flex gap-4">
                  <img
                    src={it.image}
                    alt={it.title}
                    className="w-20 h-20 rounded-xl object-cover bg-secondary"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium leading-tight line-clamp-2">
                      {it.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {it.weightLabel}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center border rounded-full">
                        <button
                          className="p-1.5"
                          onClick={() => setQty(it.id, it.qty - 1)}
                          aria-label="Restar"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-sm tabular-nums">
                          {it.qty}
                        </span>
                        <button
                          className="p-1.5"
                          onClick={() => setQty(it.id, it.qty + 1)}
                          aria-label="Sumar"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-medium tabular-nums">
                        {formatPrice(it.price * it.qty)}
                      </span>
                    </div>
                    <button
                      onClick={() => remove(it.id)}
                      className="text-xs text-muted-foreground hover:text-destructive mt-1"
                    >
                      Quitar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-6 space-y-4 bg-card">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-display text-xl font-semibold">
                {formatPrice(subtotal())}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Envío e impuestos se calculan en el checkout.
            </p>
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="block text-center rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:opacity-90 transition"
            >
              Finalizar compra
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
