const BASE_URL = import.meta.env.VITE_API_URL;

export interface ContatoRequestData {
	nome: string;
	email: string;
	telefone?: string;
	assunto?: string;
	mensagem: string;
}

export interface ContatoResponseData {
	id: number;
	nome: string;
	email: string;
	telefone?: string;
	assunto?: string;
	mensagem: string;
	criadoEm: string;
}

export async function criarContato(data: ContatoRequestData): Promise<void> {
	const res = await fetch(`${BASE_URL}/contatos`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error("Erro ao enviar contato");
	}
}

export async function listarContatos(): Promise<ContatoResponseData[]> {
	const token = localStorage.getItem("access_token");
	const res = await fetch(`${BASE_URL}/contatos`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
	});

	if (!res.ok) {
		throw new Error("Erro ao listar contatos");
	}

	return res.json();
}
