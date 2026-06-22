import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, User, Sun, Moon, ChevronDown, Search, Heart } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import LoginModal from "./LoginModal";

interface BrandMenu {
  name: string;
  slug: string;
  categories: { name: string; slug: string }[];
}

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { itemCount, isOpen: cartOpen, openCart } = useCart();
  const { favorites } = useFavorites();
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [loginOpen, setLoginOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { data: brands = [] } = trpc.brands.list.useQuery();
  const { data: allCategories = [] } = trpc.categories.all.useQuery();
  const { data: searchResults = [] } = trpc.products.search.useQuery(
    { query: searchQuery },
    { enabled: searchQuery.length >= 2 }
  );

  const brandMenus: BrandMenu[] = brands.map((brand) => ({
    name: brand.name,
    slug: brand.slug,
    categories: allCategories
      .filter((c) => c.brandId === brand.id)
      .map((c) => ({ name: c.name, slug: c.slug })),
  }));

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-border shadow-sm">
        <div className="w-full">
          <div className="flex items-center justify-between h-16 px-0">
            {/* Logo - Left */}
            <Link href="/" className="flex-shrink-0 pl-4">
              <img
                src="https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663389044073/JJVHNmCShuqbrlAT.png?Expires=1803757048&Signature=Bb~ZqK9r7xaFDiwCZlkLAW9kIHzYTCB4quACfhaHTBgZfG5p1Rz0vVmb7ZDVk8ruapztnDaGPJvODNFRAoWIfRObS7a5EE8Yq9isnR6RFxR~O3tNRg-kqmRQlpzH-j1Od~W~4Vlfee1DCB8lbvuxMxh9TEwSybQYbUk7Lrazdx1LtyjGGBBXdHfThephkFG6piCNitjnO8G39rvY9hG0usS7Sst4koPkW~jg6YyRcl884NSos05n2mZPBBUEbNJ81M7axHtXftAnJzJoSP9030BO94UZUFYK02BLWeTgREcQIxFy9qTt-3oR6OcFnochUF498S-D6ofj3bTSzEz11w__&Key-Pair-Id=K2HSFNDJXOU9YS"
                alt="SportX"
                className="h-8 w-8"
                style={{filter: "brightness(1.2) contrast(1.1)"}}
              />
            </Link>

            {/* Brand navigation - Center-Left */}
            <nav className="hidden md:flex items-center gap-20 absolute left-2/5 transform -translate-x-1/2" ref={dropdownRef}>
              {brandMenus.map((brand) => (
                <div key={brand.slug} className="relative">
                  <button
                    className="flex items-center gap-1.5 px-2 py-2 hover:opacity-80 dark:hover:opacity-80 transition-opacity"
                    onMouseEnter={() => setActiveDropdown(brand.slug)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    onClick={() => navigate(`/products/${brand.slug}`)}
                    title={brand.name}
                  >
                    <img
                      src={`/${brand.slug}-logo.svg`}
                      alt={brand.name}
                      className="h-6 w-auto object-contain dark:invert"
                    />
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${activeDropdown === brand.slug ? "rotate-180" : ""}`}
                    />
                  </button>

                  {activeDropdown === brand.slug && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 flex flex-col bg-popover border border-border rounded-lg shadow-lg py-1 z-50 min-w-max"
                      onMouseEnter={() => setActiveDropdown(brand.slug)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {brand.categories.map((cat) => (
                        <button
                          key={cat.slug}
                          className="w-full text-left px-4 py-2.5 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                          onClick={() => {
                            navigate(`/products/${brand.slug}/${cat.slug}`);
                            setActiveDropdown(null);
                          }}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center ml-auto mr-4">
              <div className="relative w-48" ref={searchRef}>
                <div className="relative flex items-center bg-gray-100 dark:bg-black rounded-full px-4 py-2 border-2 border-[#001a4d]">
                  <Search size={18} className="text-muted-foreground flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Pesquisar"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSearchOpen(true);
                    }}
                    onFocus={() => searchQuery.length >= 2 && setSearchOpen(true)}
                    className="ml-2 bg-transparent outline-none text-sm text-foreground placeholder-muted-foreground w-full"
                  />
                </div>
                {searchOpen && searchQuery.length >= 2 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg py-1 z-50 max-h-96 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      searchResults.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            const brand = brands.find(b => b.id === product.brandId);
                            if (brand) {
                              navigate(`/products/${brand.slug}`);
                            }
                            setSearchQuery("");
                            setSearchOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-popover-foreground hover:bg-accent transition-colors border-b border-border last:border-b-0"
                        >
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-muted-foreground">{product.description}</div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2.5 text-sm text-muted-foreground text-center">
                        Sem resultados para "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Actions - Right */}
            <div className="flex items-center gap-2 pr-4">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-accent transition-colors text-foreground"
                aria-label="Alternar tema"
                title={theme === "dark" ? "Modo claro" : "Modo escuro"}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* User - Authenticated */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    className="p-2 rounded-full hover:bg-accent transition-colors text-foreground"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    aria-label="Conta"
                    title="Minha conta"
                  >
                    <User size={20} />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg py-1 z-50">
                      <button
                        type="button"
                        className="w-full text-left px-4 py-2 text-sm font-medium text-popover-foreground border-b border-border hover:bg-accent transition-colors cursor-pointer"
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigate("/account");
                        }}
                      >
                        {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.name || user.email}
                      </button>
                      <button
                        type="button"
                        className="w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors cursor-pointer"
                        onClick={async () => {
                          setUserMenuOpen(false);
                          await logout();
                          setTimeout(() => setLoginOpen(true), 100);
                        }}
                      >
                        Terminar sessão
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="p-2 rounded-full hover:bg-accent transition-colors text-foreground"
                  onClick={() => setLoginOpen(true)}
                  aria-label="Iniciar sessão"
                  title="Iniciar sessão"
                >
                  <User size={20} />
                </button>
              )}

              {/* Favorites */}
              <button
                className="relative p-2 rounded-full hover:bg-accent transition-colors text-foreground"
                onClick={() => navigate("/favorites")}
                aria-label="Favoritos"
                title="Ver favoritos"
              >
                <Heart size={20} />
                {favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {favorites.length > 9 ? "9+" : favorites.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                className="relative p-2 rounded-full hover:bg-accent transition-colors text-foreground"
                onClick={openCart}
                aria-label="Carrinho"
                title="Ver carrinho"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
