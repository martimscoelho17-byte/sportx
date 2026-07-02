import { useState, useMemo } from "react";
import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/contexts/CartContext";
import { SlidersHorizontal, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const SIZES = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"];

const SORT_OPTIONS = [
  { value: "featured", label: "Em destaque" },
  { value: "newest", label: "Mais recentes" },
  { value: "price_desc", label: "Preço: descendente" },
  { value: "price_asc", label: "Preço: ascendente" },
];

const PRICE_RANGES = [
  { label: "0€ - 50€", min: 0, max: 50 },
  { label: "50€ - 100€", min: 50, max: 100 },
  { label: "100€ - 150€", min: 100, max: 150 },
  { label: "150€ - 300€", min: 150, max: 300 },
];

const COLORS = [
  { value: "preto", label: "Preto", color: "#000000" },
  { value: "azul", label: "Azul", color: "#0066ff" },
  { value: "castanho", label: "Castanho", color: "#8b6914" },
  { value: "verde", label: "Verde", color: "#00aa00" },
  { value: "cinzento", label: "Cinzento", color: "#888888" },
  { value: "rosa", label: "Rosa", color: "#ff69b4" },
  { value: "laranja", label: "Laranja", color: "#ff8800" },
  { value: "roxo", label: "Roxo", color: "#9933ff" },
  { value: "vermelho", label: "Vermelho", color: "#ff0000" },
  { value: "branco", label: "Branco", color: "#ffffff" },
  { value: "amarelo", label: "Amarelo", color: "#ffff00" },
];

function FilterSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border pb-4 mb-4">
      <button
        className="flex items-center justify-between w-full text-sm font-semibold text-foreground mb-3"
        onClick={() => setOpen(!open)}
      >
        {title}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && children}
    </div>
  );
}

