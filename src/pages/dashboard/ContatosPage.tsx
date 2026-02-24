import { MessageSquare, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { type ContatoResponseData, listarContatos } from "../../services/contatoService";

export default function ContatosPage() {
	const [contatos, setContatos] = useState<ContatoResponseData[]>([]);
	const [carregando, setCarregando] = useState(true);
	const [erroLista, setErroLista] = useState<string | null>(null);

	useEffect(() => {
		carregar();
	}, []);

	async function carregar() {
		setCarregando(true);
		setErroLista(null);
		try {
			const data = await listarContatos();
			setContatos(data);
		} catch {
			setErroLista("Não foi possível carregar as solicitações de contato.");
		} finally {
			setCarregando(false);
		}
	}

	return (
		<div className="max-w-6xl mx-auto flex flex-col gap-8">
			<div>
				<div className="mb-4">
					<h2 className="text-2xl font-black text-[#333333]">Contatos</h2>
					<p className="text-gray-500 text-sm mt-1">
						Visualize as solicitações de contato enviadas pelo site.
					</p>
				</div>

				<h3 className="text-sm font-semibold text-[#333333] mb-3 flex items-center gap-2">
					<MessageSquare size={16} className="text-[#005A9C]" />
					Solicitações recebidas ({contatos.length})
				</h3>

				{carregando && <p className="text-gray-400 text-sm py-6 text-center">Carregando...</p>}
				{erroLista && !carregando && <p className="text-red-500 text-sm text-center py-6">{erroLista}</p>}

				{!carregando && !erroLista && (
					<div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-gray-100 bg-[#F4F7F9]">
									<th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Data</th>
									<th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nome</th>
									<th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Contato</th>
									<th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Mensagem</th>
								</tr>
							</thead>
							<tbody>
								{contatos.length === 0 && (
									<tr>
										<td colSpan={4} className="text-center text-gray-400 py-8">
											Nenhuma solicitação encontrada.
										</td>
									</tr>
								)}
								{contatos.map((c) => (
									<tr key={c.id} className="border-b border-gray-50 hover:bg-[#F4F7F9]/60 transition-colors">
										<td className="px-5 py-3.5 whitespace-nowrap text-gray-500 align-top">
											<div className="flex items-center gap-1.5">
												<Calendar size={14} className="text-gray-400" />
												{new Date(c.criadoEm).toLocaleDateString("pt-BR", {
													day: "2-digit",
													month: "2-digit",
													year: "numeric",
													hour: "2-digit",
													minute: "2-digit",
												})}
											</div>
										</td>
										<td className="px-5 py-3.5 font-medium text-[#333333] align-top min-w-[150px]">
											{c.nome}
										</td>
										<td className="px-5 py-3.5 text-gray-500 align-top min-w-[200px]">
											<div className="flex flex-col gap-1">
												<a href={`mailto:${c.email}`} className="hover:text-[#005A9C] transition-colors">{c.email}</a>
												{c.telefone && <span>{c.telefone}</span>}
											</div>
										</td>
										<td className="px-5 py-3.5 text-gray-600 align-top min-w-[250px] max-w-lg">
											{c.assunto && (
												<div className="font-semibold text-[#333333] mb-1 text-xs uppercase tracking-wide">
													Assunto: {c.assunto}
												</div>
											)}
											<div className="whitespace-pre-wrap">{c.mensagem}</div>
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
