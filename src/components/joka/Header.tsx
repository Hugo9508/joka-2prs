import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X, Leaf } from "lucide-react";
import { useCart } from "@/stores/cart";
import { CATEGORIES } from "@/data/products";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const setOpen = useCart((s) => s.setOpen);
  const count = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "glass-panel shadow-soft"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-joka flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-primary text-primary-foreground">
            <Leaf className="w-4 h-4" />
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight">
            joka
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link
            to="/tienda"
            className="hover:text-olive-deep transition-colors"
          >
            Tienda
          </Link>
          {CATEGORIES.slice(0, 4).map((c) => (
            <Link
              key={c.slug}
              to="/tienda"
              search={{ cat: c.slug }}
              className="hover:text-olive-deep transition-colors"
            >
              {c.name}
            </Link>
          ))}
          <Link
            to="/historia"
            className="hover:text-olive-deep transition-colors"
          >
            Nuestra historia
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="relative inline-flex items-center gap-2 rounded-full px-4 py-2 bg-foreground text-background text-sm font-medium hover:opacity-90 transition"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Carrito</span>
            {count > 0 && (
              <span className="grid place-items-center min-w-5 h-5 px-1.5 rounded-full bg-honey text-foreground text-xs font-semibold">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-full hover:bg-muted"
            aria-label="Menú"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-card">
          <div className="container-joka py-4 flex flex-col gap-3">
            <Link
              to="/tienda"
              onClick={() => setMobileOpen(false)}
              className="py-2"
            >
              Tienda
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/tienda"
                search={{ cat: c.slug }}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-muted-foreground"
              >
                {c.name}
              </Link>
            ))}
            <Link
              to="/historia"
              onClick={() => setMobileOpen(false)}
              className="py-2"
            >
              Nuestra historia
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
