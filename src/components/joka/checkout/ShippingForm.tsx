import { useEffect, useRef } from "react";
import { Input } from "./Input";

export function ShippingForm({ autoFocus }: { autoFocus?: boolean }) {
  const firstRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (autoFocus) firstRef.current?.focus();
  }, [autoFocus]);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input ref={firstRef} label="Nombre" name="firstName" required />
        <Input label="Apellido" name="lastName" required />
      </div>
      <Input label="Dirección" name="address" required autoComplete="street-address" />
      <div className="grid sm:grid-cols-3 gap-4">
        <Input label="Ciudad" name="city" required autoComplete="address-level2" />
        <Input
          label="Departamento"
          name="state"
          required
          autoComplete="address-level1"
        />
        <Input label="Código postal" name="zip" autoComplete="postal-code" />
      </div>
    </div>
  );
}
