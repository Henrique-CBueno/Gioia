import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
	return (
		<div style={{ maxWidth: 960, margin: "0 auto", padding: "2rem" }}>
			<header
				style={{
					display: "flex",
					gap: "1rem",
					alignItems: "center",
					marginBottom: "1.5rem",
				}}
			>
				<h1 style={{ margin: 0, fontSize: "1.25rem" }} className="bg-red-800">
					Gioia
				</h1>
				<nav style={{ display: "flex", gap: "0.75rem" }}>
					<NavLink to="/" end>
						Home
					</NavLink>
					<NavLink to="/about">About</NavLink>
				</nav>
			</header>
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
