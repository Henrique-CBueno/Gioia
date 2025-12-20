import { z } from "zod";

export const contactSchema = z.object({
	name: z.string().min(3, "Informe seu nome completo"),
	email: z.string().email("Email inválido"),
	phone: z.string().min(10, "Telefone inválido"),
	subject: z.string().min(3, "Informe o assunto"),
	message: z.string().min(10, "Mensagem muito curta"),
	consent: z.literal(true, {
		message: "Você precisa aceitar a política de privacidade",
	}),
});

export type ContactFormData = z.infer<typeof contactSchema>;
