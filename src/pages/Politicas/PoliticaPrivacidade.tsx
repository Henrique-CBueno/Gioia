export default function PoliticaPrivacidade() {
	return (
		<main className="grow">
			<div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
				<div className="flex flex-col gap-10">
					<div className="flex flex-col gap-3 border-b border-border-light dark:border-border-dark pb-8 text-center">
						<h1 className="text-4xl font-black tracking-tighter sm:text-5xl">
							Política de Privacidade
						</h1>
						<p className="text-base text-text-light-secondary dark:text-text-dark-secondary">
							Última atualização: 20 de dezembro de 2025
						</p>
					</div>
					<div className="flex flex-col gap-8">
						<div>
							<h2 className="text-2xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">
								1. Introdução
							</h2>
							<p className="mt-4 text-base leading-relaxed text-text-light-secondary dark:text-text-dark-secondary">
								Bem-vindo à Política de Privacidade da Gioia. Estamos
								comprometidos em proteger a sua privacidade e garantir que suas
								informações pessoais sejam tratadas com cuidado e transparência.
								Esta política descreve como coletamos, usamos e protegemos seus
								dados quando você utiliza nosso site e serviços.
							</p>
						</div>
						<div>
							<h2 className="text-2xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">
								2. Coleta de Informações
							</h2>
							<p className="mt-4 text-base leading-relaxed text-text-light-secondary dark:text-text-dark-secondary">
								Coletamos diferentes tipos de informações para fornecer e
								melhorar nossos serviços para você. Isso inclui:
							</p>
							<ul className="mt-4 list-disc space-y-2 pl-6 text-text-light-secondary dark:text-text-dark-secondary">
								<li>
									<strong>Informações que você nos fornece:</strong> Nome,
									endereço de e-mail, informações de pagamento ao assinar um
									plano, e informações de contato quando você nos envia uma
									mensagem.
								</li>
							</ul>
						</div>

						<div>
							<h2 className="text-2xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">
								3. Compartilhamento de Dados
							</h2>
							<p className="mt-4 text-base leading-relaxed text-text-light-secondary dark:text-text-dark-secondary">
								Não vendemos ou alugamos suas informações pessoais. Podemos
								compartilhar seus dados com terceiros apenas em circunstâncias
								específicas, como ferramenta de contato
							</p>
						</div>
						<div>
							<h2 className="text-2xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">
								4. Segurança dos Dados
							</h2>
							<p className="mt-4 text-base leading-relaxed text-text-light-secondary dark:text-text-dark-secondary">
								Implementamos medidas de segurança técnicas e organizacionais
								para proteger suas informações pessoais contra acesso não
								autorizado, alteração, divulgação ou destruição.
							</p>
						</div>
						<div>
							<h2 className="text-2xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">
								5. Seus Direitos
							</h2>
							<p className="mt-4 text-base leading-relaxed text-text-light-secondary dark:text-text-dark-secondary">
								Você tem o direito de acessar, corrigir ou excluir suas
								informações pessoais. Para exercer esses direitos, entre em
								contato conosco através das informações fornecidas abaixo.
							</p>
						</div>
						<div>
							<h2 className="text-2xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">
								6. Informações de Contato
							</h2>
							<p className="mt-4 text-base leading-relaxed text-text-light-secondary dark:text-text-dark-secondary">
								Se você tiver alguma dúvida sobre esta Política de Privacidade
								ou sobre como tratamos seus dados, não hesite em nos contatar
								pelo e-mail:{" "}
								<a
									className="font-medium text-primary hover:underline"
									href="mailto:privacidade@gioia.com"
								>
									privacidade@gioia.com
								</a>
								.
							</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
