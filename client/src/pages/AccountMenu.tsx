import { useLocation } from "wouter";
import { ChevronRight, Home, Award, User, Package, Heart, Mail, LogOut } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

export default function AccountMenu() {
  const [, navigate] = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      toast.success("Sessão terminada");
    } catch (error) {
      toast.error("Erro ao terminar sessão");
    }
  };

  const menuItems = [
    {
      icon: Home,
      label: "Visão geral da conta",
      onClick: () => navigate("/account/overview"),
    },
    {
      icon: Award,
      label: "Minha Assinatura",
      onClick: () => navigate("/account/subscription"),
    },
    {
      icon: User,
      label: "O meu perfil",
      onClick: () => navigate("/profile"),
    },
    {
      icon: Package,
      label: "Encomendas",
      onClick: () => navigate("/account/orders"),
    },
    {
      icon: Heart,
      label: "Lista de desejos",
      onClick: () => navigate("/favorites"),
    },
    {
      icon: Mail,
      label: "Newsletter",
      onClick: () => navigate("/account/newsletter"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <Header />

      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Olá, {user?.firstName || user?.name || "Utilizador"}
            </h1>
          </div>

          {/* Menu Items */}
          <div className="space-y-3">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between px-4 py-4 border-2 border-border rounded-lg hover:bg-accent/50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <Icon size={24} className="text-foreground" />
                    <span className="text-lg text-foreground font-medium">{item.label}</span>
                  </div>
                  <ChevronRight size={24} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-border" />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-4 border-2 border-border rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <LogOut size={24} className="text-red-600" />
              <span className="text-lg text-red-600 font-medium">Terminar sessão</span>
            </div>
            <ChevronRight size={24} className="text-red-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
