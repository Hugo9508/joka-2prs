import {
  FREE_SHIPPING_FROM,
  SHIPPING_FLAT,
  type DeliveryMethod,
} from "./constants";

export type PriceBreakdown = {
  subtotal: number;
  shipping: number;
  total: number;
  freeShipping: boolean;
  amountToFreeShipping: number;
};

export function computePricing(
  subtotal: number,
  method: DeliveryMethod,
): PriceBreakdown {
  if (method === "pickup") {
    return {
      subtotal,
      shipping: 0,
      total: subtotal,
      freeShipping: true,
      amountToFreeShipping: 0,
    };
  }
  const free = subtotal >= FREE_SHIPPING_FROM;
  const shipping = free ? 0 : SHIPPING_FLAT;
  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
    freeShipping: free,
    amountToFreeShipping: free ? 0 : FREE_SHIPPING_FROM - subtotal,
  };
}
