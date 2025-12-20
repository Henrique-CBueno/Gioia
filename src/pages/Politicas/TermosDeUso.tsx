import { Link } from "react-router-dom";

export default function TermosDeUso() {
	return (
		<main className="w-full grow">
			<div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16 md:py-20">
				<div className="flex flex-col gap-2">
					<h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-tighter md:text-5xl">
						Termos de Uso
					</h1>
					<p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
						Última atualização: 20 de Dezembro de 2025
					</p>
				</div>
				<div className="mt-10 space-y-8 md:mt-12">
					<div>
						<h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-tight pb-3 pt-5">
							1. Aceitação dos Termos
						</h2>
						<p className="text-base font-normal leading-relaxed">
							Bem-vindo à Gioia. Ao acessar e utilizar nosso site, você concorda
							em cumprir e estar vinculado aos seguintes termos e condições de
							uso. Se você não concordar com qualquer parte destes termos, não
							deverá utilizar nossos serviços. A utilização contínua do site
							após quaisquer alterações constitui sua aceitação dos novos
							termos.
						</p>
					</div>
					<div>
						<h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-tight pb-3 pt-5">
							2. Descrição dos Serviços
						</h2>
						<p className="text-base font-normal leading-relaxed">
							A Gioia oferece análises macroeconômicas, relatórios e outros
							conteúdos relacionados. Parte do conteúdo é de acesso público,
							enquanto o acesso a materiais aprofundados e análises exclusivas é
							restrito a usuários que possuem uma assinatura ativa
							("Assinantes").
						</p>
					</div>
					<div>
						<h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-tight pb-3 pt-5">
							3. Contas de Usuário e Assinaturas
						</h2>
						<p className="text-base font-normal leading-relaxed pb-4">
							Para acessar os serviços exclusivos, você deve se registrar e
							manter uma conta de assinante. Você concorda em:
						</p>
						<ul className="list-disc space-y-2 pl-6 text-base font-normal leading-relaxed">
							<li>
								Fornecer informações verdadeiras, precisas, atuais e completas
								durante o registro.
							</li>
							<li>
								Manter a confidencialidade de sua senha e ser totalmente
								responsável por todas as atividades que ocorrem em sua conta.
							</li>
							<li>
								Notificar-nos imediatamente sobre qualquer uso não autorizado de
								sua conta.
							</li>
						</ul>
					</div>
					<div>
						<h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-tight pb-3 pt-5">
							4. Uso Permitido e Restrições
						</h2>
						<p className="text-base font-normal leading-relaxed">
							O conteúdo fornecido é para seu uso pessoal e não comercial. Você
							concorda em não reproduzir, duplicar, copiar, vender, revender ou
							explorar qualquer parte do serviço ou conteúdo sem nossa permissão
							expressa por escrito. O uso de robôs, spiders ou qualquer outro
							meio automatizado para acessar o site é estritamente proibido.
						</p>
					</div>
					<div>
						<h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-tight pb-3 pt-5">
							5. Propriedade Intelectual
						</h2>
						<p className="text-base font-normal leading-relaxed">
							Todo o conteúdo presente no site, incluindo textos, gráficos,
							logotipos, relatórios e análises, é propriedade exclusiva da Gioia
							e protegido pelas leis de direitos autorais e propriedade
							intelectual. Nenhuma parte do conteúdo pode ser utilizada sem
							autorização prévia.
						</p>
					</div>
					<div>
						<h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-tight pb-3 pt-5">
							6. Limitação de Responsabilidade
						</h2>
						<p className="text-base font-normal leading-relaxed">
							As análises e informações fornecidas pela Gioia são para fins
							informativos e não constituem recomendação de investimento. Não
							nos responsabilizamos por quaisquer perdas ou danos resultantes de
							decisões tomadas com base no conteúdo do nosso site. Você é o
							único responsável por suas decisões de investimento.
						</p>
					</div>
					<div>
						<h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-tight pb-3 pt-5">
							7. Privacidade
						</h2>
						<p className="text-base font-normal leading-relaxed">
							Sua privacidade é importante para nós. Nossa coleta e uso de
							informações pessoais estão descritas em nossa{" "}
							<Link
								className="font-medium text-primary underline hover:text-primary/80"
								to="/politica-de-privacidade"
							>
								Política de Privacidade
							</Link>
							, que é incorporada a estes Termos de Uso por referência.
						</p>
					</div>
					<div>
						<h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-tight pb-3 pt-5">
							8. Contato
						</h2>
						<p className="text-base font-normal leading-relaxed">
							Se você tiver alguma dúvida sobre estes Termos de Uso, entre em
							contato conosco através da nossa página de{" "}
							<Link
								className="font-medium text-primary underline hover:text-primary/80"
								to="/contato"
							>
								contato
							</Link>
							.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
