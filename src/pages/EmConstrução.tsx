import { Link } from "react-router-dom";

export default function EmConstrucao() {
	return (
		<main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
			<div className="container mx-auto px-4 py-24">
				<div className="max-w-xl mx-auto text-center">
					<div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary text-4xl mx-auto">
						🚧
					</div>

					<h1 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
						Página em construção
					</h1>
					<p className="mt-4 text-gray-600 dark:text-gray-300">
						Estamos trabalhando para trazer essa página em breve. Obrigado pela
						paciência — se precisar, entre em contato conosco.
					</p>

					<div className="mt-8 flex items-center justify-center gap-3">
						<Link
							to="/"
							className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
						>
							Voltar ao Início
						</Link>

						<Link
							to="/contato"
							className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200"
						>
							Entrar em Contato
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
