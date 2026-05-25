import { SHIPPING, PAYMENTS, FAQS } from "@/data/knowledge";

export const CHECKOUT_PROMPT = `LOGÍSTICA Y PAGOS:
- Envíos: ${SHIPPING.coverage} ${SHIPPING.montevideo} ${SHIPPING.interior} ${SHIPPING.freeFromLabel}
- Medios de pago: ${PAYMENTS.methods.join(", ")}. ${PAYMENTS.installments}
- Para finalizar la compra: indicá /checkout.

FAQs:
${FAQS.map((f) => `- ${f.topic} → ${f.content}`).join("\n")}
`;
