import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/contexts/CartContext";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

function HomeContent() {
  const [, navigate] = useLocation();
  const { data: brands = [] } = trpc.brands.list.useQuery();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartDrawer />

      {/* Hero Section - Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-64px-120px)] relative overflow-hidden px-4">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#001a4d]/5 dark:bg-[#001a4d]/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#660000]/5 dark:bg-[#660000]/10 blur-3xl" />
        </div>

        <div className="relative text-center space-y-8 max-w-4xl">
          {/* Main title */}
          <h1 className="font-black text-[clamp(3rem,20vw,10rem)] leading-none tracking-[0.05em] select-none">
            <span style={{ color: "#660000" }}>Sport</span>
            <span style={{ color: "#001a4d" }}>X</span>
          </h1>

          {/* Slogan */}
          <p className="text-sm md:text-lg font-semibold tracking-[0.3em] uppercase text-muted-foreground">
            The Next Level of Sports
          </p>

          {/* Brand quick links */}
          {brands.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-12 pt-8 border-t border-border/50">
              {brands.map((brand) => (
                <button
                  key={brand.slug}
                  onClick={() => navigate(`/products/${brand.slug}`)}
                  className="group flex flex-col items-center gap-2 px-6 py-3 rounded-lg hover:bg-accent transition-all duration-200"
                >
                  <span className="text-lg md:text-xl font-black text-foreground group-hover:text-[#001a4d] dark:group-hover:text-blue-300 transition-colors">
                    {brand.name}
                  </span>
                  <span className="text-xs text-muted-foreground group-hover:text-[#001a4d] dark:group-hover:text-blue-300 transition-colors opacity-0 group-hover:opacity-100">
                    Ver coleção →
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <HomeContent />
    </CartProvider>
  );
}
