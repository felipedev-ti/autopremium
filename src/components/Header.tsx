import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  // O nosso contexto a brilhar: acedemos ao utilizador e à função de logout numa só linha!
  const { user, signOut } = useAuth();

  return (
    <header className="flex items-center justify-between p-6 bg-zinc-950 text-white border-b border-zinc-800">
      <Link to="/" className="text-2xl font-bold tracking-tighter">
        Auto<span className="text-blue-500">Premium</span>
      </Link>

      <nav>
        {user ? (
          <div className="flex items-center gap-4">
            {/* O "Pill" UI com o nome ou email do utilizador */}
            <div className="px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-full text-sm font-medium text-zinc-300">
              Olá, {user.user_metadata?.display_name || user.email}
            </div>
            <button
              onClick={signOut}
              className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
            >
              Sair
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
          >
            Fazer Login
          </Link>
        )}
      </nav>
    </header>
  );
}
