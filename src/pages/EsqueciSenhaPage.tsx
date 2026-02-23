import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone } from "lucide-react";

const EMAIL = import.meta.env.VITE_CONTACT_EMAIL as string;
const WHATSAPP = import.meta.env.VITE_CONTACT_WHATSAPP as string;
const NOME = import.meta.env.VITE_CONTACT_NOME as string;

export default function EsqueciSenhaPage() {
	return (
		<div
			className="min-h-screen flex items-center justify-center bg-[#F4F7F9] px-4"
			style={{ fontFamily: "Manrope, 'Noto Sans', sans-serif" }}
		>
			<div className="w-full max-w-md">
				<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
					<div className="w-14 h-14 rounded-full bg-[#005A9C]/10 flex items-center justify-center mx-auto mb-5">
						<Mail size={26} className="text-[#005A9C]" />
					</div>

					<h1 className="text-2xl font-black text-[#333333]">Esqueceu a senha?</h1>
					<p className="text-gray-500 text-sm mt-2 mb-6 leading-relaxed">
						Para redefinir sua senha, entre em contato com a equipe da{" "}
						<span className="font-semibold text-[#333333]">{NOME}</span>{" "}
						e solicite uma nova senha.
					</p>

					<div className="flex flex-col gap-3 mb-6">
						<a
							href={`mailto:${EMAIL}`}
							className="flex items-center justify-center gap-2 h-11 rounded-lg border border-[#005A9C]/30
								text-[#005A9C] text-sm font-medium hover:bg-[#005A9C]/5 transition-colors"
						>
							<Mail size={16} />
							{EMAIL}
						</a>
						<a
							href={`https://wa.me/${WHATSAPP}`}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-2 h-11 rounded-lg border border-green-300
								text-green-700 text-sm font-medium hover:bg-green-50 transition-colors"
						>
							<Phone size={16} />
							WhatsApp
						</a>
					</div>

					<Link
						to="/login"
						className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#005A9C] transition-colors"
					>
						<ArrowLeft size={14} /> Voltar ao login
					</Link>
				</div>
			</div>
		</div>
	);
}
