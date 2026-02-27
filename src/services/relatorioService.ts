const BASE_URL = import.meta.env.VITE_API_URL;

function authHeaders(): Record<string, string> {
	const token = localStorage.getItem("access_token");
	return {
		"Content-Type": "application/json",
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};
}

export interface RelatorioDTO {
	id: number;
	titulo: string;
	descricao: string;
	mes: number;
	ano: number;
	criadoEm: string;
}

export async function listarRelatorios(mes?: number, ano?: number): Promise<RelatorioDTO[]> {
	const params = new URLSearchParams();
	if (mes) params.append("mes", String(mes));
	if (ano) params.append("ano", String(ano));

	const res = await fetch(`${BASE_URL}/relatorios?${params}`, {
		headers: authHeaders(),
	});
	if (!res.ok) throw new Error("Erro ao carregar relatórios");
	return res.json();
}

export async function getUrlRelatorio(id: number): Promise<string> {
	const res = await fetch(`${BASE_URL}/relatorios/${id}/url`, {
		headers: authHeaders(),
	});
	if (!res.ok) throw new Error("Erro ao obter URL do relatório");
	const data = await res.json();
	return data.url;
}

export async function uploadRelatorio(
	titulo: string,
	descricao: string,
	mes: number,
	ano: number,
	arquivo: File,
): Promise<RelatorioDTO> {
	const token = localStorage.getItem("access_token");
	const form = new FormData();
	form.append("titulo", titulo);
	form.append("descricao", descricao);
	form.append("mes", String(mes));
	form.append("ano", String(ano));
	form.append("arquivo", arquivo);

	const res = await fetch(`${BASE_URL}/relatorios`, {
		method: "POST",
		headers: token ? { Authorization: `Bearer ${token}` } : {},
		body: form,
	});
	if (!res.ok) throw new Error("Erro ao fazer upload do relatório");
	return res.json();
}

export async function excluirRelatorio(id: number): Promise<void> {
	const res = await fetch(`${BASE_URL}/admin/report/${id}`, {
		method: "DELETE",
		headers: authHeaders(),
	});
	if (!res.ok) throw new Error("Erro ao excluir relatório");
}
