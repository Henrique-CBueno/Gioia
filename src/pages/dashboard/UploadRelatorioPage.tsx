import { Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { uploadRelatorio } from "../../services/relatorioService";
import { MESES } from "./DashboardLayout";

const anoAtual = new Date().getFullYear();
const ANOS = Array.from({ length: 5 }, (_, i) => anoAtual - i);

const schema = z.object({
	titulo: z.string().min(1, "Título obrigatório"),
	descricao: z.string().optional(),
	mes: z.string().min(1),
	ano: z.string().min(4),
	arquivo: z
		.custom<FileList>((v) => v instanceof FileList && v.length > 0, "Selecione um arquivo")
		.refine((v) => v[0]?.type === "application/pdf", "Somente arquivos PDF"),
});

type FormData = z.infer<typeof schema>;

export default function UploadRelatorioPage() {
	const [sucesso, setSucesso] = useState(false);
	const [erro, setErro] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: { mes: String(new Date().getMonth() + 1), ano: String(anoAtual) },
	});

	const onSubmit = async (data: FormData) => {
		setErro(null);
		setSucesso(false);
		try {
			await uploadRelatorio(
				data.titulo,
				data.descricao ?? "",
				Number(data.mes),
				Number(data.ano),
				data.arquivo[0],
			);
			setSucesso(true);
			reset({ mes: String(new Date().getMonth() + 1), ano: String(anoAtual) });
		} catch {
			setErro("Erro ao fazer upload. Verifique e tente novamente.");
		}
	};

	const inputClass = (hasError: boolean) =>
		`w-full rounded-lg border h-11 px-4 text-sm text-[#333333] bg-[#F4F7F9]
		placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A8D0E6]/50 transition-colors
		${hasError ? "border-red-400" : "border-gray-200"}`;

	return (
		<div className="max-w-xl mx-auto">
			<div className="mb-6">
				<h2 className="text-2xl font-black text-[#333333]">Upload de Relatório</h2>
				<p className="text-gray-500 text-sm mt-1">
					Envie um PDF para disponibilizar aos usuários.
				</p>
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5"
			>
				{/* Título */}
				<div className="flex flex-col gap-1.5">
					<label className="text-sm font-medium text-[#333333]">Título *</label>
					<input
						{...register("titulo")}
						placeholder="Ex: Relatório Mensal de Março"
						className={inputClass(!!errors.titulo)}
					/>
					{errors.titulo && (
						<p className="text-red-500 text-xs">{errors.titulo.message}</p>
					)}
				</div>

				{/* Descrição */}
				<div className="flex flex-col gap-1.5">
					<label className="text-sm font-medium text-[#333333]">Descrição</label>
					<textarea
						{...register("descricao")}
						rows={2}
						placeholder="Resumo opcional do relatório"
						className={`w-full rounded-lg border px-4 py-2.5 text-sm text-[#333333] bg-[#F4F7F9]
							placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A8D0E6]/50
							transition-colors resize-none border-gray-200`}
					/>
				</div>

				{/* Mês e Ano */}
				<div className="flex gap-4">
					<div className="flex flex-col gap-1.5 flex-1">
						<label className="text-sm font-medium text-[#333333]">Mês *</label>
						<select {...register("mes")} className={inputClass(!!errors.mes)}>
							{MESES.map((m, i) => (
								<option key={m} value={i + 1}>{m}</option>
							))}
						</select>
					</div>
					<div className="flex flex-col gap-1.5 flex-1">
						<label className="text-sm font-medium text-[#333333]">Ano *</label>
						<select {...register("ano")} className={inputClass(!!errors.ano)}>
							{ANOS.map((a) => (
								<option key={a} value={a}>{a}</option>
							))}
						</select>
					</div>
				</div>

				{/* Arquivo */}
				<div className="flex flex-col gap-1.5">
					<label className="text-sm font-medium text-[#333333]">Arquivo PDF *</label>
					<input
						type="file"
						accept="application/pdf"
						{...register("arquivo")}
						className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4
							file:rounded-lg file:border-0 file:text-sm file:font-medium
							file:bg-[#005A9C]/10 file:text-[#005A9C]
							hover:file:bg-[#005A9C]/20 file:cursor-pointer"
					/>
					{errors.arquivo && (
						<p className="text-red-500 text-xs">{String(errors.arquivo.message)}</p>
					)}
				</div>

				{/* Feedback */}
				{sucesso && (
					<p className="text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm">
						✅ Relatório enviado com sucesso!
					</p>
				)}
				{erro && (
					<p className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm">
						{erro}
					</p>
				)}

				<button
					type="submit"
					disabled={isSubmitting}
					className="flex items-center justify-center gap-2 w-full h-12
						bg-[#005A9C] text-white font-bold rounded-lg text-sm
						hover:bg-[#004a84] transition-colors
						disabled:opacity-60 disabled:cursor-not-allowed"
				>
					<Upload size={16} />
					{isSubmitting ? "Enviando..." : "Enviar Relatório"}
				</button>
			</form>
		</div>
	);
}
