import { createContext, useContext, useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";

interface FavoritesContextType {
  favorites: number[];
  isFavorite: (productId: number) => boolean;
  addToFavorites: (productId: number) => Promise<void>;
  removeFromFavorites: (productId: number) => Promise<void>;
  toggleFavorite: (productId: number) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sessionId, setSessionId] = useState<string>("");

  // Get session ID from localStorage
  useEffect(() => {
    const id = localStorage.getItem("sessionId") || `session-${Date.now()}`;
    if (!localStorage.getItem("sessionId")) {
      localStorage.setItem("sessionId", id);
    }
    setSessionId(id);
  }, []);

  // Load favorites from server
  const { data: favoritesList } = trpc.favorites.list.useQuery(
    { sessionId },
    { enabled: !!sessionId }
  );

  useEffect(() => {
    if (favoritesList) {
      setFavorites(favoritesList.map((f) => f.productId));
    }
  }, [favoritesList]);

  const addMutation = trpc.favorites.add.useMutation();
  const removeMutation = trpc.favorites.remove.useMutation();

  const addToFavorites = async (productId: number) => {
    if (!sessionId) return;
    await addMutation.mutateAsync({ sessionId, productId });
    setFavorites((prev) => prev.includes(productId) ? prev : [...prev, productId]);
  };

  const removeFromFavorites = async (productId: number) => {
    if (!sessionId) return;
    await removeMutation.mutateAsync({ sessionId, productId });
    setFavorites((prev) => prev.filter((id) => id !== productId));
  };

  const toggleFavorite = async (productId: number) => {
    if (isFavorite(productId)) {
      await removeFromFavorites(productId);
    } else {
      await addToFavorites(productId);
    }
  };

  const isFavorite = (productId: number) => favorites.includes(productId);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, addToFavorites, removeFromFavorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}
