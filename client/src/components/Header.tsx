import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, User, Sun, Moon, ChevronDown, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
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
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [loginOpen, setLoginOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: brands = [] } = trpc.brands.list.useQuery();
  const { data: allCategories = [] } = trpc.categories.all.useQuery();

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
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between h-16 gap-8 px-4">
            {/* Logo - Left */}
            <Link href="/" className="flex-shrink-0 -ml-4">
              <img
                src="https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663389044073/JJVHNmCShuqbrlAT.png?Expires=1803757048&Signature=Bb~ZqK9r7xaFDiwCZlkLAW9kIHzYTCB4quACfhaHTBgZfG5p1Rz0vVmb7ZDVk8ruapztnDaGPJvODNFRAoWIfRObS7a5EE8Yq9isnR6RFxR~O3tNRg-kqmRQlpzH-j1Od~W~4Vlfee1DCB8lbvuxMxh9TEwSybQYbUk7Lrazdx1LtyjGGBBXdHfThephkFG6piCNitjnO8G39rvY9hG0usS7Sst4koPkW~jg6YyRcl884NSos05n2mZPBBUEbNJ81M7axHtXftAnJzJoSP9030BO94UZUFYK02BLWeTgREcQIxFy9qTt-3oR6OcFnochUF498S-D6ofj3bTSzEz11w__&Key-Pair-Id=K2HSFNDJXOU9YS"
                alt="SportX"
                className="h-8 w-8"
                style={{filter: "brightness(1.2) contrast(1.1)"}}
              />
            </Link>

            {/* Brand navigation - Center */}
            <nav className="hidden md:flex items-center gap-16 flex-1 justify-center" ref={dropdownRef}>
              {brandMenus.map((brand) => (
                <div key={brand.slug} className="relative">
                  <button
                    className="flex items-center gap-1.5 px-0 py-2 text-sm font-bold text-foreground hover:text-[#001a4d] dark:hover:text-blue-300 transition-colors"
                    onMouseEnter={() => setActiveDropdown(brand.slug)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    onClick={() => navigate(`/products/${brand.slug}`)}
                  >
                    {brand.name}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${activeDropdown === brand.slug ? "rotate-180" : ""}`}
                    />
                  </button>

                  {activeDropdown === brand.slug && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg py-1 z-50"
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

            {/* Actions - Right */}
            <div className="flex items-center gap-2 ml-auto -mr-4">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-accent transition-colors text-foreground"
                aria-label="Alternar tema"
                title={theme === "dark" ? "Modo claro" : "Modo escuro"}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* User */}
              <div className="relative">
                <button
                  className="p-2 rounded-full hover:bg-accent transition-colors text-foreground"
                  onClick={() => {
                    if (user) setUserMenuOpen(!userMenuOpen);
                    else setLoginOpen(true);
                  }}
                  aria-label="Conta"
                  title={user ? "Minha conta" : "Iniciar sessão"}
                >
                  <User size={20} />
                </button>
                {userMenuOpen && user && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm font-medium text-popover-foreground border-b border-border">
                      {user.name || user.email}
                    </div>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors"
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                    >
                      Terminar sessão
                    </button>
                  </div>
                )}
              </div>

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
