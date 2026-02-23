const BASE_URL = import.meta.env.VITE_API_URL;

function authHeaders(): Record<string, string> {
	const token = localStorage.getItem("access_token");
	return {
		"Content-Type": "application/json",
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};
}

export interface UsuarioDTO {
	id: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	enabled: boolean;
}

export async function listarUsuarios(): Promise<UsuarioDTO[]> {
	const res = await fetch(`${BASE_URL}/admin/usuarios`, { headers: authHeaders() });
	if (!res.ok) throw new Error("Erro ao carregar usuários");
	return res.json();
}

export async function cadastrarUsuario(dados: {
	nome: string;
	sobrenome: string;
	email: string;
	senha: string;
}): Promise<void> {
	const res = await fetch(`${BASE_URL}/admin/usuarios`, {
		method: "POST",
		headers: authHeaders(),
		body: JSON.stringify(dados),
	});
	if (!res.ok) throw new Error("Erro ao cadastrar usuário");
}

export async function redefinirSenhaUsuario(keycloakId: string, senha: string): Promise<void> {
	const res = await fetch(`${BASE_URL}/admin/usuarios/${keycloakId}/senha`, {
		method: "PUT",
		headers: authHeaders(),
		body: JSON.stringify({ senha }),
	});
	if (!res.ok) throw new Error("Erro ao redefinir senha");
}
