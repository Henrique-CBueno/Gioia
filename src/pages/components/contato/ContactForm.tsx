import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "./zodSchema";
import type { ContactFormData } from "./zodSchema";
import { Link } from "react-router-dom";
import { criarContato } from "../../../services/contatoService";

type ContactFormProps = {
	defaultEmail?: string;
};

export default function ContactForm({ defaultEmail }: ContactFormProps) {
	const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
		defaultValues: { email: defaultEmail ?? "" },
	});

	async function onSubmit(data: ContactFormData) {
		setStatus("idle");
		try {
			await criarContato({
				nome: data.name,
				email: data.email,
				telefone: data.phone,
				assunto: data.subject,
				mensagem: data.message,
			});
			setStatus("success");
			reset();
		} catch (error) {
			setStatus("error");
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
			{/* Nome + Email */}
			<div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
				<label className="flex flex-col">
					<p className="pb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
						Nome
					</p>
					<input
						{...register("name")}
						placeholder="Digite seu nome completo"
						type="text"
						className="form-input w-full rounded-lg border border-gray-300 bg-background-light p-3 text-sm focus:ring-2 focus:ring-primary/20 dark:border-gray-700"
					/>
					{errors.name && (
						<span className="mt-1 text-xs text-red-500">
							{errors.name.message}
						</span>
					)}
				</label>

				<label className="flex flex-col">
					<p className="pb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
						Email
					</p>
					<input
						{...register("email")}
						placeholder="seuemail@exemplo.com"
						type="email"
						className="form-input w-full rounded-lg border border-gray-300 bg-background-light p-3 text-sm focus:ring-2 focus:ring-primary/20 dark:border-gray-700"
					/>
					{errors.email && (
						<span className="mt-1 text-xs text-red-500">
							{errors.email.message}
						</span>
					)}
				</label>
			</div>

			{/* Telefone + Assunto */}
			<div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
				<label className="flex flex-col">
					<p className="pb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
						Telefone
					</p>
					<input
						{...register("phone")}
						placeholder="(XX) XXXXX-XXXX"
						type="tel"
						className="form-input w-full rounded-lg border border-gray-300 bg-background-light p-3 text-sm focus:ring-2 focus:ring-primary/20 dark:border-gray-700"
					/>
					{errors.phone && (
						<span className="mt-1 text-xs text-red-500">
							{errors.phone.message}
						</span>
					)}
				</label>

				<label className="flex flex-col">
					<p className="pb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
						Assunto
					</p>
					<input
						{...register("subject")}
						placeholder="Sobre o que você gostaria de falar?"
						type="text"
						className="form-input w-full rounded-lg border border-gray-300 bg-background-light p-3 text-sm focus:ring-2 focus:ring-primary/20 dark:border-gray-700"
					/>
					{errors.subject && (
						<span className="mt-1 text-xs text-red-500">
							{errors.subject.message}
						</span>
					)}
				</label>
			</div>

			{/* Mensagem */}
			<label className="flex flex-col">
				<p className="pb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
					Sua Mensagem
				</p>
				<textarea
					{...register("message")}
					rows={5}
					placeholder="Escreva sua mensagem aqui..."
					className="form-textarea w-full resize-y rounded-lg border border-gray-300 bg-background-light p-3 text-sm focus:ring-2 focus:ring-primary/20 dark:border-gray-700"
				/>
				{errors.message && (
					<span className="mt-1 text-xs text-red-500">
						{errors.message.message}
					</span>
				)}
			</label>

			{/* Consentimento */}
			<div className="flex items-start gap-3">
				<input
					{...register("consent")}
					type="checkbox"
					className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/50 cursor-pointer"
				/>
				<label className="text-sm text-gray-600 dark:text-gray-400">
					Eu concordo com a{" "}
					<Link
						to="/politica-de-privacidade"
						className="font-medium text-primary hover:underline"
					>
						Política de Privacidade
					</Link>
				</label>
			</div>
			{errors.consent && (
				<p className="text-xs text-red-500">{errors.consent.message}</p>
			)}

			{status === "success" && (
				<div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
					Sua mensagem foi enviada com sucesso. Entraremos em contato em breve!
				</div>
			)}
			{status === "error" && (
				<div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
					Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.
				</div>
			)}

			{/* Botão */}
			<button
				type="submit"
				disabled={isSubmitting}
				className="w-full rounded-lg bg-primary px-5 py-3 text-base font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
			>
				{isSubmitting ? "Enviando..." : "Enviar Mensagem"}
			</button>
		</form>
	);
}
