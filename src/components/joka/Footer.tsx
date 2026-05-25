import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-secondary/40">
      <div className="container-joka py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-primary text-primary-foreground">
              <Leaf className="w-4 h-4" />
            </span>
            <span className="font-display text-2xl font-semibold">joka</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Nutrición real para tu día a día. Productos naturales seleccionados,
            elaborados en Uruguay.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-3">Tienda</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/tienda" className="hover:text-foreground">
                Todos los productos
              </Link>
            </li>
            <li>
              <Link
                to="/tienda"
                search={{ cat: "cremas" }}
                className="hover:text-foreground"
              >
                Cremas
              </Link>
            </li>
            <li>
              <Link
                to="/tienda"
                search={{ cat: "granolas" }}
                className="hover:text-foreground"
              >
                Granolas
              </Link>
            </li>
            <li>
              <Link
                to="/tienda"
                search={{ cat: "combos" }}
                className="hover:text-foreground"
              >
                Combos
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-3">Ayuda</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Envíos a todo Uruguay</li>
            <li>Pagos seguros</li>
            <li>Devoluciones</li>
            <li>Contacto</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-3">
            Sumate al boletín
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            Recetas, lanzamientos y promos. Una vez por semana, nada más.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              required
              placeholder="tu@email.com"
              className="flex-1 rounded-full border px-4 py-2 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="rounded-full bg-foreground text-background px-4 text-sm font-medium hover:opacity-90"
            >
              Sumarme
            </button>
          </form>
        </div>
      </div>
      <div className="border-t">
        <div className="container-joka py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} JOKA · Uruguay</p>
          <p>Elaborado con ingredientes reales 🌱</p>
        </div>
      </div>
    </footer>
  );
}
