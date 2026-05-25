import { create } from "zustand";
import type { DeliveryMethod } from "@/lib/checkout/constants";

type CheckoutState = {
  delivery: DeliveryMethod;
  setDelivery: (m: DeliveryMethod) => void;
};

export const useCheckout = create<CheckoutState>((set) => ({
  delivery: "shipping",
  setDelivery: (delivery) => set({ delivery }),
}));
