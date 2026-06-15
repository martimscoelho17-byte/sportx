import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

export default function PaymentSuccess() {
  const [, navigate] = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get session ID from URL
    const params = new URLSearchParams(window.location.search);
    const session = params.get("session_id");
    setSessionId(session);

    // Fetch order details if available
    if (session) {
      // You can fetch order details here if needed
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />
              <CheckCircle className="w-20 h-20 text-green-500 relative" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Pagamento Realizado!
            </h1>
            <p className="text-muted-foreground">
              Obrigado pela sua compra. Sua encomenda foi confirmada com sucesso.
            </p>
          </div>

          {/* Session ID */}
          {sessionId && (
            <div className="bg-accent/50 rounded-lg p-4 text-sm">
              <p className="text-muted-foreground mb-1">ID da Sessão</p>
              <p className="font-mono text-xs break-all text-foreground">
                {sessionId}
              </p>
            </div>
          )}

          {/* Details */}
          <div className="bg-card border border-border rounded-lg p-6 text-left space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Próximos Passos
              </p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Confirmação enviada para seu email</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Sua encomenda será processada em breve</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Receberá atualizações de rastreamento</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => navigate("/orders")}
              className="w-full bg-[#001a4d] hover:bg-[#002266] text-white gap-2"
            >
              Ver Minhas Encomendas
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="w-full"
            >
              Continuar Comprando
            </Button>
          </div>

          {/* Support */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Tem dúvidas?</p>
            <a
              href="mailto:sportxthenextlevelofsports@gmail.com"
              className="text-[#001a4d] hover:underline"
            >
              Contacte-nos
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
