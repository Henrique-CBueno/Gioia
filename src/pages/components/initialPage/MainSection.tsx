import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Hero Section Component
function HeroSection() {
	return (
		<section
			id="hero"
			className="w-full relative py-16 lg:py-24 bg-white dark:bg-surface-dark overflow-hidden"
		>
			<div
				className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
				style={{
					backgroundImage: "radial-gradient(#1d56c9 1px, transparent 1px)",
					backgroundSize: "32px 32px",
				}}
			></div>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					<div className="flex flex-col gap-6 max-w-2xl">
						<div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary w-fit">
							<span className="material-symbols-outlined text-sm">
								trending_up
							</span>
							<span>Consultoria Estratégica</span>
						</div>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-main-light dark:text-white leading-[1.15]">
							Inteligência Macroeconômica para{" "}
							<span className="text-primary">Decisões Estratégicas</span>
						</h1>
						<p className="text-lg text-text-sub-light dark:text-text-sub-dark leading-relaxed max-w-lg">
							Análises fundamentadas por economistas experientes para colaborar na proteção e na rentabilidade de seu patrimônio com previsibilidade e segurança.
						</p>
						<div className="flex flex-wrap gap-4 pt-4">
							<button className="h-12 px-8 rounded-lg bg-primary text-white text-base font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center gap-2">
								Solicitar Demonstração
								<span className="material-symbols-outlined text-sm">
									arrow_forward
								</span>
							</button>
							<button className="h-12 px-8 rounded-lg bg-background-light dark:bg-background-dark/50 text-text-main-light dark:text-white border border-[#d1d8e6] dark:border-[#334155] text-base font-bold hover:bg-[#e8ebf3] dark:hover:bg-[#1e293b] transition-all">
								Conhecer a Consultoria
							</button>
						</div>
						<div className="pt-8 flex items-center gap-4 text-sm text-text-sub-light dark:text-text-sub-dark border-t border-gray-100 dark:border-gray-800">
							<div className="flex -space-x-2">
								<div
									className="size-8 rounded-full bg-gray-200 border-2 border-white dark:border-surface-dark bg-cover bg-center"
									style={{
										backgroundImage:
											"url('https://lh3.googleusercontent.com/aida-public/AB6AXuBVO78PClso8Jr79OmvYfu6Xeximq_HPbOXgjVhaSWuuSabp14bd8Xkt7d6tMHgKZk2PaRe_uFhTOdhTX-ncbFP8sIbpAFE-Wi7ljaKsUKh649B8qLCZwyCu7EcP8LsW-IypBEJ7K51nmTvPYOIrwfRVjcRJJSQeGeO_exFs6irEbEiSIBUdT8rsYGGykW5eF096ASjhIvW7ISX5moh1ri5wHblRseui2x2c1GsXRRs389MohHR--24v9veZMnJlpo98PuWslo431Dx')",
									}}
								></div>
								<div
									className="size-8 rounded-full bg-gray-200 border-2 border-white dark:border-surface-dark bg-cover bg-center"
									style={{
										backgroundImage:
											"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfiD8rXvljL9o_ctaDANCeWvrdcaAOpCqFGjMpva6PJtiPxpAmckkl3EPz0JEGbBaq4QY9fT3c8C80Bwg97d9zfwJdjxr7VF5RFeo4oOkLI0Y6M18Bc0t-qlGjkWB464kmW4yFPB9SxlJamGyfuNItyV-6pjBzikUncM0Cwc0bRoWVfDcG5G0jaFNaMkuT_cLrisooDfILca8KhQvhXi0C7uTEQZOnvTM7sVFgqaHI2akT55qFt-bYnlsPxNndxZBxd8IHc312yKmk')",
									}}
								></div>
								<div
									className="size-8 rounded-full bg-gray-200 border-2 border-white dark:border-surface-dark bg-cover bg-center"
									style={{
										backgroundImage:
											"url('https://lh3.googleusercontent.com/aida-public/AB6AXuAm2rjGZAO7lyK9WCPeSyb1dQ9IxHEMHrdHTGtNm0LRUpz6rvrG5lyfRGh7qdZNDy5yoaCUleEGsfmOP5_bALvBjCh46_E31ktbe0Z97cpAyfmFDJwUxHvgZ36MCt7ohP2zAaD7j1dPv7bh3AaCrVvu2b4Tl4U_C-hJa-EGmEM1rAoQlWpjcceawyJ27SofFVj-uKIyksHIJA3h7ZPK--X1Sk3TNiF9IcrYAA1-Ctb6FQubUsUhfKU6VjsIe9f3PiNTX7aQZY5IEFxs')",
									}}
								></div>
							</div>
							<p>Confiança de grandes empresas</p>
						</div>
					</div>
					<div className="relative group">
						<div className="absolute -inset-1 bg-linear-to-r from-primary to-blue-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
						<div className="relative rounded-2xl overflow-hidden shadow-2xl bg-surface-light dark:bg-surface-dark aspect-4/3 w-full">
							<div
								className="w-full h-full bg-cover bg-center"
								style={{
									backgroundImage:
										"url('https://images.unsplash.com/photo-1577100078641-e92b0a906760?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjY3fHxlY29ub21pY3xlbnwwfHwwfHx8MA%3D%3D')",
								}}
							></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// Reports Section Component
function ReportsSection() {
	return (
		<section
			id="servicos"
			className="w-full py-20 bg-background-light dark:bg-background-dark"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto text-center mb-12">
					<h2 className="text-3xl font-bold text-text-main-light dark:text-white mb-4">
						Nossos Relatórios e Análises
					</h2>
					<p className="text-text-sub-light dark:text-text-sub-dark">
						Acesse insights exclusivos segmentados por área de interesse para subsidiar suas decisões de investimentos, dentro dos mais variados movimentos de mercado.
					</p>
				</div>
				<div className="grid lg:grid-cols-2 gap-8 items-start">
					<div className="bg-white dark:bg-surface-dark rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col gap-6 hover:border-primary/50 transition-colors cursor-pointer">
						<div className="flex items-start justify-between">
							<div className="flex flex-col gap-2">
								<h3 className="text-2xl font-bold text-text-main-light dark:text-white">
									Relatório Mensal de Mercado
								</h3>
							</div>
							<div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary">
								<span className="material-symbols-outlined">description</span>
							</div>
						</div>
						<p className="text-text-sub-light dark:text-text-sub-dark leading-relaxed">
							É a nossa publicação principal. Receba uma análise aprofundada dos principais indicadores econômicos e financeiros do mês(PIB, Inflação, Juros, S&P500) e seus possíveis impactos diretos no curto e médio prazo.
						</p>
						<div className="space-y-3">
							<div className="flex items-center gap-3 text-sm text-text-main-light dark:text-text-main-dark">
								<span className="material-symbols-outlined text-primary text-lg">
									check_circle
								</span>
								<span>Projeções detalhadas de Inflação e Câmbio</span>
							</div>
							<div className="flex items-center gap-3 text-sm text-text-main-light dark:text-text-main-dark">
								<span className="material-symbols-outlined text-primary text-lg">
									check_circle
								</span>
								<span>Monitoramento Fiscal e Político</span>
							</div>
							<div className="flex items-center gap-3 text-sm text-text-main-light dark:text-text-main-dark">
								<span className="material-symbols-outlined text-primary text-lg">
									check_circle
								</span>
								<span>Reuniões táticas de finanças para análise de alocação.</span>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-6">
						<div className="group bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-colors cursor-pointer">
							<div className="flex gap-4">
								<div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-green-600 dark:text-green-400 h-fit">
									<span className="material-symbols-outlined">
										attach_money
									</span>
								</div>
								<div>
									<h4 className="text-lg font-bold text-text-main-light dark:text-white group-hover:text-primary transition-colors">
										Carta do mercado
									</h4>
									<p className="text-sm text-text-sub-light dark:text-text-sub-dark mt-2">
										Resumo dos acontecimentos mais importantes no mercado financeiro do Brasil, e o impacto causado nos preços dos ativos, com foco em juros, câmbio, ações, commodities e criptomoedas.
									</p>
								</div>
							</div>
						</div>

						<div className="group bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-colors cursor-pointer">
							<div className="flex gap-4">
								<div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-purple-600 dark:text-purple-400 h-fit">
									<span className="material-symbols-outlined">public</span>
								</div>
								<div>
									<h4 className="text-lg font-bold text-text-main-light dark:text-white group-hover:text-primary transition-colors">
										Monitor Global
									</h4>
									<p className="text-sm text-text-sub-light dark:text-text-sub-dark mt-2">
										Análise dos principais movimentos financeiros globais, com ênfase em EUA e Europa, e o possível impacto nos fluxos de capital para mercados emergentes.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// Technology Section Component
function TechnologySection() {
	return (
		<section
			id="sobre-nos"
			className="w-full py-20 lg:py-28 bg-white dark:bg-surface-dark"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24">
				<div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
					<div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-xl aspect-video relative group">
						<div className="absolute inset-0 bg-primary/10 mix-blend-multiply transition-opacity group-hover:opacity-0"></div>
						<div
							className="w-full h-full bg-cover bg-center"
							style={{
								backgroundImage:
									"url('https://images.unsplash.com/photo-1614623072017-924ade10a6f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q29uc3VsdG9yaWElMjBlbSUyMFBvbCVDMyVBRHRpY2ElMjBNb25ldCVDMyVBMXJpYXxlbnwwfHwwfHx8MA%3D%3D')",
							}}
						></div>
					</div>
					<div className="order-1 md:order-2 flex flex-col gap-6">
						<div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
							<span className="material-symbols-outlined text-2xl">
								insights
							</span>
						</div>
						<h3 className="text-3xl font-bold text-text-main-light dark:text-white">
							Consultoria em Política Monetária e Cenários Macroeconômicos
						</h3>
						<p className="text-lg text-text-sub-light dark:text-text-sub-dark leading-relaxed">
							Oferecemos análises de política monetária e cenários macroeconômicos orientados para clientes em geral, com foco em riscos soberanos, impactos na curva de juros e implicações para alocação de ativos nas mais diversas classes.
						</p>
						<ul className="space-y-3 pt-2">
							<li className="flex items-center gap-3 text-text-main-light dark:text-text-main-dark font-medium">
								<span className="size-2 rounded-full bg-primary"></span>
								Avaliação de impactos de decisões de bancos centrais – Brasil e EUA
							</li>
							<li className="flex items-center gap-3 text-text-main-light dark:text-text-main-dark font-medium">
								<span className="size-2 rounded-full bg-primary"></span>
								Simulações de cenários macroeconômicos – Base principais indicadores de mercado
							</li>
						</ul>
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
					<div className="flex flex-col gap-6">
						<div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
							<span className="material-symbols-outlined text-2xl">groups</span>
						</div>
						<h3 className="text-3xl font-bold text-text-main-light dark:text-white">
							Curadoria Humana Sênior
						</h3>
						<p className="text-lg text-text-sub-light dark:text-text-sub-dark leading-relaxed">
							Nossa equipe procura trazer a luz dados que sejam traduzidos em estratégias acionáveis, para a necessidade de cada cliente, dentro de seu exclusivo perfil, seja pessoa jurídica ou pessoa física.
						</p>
					</div>
					<div className="rounded-2xl overflow-hidden shadow-xl aspect-video relative group">
						<div className="absolute inset-0 bg-primary/10 mix-blend-multiply transition-opacity group-hover:opacity-0"></div>
						<div
							className="w-full h-full bg-cover bg-center"
							style={{
								backgroundImage:
									"url('https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmluYW5jaWFyfGVufDB8fDB8fHww')",
							}}
						></div>
					</div>
				</div>
			</div>
		</section>
	);
}

// Team Section Component
function TeamSection() {
	return (
		<section
			id="team"
			className="w-full py-20 bg-background-light dark:bg-background-dark"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center text-center gap-4 mb-8">
					<h2 className="text-text-dark dark:text-text-light text-3xl font-bold leading-tight tracking-[-0.015em]">
						Nossos Pilares
					</h2>
					<p className="text-text-dark/80 dark:text-text-light/80 text-base font-normal leading-normal max-w-3xl">
						Acreditamos que uma base sólida de princípios é essencial para
						construir parcerias duradouras e entregar resultados excepcionais.
						Nossa missão, visão e valores são o alicerce de cada projeto que
						abraçamos.
					</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark/30 p-6 flex-col items-start text-left shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300">
						<div className="text-primary bg-secondary dark:bg-primary/20 p-3 rounded-lg">
							<span className="material-symbols-outlined text-3xl">
								rocket_launch
							</span>
						</div>
						<div className="flex flex-col gap-1">
							<h3 className="text-text-dark dark:text-text-light text-xl font-bold leading-tight">
								Missão
							</h3>
							<p className="text-text-dark/80 dark:text-text-light/80 text-base font-normal leading-relaxed">
								Capacitar empresas a atingirem seu máximo potencial através de
								estratégias inovadoras e personalizadas, promovendo crescimento
								sustentável e excelência operacional.
							</p>
						</div>
					</div>
					<div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark/30 p-6 flex-col items-start text-left shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300">
						<div className="text-primary bg-secondary dark:bg-primary/20 p-3 rounded-lg">
							<span className="material-symbols-outlined text-3xl">
								visibility
							</span>
						</div>
						<div className="flex flex-col gap-1">
							<h3 className="text-text-dark dark:text-text-light text-xl font-bold leading-tight">
								Visão
							</h3>
							<p className="text-text-dark/80 dark:text-text-light/80 text-base font-normal leading-relaxed">
								Ser a consultoria líder e mais confiável do mercado, reconhecida
								pela excelência, inovação e pelo impacto positivo e duradouro
								nos negócios de nossos clientes.
							</p>
						</div>
					</div>
					<div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark/30 p-6 flex-col items-start text-left shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300">
						<div className="text-primary bg-secondary dark:bg-primary/20 p-3 rounded-lg">
							<span className="material-symbols-outlined text-3xl">shield</span>
						</div>
						<div className="flex flex-col gap-1">
							<h3 className="text-text-dark dark:text-text-light text-xl font-bold leading-tight">
								Valores
							</h3>
							<p className="text-text-dark/80 dark:text-text-light/80 text-base font-normal leading-relaxed">
								Compromisso, integridade, inovação e colaboração. Estes são os
								pilares que guiam nossas ações e garantem a entrega de valor
								superior em cada parceria.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// CTA Section Component
function CTASection() {
	return (
		<section
			id="contato"
			className="w-full py-20 bg-surface-light dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="bg-primary rounded-2xl p-8 sm:p-12 lg:p-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden relative">
					<div className="absolute -top-24 -right-24 size-64 bg-white/10 rounded-full blur-3xl"></div>
					<div className="absolute -bottom-24 -left-24 size-64 bg-white/10 rounded-full blur-3xl"></div>
					<div className="relative z-10 max-w-2xl">
						<h2 className="text-3xl font-bold text-white mb-4">
							Pronto para elevar o nível das suas decisões?
						</h2>
						<p className="text-blue-100 text-lg">
							Solicite uma demonstração gratuita da nossa plataforma e receba um
							exemplo dos nossos relatórios exclusivos.
						</p>
					</div>
					<CTAInput />
				</div>
			</div>
		</section>
	);
}

// Main Component
export default function MainSection() {
	const location = useLocation();

	useEffect(() => {
		if (location.hash) {
			const id = location.hash.replace("#", "");
			const el = document.getElementById(id);
			if (el) {
				// slight delay to ensure layout if navigated from another route
				setTimeout(
					() => el.scrollIntoView({ behavior: "smooth", block: "start" }),
					50,
				);
			}
		}
	}, [location.hash]);

	return (
		<main className="flex flex-col w-full overflow-x-hidden">
			<HeroSection />
			<ReportsSection />
			<TechnologySection />
			<TeamSection />
			<CTASection />
		</main>
	);
}

// CTA input component placed here to keep file local and simple
function CTAInput() {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleClick = () => {
		const value = email.trim();
		if (!value) return;
		navigate(`/contato?email=${encodeURIComponent(value)}`);
	};

	return (
		<div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
			<input
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-64"
				placeholder="Seu e-mail"
				type="email"
			/>
			<button
				onClick={handleClick}
				disabled={!email.trim()}
				className={`h-12 px-8 flex items-center rounded-lg bg-white text-primary font-bold transition-colors whitespace-nowrap shadow-lg ${
					email.trim() ? "hover:bg-blue-50" : "opacity-50 cursor-not-allowed"
				}`}
			>
				Solicitar Acesso
			</button>
		</div>
	);
}
