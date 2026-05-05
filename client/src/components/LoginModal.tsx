import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useTheme } from "@/contexts/ThemeContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

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

export default function LoginModal({ open, onClose }: Props) {
  const { theme } = useTheme();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [countryOpen, setCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  
  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register fields
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  
  const registerMutation = trpc.auth.register.useMutation();
  const loginLocalMutation = trpc.auth.loginLocal.useMutation();

  const handleClose = () => {
    setMode("login");
    setSelectedCountry(null);
    setCountryOpen(false);
    setLoginEmail("");
    setLoginPassword("");
    setRegFirstName("");
    setRegLastName("");
    setRegEmail("");
    setRegPhone("");
    setRegPassword("");
    setRegConfirmPassword("");
    onClose();
  };

  const handleLogin = async () => {
    if (!loginEmail.trim()) {
      alert("Email é obrigatório");
      return;
    }
    if (!loginPassword.trim()) {
      alert("Palavra-passe é obrigatória");
      return;
    }

    setIsLoading(true);
    try {
      await loginLocalMutation.mutateAsync({
        email: loginEmail,
        password: loginPassword,
      });
      
      alert("Login realizado com sucesso!");
      setLoginEmail("");
      setLoginPassword("");
      handleClose();
      window.location.reload();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao fazer login";
      alert("Erro: " + message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!regFirstName.trim()) {
      alert("Nome é obrigatório");
      return;
    }
    if (!regLastName.trim()) {
      alert("Apelido é obrigatório");
      return;
    }
    if (!regEmail.trim()) {
      alert("Email é obrigatório");
      return;
    }
    if (!regPhone.trim()) {
      alert("Telefone é obrigatório");
      return;
    }
    if (!selectedCountry) {
      alert("País é obrigatório");
      return;
    }
    if (!regPassword.trim() || regPassword.length < 6) {
      alert("Palavra-passe deve ter pelo menos 6 caracteres");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      alert("Palavras-passe não coincidem");
      return;
    }

    setIsLoading(true);
    try {
      await registerMutation.mutateAsync({
        email: regEmail,
        firstName: regFirstName,
        lastName: regLastName,
        phone: regPhone,
        country: selectedCountry,
        password: regPassword,
      });
      
      alert("Conta criada com sucesso! Por favor, faça login.");
      setMode("login");
      setRegFirstName("");
      setRegLastName("");
      setRegEmail("");
      setRegPhone("");
      setRegPassword("");
      setRegConfirmPassword("");
      setSelectedCountry(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao criar conta";
      alert("Erro: " + message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <DialogTitle className="sr-only">SportX - Autenticação</DialogTitle>
        
        {/* Header */}
        <div className={`${theme === "dark" ? "bg-black" : "bg-white"} px-6 py-8 text-center border-b border-border`}>
          <div className="text-3xl font-black tracking-widest mb-1">
            <span style={{ color: "#660000" }}>Sport</span>
            <span style={{ color: "#001a4d" }}>X</span>
          </div>
          <p className={`text-xs tracking-[0.3em] uppercase ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>The Next Level of Sports</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${mode === "login" ? "border-b-2 border-[#001a4d] text-[#001a4d]" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => setMode("login")}
          >
            Iniciar Sessão
          </button>
          <button
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${mode === "register" ? "border-b-2 border-[#001a4d] text-[#001a4d]" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => setMode("register")}
          >
            Registar-se
          </button>
        </div>

        <div className="p-6 space-y-4">
          {mode === "login" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="login-email">Utilizador</Label>
                <Input 
                  id="login-email" 
                  type="email" 
                  autoComplete="off"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="border-[#001a4d] focus-visible:border-[#001a4d] focus-visible:ring-[#001a4d]/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Palavra-passe</Label>
                <Input 
                  id="login-pass" 
                  type="password" 
                  autoComplete="off"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="border-[#001a4d] focus-visible:border-[#001a4d] focus-visible:ring-[#001a4d]/20"
                />
              </div>
              <Button 
                className="w-full text-white hover:opacity-90"
                style={{ backgroundColor: "#001a4d" }}
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? "Iniciando..." : "Iniciar Sessão"}
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Ou continuar com</span>
                </div>
              </div>
              <a href={getLoginUrl()} className="block">
                <Button variant="outline" className="w-full gap-2">
                  <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continuar com Google
                </Button>
              </a>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="reg-first">Nome</Label>
                  <Input 
                    id="reg-first" 
                    autoComplete="off"
                    value={regFirstName}
                    onChange={(e) => setRegFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-last">Apelido</Label>
                  <Input 
                    id="reg-last" 
                    autoComplete="off"
                    value={regLastName}
                    onChange={(e) => setRegLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input 
                  id="reg-email" 
                  type="email" 
                  autoComplete="off"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-phone">Telefone</Label>
                <Input 
                  id="reg-phone" 
                  type="tel" 
                  autoComplete="off"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                />
              </div>
              {/* Country selector */}
              <div className="space-y-2">
                <Label>País</Label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-3 py-2 border border-input rounded-md text-sm bg-background hover:bg-accent transition-colors"
                    onClick={() => setCountryOpen(!countryOpen)}
                  >
                    <span className={selectedCountry ? "text-foreground" : "text-muted-foreground"}>
                      {selectedCountry
                        ? EU_COUNTRIES.find((c) => c.code === selectedCountry)?.name
                        : "Selecione um país"}
                    </span>
                    <ChevronDownIcon open={countryOpen} />
                  </button>
                  {countryOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
                      {EU_COUNTRIES.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          className="w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors"
                          onClick={() => {
                            setSelectedCountry(country.code);
                            setCountryOpen(false);
                          }}
                        >
                          {country.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-pass">Palavra-passe</Label>
                <Input 
                  id="reg-pass" 
                  type="password" 
                  autoComplete="off"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-confirm">Confirmar palavra-passe</Label>
                <Input 
                  id="reg-confirm" 
                  type="password" 
                  autoComplete="off"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                />
              </div>
              <Button 
                className="w-full bg-[#001a4d] hover:bg-[#002266] text-white"
                onClick={handleRegister}
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Criar Conta"}
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Ou registar com</span>
                </div>
              </div>
              <a href={getLoginUrl()} className="block">
                <Button variant="outline" className="w-full gap-2">
                  <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continuar com Google
                </Button>
              </a>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
