import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const SIZES = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"];

function ProductDetailContent() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { addItem, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const { data: product, isLoading } = trpc.products.byId.useQuery({ id: parseInt(params.id) });

  const handleAddToCart = async () => {
    if (!selectedSize || !product) return;
    setAdding(true);
    try {
      await addItem(product.id, selectedSize);
      toast.success("Produto adicionado ao carrinho!", {
        action: { label: "Ver carrinho", onClick: openCart },
      });
    } catch (e) {
      toast.error("Erro ao adicionar ao carrinho");
    } finally {
      setAdding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#001a4d] border-t-transparent" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground text-lg">Produto não encontrado</p>
          <Button onClick={() => navigate("/")} variant="outline">
            Voltar ao início
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const levelLabels: Record<string, string> = { elite: "Elite", pro: "Pro", academy: "Academy" };
  const surfaceLabels: Record<string, string> = {
    terreno_firme: "Terreno Firme",
    terreno_mole: "Terreno Mole",
    relva: "Relva",
    relva_artificial: "Relva Artificial",
  };
  const heightLabels: Record<string, string> = { cano_baixo: "Cano Baixo", cano_alto: "Cano Alto" };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartDrawer />

      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 py-8">
          {/* Back button */}
          <button
            onClick={() => navigate(-1 as any)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-8xl font-black text-muted-foreground/20">
                    {product.collection?.[0] ?? "S"}
                  </span>
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="flex flex-col">
              {/* Collection badge */}
              {product.collection && (
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#001a4d] dark:text-blue-300 mb-2">
                  {product.collection}
                </span>
              )}

              <h1 className="text-2xl md:text-3xl font-black text-foreground leading-tight mb-3">
                {product.name}
              </h1>

              <p className="text-3xl font-black text-[#001a4d] dark:text-blue-300 mb-6">
                €{parseFloat(product.price).toFixed(2)}
              </p>

              {/* Attributes */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.level && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
                    {levelLabels[product.level] ?? product.level}
                  </span>
                )}
                {product.surface && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
                    {surfaceLabels[product.surface] ?? product.surface}
                  </span>
                )}
                {product.bootHeight && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
                    {heightLabels[product.bootHeight] ?? product.bootHeight}
                  </span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  {product.description}
                </p>
              )}

              {/* Size selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-foreground">Selecionar tamanho</h3>
                  {selectedSize && (
                    <span className="text-sm text-[#001a4d] dark:text-blue-300 font-medium flex items-center gap-1">
                      <CheckCircle size={14} /> Tamanho {selectedSize} selecionado
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 rounded-lg text-sm font-semibold border transition-all duration-150 ${
                        selectedSize === size
                          ? "bg-[#001a4d] border-[#001a4d] text-white"
                          : "border-border bg-background text-foreground hover:border-[#001a4d] dark:hover:border-blue-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Por favor, selecione um tamanho para continuar
                  </p>
                )}
              </div>

              {/* Add to cart button */}
              <Button
                className="w-full py-6 text-base font-bold bg-[#001a4d] hover:bg-[#002266] text-white disabled:opacity-50 disabled:cursor-not-allowed gap-2"
                disabled={!selectedSize || adding}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                {adding ? "A adicionar..." : "Adicionar ao Carrinho"}
              </Button>

              {/* Free shipping notice */}
              <p className="text-xs text-center text-muted-foreground mt-3">
                Envio grátis em compras acima de €100 • Entrega para toda a UE
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProductDetail() {
  return (
    <CartProvider>
      <ProductDetailContent />
    </CartProvider>
  );
}
