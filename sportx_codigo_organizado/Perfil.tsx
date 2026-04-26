import { useState, useEffect } from "react";
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
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "PT",
  });

  const updateUserProfile = trpc.users.updateProfile.useMutation();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUserProfile.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
      });
      toast.success("Perfil atualizado com sucesso");
      setIsEditing(false);
    } catch (err) {
      toast.error("Erro ao atualizar perfil");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold">Meu Perfil</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
          {!isEditing ? (
            // View Mode
            <div className="space-y-6">
              <div>
                <Label className="text-muted-foreground">Nome</Label>
                <p className="text-lg font-medium mt-1">{form.name || "Não informado"}</p>
              </div>

              <div>
                <Label className="text-muted-foreground">Email</Label>
                <p className="text-lg font-medium mt-1">{form.email || "Não informado"}</p>
              </div>

              <div>
                <Label className="text-muted-foreground">Telefone</Label>
                <p className="text-lg font-medium mt-1">{form.phone || "Não informado"}</p>
              </div>

              <div>
                <Label className="text-muted-foreground">Morada</Label>
                <p className="text-lg font-medium mt-1">{form.address || "Não informado"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Cidade</Label>
                  <p className="text-lg font-medium mt-1">{form.city || "Não informado"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Código Postal</Label>
                  <p className="text-lg font-medium mt-1">{form.postalCode || "Não informado"}</p>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">País</Label>
                <p className="text-lg font-medium mt-1">
                  {EU_COUNTRIES.find((c) => c.code === form.country)?.name || "Não informado"}
                </p>
              </div>

              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-[#001a4d] hover:bg-[#002266] text-white font-bold py-2"
              >
                Editar Perfil
              </Button>
            </div>
          ) : (
            // Edit Mode
            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="seu.email@exemplo.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Seu número de telefone"
                />
              </div>

              <div>
                <Label htmlFor="address">Morada</Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Rua, número, complemento"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    value={form.city}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder="Sua cidade"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Código Postal</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    value={form.postalCode}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder="XXXX-XXX"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="country">País</Label>
                <select
                  id="country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#001a4d]"
                >
                  {EU_COUNTRIES.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-[#001a4d] hover:bg-[#002266] text-white font-bold py-2"
                >
                  {isSaving ? "A guardar..." : "Guardar Alterações"}
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="flex-1 font-bold py-2"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
