import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

// ─── Schema de validação ─────────────────────────────────────────────────────

const schema = z.object({
	email: z
		.string()
		.min(1, "E-mail é obrigatório")
		.email("Digite um e-mail válido"),
	password: z.string().min(1, "Senha é obrigatória"),
});

type FormData = z.infer<typeof schema>;

// ─── Constantes de rate limit ─────────────────────────────────────────────────

const MAX_ATTEMPTS = 5;
const LOCK_SECONDS = 30;

// ─── Componente ───────────────────────────────────────────────────────────────

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);
	const [countdown, setCountdown] = useState(0);
	const failedAttempts = useRef(0);
	const navigate = useNavigate();
	const { signIn } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	// Countdown timer quando bloqueado
	useEffect(() => {
		if (countdown <= 0) return;
		const timer = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
		return () => clearInterval(timer);
	}, [countdown]);

	const isLocked = countdown > 0;

	const onSubmit = async (data: FormData) => {
		if (isLocked) return;

		setServerError(null);

		try {
			const response = await login(data);
			signIn(response.access_token, response.refresh_token);
			failedAttempts.current = 0;
			if (response.mustChangePassword) {
				navigate("/trocar-senha?obrigatorio=true");
			} else {
				navigate("/dashboard");
			}
		} catch (err) {
			failedAttempts.current += 1;

			if (failedAttempts.current >= MAX_ATTEMPTS) {
				failedAttempts.current = 0;
				setCountdown(LOCK_SECONDS);
				setServerError(
					`Muitas tentativas falhas. Aguarde ${LOCK_SECONDS} segundos.`,
				);
			} else {
				const remaining = MAX_ATTEMPTS - failedAttempts.current;
				setServerError(
					`${err instanceof Error ? err.message : "Erro ao fazer login"}. ${remaining} tentativa${remaining > 1 ? "s" : ""} restante${remaining > 1 ? "s" : ""}.`,
				);
			}
		}
	};

	return (
		<div
			className="relative flex min-h-screen w-full flex-col bg-[#F4F7F9] overflow-x-hidden"
			style={{ fontFamily: "Manrope, 'Noto Sans', sans-serif" }}
		>
			<div className="flex flex-1 justify-center items-center py-5 px-4 sm:px-6 lg:px-8 min-h-screen">
				<div className="w-full max-w-6xl flex flex-col md:flex-row shadow-xl rounded-xl overflow-hidden">
					{/* Coluna Esquerda: Marca e Slogan */}
					<div className="w-full md:w-1/2 flex flex-col justify-between p-8 md:p-12 bg-gray-100 relative min-h-[240px]">
						{/* Imagem de fundo decorativa */}
						<div className="absolute inset-0">
							<div
								className="w-full h-full bg-center bg-no-repeat bg-cover"
								style={{
									backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDiDpooPxp7yAJASSYVLZ_MLEYqZ0SadvnTfSsN0HbJKDp-oLLZYn4IC5UgYrSty_3GGFReLa4FFtTimDPFbHxW0-AySq0C7XgRVruH-Cxh76ypVkEFaGN9BV4xiNwWVcmxmTc1Ke5j1i80kmqYu6Dt2D4WkH6K1M1jePoJIa3A43GgZZG3jHT4oE8FCuQeQP5ze1NWYqy7ESMQIu7WG62g_YovKhSTB6J5HTDXJp4hkFLXd4o9RXTuFPp25uQnw8M4nvVgKH9gEX_X")`,
									opacity: 0.1,
								}}
							/>
						</div>

						{/* Logo */}
						<div className="relative z-10">
							<h1 className="text-3xl font-black text-[#333333]">Gioia</h1>
						</div>

						{/* Slogan */}
						<div className="relative z-10 mt-16 md:mt-0">
							<h2 className="text-3xl md:text-4xl font-bold text-[#333333] leading-tight">
								Consultoria que{" "}
								<span className="text-[#005A9C]">impulsiona resultados.</span>
							</h2>
						</div>
					</div>

					{/* Coluna Direita: Formulário de Login */}
					<div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12 bg-white">
						<div className="flex flex-col gap-2 mb-8">
							<p className="text-[#333333] text-3xl sm:text-4xl font-black leading-tight tracking-tight">
								Bem-vindo(a) de volta!
							</p>
							<p className="text-gray-500 text-base font-normal leading-normal">
								Acesse sua conta para continuar.
							</p>
						</div>

						<form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
							{/* Campo E-mail */}
							<div className="flex flex-col flex-1 gap-1">
								<label className="text-[#333333] text-base font-medium leading-normal">
									E-mail
								</label>
								<input
									type="email"
									placeholder="Digite seu e-mail"
									{...register("email")}
									aria-invalid={!!errors.email}
									className={`
										flex w-full min-w-0 flex-1 rounded-lg
										text-[#333333] bg-[#F4F7F9]
										border h-14 p-4
										text-base font-normal
										placeholder:text-gray-400
										focus:outline-none focus:ring-2 focus:ring-[#A8D0E6]/50
										transition-colors
										${errors.email ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-[#A8D0E6]"}
									`}
								/>
								{errors.email && (
									<p className="text-red-500 text-sm mt-0.5">{errors.email.message}</p>
								)}
							</div>

							{/* Campo Senha */}
							<div className="flex flex-col gap-1">
								<label className="text-[#333333] text-base font-medium leading-normal">
									Senha
								</label>
								<div className="flex w-full flex-1 items-stretch rounded-lg">
									<input
										type={showPassword ? "text" : "password"}
										placeholder="Digite sua senha"
										{...register("password")}
										aria-invalid={!!errors.password}
										className={`
											flex w-full min-w-0 flex-1 rounded-l-lg
											text-[#333333] bg-[#F4F7F9]
											border border-r-0 h-14 p-4 pr-2
											text-base font-normal
											placeholder:text-gray-400
											focus:outline-none focus:ring-2 focus:ring-[#A8D0E6]/50
											transition-colors
											${errors.password ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-[#A8D0E6]"}
										`}
									/>
									<button
										type="button"
										onClick={() => setShowPassword((prev) => !prev)}
										className={`
											text-gray-500 flex border bg-[#F4F7F9]
											items-center justify-center px-4 rounded-r-lg border-l-0
											hover:text-[#005A9C] focus:outline-none focus:border-[#A8D0E6]
											focus:ring-2 focus:ring-[#A8D0E6]/50 transition-colors
											${errors.password ? "border-red-400" : "border-gray-300"}
										`}
										aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
									>
										{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
									</button>
								</div>
								{errors.password && (
									<p className="text-red-500 text-sm mt-0.5">{errors.password.message}</p>
								)}
								<Link
									to="/esqueci-senha"
									className="text-[#005A9C] hover:underline text-sm font-normal leading-normal pt-1 self-end"
								>
									Esqueceu a senha?
								</Link>
							</div>

							{/* Botões */}
							<div className="flex flex-col gap-4">
								{/* Banner de erro do servidor ou bloqueio */}
								{serverError && (
									<p className={`text-sm text-center rounded-lg px-4 py-3 border ${isLocked ? "text-orange-700 bg-orange-50 border-orange-200" : "text-red-600 bg-red-50 border-red-200"}`}>
										{isLocked ? `🔒 ${serverError} (${countdown}s)` : serverError}
									</p>
								)}

								<button
									type="submit"
									disabled={isSubmitting || isLocked}
									className="
										flex items-center justify-center w-full
										bg-[#005A9C] text-white font-bold h-14 rounded-lg
										text-base leading-normal
										hover:bg-[#004a84] focus:outline-none focus:ring-2
										focus:ring-offset-2 focus:ring-[#005A9C]
										transition-colors disabled:opacity-60 disabled:cursor-not-allowed
									"
								>
									{isLocked
										? `Aguarde ${countdown}s`
										: isSubmitting
											? "Entrando..."
											: "Entrar"}
								</button>

								<Link
									to="/solicitar-acesso"
									className="
										flex items-center justify-center w-full
										bg-[#005A9C]/20 text-[#005A9C] font-bold h-14 rounded-lg
										text-base leading-normal
										hover:bg-[#005A9C]/30 focus:outline-none focus:ring-2
										focus:ring-offset-2 focus:ring-[#005A9C]
										transition-colors
									"
								>
									Solicitar Acesso
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
