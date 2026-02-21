import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: implementar lógica de autenticação
		console.log("Login:", { email, password });
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

						<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
							{/* Campo E-mail */}
							<label className="flex flex-col flex-1">
								<p className="text-[#333333] text-base font-medium leading-normal pb-2">
									E-mail ou Usuário
								</p>
								<input
									type="email"
									placeholder="Digite seu e-mail ou nome de usuário"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="
										flex w-full min-w-0 flex-1 rounded-lg
										text-[#333333] bg-[#F4F7F9]
										border border-gray-300 h-14 p-4
										text-base font-normal
										placeholder:text-gray-400
										focus:outline-none focus:border-[#A8D0E6] focus:ring-2 focus:ring-[#A8D0E6]/50
										transition-colors
									"
								/>
							</label>

							{/* Campo Senha */}
							<div className="flex flex-col">
								<label className="flex flex-col flex-1">
									<p className="text-[#333333] text-base font-medium leading-normal pb-2">
										Senha
									</p>
									<div className="flex w-full flex-1 items-stretch rounded-lg">
										<input
											type={showPassword ? "text" : "password"}
											placeholder="Digite sua senha"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className="
												flex w-full min-w-0 flex-1 rounded-l-lg
												text-[#333333] bg-[#F4F7F9]
												border border-gray-300 border-r-0 h-14 p-4 pr-2
												text-base font-normal
												placeholder:text-gray-400
												focus:outline-none focus:border-[#A8D0E6] focus:ring-2 focus:ring-[#A8D0E6]/50
												transition-colors
											"
										/>
										<button
											type="button"
											onClick={() => setShowPassword((prev) => !prev)}
											className="
												text-gray-500 flex border border-gray-300 bg-[#F4F7F9]
												items-center justify-center px-4 rounded-r-lg border-l-0
												hover:text-[#005A9C] focus:outline-none focus:border-[#A8D0E6]
												focus:ring-2 focus:ring-[#A8D0E6]/50 transition-colors
											"
											aria-label={
												showPassword ? "Ocultar senha" : "Mostrar senha"
											}
										>
											{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
										</button>
									</div>
								</label>
								<a
									href="#"
									className="text-[#005A9C] hover:underline text-sm font-normal leading-normal pt-2 px-1 self-end"
								>
									Esqueceu a senha?
								</a>
							</div>

							{/* Botões */}
							<div className="flex flex-col gap-4 mt-4">
								<button
									type="submit"
									className="
										flex items-center justify-center w-full
										bg-[#005A9C] text-white font-bold h-14 rounded-lg
										text-base leading-normal
										hover:bg-[#004a84] focus:outline-none focus:ring-2
										focus:ring-offset-2 focus:ring-[#005A9C]
										transition-colors
									"
								>
									Entrar
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
