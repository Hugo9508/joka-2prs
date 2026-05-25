import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { useCart } from "@/stores/cart";
import { useCheckout } from "@/stores/checkout";
import { computePricing } from "@/lib/checkout/pricing";
import { formatPrice } from "@/lib/format";
import { DeliveryMethodSelector } from "@/components/joka/checkout/DeliveryMethodSelector";
import { ShippingForm } from "@/components/joka/checkout/ShippingForm";
import { PickupInfo } from "@/components/joka/checkout/PickupInfo";
import { OrderSummary } from "@/components/joka/checkout/OrderSummary";
import { Input } from "@/components/joka/checkout/Input";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({ meta: [{ title: "Checkout · JOKA" }] }),
});

function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clear } = useCart();
  const { delivery, setDelivery } = useCheckout();
  const [submitting, setSubmitting] = useState(false);

  const pricing = useMemo(
    () => computePricing(subtotal(), delivery),
    [items, delivery, subtotal],
  );

  if (items.length === 0) {
    return (
      <section className="container-joka py-32 text-center">
        <h1 className="font-display text-3xl">Tu carrito está vacío</h1>
        <Link
          to="/tienda"
          className="inline-block mt-6 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm"
        >
          Ir a la tienda
        </Link>
      </section>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    clear();
    navigate({ to: "/gracias" });
  };

  return (
    <section className="container-joka py-10 md:py-16">
      <h1 className="font-display text-3xl md:text-5xl font-semibold mb-2">
        Finalizar compra
      </h1>
      <p className="text-muted-foreground mb-8">
        Estás a un paso. Tus datos están protegidos.
      </p>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10">
        <form onSubmit={onSubmit} className="space-y-8">
          {/* Método de entrega */}
          <DeliveryMethodSelector value={delivery} onChange={setDelivery} />

          {/* Contacto */}
          <fieldset className="space-y-4">
            <legend className="font-display text-xl font-semibold mb-2">
              Contacto
            </legend>
            <Input label="Email" type="email" name="email" required autoComplete="email" />
            <Input label="Teléfono" type="tel" name="phone" required autoComplete="tel" />
          </fieldset>

          {/* Entrega dinámica */}
          <fieldset className="space-y-4">
            <legend className="font-display text-xl font-semibold mb-2">
              {delivery === "shipping" ? "Envío" : "Retiro"}
            </legend>
            {delivery === "shipping" ? (
              <ShippingForm autoFocus />
            ) : (
              <PickupInfo />
            )}
          </fieldset>

          {/* Pago */}
          <fieldset className="space-y-4">
            <legend className="font-display text-xl font-semibold mb-2 inline-flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Método de pago
            </legend>
            <div className="grid sm:grid-cols-3 gap-2">
              {["Tarjeta", "Mercado Pago", "Efectivo"].map((m, i) => (
                <label
                  key={m}
                  className="flex items-center gap-2 border rounded-2xl px-4 py-3 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-secondary/40 transition"
                >
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked={i === 0}
                    className="accent-foreground"
                  />
                  <span className="text-sm">{m}</span>
                </label>
              ))}
            </div>
            <Input
              label="Número de tarjeta"
              name="card"
              placeholder="•••• •••• •••• ••••"
              inputMode="numeric"
              autoComplete="cc-number"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Vencimiento"
                name="exp"
                placeholder="MM/AA"
                autoComplete="cc-exp"
              />
              <Input
                label="CVC"
                name="cvc"
                placeholder="•••"
                inputMode="numeric"
                autoComplete="cc-csc"
              />
            </div>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3.5 h-3.5" />
              Tus datos están cifrados. JOKA no almacena información de tarjeta.
            </p>
          </fieldset>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-foreground text-background px-6 py-4 font-medium text-base hover:opacity-90 disabled:opacity-60 transition"
          >
            {submitting ? "Procesando…" : `Pagar ${formatPrice(pricing.total)}`}
          </button>
        </form>

        <OrderSummary items={items} pricing={pricing} delivery={delivery} />
      </div>
    </section>
  );
}
