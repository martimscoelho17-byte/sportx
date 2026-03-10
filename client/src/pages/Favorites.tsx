import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useFavorites } from "@/contexts/FavoritesContext";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

function FavoritesContent() {
  const [, navigate] = useLocation();
  const { favorites, removeFromFavorites } = useFavorites();
  const { addItem } = useCart();
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products to find the ones in favorites
  const { data: allProducts } = trpc.products.list.useQuery({});

  useEffect(() => {
    if (allProducts && favorites.length > 0) {
      const products = allProducts.filter((p: any) => favorites.includes(p.id));
      setFavoriteProducts(products);
    } else {
      setFavoriteProducts([]);
    }
    setLoading(false);
  }, [allProducts, favorites]);

  const handleAddToCart = async (productId: number) => {
    try {
      await addItem(productId, "42");
      toast.success("Produto adicionado ao carrinho!");
    } catch (e) {
      toast.error("Erro ao adicionar ao carrinho");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">Meus Favoritos</h1>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#001a4d] border-t-transparent" />
            </div>
          ) : favoriteProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Heart size={48} className="text-muted-foreground opacity-50" />
              <p className="text-lg text-muted-foreground">Nenhum produto nos favoritos</p>
              <Button onClick={() => navigate("/products/nike")} className="mt-4">
                Continuar a comprar
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProducts.map((product) => (
                <div key={product.id} className="rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div className="w-full h-48 bg-gray-100 dark:bg-gray-900 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col gap-3">
                    <div>
                      <h3 className="font-semibold text-foreground line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                    </div>

                    <div className="text-lg font-bold text-foreground">€{parseFloat(product.price).toFixed(2)}</div>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        <ShoppingBag size={16} className="mr-2" />
                        Carrinho
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 rounded-lg"
                        onClick={() => removeFromFavorites(product.id)}
                      >
                        <Heart size={16} className="fill-current text-red-600" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      className="w-full text-sm"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      Ver detalhes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Favorites() {
  return (
    <CartProvider>
      <FavoritesContent />
    </CartProvider>
  );
}
