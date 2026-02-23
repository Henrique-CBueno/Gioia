import { Calendar, ExternalLink, FileText, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { type RelatorioDTO, getUrlRelatorio, listarRelatorios } from "../../services/relatorioService";
import { MESES } from "./DashboardLayout";

const anoAtual = new Date().getFullYear();
const ANOS = Array.from({ length: 5 }, (_, i) => anoAtual - i);

export default function RelatoriosPage() {
	const [relatorios, setRelatorios] = useState<RelatorioDTO[]>([]);
	const [loading, setLoading] = useState(true);
	const [erro, setErro] = useState<string | null>(null);
	const [mesFiltro, setMesFiltro] = useState<number | undefined>(undefined);
	const [anoFiltro, setAnoFiltro] = useState<number | undefined>(undefined);
	const [abrindo, setAbrindo] = useState<number | null>(null);

	useEffect(() => {
		carregarRelatorios();
	}, [mesFiltro, anoFiltro]);

	async function carregarRelatorios() {
		setLoading(true);
		setErro(null);
		try {
			const data = await listarRelatorios(mesFiltro, anoFiltro);
			setRelatorios(data);
		} catch {
			setErro("Não foi possível carregar os relatórios.");
		} finally {
			setLoading(false);
		}
	}

	async function abrirRelatorio(id: number) {
		setAbrindo(id);
		try {
			const url = await getUrlRelatorio(id);
			window.open(url, "_blank", "noopener,noreferrer");
		} catch {
			// silencia — URL é temporária
		} finally {
			setAbrindo(null);
		}
	}

	const nomeMes = (m: number) => MESES[m - 1];

	return (
		<div className="max-w-4xl mx-auto">
			<div className="mb-6">
				<h2 className="text-2xl font-black text-[#333333]">Relatórios</h2>
				<p className="text-gray-500 text-sm mt-1">
					Clique em um relatório para abri-lo.
				</p>
			</div>

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
					className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-[#333333] bg-[#F4F7F9] focus:outline-none focus:ring-2 focus:ring-[#A8D0E6]/50"
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
					className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-[#333333] bg-[#F4F7F9] focus:outline-none focus:ring-2 focus:ring-[#A8D0E6]/50"
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
					Carregando...
				</div>
			)}

			{/* Erro */}
			{erro && !loading && (
				<p className="text-center text-red-500 py-8">{erro}</p>
			)}

			{/* Lista vazia */}
			{!loading && !erro && relatorios.length === 0 && (
				<div className="flex flex-col items-center py-16 gap-3 text-gray-400">
					<FileText size={40} />
					<p className="text-sm">Nenhum relatório encontrado.</p>
				</div>
			)}

			{/* Cards */}
			{!loading && !erro && relatorios.length > 0 && (
				<ul className="flex flex-col gap-3">
					{relatorios.map((r) => (
						<li key={r.id}>
							<button
								type="button"
								onClick={() => abrirRelatorio(r.id)}
								disabled={abrindo === r.id}
								className="w-full text-left flex items-center justify-between gap-4
									bg-white rounded-xl border border-gray-100 shadow-sm p-5
									hover:border-[#005A9C]/30 hover:shadow-md transition-all group
									disabled:opacity-60 disabled:cursor-wait"
							>
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#005A9C]/10 flex items-center justify-center">
										<FileText size={20} className="text-[#005A9C]" />
									</div>
									<div>
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
								<ExternalLink
									size={16}
									className="text-gray-300 group-hover:text-[#005A9C] transition-colors flex-shrink-0"
								/>
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
