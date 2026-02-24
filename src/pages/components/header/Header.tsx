import React from "react";
import { NAV_LINKS } from "./constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const mapHrefToId = (href: string) => {
		if (href === "/") return "hero";
		return href.replace(/^\//, "");
	};

	const handleNav = (e: React.MouseEvent, href: string) => {
		const id = mapHrefToId(href);
		// always prevent default and handle navigation/scroll manually
		e.preventDefault();
		// if not on home, navigate to home with hash so MainSection effect scrolls on load
		if (location.pathname !== "/") {
			navigate(`/#${id}`);
			return;
		}
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: "smooth", block: "start" });
			// ensure URL hash reflects section after scroll
			setTimeout(() => {
				if (window.location.hash !== `#${id}`) {
					window.history.pushState(null, "", `#${id}`);
				}
			}, 300);
		} else {
			navigate(href);
		}
	};

	return (
		<header className="sticky top-0 z-50 bg-white opacity-95 border-b border-solid border-gray-200 px-4 lg:px-15 py-4">
			<div className="max-w-370 mx-auto flex justify-between items-center">
				<div className="flex justify-start items-center">
					<img src="/LOGO_GIOIA.png" alt="Gioia Logo" className="h-12 sm:h-15" />
				</div>
				<div className="hidden justify-center items-center gap-4 lg:flex absolute left-1/2 -translate-x-1/2">
					{NAV_LINKS.map((link) => {
						return (
							<Link
								key={link.label}
								to={link.href}
								onClick={(e) => handleNav(e, link.href)}
								className={`nav-link relative text-gray-700 transition-colors py-2 hover:text-gray-900`}
							>
								{link.label}
								<span
									className={`nav-underline absolute bottom-0 left-0 h-1 bg-gray-900 rounded-full`}
								/>
							</Link>
						);
					})}
				</div>
				<div className="flex items-center justify-end gap-3 sm:gap-4">
					<Link to="/contato">
						<Button className="text-xs sm:text-sm h-9 sm:h-10 px-3 sm:px-4">
							<span className="">Agende uma Consulta</span>
						</Button>
					</Link>
					<Link
						className="flex items-center gap-1 text-sm font-medium text-gioia-dark-gray hover:text-primary dark:text-gray-300 dark:hover:text-primary"
						to="/login"
					>
						<span className="material-symbols-outlined text-xl">
							account_circle
						</span>
						<span className="hidden sm:inline">Login</span>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
