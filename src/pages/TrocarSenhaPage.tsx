import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Lock, Eye, EyeOff } from "lucide-react";
import { trocarSenha } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

export default function TrocarSenhaPage() {
	const [novaSenha, setNovaSenha] = useState("");
	const [confirmar, setConfirmar] = useState("");
	const [showSenha, setShowSenha] = useState(false);
	const [erro, setErro] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const { logout } = useAuth();
	const [searchParams] = useSearchParams();
	const obrigatorio = searchParams.get("obrigatorio") === "true";

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (novaSenha.length < 6) {
			setErro("A senha deve ter pelo menos 6 caracteres.");
			return;
		}
		if (novaSenha !== confirmar) {
			setErro("As senhas não coincidem.");
			return;
		}
		setErro(null);
		setLoading(true);
		try {
			await trocarSenha(novaSenha);
			navigate("/dashboard");
		} catch {
			setErro("Erro ao trocar a senha. Tente novamente.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center bg-[#F4F7F9] px-4"
			style={{ fontFamily: "Manrope, 'Noto Sans', sans-serif" }}
		>
			<div className="w-full max-w-md">
				<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
					<div className="w-12 h-12 rounded-xl bg-[#005A9C]/10 flex items-center justify-center mb-5">
						<Lock size={22} className="text-[#005A9C]" />
					</div>

					<h1 className="text-2xl font-black text-[#333333]">
						{obrigatorio ? "Crie sua senha" : "Alterar senha"}
					</h1>
					<p className="text-gray-500 text-sm mt-1 mb-6">
						{obrigatorio
							? "Por segurança, defina uma nova senha para continuar."
							: "Digite e confirme sua nova senha."}
					</p>

					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						{/* Nova senha */}
						<div className="flex flex-col gap-1.5">
							<label className="text-sm font-medium text-[#333333]">Nova senha</label>
							<div className="relative">
								<Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
								<input
									type={showSenha ? "text" : "password"}
									value={novaSenha}
									onChange={(e) => setNovaSenha(e.target.value)}
									placeholder="Mínimo 6 caracteres"
									className="w-full pl-9 pr-10 h-11 rounded-lg border border-gray-200 bg-[#F4F7F9]
										text-sm text-[#333333] placeholder:text-gray-400
										focus:outline-none focus:ring-2 focus:ring-[#A8D0E6]/50 transition-colors"
								/>
								<button
									type="button"
									onClick={() => setShowSenha((v) => !v)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
								>
									{showSenha ? <EyeOff size={16} /> : <Eye size={16} />}
								</button>
							</div>
						</div>

						{/* Confirmar senha */}
						<div className="flex flex-col gap-1.5">
							<label className="text-sm font-medium text-[#333333]">Confirmar senha</label>
							<div className="relative">
								<Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
								<input
									type={showSenha ? "text" : "password"}
									value={confirmar}
									onChange={(e) => setConfirmar(e.target.value)}
									placeholder="Repita a senha"
									className="w-full pl-9 pr-4 h-11 rounded-lg border border-gray-200 bg-[#F4F7F9]
										text-sm text-[#333333] placeholder:text-gray-400
										focus:outline-none focus:ring-2 focus:ring-[#A8D0E6]/50 transition-colors"
								/>
							</div>
						</div>

						{erro && (
							<p className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-sm">
								{erro}
							</p>
						)}

						<button
							type="submit"
							disabled={loading}
							className="h-12 w-full bg-[#005A9C] text-white font-bold rounded-lg text-sm
								hover:bg-[#004a84] transition-colors
								disabled:opacity-60 disabled:cursor-not-allowed"
						>
							{loading ? "Salvando..." : "Salvar senha"}
						</button>

						{/* Só permite sair se não for obrigatório */}
						{!obrigatorio && (
							<button
								type="button"
								onClick={() => navigate(-1)}
								className="text-center text-sm text-gray-400 hover:text-[#005A9C] transition-colors"
							>
								Cancelar
							</button>
						)}
						{obrigatorio && (
							<button
								type="button"
								onClick={logout}
								className="text-center text-xs text-gray-300 hover:text-gray-500 transition-colors mt-1"
							>
								Sair da conta
							</button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
