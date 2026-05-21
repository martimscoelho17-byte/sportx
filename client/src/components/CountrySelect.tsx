import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

interface CountrySelectProps {
  value: string;
  onChange: (code: string) => void;
  label?: string;
  id?: string;
}

export default function CountrySelect({ value, onChange, label = "País", id = "country" }: CountrySelectProps) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = EU_COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div ref={dropdownRef} className="relative">
      {label && <Label htmlFor={id}>{label}</Label>}
      
      <style>{`
        .country-dropdown::-webkit-scrollbar {
          width: 12px;
        }
        .country-dropdown::-webkit-scrollbar-track {
          background: #001a4d;
        }
        .country-dropdown::-webkit-scrollbar-thumb {
          background: #8B0000;
          border-radius: 12px;
        }
        .country-dropdown::-webkit-scrollbar-thumb:hover {
          background: #a00000;
        }
        .country-dropdown::-webkit-scrollbar-button {
          background: #001a4d;
          color: #001a4d;
          height: 12px;
          width: 12px;
        }
        .country-dropdown {
          scrollbar-color: #8B0000 #001a4d;
          scrollbar-width: auto;
        }
      `}</style>
      
      {!isOpen ? (
        // Closed state: Show button with lupa and text
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(true)}
          className="w-full px-3 py-2 border-2 border-[#001a4d] rounded-full bg-gray-100 dark:bg-black text-foreground text-left flex items-center gap-2 hover:bg-accent/50 transition-colors"
        >
          <Search size={18} className="text-muted-foreground flex-shrink-0" />
          <span className="text-sm">
            {value
              ? EU_COUNTRIES.find((c) => c.code === value)?.name
              : "Selecione um País"}
          </span>
        </button>
      ) : (
        // Open state: Show search input with lupa
        <div className="w-full px-3 py-2 border-2 border-[#001a4d] rounded-full bg-gray-100 dark:bg-black flex items-center gap-2">
          <Search size={18} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm text-foreground placeholder-muted-foreground w-full"
            autoFocus
          />
        </div>
      )}

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border-2 border-[#001a4d] rounded-lg shadow-lg z-50">
          <div className="country-dropdown max-h-48 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country.code)}
                  className="w-full text-left px-3 py-2 hover:bg-[#001a4d]/10 transition-colors text-foreground text-sm"
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
  );
}
