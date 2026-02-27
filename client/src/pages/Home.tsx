import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/contexts/CartContext";

function HomeContent() {
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

        <div className="relative text-center space-y-4">
          {/* Main title */}
          <h1 className="text-[clamp(2.5rem,18vw,9rem)] leading-none select-none font-bold" style={{ fontFamily: "'Arial Black', 'Helvetica', sans-serif", fontWeight: 900, letterSpacing: "-0.02em" }}>
            <span style={{ color: "#660000" }}>Sport</span>
            <span style={{ color: "#001a4d" }}>X</span>
          </h1>

          {/* Slogan */}
          <p className="text-sm md:text-lg font-semibold tracking-[0.3em] uppercase text-muted-foreground">
            The Next Level of Sports
          </p>
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
