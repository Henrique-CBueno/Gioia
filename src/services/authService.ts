const BASE_URL = import.meta.env.VITE_API_URL;

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	refresh_expires_in: number;
	mustChangePassword: boolean;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
	const res = await fetch(`${BASE_URL}/auth/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error("Erro ao fazer login");
	}

	return res.json();
}

export async function esqueciSenha(email: string): Promise<void> {
	const res = await fetch(`${BASE_URL}/auth/esqueci-senha`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email }),
	});
	if (!res.ok) throw new Error("Erro ao solicitar redefinição");
}

export async function trocarSenha(novaSenha: string): Promise<void> {
	const token = localStorage.getItem("access_token");
	const res = await fetch(`${BASE_URL}/auth/trocar-senha`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
		body: JSON.stringify({ novaSenha }),
	});
	if (!res.ok) throw new Error("Erro ao trocar senha");
}
