import { Clock, MapPin, ExternalLink } from "lucide-react";
import { STORE_INFO } from "@/lib/checkout/constants";

export function PickupInfo() {
  return (
    <div className="animate-fade-in rounded-2xl border bg-secondary/30 p-5 space-y-3">
      <p className="text-sm">
        Podés retirar tu pedido en nuestro local — sin costo de envío.
      </p>
      <div className="space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-0.5 text-olive-deep shrink-0" />
          <div>
            <p className="font-medium">{STORE_INFO.name}</p>
            <p className="text-muted-foreground">{STORE_INFO.address}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Clock className="w-4 h-4 mt-0.5 text-olive-deep shrink-0" />
          <p className="text-muted-foreground">{STORE_INFO.hours}</p>
        </div>
      </div>
      <a
        href={STORE_INFO.mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-olive-deep hover:underline"
      >
        Ver en Google Maps <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}