function CheckboxFilter({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer py-0.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded border-border accent-[#001a4d]"
      />
      {label}
    </label>
  );
}

interface Filters {
  genders: string[];
  priceRange: { min: number; max: number } | null;
  levels: string[];
  bootHeights: string[];
  collections: string[];
  surfaces: string[];
  colors: string[];
}

function ProductsContent() {
  const params = useParams<{ brandSlug: string; categorySlug?: string }>();
  const [, navigate] = useLocation();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    genders: [],
    priceRange: null,
    levels: [],
    bootHeights: [],
    collections: [],
    surfaces: [],
    colors: [],
  });

  const { data: brands = [] } = trpc.brands.list.useQuery();
  const { data: allCategories = [] } = trpc.categories.all.useQuery();

  const brand = brands.find((b) => b.slug === params.brandSlug);
  const brandCategories = allCategories.filter((c) => c.brandId === brand?.id);
  const selectedCategory = brandCategories.find((c) => c.slug === params.categorySlug);

  const { data: products = [], isLoading } = trpc.products.list.useQuery({
    brandId: brand?.id,
    categoryId: selectedCategory?.id,
    sortBy: sortBy || undefined,
    minPrice: filters.priceRange?.min,
    maxPrice: filters.priceRange?.max,
    gender: filters.genders.length === 1 ? filters.genders[0] : undefined,
    level: filters.levels.length === 1 ? filters.levels[0] : undefined,
    bootHeight: filters.bootHeights.length === 1 ? filters.bootHeights[0] : undefined,
    surface: filters.surfaces.length === 1 ? filters.surfaces[0] : undefined,
    collection: filters.collections.length === 1 ? filters.collections[0] : undefined,
    color: filters.colors.length === 1 ? filters.colors[0] : undefined,
  });

  // Collections from current brand's products
  const availableCollections = useMemo(() => {
    const cols = new Set(products.map((p) => p.collection).filter(Boolean));
    return Array.from(cols) as string[];
  }, [products]);

  const toggleFilter = (key: keyof Filters, value: string) => {
    if (key === "priceRange") return;
    setFilters((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const activeFilterCount =
    filters.genders.length +
    filters.levels.length +
    filters.bootHeights.length +
    filters.collections.length +
    filters.surfaces.length +
    filters.colors.length +
    (filters.priceRange ? 1 : 0);

  const sortLabel = sortBy ? SORT_OPTIONS.find((o) => o.value === sortBy)?.label : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartDrawer />

      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 py-8">
          {/* Brand header with logo and category tabs */}
          {brand && (
            <nav className="flex items-center justify-between mb-8 pb-6 border-b border-border">
              <img
                src={`/${brand.slug}-logo.svg`}
                alt={brand.name}
                className="h-16 w-32 object-contain dark:invert"
              />
              <div className="flex items-center gap-6 text-sm">
                {brandCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => navigate(`/products/${brand.slug}/${cat.slug}`)}
                    className={`text-muted-foreground hover:text-foreground transition-colors ${
                      selectedCategory?.slug === cat.slug ? "text-foreground font-semibold" : ""
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </nav>
          )}

          {/* Category title or dropdown */}
          {selectedCategory ? (
            <h1 className="text-3xl font-black text-foreground tracking-wide mb-6">
              {selectedCategory.name}
            </h1>
          ) : null}

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={14} />
                {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
                {activeFilterCount > 0 && (
                  <span className="bg-[#001a4d] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
              <span className="text-sm text-muted-foreground">
                {products.length} produto{products.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg bg-background hover:bg-accent transition-colors"
                onClick={() => setSortOpen(!sortOpen)}
              >
                <span>Ordenar por: {sortLabel && <strong>{sortLabel}</strong>}</span>
                {sortOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-popover border border-border rounded-lg shadow-lg py-1 z-20">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sortBy === opt.value ? "bg-accent text-foreground font-medium" : "text-popover-foreground hover:bg-accent"}`}
                      onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-6">
            {/* Filters sidebar */}
            {showFilters && (
              <aside className="w-56 flex-shrink-0">
                <div className="sticky top-20 space-y-0">
                  <div className="flex items-center justify-between mb-4">
                    {activeFilterCount > 0 && (
                      <button
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                        onClick={() => setFilters({ genders: [], priceRange: null, levels: [], bootHeights: [], collections: [], surfaces: [], colors: [] })}
                      >
                        <X size={12} /> Limpar
                      </button>
                    )}
                  </div>

                  <FilterSection title="Sexo">
                    <div className="space-y-1">
                      {[["homem", "Homem"], ["mulher", "Mulher"], ["unissexo", "Unissexo"]].map(([v, l]) => (
                        <CheckboxFilter key={v} label={l} checked={filters.genders.includes(v)} onChange={(c) => toggleFilter("genders", v)} />
                      ))}
                    </div>
                  </FilterSection>

                  <FilterSection title="Criança">
                    <div className="space-y-1">
                      {[["rapaz", "Rapaz"], ["rapariga", "Rapariga"]].map(([v, l]) => (
                        <CheckboxFilter key={v} label={l} checked={filters.genders.includes(v)} onChange={(c) => toggleFilter("genders", v)} />
                      ))}
                    </div>
                  </FilterSection>

                  <FilterSection title="Comprar por preço">
                    <div className="space-y-1">
                      {PRICE_RANGES.map((range) => (
                        <label key={range.label} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer py-0.5">
                          <input
                            type="radio"
                            name="price"
                            checked={filters.priceRange?.min === range.min && filters.priceRange?.max === range.max}
                            onChange={() => setFilters((prev) => ({ ...prev, priceRange: { min: range.min, max: range.max } }))}
                            className="rounded-full border-border accent-[#001a4d]"
                          />
                          {range.label}
                        </label>
                      ))}
                      {filters.priceRange && (
                        <button
                          className="text-xs text-muted-foreground hover:text-foreground mt-1"
                          onClick={() => setFilters((prev) => ({ ...prev, priceRange: null }))}
                        >
                          Limpar preço
                        </button>
                      )}
                    </div>
                  </FilterSection>

                  <FilterSection title="Tamanho">
                    <div className="grid grid-cols-3 gap-1">
                      {SIZES.map((size) => (
                        <button
                          key={size}
                          className="px-2 py-1 text-xs border border-border rounded hover:bg-accent transition-colors text-center"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </FilterSection>

                  <FilterSection title="Cor">
                    <div className="grid grid-cols-3 gap-3">
                      {COLORS.map(({ value, label, color }) => (
                        <button
                          key={value}
                          onClick={() => toggleFilter("colors", value)}
                          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                            filters.colors.includes(value)
                              ? "bg-accent ring-2 ring-[#001a4d]"
                              : "hover:bg-accent"
                          }`}
                          title={label}
                        >
                          <div
                            className="w-8 h-8 rounded-full border"
                            style={{
                              backgroundColor: color,
                              borderColor: color === "#ffffff" ? "#ccc" : color,
                            }}
                          />
                          <span className="text-xs text-center text-muted-foreground">{label}</span>
                        </button>
                      ))}
                    </div>
                  </FilterSection>



                  <FilterSection title="Altura do calçado">
                    <div className="space-y-1">
                      {[["cano_baixo", "Cano baixo"], ["cano_alto", "Cano alto"]].map(([v, l]) => (
                        <CheckboxFilter key={v} label={l} checked={filters.bootHeights.includes(v)} onChange={() => toggleFilter("bootHeights", v)} />
                      ))}
                    </div>
                  </FilterSection>

                  {availableCollections.length > 0 && (
                    <FilterSection title="Coleções">
                      <div className="space-y-1">
                        {availableCollections.map((col) => (
                          <CheckboxFilter key={col} label={col} checked={filters.collections.includes(col)} onChange={() => toggleFilter("collections", col)} />
                        ))}
                      </div>
                    </FilterSection>
                  )}

                  <FilterSection title="Superfície">
                    <div className="space-y-1">
                      {[["terreno_firme", "Terreno firme"], ["terreno_mole", "Terreno mole"], ["relva", "Relva"], ["relva_artificial", "Relva artificial"]].map(([v, l]) => (
                        <CheckboxFilter key={v} label={l} checked={filters.surfaces.includes(v)} onChange={() => toggleFilter("surfaces", v)} />
                      ))}
                    </div>
                  </FilterSection>
                </div>
              </aside>
            )}

            {/* Products grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-accent rounded-lg h-96 animate-pulse" />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhum produto encontrado.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="group cursor-pointer"
                      onClick={() => {
                        const url = params.categorySlug 
                          ? `/products/${params.brandSlug}/${params.categorySlug}/product/${product.id}`
                          : `/products/${params.brandSlug}/product/${product.id}`;
                        navigate(url);
                      }}
                    >
                      <div className="relative rounded-lg overflow-hidden mb-3 aspect-square bg-white dark:bg-slate-950">
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        {product.featured && (
                          <div className="absolute top-3 right-3 bg-[#001a4d] text-white px-2 py-1 rounded text-xs font-bold">
                            Em destaque
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-[#001a4d] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                      <p className="text-lg font-bold text-foreground">€{parseFloat(product.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Products() {
  return (
    <CartProvider>
      <ProductsContent />
    </CartProvider>
  );
}
