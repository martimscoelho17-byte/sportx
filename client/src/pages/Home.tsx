import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/contexts/CartContext";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { ChevronRight } from "lucide-react";

function HomeContent() {
  const [, navigate] = useLocation();
  const { data: brands = [] } = trpc.brands.list.useQuery();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartDrawer />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <section className="flex-1 flex flex-col items-center justify-center min-h-[70vh] relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#001a4d]/5 dark:bg-[#001a4d]/20 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#660000]/5 dark:bg-[#660000]/10 blur-3xl" />
          </div>

          <div className="relative text-center px-4 py-20">
            {/* Main title */}
            <h1 className="font-black text-[clamp(4rem,15vw,12rem)] leading-none tracking-[0.05em] select-none mb-4">
              <span style={{ color: "#660000" }}>Sport</span>
              <span style={{ color: "#001a4d" }}>X</span>
            </h1>

            {/* Slogan */}
            <p className="text-sm md:text-base font-semibold tracking-[0.4em] uppercase text-muted-foreground mb-12">
              The Next Level of Sports
            </p>

            {/* Brand quick links */}
            {brands.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                {brands.map((brand) => (
                  <button
                    key={brand.slug}
                    onClick={() => navigate(`/products/${brand.slug}`)}
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-background hover:bg-[#001a4d] hover:border-[#001a4d] hover:text-white dark:hover:bg-[#001a4d] transition-all duration-200 text-sm font-semibold text-foreground shadow-sm"
                  >
                    {brand.name}
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Brand showcase section */}
        {brands.length > 0 && (
          <section className="py-16 px-4 border-t border-border">
            <div className="max-w-[1400px] mx-auto">
              <h2 className="text-center text-xs font-bold tracking-[0.4em] uppercase text-muted-foreground mb-10">
                As nossas marcas
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {brands.map((brand) => (
                  <button
                    key={brand.slug}
                    onClick={() => navigate(`/products/${brand.slug}`)}
                    className="group flex flex-col items-center justify-center p-8 rounded-xl border border-border bg-card hover:border-[#001a4d] dark:hover:border-blue-400 hover:shadow-md transition-all duration-200"
                  >
                    <span className="text-2xl font-black text-card-foreground group-hover:text-[#001a4d] dark:group-hover:text-blue-300 transition-colors tracking-wide">
                      {brand.name}
                    </span>
                    <span className="text-xs text-muted-foreground mt-2 group-hover:text-[#001a4d] dark:group-hover:text-blue-300 transition-colors">
                      Ver coleção →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
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
