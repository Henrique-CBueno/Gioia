import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextData {
	isAuthenticated: boolean;
	isAdmin: boolean;
	token: string | null;
	signIn: (accessToken: string, refreshToken: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextData>({
	isAuthenticated: false,
	isAdmin: false,
	token: null,
	signIn: () => {},
	logout: () => {},
});

function decodeJwtRoles(token: string): string[] {
	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		return payload?.realm_access?.roles ?? [];
	} catch {
		return [];
	}
}

function isTokenExpired(token: string): boolean {
	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		return payload.exp * 1000 < Date.now();
	} catch {
		return true;
	}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [token, setToken] = useState<string | null>(
		localStorage.getItem("access_token"),
	);

	useEffect(() => {
		const stored = localStorage.getItem("access_token");
		if (stored && isTokenExpired(stored)) {
			localStorage.removeItem("access_token");
			localStorage.removeItem("refresh_token");
			setToken(null);
		}
	}, []);

	const roles = token ? decodeJwtRoles(token) : [];
	const isAuthenticated = !!token && !isTokenExpired(token);
	const isAdmin = roles.includes("ADMIN");

	const signIn = (accessToken: string, refreshToken: string) => {
		localStorage.setItem("access_token", accessToken);
		localStorage.setItem("refresh_token", refreshToken);
		setToken(accessToken);
	};

	const logout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, isAdmin, token, signIn, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
