import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const EU_COUNTRIES = [
  { code: "AT", name: "Áustria" },
  { code: "BE", name: "Bélgica" },
  { code: "BG", name: "Bulgária" },
  { code: "HR", name: "Croácia" },
  { code: "CY", name: "Chipre" },
  { code: "CZ", name: "República Checa" },
  { code: "DK", name: "Dinamarca" },
  { code: "EE", name: "Estónia" },
  { code: "FI", name: "Finlândia" },
  { code: "FR", name: "França" },
  { code: "DE", name: "Alemanha" },
  { code: "GR", name: "Grécia" },
  { code: "HU", name: "Hungria" },
  { code: "IE", name: "Irlanda" },
  { code: "IT", name: "Itália" },
  { code: "LV", name: "Letónia" },
  { code: "LT", name: "Lituânia" },
  { code: "LU", name: "Luxemburgo" },
  { code: "MT", name: "Malta" },
  { code: "NL", name: "Países Baixos" },
  { code: "PL", name: "Polónia" },
  { code: "PT", name: "Portugal" },
  { code: "RO", name: "Roménia" },
  { code: "SK", name: "Eslováquia" },
  { code: "SI", name: "Eslovénia" },
  { code: "ES", name: "Espanha" },
  { code: "SE", name: "Suécia" },
];

export default function Profile() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    postalCode: user?.postalCode || "",
    country: user?.country || "",
  });

  const updateUserProfile = trpc.users.updateProfile.useMutation();

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        postalCode: user.postalCode || "",
        country: user.country || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountrySelect = (code: string) => {
    setForm((prev) => ({ ...prev, country: code }));
    setCountryOpen(false);
    setCountrySearch("");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUserProfile.mutateAsync({
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
      });
      toast.success("Perfil atualizado com sucesso!");
      setIsEditing(false);
      const utils = trpc.useUtils();
      await utils.auth.me.invalidate();
    } catch (error) {
      toast.error("Erro ao atualizar perfil");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        postalCode: user.postalCode || "",
        country: user.country || "",
      });
    }
  };

  const filteredCountries = EU_COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-bold">Meu Perfil</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
          {!isEditing ? (
            // View Mode
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Nome</p>
                <p className="text-lg">{form.firstName || "Por Preencher"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Apelido</p>
                <p className="text-lg">{form.lastName || "Por Preencher"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Email</p>
                <p className="text-lg">{form.email || "Por Preencher"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Telefone</p>
                <p className="text-lg">{form.phone || "Por Preencher"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Morada</p>
                <p className="text-lg">{form.address || "Por Preencher"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Cidade</p>
                  <p className="text-lg">{form.city || "Por Preencher"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Código Postal</p>
                  <p className="text-lg">{form.postalCode || "Por Preencher"}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">País</p>
                <p className="text-lg">
                  {EU_COUNTRIES.find((c) => c.code === form.country)?.name || "Por Preencher"}
                </p>
              </div>

              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-[#001a4d] hover:bg-[#002266] text-white"
              >
                Editar Perfil
              </Button>
            </div>
          ) : (
            // Edit Mode
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Nome</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="border-2 border-[#001a4d]"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Apelido</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="border-2 border-[#001a4d]"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled
                  className="opacity-50 cursor-not-allowed border-2 border-[#001a4d]"
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="border-2 border-[#001a4d]"
                />
              </div>

              <div>
                <Label htmlFor="address">Morada</Label>
                <Input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="border-2 border-[#001a4d]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="border-2 border-[#001a4d]"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Código Postal</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    className="border-2 border-[#001a4d]"
                  />
                </div>
              </div>

              <div ref={countryDropdownRef} className="relative">
                <Label htmlFor="country">País</Label>
                <button
                  type="button"
                  onClick={() => setCountryOpen(!countryOpen)}
                  className="w-full px-3 py-2 border-2 border-[#001a4d] rounded-md bg-background text-foreground text-left flex items-center justify-between hover:bg-accent/50 transition-colors"
                >
                  <span>
                    {form.country
                      ? EU_COUNTRIES.find((c) => c.code === form.country)?.name
                      : "Selecione um país"}
                  </span>
                  <span className="text-xs">▼</span>
                </button>
                {countryOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-background border-2 border-[#001a4d] rounded-md shadow-lg z-50">
                    <div className="p-2 border-b border-[#001a4d]">
                      <Input
                        placeholder="Pesquisar país..."
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        className="border-2 border-[#001a4d]"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => handleCountrySelect(country.code)}
                            className="w-full text-left px-3 py-2 hover:bg-[#001a4d]/10 transition-colors text-foreground"
                          >
                            {country.name}
                          </button>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-muted-foreground text-sm">
                          Nenhum país encontrado
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 bg-[#001a4d] hover:bg-[#002266] text-white"
                >
                  {isSaving ? "Guardando..." : "Guardar Alterações"}
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
