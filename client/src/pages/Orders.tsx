import { useLocation } from "wouter";
import { ChevronLeft, Package, Calendar, DollarSign, Truck } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Orders() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const { data: orders = [], isLoading } = trpc.orders.list.useQuery();

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

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/account")}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold text-foreground">Minhas Encomendas</h1>
          </div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package size={48} className="text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground mb-4">Ainda não tem encomendas</p>
              <Button onClick={() => navigate("/")} variant="default">
                Continuar a comprar
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any) => (
                <div
                  key={order.id}
                  className="border-2 border-border rounded-lg p-6 hover:bg-accent/30 transition-colors"
                >
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Encomenda #{order.id}</p>
                      <h3 className="text-lg font-semibold text-foreground">
                        {order.items?.length || 0} item{order.items?.length !== 1 ? "s" : ""}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">
                        €{parseFloat(order.totalAmount).toFixed(2)}
                      </p>
                      <p className={`text-sm font-medium ${
                        order.status === "completed" ? "text-green-600" :
                        order.status === "pending" ? "text-yellow-600" :
                        order.status === "cancelled" ? "text-red-600" :
                        "text-blue-600"
                      }`}>
                        {order.status === "completed" ? "Entregue" :
                         order.status === "pending" ? "Pendente" :
                         order.status === "cancelled" ? "Cancelada" :
                         "Em processamento"}
                      </p>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Data</p>
                        <p className="text-sm font-medium text-foreground">
                          {new Date(order.createdAt).toLocaleDateString("pt-PT")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck size={18} className="text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Entrega</p>
                        <p className="text-sm font-medium text-foreground">
                          {order.shippingAddress || "Não especificado"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={18} className="text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Método</p>
                        <p className="text-sm font-medium text-foreground">
                          {order.paymentMethod || "Cartão"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  {order.items && order.items.length > 0 && (
                    <div className="space-y-2">
                      {order.items.map((item: any, idx: number) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          • {item.productName} (Tamanho: {item.size})
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button variant="outline" className="w-full">
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
