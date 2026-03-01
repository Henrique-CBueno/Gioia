import { useEffect, useState } from "react";
import { type RelatorioDTO, listarTodosRelatoriosAdmin, getUsuariosAutorizados, atualizarAcessoRelatorio } from "../../services/relatorioService";
import { type UsuarioDTO, listarUsuarios } from "../../services/usuarioService";
import { MESES } from "./DashboardLayout";
import { Calendar, FileText, Filter, Users, X, Check, Loader2, Search } from "lucide-react";

const anoAtual = new Date().getFullYear();
const ANOS = Array.from({ length: 5 }, (_, i) => anoAtual - i);

export default function AdminRelatoriosPage() {
	const [relatorios, setRelatorios] = useState<RelatorioDTO[]>([]);
	const [loading, setLoading] = useState(true);
	const [erro, setErro] = useState<string | null>(null);
	const [mesFiltro, setMesFiltro] = useState<number | undefined>(undefined);
	const [anoFiltro, setAnoFiltro] = useState<number | undefined>(undefined);

	// Modal state
	const [modalAberto, setModalAberto] = useState(false);
	const [relatorioSelecionado, setRelatorioSelecionado] = useState<RelatorioDTO | null>(null);
	const [usuarios, setUsuarios] = useState<UsuarioDTO[]>([]);
	const [usuariosAutorizados, setUsuariosAutorizados] = useState<string[]>([]);
	const [loadingModal, setLoadingModal] = useState(false);
	const [salvandoAcesso, setSalvandoAcesso] = useState(false);
	const [sucesso, setSucesso] = useState<string | null>(null);
	const [buscaUsuario, setBuscaUsuario] = useState("");

	useEffect(() => {
		carregarRelatorios();
	}, [mesFiltro, anoFiltro]);

	async function carregarRelatorios() {
		setLoading(true);
		setErro(null);
		try {
			const data = await listarTodosRelatoriosAdmin(mesFiltro, anoFiltro);
			setRelatorios(data);
		} catch {
			setErro("Não foi possível carregar os relatórios.");
		} finally {
			setLoading(false);
		}
	}

	async function abrirModalGerenciar(r: RelatorioDTO) {
		setRelatorioSelecionado(r);
		setModalAberto(true);
		setLoadingModal(true);
		setErro(null);

		try {
			// Busca todos os usuários e a lista de acessos do relatório selecionado simultaneamente
			const [todosUsuarios, autorizados] = await Promise.all([
				listarUsuarios(),
				getUsuariosAutorizados(r.id),
			]);
			setUsuarios(todosUsuarios);
			setUsuariosAutorizados(autorizados || []);
		} catch (error) {
			console.error(error);
			setErro("Erro ao carregar os dados de usuários e acessos.");
		} finally {
			setLoadingModal(false);
		}
	}

	function fecharModal() {
		setModalAberto(false);
		setRelatorioSelecionado(null);
		setUsuarios([]);
		setUsuariosAutorizados([]);
		setBuscaUsuario("");
	}

	const usuariosFiltrados = usuarios.filter((u) => {
		const termo = buscaUsuario.toLowerCase();
		return (
			u.firstName.toLowerCase().includes(termo) ||
			u.lastName.toLowerCase().includes(termo) ||
			u.email.toLowerCase().includes(termo)
		);
	});

	const todosSelecionados = usuarios.length > 0 && usuariosAutorizados.length === usuarios.length;

	function toggleSelecionarTodos() {
		if (todosSelecionados) {
			setUsuariosAutorizados([]);
		} else {
			setUsuariosAutorizados(usuarios.map((u) => u.id));
		}
	}

	function toggleAcesso(userId: string) {
		setUsuariosAutorizados((prev) =>
			prev.includes(userId)
				? prev.filter((id) => id !== userId)
				: [...prev, userId],
		);
	}

	async function salvarAcessos() {
		if (!relatorioSelecionado) return;
		setSalvandoAcesso(true);
		setErro(null);

		try {
			await atualizarAcessoRelatorio(relatorioSelecionado.id, usuariosAutorizados);
			setSucesso(`Acessos do relatório "${relatorioSelecionado.titulo}" atualizados com sucesso.`);
			setTimeout(() => setSucesso(null), 5000);
			fecharModal();
		} catch (err) {
			console.error(err);
			setErro("Erro ao atualizar os acessos do relatório.");
		} finally {
			setSalvandoAcesso(false);
		}
	}

	const nomeMes = (m: number) => MESES[m - 1];

	return (
		<div className="max-w-4xl mx-auto">
			{/* Modal de Gerenciamento de Acessos */}
			{modalAberto && relatorioSelecionado && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
					<div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col max-h-[80vh]">
						<div className="p-6 border-b border-gray-100 flex items-center justify-between">
							<h3 className="font-bold text-[#333333] text-lg">Gerenciar Acessos</h3>
							<button
								type="button"
								onClick={fecharModal}
								className="text-gray-400 hover:text-gray-600 focus:outline-none"
							>
								<X size={20} />
							</button>
						</div>

						<div className="px-6 py-4 flex-1 overflow-y-hidden flex flex-col min-h-0">
							<div className="mb-4 flex-shrink-0">
								<p className="text-sm text-gray-500">
									Relatório: <strong className="text-[#333333]">{relatorioSelecionado.titulo}</strong>
								</p>
								<p className="text-xs text-gray-400 mt-1">Selecione os usuários que terão acesso a este PDF.</p>
							</div>

							{loadingModal ? (
								<div className="flex justify-center items-center py-12 flex-shrink-0">
									<Loader2 className="animate-spin text-[#005A9C]" size={24} />
									<span className="ml-2 text-sm text-gray-500">Carregando usuários...</span>
								</div>
							) : (
								<div className="flex flex-col flex-1 min-h-0">
									<div className="flex items-center justify-between gap-2 mb-3 flex-shrink-0">
										<div className="relative flex-1">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
												<Search size={16} className="text-gray-400" />
											</div>
											<input
												type="text"
												placeholder="Buscar por nome ou e-mail..."
												value={buscaUsuario}
												onChange={(e) => setBuscaUsuario(e.target.value)}
												className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#005A9C]/50 focus:border-[#005A9C]"
											/>
										</div>
										<button
											type="button"
											onClick={toggleSelecionarTodos}
											className="text-sm text-[#005A9C] font-semibold hover:bg-[#005A9C]/5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
										>
											{todosSelecionados ? "Desmarcar todos" : "Selecionar todos"}
										</button>
									</div>

									<div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider flex-shrink-0">
										{usuariosAutorizados.length} de {usuarios.length} usuários com acesso
									</div>

									<div className="space-y-2 overflow-y-auto pr-2 pb-2 flex-1 min-h-0">
										{usuariosFiltrados.length === 0 ? (
											<p className="text-sm text-gray-500 py-4 text-center">Nenhum usuário encontrado.</p>
										) : (
											usuariosFiltrados.map((u) => {
												const temAcesso = usuariosAutorizados.includes(u.id);
												return (
													<label
														key={u.id}
													className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
														temAcesso
															? "border-[#005A9C]/30 bg-[#005A9C]/5"
															: "border-gray-200 hover:bg-gray-50"
													}`}
												>
													<div className="flex items-center gap-3">
														<div
															className={`w-5 h-5 rounded flex items-center justify-center border ${
																temAcesso
																	? "bg-[#005A9C] border-[#005A9C] text-white"
																	: "border-gray-300 bg-white"
															}`}
														>
															{temAcesso && <Check size={14} strokeWidth={3} />}
														</div>
														<div>
															<p className="text-sm font-medium text-[#333333]">
																{u.firstName} {u.lastName}
															</p>
															<p className="text-xs text-gray-500">{u.email}</p>
															<p className="text-xs text-gray-400 mt-0.5">ID: {u.id}</p>
														</div>
													</div>
													<input
														type="checkbox"
														checked={temAcesso}
														onChange={() => toggleAcesso(u.id)}
														className="hidden"
													/>
												</label>
											);
										})
									)}
									</div>
								</div>
							)}
						</div>

						<div className="p-6 border-t border-gray-100 flex gap-3 justify-end bg-gray-50 rounded-b-2xl">
							<button
								type="button"
								onClick={fecharModal}
								className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
							>
								Cancelar
							</button>
							<button
								type="button"
								onClick={salvarAcessos}
								disabled={salvandoAcesso || loadingModal}
								className="px-4 py-2 bg-[#005A9C] text-white rounded-lg text-sm font-medium hover:bg-[#00487F] disabled:opacity-50 flex items-center justify-center min-w-[100px]"
							>
								{salvandoAcesso ? "Salvando..." : "Salvar Acessos"}
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="flex items-center justify-between mb-6">
				<div>
					<h2 className="text-2xl font-black text-[#333333]">Administração de Relatórios</h2>
					<p className="text-gray-500 text-sm mt-1">
						Gerencie o acesso aos relatórios do sistema.
					</p>
				</div>
			</div>

			{sucesso && (
				<div className="mb-4 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm flex items-center gap-2">
					<Check size={16} /> {sucesso}
				</div>
			)}

			{erro && (
				<div className="mb-4 text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm">
					{erro}
				</div>
			)}

			{/* Filtros */}
			<div className="flex flex-wrap gap-3 mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
				<div className="flex items-center gap-2 text-gray-500">
					<Filter size={16} />
					<span className="text-sm font-medium">Filtrar por:</span>
				</div>
				<select
					value={mesFiltro ?? ""}
					onChange={(e) =>
						setMesFiltro(e.target.value ? Number(e.target.value) : undefined)
					}
					className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-[#333333] bg-[#F4F7F9] focus:outline-none focus:ring-2 focus:ring-[#005A9C]/50"
				>
					<option value="">Todos os meses</option>
					{MESES.map((m, i) => (
						<option key={m} value={i + 1}>
							{m}
						</option>
					))}
				</select>
				<select
					value={anoFiltro ?? ""}
					onChange={(e) =>
						setAnoFiltro(e.target.value ? Number(e.target.value) : undefined)
					}
					className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-[#333333] bg-[#F4F7F9] focus:outline-none focus:ring-2 focus:ring-[#005A9C]/50"
				>
					<option value="">Todos os anos</option>
					{ANOS.map((a) => (
						<option key={a} value={a}>
							{a}
						</option>
					))}
				</select>
				{(mesFiltro || anoFiltro) && (
					<button
						type="button"
						onClick={() => {
							setMesFiltro(undefined);
							setAnoFiltro(undefined);
						}}
						className="text-sm text-[#005A9C] hover:underline"
					>
						Limpar filtros
					</button>
				)}
			</div>

			{/* Estado de loading */}
			{loading && (
				<div className="flex justify-center py-16 text-gray-400 text-sm">
					<Loader2 className="animate-spin text-[#005A9C] mr-2" size={20} />
					Carregando relatórios...
				</div>
			)}

			{/* Lista vazia */}
			{!loading && !erro && relatorios.length === 0 && (
				<div className="flex flex-col items-center py-16 gap-3 text-gray-400 bg-white rounded-xl border border-gray-100 border-dashed">
					<FileText size={40} className="text-gray-300" />
					<p className="text-sm font-medium">Nenhum relatório encontrado.</p>
				</div>
			)}

			{/* Cards */}
			{!loading && !erro && relatorios.length > 0 && (
				<ul className="flex flex-col gap-3">
					{relatorios.map((r) => (
						<li key={r.id} className="relative group">
							<div className="w-full text-left flex items-center justify-between gap-4 bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:border-[#005A9C]/30 hover:shadow-md transition-all">
								<div className="flex items-start gap-4 flex-1">
									<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#005A9C]/10 flex items-center justify-center">
										<FileText size={20} className="text-[#005A9C]" />
									</div>
									<div className="flex-1">
										<p className="font-semibold text-[#333333] text-sm leading-snug">
											{r.titulo}
										</p>
										{r.descricao && (
											<p className="text-gray-500 text-xs mt-0.5 line-clamp-1">
												{r.descricao}
											</p>
										)}
										<span className="inline-flex items-center gap-1 text-xs text-gray-400 mt-1.5">
											<Calendar size={12} />
											{nomeMes(r.mes)} de {r.ano}
										</span>
									</div>
								</div>
								
								<button
									type="button"
									onClick={() => abrirModalGerenciar(r)}
									className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#005A9C]/20 text-[#005A9C] bg-[#005A9C]/5 hover:bg-[#005A9C] hover:text-white transition-colors text-sm font-medium flex-shrink-0"
								>
									<Users size={16} />
									<span className="hidden sm:inline">Gerenciar Acessos</span>
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
