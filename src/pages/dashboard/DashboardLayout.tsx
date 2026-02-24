import { FileText, Upload, LogOut, Menu, X, Users, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const MESES = [
	"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
	"Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function NavItem({
	to,
	icon: Icon,
	label,
	active,
	onClick,
}: {
	to: string;
	icon: React.ElementType;
	label: string;
	active: boolean;
	onClick?: () => void;
}) {
	return (
		<Link
			to={to}
			onClick={onClick}
			className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
				active
					? "bg-[#005A9C] text-white"
					: "text-gray-600 hover:bg-[#005A9C]/10 hover:text-[#005A9C]"
			}`}
		>
			<Icon size={18} />
			{label}
		</Link>
	);
}

export default function DashboardLayout() {
	const { isAdmin, logout } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const navItems = [
		{ to: "/dashboard/relatorios", icon: FileText, label: "Relatórios" },
		...(isAdmin
			? [
					{ to: "/dashboard/usuarios", icon: Users, label: "Usuários" },
					{ to: "/dashboard/upload", icon: Upload, label: "Upload" },
					{ to: "/dashboard/contatos", icon: MessageSquare, label: "Contatos" },
			  ]
			: []),
	];

	const sidebar = (
		<aside className="flex flex-col h-full">
			{/* Logo */}
			<div className="px-6 py-6 border-b border-gray-100">
				<h1 className="text-2xl font-black text-[#333333]">Gioia</h1>
				<p className="text-xs text-gray-400 mt-0.5">Investimentos</p>
			</div>

			{/* Nav */}
			<nav className="flex-1 p-4 flex flex-col gap-1">
				{navItems.map((item) => (
					<NavItem
						key={item.to}
						to={item.to}
						icon={item.icon}
						label={item.label}
						active={location.pathname.startsWith(item.to)}
						onClick={() => setMobileOpen(false)}
					/>
				))}
			</nav>

			{/* Footer */}
			<div className="p-4 border-t border-gray-100">
				<button
					type="button"
					onClick={handleLogout}
					className="flex items-center gap-3 px-4 py-3 rounded-lg w-full
						text-sm font-medium text-gray-600
						hover:bg-red-50 hover:text-red-600 transition-colors"
				>
					<LogOut size={18} />
					Sair
				</button>
			</div>
		</aside>
	);

	return (
		<div
			className="flex min-h-screen bg-[#F4F7F9]"
			style={{ fontFamily: "Manrope, 'Noto Sans', sans-serif" }}
		>
			{/* Sidebar desktop */}
			<div className="hidden md:flex w-60 flex-shrink-0 bg-white border-r border-gray-100 flex-col">
				{sidebar}
			</div>

			{/* Overlay mobile */}
			{mobileOpen && (
				<div
					className="fixed inset-0 z-30 bg-black/40 md:hidden"
					onClick={() => setMobileOpen(false)}
				/>
			)}

			{/* Sidebar mobile */}
			<div
				className={`fixed inset-y-0 left-0 z-40 w-60 bg-white shadow-xl
					transform transition-transform duration-200 md:hidden
					${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
			>
				{sidebar}
			</div>

			{/* Conteúdo principal */}
			<div className="flex-1 flex flex-col min-w-0">
				{/* Header mobile */}
				<header className="md:hidden flex items-center justify-between px-4 h-14 bg-white border-b border-gray-100">
					<button
						type="button"
						onClick={() => setMobileOpen((v) => !v)}
						className="text-gray-600 hover:text-[#005A9C]"
					>
						{mobileOpen ? <X size={22} /> : <Menu size={22} />}
					</button>
					<h1 className="font-black text-[#333333]">Gioia</h1>
					<div className="w-6" />
				</header>

				<main className="flex-1 p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export { MESES };
