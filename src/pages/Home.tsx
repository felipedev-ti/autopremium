import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";
import {
  Search,
  Shield,
  Clock,
  Sparkles,
  Truck,
  ArrowRight,
  UserCircle,
  LogOut,
} from "lucide-react";

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  specs: {
    power: string;
    acceleration: string;
    topSpeed: string;
    bodyType: string;
  };
}

export default function Home() {
  // --- ESTADOS (VEÍCULOS E UTILIZADOR) ---
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("Todas as Marcas");
  const [user, setUser] = useState<User | null>(null);

  // --- BUSCAR VEÍCULOS ---
  useEffect(() => {
    async function fetchVehicles() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("vehicles").select("*");

        if (error) {
          console.error("Erro ao buscar veículos:", error);
        } else if (data) {
          setVehicles(data as Vehicle[]);
        }
      } catch (err) {
        console.error("Erro de conexão:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchVehicles();
  }, []);

  // --- VERIFICAR AUTENTICAÇÃO ---
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- FUNÇÃO DE LOGOUT ---
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // --- FILTROS DE PESQUISA ---
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch = `${vehicle.brand} ${vehicle.model}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesBrand =
      selectedBrand === "Todas as Marcas" || vehicle.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  const brands = [
    "Todas as Marcas",
    "Porsche",
    "Ferrari",
    "Lamborghini",
    "McLaren",
  ];

  return (
    <div className="min-h-screen bg-black text-white antialiased font-sans">
      {/* HEADER / NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
          <span className="font-bold text-xl tracking-wider uppercase text-white">
            AutoPremium
          </span>

          <nav className="flex items-center gap-8 text-sm font-medium text-white absolute left-1/2 -translate-x-1/2">
            <a href="#acervo" className="hover:text-zinc-300 transition-colors">
              Acervo
            </a>
            <a
              href="#diferenciais"
              className="hover:text-zinc-300 transition-colors"
            >
              Diferenciais
            </a>
            <a
              href="#experiencia"
              className="hover:text-zinc-300 transition-colors"
            >
              Experiência
            </a>
          </nav>

          {/* VERIFICAÇÃO DE UTILIZADOR PARA MOSTRAR ENTRAR OU SAIR */}
          {user ? (
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full pl-4 pr-1.5 py-1.5 backdrop-blur-md shadow-sm transition-all hover:bg-white/10">
              <div className="flex items-center gap-2 mr-3">
                <UserCircle className="w-4 h-4 text-zinc-400" />
                <span className="text-sm font-medium text-zinc-200 hidden sm:block max-w-[150px] truncate capitalize">
                  {user.user_metadata?.full_name?.split(" ")[0] ||
                    user.email?.split(/[\.\@_]/)[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                title="Terminar sessão"
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-full transition-colors flex items-center justify-center group"
              >
                <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-white hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Entrar
            </Link>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2000"
            alt="Porsche de Fundo"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 uppercase">
            Excelência em <br />
            <span className="text-zinc-400">Movimento</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-200 font-medium drop-shadow-md max-w-2xl mx-auto mb-10 leading-relaxed">
            A curadoria definitiva de veículos de luxo e alta performance.
            Desenhado para entusiastas, por especialistas.
          </p>

          {/* BARRA DE PESQUISA */}
          <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-2.5 rounded-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-3 shadow-2xl">
            <div className="flex-1 flex items-center px-4 bg-zinc-800/50 rounded-xl border border-white/5">
              <Search className="w-5 h-5 text-zinc-400 mr-3" />
              <input
                type="text"
                placeholder="Ex: Porsche 911..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none py-3 text-sm"
              />
            </div>

            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-zinc-800/50 text-zinc-200 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none cursor-pointer"
            >
              {brands.map((brand) => (
                <option
                  key={brand}
                  value={brand}
                  className="bg-zinc-900 text-white"
                >
                  {brand}
                </option>
              ))}
            </select>

            <a
              href="#acervo"
              className="bg-white text-black font-semibold px-8 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors text-sm"
            >
              Explorar <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO DO ACERVO */}
      <section id="acervo" className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-3">Acervo Exclusivo</h2>
          <p className="text-zinc-400">
            Cada veículo em nosso showroom passa por uma inspeção rigorosa de
            300 pontos.
          </p>
        </div>

        {/* LISTAGEM DE VEÍCULOS / SKELETON */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-zinc-900/50 border border-white/5 rounded-3xl p-4 animate-pulse"
              >
                <div className="w-full h-72 bg-zinc-800 rounded-2xl mb-4" />
                <div className="h-6 bg-zinc-800 rounded w-1/2 mb-2" />
                <div className="h-4 bg-zinc-800 rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/30 border border-white/5 rounded-3xl">
            <p className="text-zinc-400">
              Nenhum veículo encontrado para a sua pesquisa.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="group bg-zinc-900/40 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500"
              >
                <div className="relative h-80 overflow-hidden bg-zinc-950">
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    {vehicle.specs.bodyType}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                        {vehicle.brand}{" "}
                        <span className="text-zinc-400 font-normal">
                          {vehicle.model}
                        </span>
                      </h3>
                      <p className="text-xs text-zinc-500 mt-1">
                        {vehicle.year} • {vehicle.specs.power} •{" "}
                        {vehicle.specs.acceleration} (0-100)
                      </p>
                    </div>
                    <span className="text-lg font-bold text-white">
                      R$ {vehicle.price.toLocaleString("pt-BR")}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs text-zinc-400">
                    <span>Velocidade Máx: {vehicle.specs.topSpeed}</span>
                    <button className="text-white font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Ver Detalhes <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SEÇÃO DE DIFERENCIAIS */}
      <section
        id="diferenciais"
        className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10"
      >
        <h2 className="text-3xl font-bold mb-12">A Experiência AutoPremium</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all group">
            <Shield className="w-8 h-8 text-zinc-400 mb-6 group-hover:text-white transition-colors" />
            <h3 className="text-xl font-bold mb-2">Garantia Estendida CPO</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Todos os veículos possuem certificação rigorosa e garantia direta
              de fábrica estendida por até 24 meses, sem limite de
              quilometragem.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all group">
            <Clock className="w-8 h-8 text-zinc-400 mb-6 group-hover:text-white transition-colors" />
            <h3 className="text-xl font-bold mb-2">Concierge 24/7</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Assistência premium dedicada a qualquer hora do dia ou da noite,
              em qualquer lugar do país.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all group">
            <Sparkles className="w-8 h-8 text-zinc-400 mb-6 group-hover:text-white transition-colors" />
            <h3 className="text-xl font-bold mb-2">Detailing Nível 1</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Tratamento estético com vitrificação de pintura e higienização em
              couro natural antes da entrega.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all group">
            <Truck className="w-8 h-8 text-zinc-400 mb-6 group-hover:text-white transition-colors" />
            <h3 className="text-xl font-bold mb-2">Home Delivery Exclusivo</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Entregamos seu novo veículo em transporte fechado (sider),
              garantindo total discrição e segurança até a sua garagem.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 bg-zinc-950 text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 AutoPremium. Todos os direitos reservados.</p>
          <p>Projeto de Alta Performance & Design de Elite.</p>
        </div>
      </footer>
    </div>
  );
}
