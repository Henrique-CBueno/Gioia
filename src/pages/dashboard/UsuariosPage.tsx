import { Users, UserPlus, CheckCircle, XCircle, KeyRound, X, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	type UsuarioDTO,
	cadastrarUsuario,
	listarUsuarios,
	redefinirSenhaUsuario,
} from "../../services/usuarioService";

// ─── Schemas ─────────────────────────────────────────────────────────────────

const schemaCadastro = z.object({
	nome: z.string().min(1, "Nome obrigatório"),
	sobrenome: z.string().min(1, "Sobrenome obrigatório"),
	email: z.string().min(1).email("E-mail inválido"),
	senha: z.string().min(6, "Mínimo 6 caracteres"),
});

const schemaSenha = z.object({
	senha: z.string().min(6, "Mínimo 6 caracteres"),
});

type CadastroForm = z.infer<typeof schemaCadastro>;
type SenhaForm = z.infer<typeof schemaSenha>;

// ─── Modal de Redefinição de Senha ───────────────────────────────────────────

function ModalRedefinirSenha({
	usuario,
	onClose,
	onSucesso,
}: {
	usuario: UsuarioDTO;
	onClose: () => void;
	onSucesso: () => void;
}) {
	const [showSenha, setShowSenha] = useState(false);
	const [erro, setErro] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SenhaForm>({ resolver: zodResolver(schemaSenha) });

	const onSubmit = async (data: SenhaForm) => {
		setErro(null);
		try {
			await redefinirSenhaUsuario(usuario.id, data.senha);
			onSucesso();
		} catch {
			setErro("Erro ao redefinir a senha.");
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
			<div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
				<div className="flex items-center justify-between mb-4">
					<div>
						<h3 className="font-bold text-[#333333] text-base">Redefinir senha</h3>
						<p className="text-xs text-gray-400 mt-0.5">
							{usuario.firstName} {usuario.lastName} &mdash; {usuario.email || usuario.username}
						</p>
					</div>
					<button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
						<X size={18} />
					</button>
				</div>

				<p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4">
					O usuário precisará criar uma nova senha no próximo login.
				</p>

				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
					<div className="flex flex-col gap-1">
						<label className="text-xs font-medium text-gray-600">Nova senha temporária *</label>
						<div className="relative">
							<input
								type={showSenha ? "text" : "password"}
								{...register("senha")}
								placeholder="Mínimo 6 caracteres"
								className={`w-full h-10 px-3 pr-9 rounded-lg border text-sm bg-[#F4F7F9]
									focus:outline-none focus:ring-2 focus:ring-[#A8D0E6]/50 transition-colors
									${errors.senha ? "border-red-400" : "border-gray-200"}`}
							/>
							<button
								type="button"
								onClick={() => setShowSenha((v) => !v)}
								className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
							>
								{showSenha ? <EyeOff size={14} /> : <Eye size={14} />}
							</button>
						</div>
						{errors.senha && <p className="text-red-500 text-xs">{errors.senha.message}</p>}
					</div>

					{erro && <p className="text-red-600 text-xs">{erro}</p>}

					<div className="flex gap-2 mt-1">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 h-9 rounded-lg border border-gray-200 text-sm text-gray-500
								hover:bg-gray-50 transition-colors"
						>
							Cancelar
						</button>
						<button
							type="submit"
							disabled={isSubmitting}
							className="flex-1 h-9 rounded-lg bg-[#005A9C] text-white text-sm font-semibold
								hover:bg-[#004a84] transition-colors disabled:opacity-60"
						>
							{isSubmitting ? "Salvando..." : "Redefinir"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function UsuariosPage() {
	const [usuarios, setUsuarios] = useState<UsuarioDTO[]>([]);
	const [carregando, setCarregando] = useState(true);
	const [erroLista, setErroLista] = useState<string | null>(null);
	const [sucesso, setSucesso] = useState(false);
	const [erroCadastro, setErroCadastro] = useState<string | null>(null);
	const [usuarioSelecionado, setUsuarioSelecionado] = useState<UsuarioDTO | null>(null);
	const [sucessoSenha, setSucessoSenha] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<CadastroForm>({ resolver: zodResolver(schemaCadastro) });

	useEffect(() => {
		carregar();
	}, []);

	async function carregar() {
		setCarregando(true);
		setErroLista(null);
		try {
			setUsuarios(await listarUsuarios());
		} catch {
			setErroLista("Não foi possível carregar os usuários.");
		} finally {
			setCarregando(false);
		}
	}

	const onSubmit = async (data: CadastroForm) => {
		setSucesso(false);
		setErroCadastro(null);
		try {
			await cadastrarUsuario(data);
			setSucesso(true);
			reset();
			await carregar();
		} catch {
			setErroCadastro("Erro ao cadastrar usuário.");
		}
	};

	const handleSucessoSenha = (nome: string) => {
		setUsuarioSelecionado(null);
		setSucessoSenha(`Senha de ${nome} redefinida. Ele precisará criar uma nova senha no próximo login.`);
		setTimeout(() => setSucessoSenha(null), 5000);
	};

	const inputClass = (hasError: boolean) =>
		`w-full rounded-lg border h-10 px-3 text-sm text-[#333333] bg-[#F4F7F9]
		placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A8D0E6]/50 transition-colors
		${hasError ? "border-red-400" : "border-gray-200"}`;

	return (
		<div className="max-w-5xl mx-auto flex flex-col gap-8">
			{/* Modal de redefinição */}
			{usuarioSelecionado && (
				<ModalRedefinirSenha
					usuario={usuarioSelecionado}
					onClose={() => setUsuarioSelecionado(null)}
					onSucesso={() => handleSucessoSenha(`${usuarioSelecionado.firstName} ${usuarioSelecionado.lastName}`)}
				/>
			)}

			{/* Cadastro */}
			<div>
				<div className="mb-4">
					<h2 className="text-2xl font-black text-[#333333]">Usuários</h2>
					<p className="text-gray-500 text-sm mt-1">Cadastre novos usuários e gerencie os existentes.</p>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
				>
					<h3 className="text-sm font-semibold text-[#333333] mb-4 flex items-center gap-2">
						<UserPlus size={16} className="text-[#005A9C]" />
						Novo Usuário
					</h3>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="flex flex-col gap-1">
							<label className="text-xs font-medium text-gray-600">Nome *</label>
							<input {...register("nome")} placeholder="João" className={inputClass(!!errors.nome)} />
							{errors.nome && <p className="text-red-500 text-xs">{errors.nome.message}</p>}
						</div>
						<div className="flex flex-col gap-1">
							<label className="text-xs font-medium text-gray-600">Sobrenome *</label>
							<input {...register("sobrenome")} placeholder="Silva" className={inputClass(!!errors.sobrenome)} />
							{errors.sobrenome && <p className="text-red-500 text-xs">{errors.sobrenome.message}</p>}
						</div>
						<div className="flex flex-col gap-1">
							<label className="text-xs font-medium text-gray-600">E-mail *</label>
							<input {...register("email")} type="email" placeholder="joao@email.com" className={inputClass(!!errors.email)} />
							{errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
						</div>
						<div className="flex flex-col gap-1">
							<label className="text-xs font-medium text-gray-600">Senha inicial *</label>
							<input {...register("senha")} type="password" placeholder="Mínimo 6 caracteres" className={inputClass(!!errors.senha)} />
							{errors.senha && <p className="text-red-500 text-xs">{errors.senha.message}</p>}
						</div>
					</div>

					{sucesso && (
						<p className="mt-3 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-sm">
							✅ Usuário cadastrado! Ele precisará definir uma nova senha no primeiro login.
						</p>
					)}
					{erroCadastro && (
						<p className="mt-3 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-sm">
							{erroCadastro}
						</p>
					)}

					<button
						type="submit"
						disabled={isSubmitting}
						className="mt-4 flex items-center gap-2 px-5 py-2 bg-[#005A9C] text-white
							text-sm font-semibold rounded-lg hover:bg-[#004a84] transition-colors
							disabled:opacity-60 disabled:cursor-not-allowed"
					>
						<UserPlus size={15} />
						{isSubmitting ? "Cadastrando..." : "Cadastrar"}
					</button>
				</form>
			</div>

			{/* Lista */}
			<div>
				<h3 className="text-sm font-semibold text-[#333333] mb-3 flex items-center gap-2">
					<Users size={16} className="text-[#005A9C]" />
					Usuários cadastrados ({usuarios.length})
				</h3>

				{sucessoSenha && (
					<p className="mb-3 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-sm">
						✅ {sucessoSenha}
					</p>
				)}

				{carregando && <p className="text-gray-400 text-sm py-6 text-center">Carregando...</p>}
				{erroLista && !carregando && <p className="text-red-500 text-sm text-center py-6">{erroLista}</p>}

				{!carregando && !erroLista && (
					<div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-gray-100 bg-[#F4F7F9]">
									<th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nome</th>
									<th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">E-mail</th>
									<th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
									<th className="px-5 py-3" />
								</tr>
							</thead>
							<tbody>
								{usuarios.length === 0 && (
									<tr>
										<td colSpan={4} className="text-center text-gray-400 py-8">Nenhum usuário encontrado.</td>
									</tr>
								)}
								{usuarios.map((u) => (
									<tr key={u.id} className="border-b border-gray-50 hover:bg-[#F4F7F9]/60 transition-colors">
										<td className="px-5 py-3.5 font-medium text-[#333333]">
											{u.firstName} {u.lastName}
										</td>
										<td className="px-5 py-3.5 text-gray-500">{u.email || u.username}</td>
										<td className="px-5 py-3.5">
											{u.enabled ? (
												<span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
													<CheckCircle size={11} /> Ativo
												</span>
											) : (
												<span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
													<XCircle size={11} /> Inativo
												</span>
											)}
										</td>
										<td className="px-5 py-3.5 text-right">
											<button
												type="button"
												onClick={() => setUsuarioSelecionado(u)}
												className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400
													hover:text-[#005A9C] hover:bg-[#005A9C]/5 px-2.5 py-1.5 rounded-lg transition-colors"
											>
												<KeyRound size={13} />
												Redefinir senha
											</button>
										</td>
									</tr>
								))}
							</tbody>
							</table>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
