import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Banknote, Smartphone, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const PAYMENT_METHODS = [
  { id: "cartao", label: "Cartão de Crédito/Débito", icon: CreditCard },
  { id: "mbway", label: "MB Way", icon: Smartphone },
  { id: "transferencia", label: "Transferência Bancária", icon: Banknote },
  { id: "multibanco", label: "Multibanco", icon: Banknote },
];

export default function Payment() {
  const [, setLocation] = useLocation();
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [processing, setProcessing] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Get order data from sessionStorage
    const data = sessionStorage.getItem("pendingOrder");
    if (!data) {
      setLocation("/checkout");
      return;
    }
    setOrderData(JSON.parse(data));
  }, [setLocation]);

  const handlePayment = async () => {
    if (!selectedPayment) {
      toast.error("Selecione um método de pagamento");
      return;
    }

    setProcessing(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to confirmation
      sessionStorage.removeItem("pendingOrder");
      setLocation(`/order-confirmation/${orderData.orderId}`);
      toast.success("Pagamento realizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao processar pagamento");
    } finally {
      setProcessing(false);
    }
  };

  if (!orderData) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <button
            onClick={() => setLocation("/checkout")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>

          <h1 className="text-2xl font-black text-foreground mb-8 text-center">Método de Pagamento</h1>

          <div className="rounded-xl border border-border bg-card p-6 space-y-6">
            {/* Order Summary */}
            <div className="border-b border-border pb-6">
              <h2 className="text-base font-bold text-card-foreground mb-4">Resumo da Encomenda</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>€{orderData.subtotal}</span>
                </div>
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Desconto (10%)</span>
                  <span>-€{orderData.discount}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Envio</span>
                  <span>{orderData.shipping === "0.00" ? <span className="text-green-600 font-medium">Grátis</span> : `€${orderData.shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-base text-foreground pt-2 border-t border-border">
                  <span>Total</span>
                  <span>€{orderData.total}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h2 className="text-base font-bold text-card-foreground mb-4">Selecione o Método de Pagamento</h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  return (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? "border-[#001a4d] bg-[#001a4d]/5 dark:bg-[#001a4d]/20"
                          : "border-border hover:border-[#001a4d]/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={() => setSelectedPayment(method.id)}
                        className="accent-[#001a4d]"
                      />
                      <Icon size={20} className="text-muted-foreground" />
                      <span className="text-sm font-medium text-card-foreground">{method.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              className="w-full bg-[#001a4d] hover:bg-[#002266] text-white font-bold py-5"
              disabled={processing || !selectedPayment}
            >
              {processing ? "A processar pagamento..." : "Confirmar Pagamento"}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Ao confirmar, aceita os nossos termos e condições
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
