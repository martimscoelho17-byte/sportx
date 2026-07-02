import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
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
  defaultOpen?: boolean;
}

export default function CountrySelect({ value, onChange, label = "País", id = "country", defaultOpen = false }: CountrySelectProps) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(defaultOpen);
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
          border-radius: 6px;
        }
        .country-dropdown::-webkit-scrollbar-thumb:hover {
          background: #a00000;
        }
        .country-dropdown {
          scrollbar-color: #8B0000 #001a4d;
          scrollbar-width: thin;
        }
      `}</style>
      
      {!isOpen && (
        // Closed state: Show button with lupa and text
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(true)}
          className="w-full px-3 py-2 border-2 border-[#001a4d] rounded-full bg-gray-100 dark:bg-black text-foreground text-left flex items-center gap-2 hover:bg-accent/50 transition-colors"
        >
          <Search size={18} className="text-muted-foreground flex-shrink-0" />
          <span className="text-sm">
            {EU_COUNTRIES.find((c) => c.code === value)?.name}
          </span>
        </button>
      )}

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#000510] border-2 border-[#001a4d] rounded shadow-lg z-50 overflow-hidden">
          {/* Search bar at the top */}
          <div className="border-b border-[#001a4d] p-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-[#000510] border border-[#001a4d] rounded">
              <Search size={16} className="text-gray-300 flex-shrink-0" />
              <input
                type="text"
                placeholder=""
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full"
                autoFocus
              />
            </div>
          </div>

          {/* Countries list */}
          <div className="country-dropdown max-h-56 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country.code)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors text-white text-sm"
                >
                  {country.name}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-400 text-sm">
                Nenhum país encontrado
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
