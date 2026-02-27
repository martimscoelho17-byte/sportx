import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Banknote, Smartphone, ChevronDown } from "lucide-react";
import { toast } from "sonner";

const EU_COUNTRIES = [
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "AT", name: "Áustria", flag: "🇦🇹" },
  { code: "BE", name: "Bélgica", flag: "🇧🇪" },
  { code: "BG", name: "Bulgária", flag: "🇧🇬" },
  { code: "CY", name: "Chipre", flag: "🇨🇾" },
  { code: "CZ", name: "Chéquia", flag: "🇨🇿" },
  { code: "DE", name: "Alemanha", flag: "🇩🇪" },
  { code: "DK", name: "Dinamarca", flag: "🇩🇰" },
  { code: "EE", name: "Estónia", flag: "🇪🇪" },
  { code: "ES", name: "Espanha", flag: "🇪🇸" },
  { code: "FI", name: "Finlândia", flag: "🇫🇮" },
  { code: "FR", name: "França", flag: "🇫🇷" },
  { code: "GR", name: "Grécia", flag: "🇬🇷" },
  { code: "HR", name: "Croácia", flag: "🇭🇷" },
  { code: "HU", name: "Hungria", flag: "🇭🇺" },
  { code: "IE", name: "Irlanda", flag: "🇮🇪" },
  { code: "IT", name: "Itália", flag: "🇮🇹" },
  { code: "LT", name: "Lituânia", flag: "🇱🇹" },
  { code: "LU", name: "Luxemburgo", flag: "🇱🇺" },
  { code: "LV", name: "Letónia", flag: "🇱🇻" },
  { code: "MT", name: "Malta", flag: "🇲🇹" },
  { code: "NL", name: "Países Baixos", flag: "🇳🇱" },
  { code: "PL", name: "Polónia", flag: "🇵🇱" },
  { code: "RO", name: "Roménia", flag: "🇷🇴" },
  { code: "SE", name: "Suécia", flag: "🇸🇪" },
  { code: "SI", name: "Eslovénia", flag: "🇸🇮" },
  { code: "SK", name: "Eslováquia", flag: "🇸🇰" },
];

const PAYMENT_METHODS = [
  { id: "cartao", label: "Cartão de Crédito/Débito", icon: CreditCard },
  { id: "mbway", label: "MB Way", icon: Smartphone },
  { id: "transferencia", label: "Transferência Bancária", icon: Banknote },
  { id: "multibanco", label: "Multibanco", icon: Banknote },
];

