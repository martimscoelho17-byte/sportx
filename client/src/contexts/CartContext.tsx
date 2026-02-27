import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { nanoid } from "nanoid";

interface CartProduct {
  id: number;
  name: string;
  price: string;
  imageUrl: string | null;
  brandId: number;
}

interface CartItemFull {
  id: number;
  sessionId: string;
  productId: number;
  quantity: number;
  size: string | null;
  product?: CartProduct;
}

interface CartContextType {
  items: CartItemFull[];
  itemCount: number;
  total: number;
  sessionId: string;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (productId: number, size: string) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refetch: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

function getOrCreateSessionId(): string {
  let id = localStorage.getItem("sportx_session");
  if (!id) {
    id = nanoid();
    localStorage.setItem("sportx_session", id);
  }
  return id;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [sessionId] = useState(getOrCreateSessionId);
  const [isOpen, setIsOpen] = useState(false);

  const { data: items = [], refetch } = trpc.cart.get.useQuery(
    { sessionId },
    { refetchOnWindowFocus: false }
  );

  const addMutation = trpc.cart.add.useMutation({ onSuccess: () => refetch() });
  const updateMutation = trpc.cart.updateQuantity.useMutation({ onSuccess: () => refetch() });
  const removeMutation = trpc.cart.remove.useMutation({ onSuccess: () => refetch() });
  const clearMutation = trpc.cart.clear.useMutation({ onSuccess: () => refetch() });

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.product?.price ?? "0");
    return sum + price * item.quantity;
  }, 0);

  const addItem = useCallback(async (productId: number, size: string) => {
    await addMutation.mutateAsync({ sessionId, productId, size, quantity: 1 });
  }, [sessionId, addMutation]);

  const updateQuantity = useCallback(async (itemId: number, quantity: number) => {
    await updateMutation.mutateAsync({ itemId, quantity });
  }, [updateMutation]);

  const removeItem = useCallback(async (itemId: number) => {
    await removeMutation.mutateAsync({ itemId });
  }, [removeMutation]);

  const clearCart = useCallback(async () => {
    await clearMutation.mutateAsync({ sessionId });
  }, [sessionId, clearMutation]);

  return (
    <CartContext.Provider value={{
      items: items as CartItemFull[],
      itemCount,
      total,
      sessionId,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      refetch,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
