import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

type ViewMode = "login" | "register" | "forgot";

export default function Login() {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<ViewMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (viewMode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/");
      } else if (viewMode === "register") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
          },
        });
        if (error) throw error;
        setSuccessMsg(
          "Conta criada! Verifique a sua caixa de entrada para confirmar o e-mail.",
        );
        setEmail("");
        setPassword("");
        setName("");
      } else if (viewMode === "forgot") {
        // LÓGICA DE RECUPERAÇÃO DE PALAVRA-PASSE
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/update-password`,
        });
        if (error) throw error;
        setSuccessMsg(
          "Enviámos um e-mail com o link para redefinir a sua palavra-passe.",
        );
      }
    } catch (err: any) {
      if (err.message.includes("Invalid login credentials")) {
        setError("E-mail ou palavra-passe incorretos.");
      } else if (err.message.includes("User already registered")) {
        setError("Este e-mail já está registado.");
      } else if (err.message.includes("Password should be at least")) {
        setError("A palavra-passe deve ter pelo menos 6 caracteres.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex font-sans antialiased overflow-hidden">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 relative z-10">
        <Link
          to="/"
          className="absolute top-10 left-8 md:left-24 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Acervo
        </Link>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <span className="font-bold text-2xl tracking-wider uppercase flex items-center justify-center lg:justify-start gap-2 mb-2">
              AutoPremium
            </span>
            <h1 className="text-3xl font-bold mt-8 mb-2">
              {viewMode === "login" && "Bem-vindo de volta"}
              {viewMode === "register" && "Criar Conta"}
              {viewMode === "forgot" && "Recuperar Acesso"}
            </h1>
            <p className="text-zinc-400 text-sm">
              {viewMode === "login" &&
                "Acesse o seu painel para gerenciar os seus veículos e atendimentos."}
              {viewMode === "register" &&
                "Junte-se ao nosso grupo de colecionadores e entusiastas."}
              {viewMode === "forgot" &&
                "Insira o seu e-mail para receber as instruções de redefinição."}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              {successMsg}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {viewMode === "register" && (
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40 transition-all placeholder-zinc-600"
                  placeholder="Ex: João Silva"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40 transition-all placeholder-zinc-600"
                placeholder="seu@email.com"
              />
            </div>

            {viewMode !== "forgot" && (
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">
                  Palavra-passe
                </label>
                <input
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40 transition-all placeholder-zinc-600"
                  placeholder="••••••••"
                />
              </div>
            )}

            {viewMode === "login" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode("forgot");
                    setError("");
                    setSuccessMsg("");
                  }}
                  className="text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Esqueceu a palavra-passe?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold rounded-xl py-3.5 mt-4 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {viewMode === "login" && "Entrar"}
                  {viewMode === "register" && "Criar Conta"}
                  {viewMode === "forgot" && "Enviar link de recuperação"}
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            {viewMode === "login" && (
              <button
                onClick={() => {
                  setViewMode("register");
                  setError("");
                  setSuccessMsg("");
                }}
                type="button"
                className="text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Ainda não tem conta? Crie uma agora.
              </button>
            )}

            {(viewMode === "register" || viewMode === "forgot") && (
              <button
                onClick={() => {
                  setViewMode("login");
                  setError("");
                  setSuccessMsg("");
                }}
                type="button"
                className="text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Já tem uma conta? Fazer login.
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1600"
          alt="Luxury Car Dark"
          className="w-full h-full object-cover opacity-60"
        />
      </div>
    </div>
  );
}
