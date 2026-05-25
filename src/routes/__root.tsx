import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/joka/Header";
import { Footer } from "@/components/joka/Footer";
import { CartDrawer } from "@/components/joka/CartDrawer";
import { JokaAssist } from "@/components/joka/JokaAssist";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-semibold">404</h1>
        <p className="mt-3 text-muted-foreground">
          Esta página no existe o se mudó a otra góndola.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold">
          Algo no cargó bien
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Probemos de nuevo.
        </p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "JOKA — Nutrición real para tu día a día" },
        {
          name: "description",
          content:
            "Tienda natural uruguaya: cremas de maní, granolas, frutos secos, semillas, miel y combos. Ingredientes reales, elaborados con cuidado.",
        },
        { property: "og:title", content: "JOKA — Nutrición real" },
        {
          property: "og:description",
          content:
            "Cremas de maní, granolas, frutos secos y más. Naturales, sin agregados raros.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap",
        },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <JokaAssist />
    </QueryClientProvider>
  );
}
