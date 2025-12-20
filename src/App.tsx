import { Routes, Route } from "react-router-dom";
import InitialPage from "./pages/InitialPage";
import NotFound from "./pages/NotFound";
import Header from "./pages/components/header/Header";
import Footer from "./pages/components/footer/Footer";
import Contato from "./pages/components/contato/Contato";
import PoliticaPrivacidade from "./pages/Politicas/PoliticaPrivacidade";
import TermosDeUso from "./pages/Politicas/TermosDeUso";
import EmConstrucao from "./pages/EmConstrução";

function App() {
	return (
		<div className="bg-[#f6f6f8] min-h-screen">
			<Header />
			<main className="mx-auto">
				<Routes>
					<Route path="/" element={<InitialPage />} />
					<Route path="/contato" element={<Contato />} />
					<Route
						path="/politica-de-privacidade"
						element={<PoliticaPrivacidade />}
					/>
					<Route path="/termos-de-uso" element={<TermosDeUso />} />
					<Route path="/login" element={<EmConstrucao />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
