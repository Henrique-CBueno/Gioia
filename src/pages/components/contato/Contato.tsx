import ContactForm from "./ContactForm";
import { useLocation } from "react-router-dom";

export default function Contato() {
	const location = useLocation();
	const emailFromQuery =
		new URLSearchParams(location.search).get("email") ?? undefined;

	return (
		<main className="grow">
			<div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
				<div className="mb-12 text-center">
					<h1 className="text-4xl font-black leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
						Entre em Contato
					</h1>
					<p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
						Estamos aqui para ajudar. Preencha o formulário abaixo ou utilize um
						dos nossos outros canais de comunicação.
					</p>
				</div>
				<div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-8">
					<div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-background-dark/50 sm:p-8">
						<h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] text-gray-900 dark:text-gray-100">
							Envie-nos uma Mensagem
						</h2>
						<ContactForm defaultEmail={emailFromQuery} />
					</div>
					<div className="flex flex-col gap-8">
						<div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-background-dark/50 sm:p-8">
							<h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] text-gray-900 dark:text-gray-100">
								Outras Formas de Contato
							</h2>
							<div className="mt-8 space-y-6">
								<div className="flex items-start gap-4">
									<div className="shrink-0 pt-1">
										<span className="material-symbols-outlined text-primary text-2xl">
											call
										</span>
									</div>
									<div>
										<h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
											Telefone
										</h3>
										<a
											className="text-base text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
											href="tel:+5511999998888"
										>
											+55 (11) 99999-8888
										</a>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<div className="shrink-0 pt-1">
										<span className="material-symbols-outlined text-primary text-2xl">
											mail
										</span>
									</div>
									<div>
										<h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
											Email
										</h3>
										<a
											className="text-base text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
											href="mailto:contato@gioia.com"
										>
											contato@gioia.com
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
