import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, total, sessionId } = useCart();
  const [, navigate] = useLocation();

  const shipping = total >= 100 ? 0 : 5.99;
  const discount = total * 0.1;
  const subtotalAfterDiscount = total - discount;
  const orderTotal = subtotalAfterDiscount + shipping;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#001a4d] dark:text-blue-300" />
            <h2 className="text-lg font-bold text-foreground">Carrinho</h2>
            {items.length > 0 && (
              <span className="bg-[#001a4d] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-accent transition-colors text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-muted-foreground/40" />
              <p className="text-muted-foreground font-medium">O seu carrinho está vazio</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 rounded-lg border border-border bg-card">
                {/* Product image */}
                <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  {item.product?.imageUrl ? (
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                      Sem imagem
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-card-foreground line-clamp-2">
                    {item.product?.name}
                  </p>
                  {item.size && (
                    <p className="text-xs text-muted-foreground mt-0.5">Tamanho: {item.size}</p>
                  )}
                  <p className="text-sm font-bold text-[#001a4d] dark:text-blue-300 mt-1">
                    €{(parseFloat(item.product?.price ?? "0") * item.quantity).toFixed(2)}
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      className="ml-auto p-1 text-muted-foreground hover:text-destructive transition-colors"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-border space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>€{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Envio</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-medium">Grátis</span> : `€${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-green-600 font-medium">
                <span>Desconto (10%)</span>
                <span>-€{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-foreground pt-1 border-t border-border">
                <span>Total</span>
                <span>€{orderTotal.toFixed(2)}</span>
              </div>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-muted-foreground text-center">
                Envio grátis em compras acima de €100
              </p>
            )}
            <Button
              className="w-full bg-[#001a4d] hover:bg-[#002266] text-white font-semibold"
              onClick={() => {
                closeCart();
                navigate("/checkout");
              }}
            >
              Finalizar compra
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
