import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // O Supabase deteta automaticamente o token na URL e inicia uma sessão temporária
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "PASSWORD_RECOVERY") {
        console.log("Modo de recuperação de senha ativo");
      }
    });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    // Atualiza a palavra-passe do utilizador autenticado pelo link
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError("Erro ao atualizar: " + error.message);
    } else {
      setMessage("Palavra-passe atualizada com sucesso! A redirecionar...");
      setTimeout(() => navigate("/"), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 antialiased font-sans">
      <div className="max-w-md w-full bg-zinc-900/40 border border-white/10 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-2">Nova Palavra-passe</h2>
        <p className="text-zinc-400 text-sm mb-6">
          Insira a sua nova palavra-passe abaixo.
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm mb-4">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-xl text-sm mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Nova palavra-passe (mín. 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-800/50 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none text-white placeholder-zinc-500"
            required
            minLength={6}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition-colors"
          >
            {loading ? "A atualizar..." : "Confirmar Alteração"}
          </button>
        </form>
      </div>
    </div>
  );
}
