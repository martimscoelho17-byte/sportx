import { useEffect, useState } from "react";
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
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    postalCode: user?.postalCode || "",
    country: user?.country || "PT",
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
        country: user.country || "PT",
      });
    }
  }, [user]);

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
        country: user.country || "PT",
      });
    }
  };

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
                <p className="text-lg">{form.firstName || "Não informado"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Apelido</p>
                <p className="text-lg">{form.lastName || "Não informado"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Email</p>
                <p className="text-lg">{form.email}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Telefone</p>
                <p className="text-lg">{form.phone || "Não informado"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Morada</p>
                <p className="text-lg">{form.address || "Não informado"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Cidade</p>
                  <p className="text-lg">{form.city || "Não informado"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Código Postal</p>
                  <p className="text-lg">{form.postalCode || "Não informado"}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">País</p>
                <p className="text-lg">
                  {EU_COUNTRIES.find((c) => c.code === form.country)?.name || "Não informado"}
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
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Apelido</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Seu apelido"
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
                  className="opacity-50 cursor-not-allowed"
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+351 912 345 678"
                />
              </div>

              <div>
                <Label htmlFor="address">Morada</Label>
                <Input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Rua, número, etc."
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
                    placeholder="Cidade"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Código Postal</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    placeholder="1000-001"
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
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
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