function CheckoutContent() {
  const [, navigate] = useLocation();
  const { items, total, sessionId, clearCart } = useCart();
  const [countryOpen, setCountryOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "PT",
    paymentMethod: "cartao",
  });

  const createOrder = trpc.orders.create.useMutation();

  const shipping = total >= 100 ? 0 : 5.99;
  const tax = total * 0.23;
  const orderTotal = total + shipping + tax;

  const selectedCountry = EU_COUNTRIES.find((c) => c.code === form.country);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("O seu carrinho está vazio");
      return;
    }
    if (!form.firstName || !form.lastName || !form.email || !form.address || !form.city || !form.postalCode) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setSubmitting(true);
    try {
      const order = await createOrder.mutateAsync({
        sessionId,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
        paymentMethod: form.paymentMethod,
        subtotal: total,
        shipping,
        tax,
        total: orderTotal,
        items: items.map((i) => ({
          productId: i.productId,
          name: i.product?.name,
          price: i.product?.price,
          quantity: i.quantity,
          size: i.size,
        })),
      });
      navigate(`/order-confirmation/${order?.orderNumber}`);
    } catch (err) {
      toast.error("Erro ao processar encomenda. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground text-lg font-medium">O seu carrinho está vazio</p>
          <Button onClick={() => navigate("/")} className="bg-[#001a4d] hover:bg-[#002266] text-white">
            Continuar a comprar
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartDrawer />

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1 as any)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>

          <h1 className="text-2xl font-black text-foreground mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Delivery address */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-base font-bold text-card-foreground mb-4">Morada de Entrega</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName">Nome *</Label>
                        <Input
                          id="firstName"
                          value={form.firstName}
                          onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="lastName">Apelido *</Label>
                        <Input
                          id="lastName"
                          value={form.lastName}
                          onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+351 900 000 000"
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="address">Morada *</Label>
                      <Input
                        id="address"
                        placeholder="Rua, número, andar"
                        value={form.address}
                        onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="city">Cidade *</Label>
                        <Input
                          id="city"
                          value={form.city}
                          onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="postalCode">Código Postal *</Label>
                        <Input
                          id="postalCode"
                          placeholder="0000-000"
                          value={form.postalCode}
                          onChange={(e) => setForm((p) => ({ ...p, postalCode: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    {/* Country selector */}
                    <div className="space-y-1.5">
                      <Label>País *</Label>
                      <div className="relative">
                        <button
                          type="button"
                          className="w-full flex items-center justify-between px-3 py-2 border border-input rounded-md text-sm bg-background hover:bg-accent transition-colors"
                          onClick={() => setCountryOpen(!countryOpen)}
                        >
                          <span className="flex items-center gap-2">
                            <span>{selectedCountry?.flag}</span>
                            <span>{selectedCountry?.name}</span>
                          </span>
                          <ChevronDown size={14} className={`transition-transform ${countryOpen ? "rotate-180" : ""}`} />
                        </button>
                        {countryOpen && (
                          <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
                            {EU_COUNTRIES.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                className="w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors flex items-center gap-2"
                                onClick={() => {
                                  setForm((p) => ({ ...p, country: country.code }));
                                  setCountryOpen(false);
                                }}
                              >
                                <span>{country.flag}</span>
                                <span>{country.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment method */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-base font-bold text-card-foreground mb-4">Método de Pagamento</h2>
                  <div className="space-y-2">
                    {PAYMENT_METHODS.map((method) => {
                      const Icon = method.icon;
                      return (
                        <label
                          key={method.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                            form.paymentMethod === method.id
                              ? "border-[#001a4d] bg-[#001a4d]/5 dark:bg-[#001a4d]/20"
                              : "border-border hover:border-[#001a4d]/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={form.paymentMethod === method.id}
                            onChange={() => setForm((p) => ({ ...p, paymentMethod: method.id }))}
                            className="accent-[#001a4d]"
                          />
                          <Icon size={18} className="text-muted-foreground" />
                          <span className="text-sm font-medium text-card-foreground">{method.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right: order summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-20 rounded-xl border border-border bg-card p-6 space-y-4">
                  <h2 className="text-base font-bold text-card-foreground">Resumo da Encomenda</h2>

                  {/* Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          {item.product?.imageUrl ? (
                            <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-muted" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-card-foreground line-clamp-2">{item.product?.name}</p>
                          <p className="text-xs text-muted-foreground">Tam. {item.size} · Qtd. {item.quantity}</p>
                          <p className="text-xs font-bold text-[#001a4d] dark:text-blue-300">
                            €{(parseFloat(item.product?.price ?? "0") * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-3 space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>€{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Envio</span>
                      <span>{shipping === 0 ? <span className="text-green-600 font-medium">Grátis</span> : `€${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>IVA (23%)</span>
                      <span>€{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base text-foreground pt-1 border-t border-border">
                      <span>Total</span>
                      <span>€{orderTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#001a4d] hover:bg-[#002266] text-white font-bold py-5"
                    disabled={submitting}
                  >
                    {submitting ? "A processar..." : "Confirmar Encomenda"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Ao confirmar, aceita os nossos termos e condições
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Checkout() {
  return (
    <CartProvider>
      <CheckoutContent />
    </CartProvider>
  );
}
