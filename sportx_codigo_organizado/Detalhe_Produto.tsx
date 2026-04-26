import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Button } from "@/components/ui/button";
import { Heart, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { toast } from "sonner";

const SIZES = ["36", "36.5", "37.5", "38", "38.5", "39", "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "45.5", "46", "47"];

function ProductDetailContent() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { addItem, openCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedSize, setSelectedSize] = useState<string | null | undefined>(null);
  const [adding, setAdding] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: product, isLoading } = trpc.products.byId.useQuery({ id: parseInt(params.id) });

  const handleAddToCart = async () => {
    if (!selectedSize || !product || selectedSize === null || selectedSize === undefined) return;
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

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? Math.max(0, images.length - 1) : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-black">
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
      <div className="min-h-screen flex flex-col bg-white dark:bg-black">
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

  // Get images from product (with fallback to imageUrl)
  const images = product.images && product.images.length > 0 
    ? product.images.map((img: any) => img.imageUrl)
    : [product.imageUrl];
  const currentImage = images[currentImageIndex] || product.imageUrl;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <Header />
      <CartDrawer />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="flex gap-4">
              {/* Thumbnails */}
              <div className="flex flex-col gap-2 order-2 md:order-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === idx ? "border-foreground" : "border-border"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 order-1 md:order-2 relative bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center min-h-96">
                <img src={currentImage} alt={product.name} className="w-full h-full object-cover" />

                {/* Navigation Arrows */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-black rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-black rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-white dark:bg-black rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">Os melhor cotados</span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-6">
              {/* Title and Description */}
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-foreground">€{parseFloat(product.price).toFixed(2)}</div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-semibold text-foreground">Selecionar tamanho</label>
                  <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                    📏 Guia de tamanhos
                  </a>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Ajuste firme. Se preferires um ajuste ligeiramente mais folgado, recomendamos que encomandes meio tamanho acima
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size as string)}
                      className={`py-3 px-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-foreground hover:border-foreground"
                      }`}
                    >
                      EU {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  className="w-full bg-black dark:bg-white text-white dark:text-black rounded-full py-6 font-semibold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedSize || adding}
                  onClick={handleAddToCart}
                >
                  {adding ? "A adicionar..." : "Adicionar ao carrinho"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-full py-6 font-semibold text-lg border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart size={20} className={isFavorite(product.id) ? "fill-current text-red-600" : ""} />
                  {isFavorite(product.id) ? "Remover dos favoritos" : "Marcar como favorito"}
                </Button>
              </div>

              {/* Additional Info */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">✓ Levantamento grátis</p>
              </div>
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
