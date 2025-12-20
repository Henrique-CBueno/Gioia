import { Link } from "react-router-dom";
import {
	COMPANY_INFO,
	SOCIAL_LINKS,
	FOOTER_SECTIONS,
	COPYRIGHT_TEXT,
} from "./constants";

export default function Footer() {
	return (
		<footer className="container mx-auto px-4 sm:px-6 lg:px-8">
			<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
				<div className="col-span-2 lg:col-span-2">
					<div className="flex items-center gap-2 mb-6">
						<div className="flex size-8 items-center justify-center rounded bg-primary text-white">
							<span className="material-symbols-outlined text-xl">
								ssid_chart
							</span>
						</div>
						<span className="text-xl font-bold text-text-main-light dark:text-white">
							{COMPANY_INFO.name}
						</span>
					</div>

					<p className="text-text-sub-light dark:text-text-sub-dark text-sm leading-relaxed max-w-xs mb-6">
						{COMPANY_INFO.description}
					</p>

					<div className="flex gap-4">
						{SOCIAL_LINKS.map((s) => (
							<a
								key={s.label}
								className="text-text-sub-light dark:text-text-sub-dark hover:text-primary transition-colors"
								href={s.href}
								aria-label={s.label}
							>
								<span className="material-symbols-outlined">{s.icon}</span>
							</a>
						))}
					</div>
				</div>

				{FOOTER_SECTIONS.map((section) => (
					<div key={section.title}>
						<h4 className="font-bold text-text-main-light dark:text-white mb-4">
							{section.title}
						</h4>
						<ul className="space-y-2 text-sm text-text-sub-light dark:text-text-sub-dark">
							{section.items.map((item) => (
								<li key={item.label ?? item}>
									<Link
										className="hover:text-primary transition-colors"
										to={item.to ?? "#"}
									>
										{item.label ?? item}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			<div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
				<p className="text-xs text-text-sub-light dark:text-text-sub-dark text-center md:text-left">
					{COPYRIGHT_TEXT}
				</p>

				<div className="flex items-center gap-1 text-xs text-text-sub-light dark:text-text-sub-dark">
					<span className="material-symbols-outlined text-sm">lock</span>
					<span>Ambiente Seguro</span>
				</div>
			</div>
		</footer>
	);
}
