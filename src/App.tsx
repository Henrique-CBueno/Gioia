import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import EsqueciSenhaPage from "./pages/EsqueciSenhaPage";
import TrocarSenhaPage from "./pages/TrocarSenhaPage";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import RelatoriosPage from "./pages/dashboard/RelatoriosPage";
import UploadRelatorioPage from "./pages/dashboard/UploadRelatorioPage";
import UsuariosPage from "./pages/dashboard/UsuariosPage";
import InitialPage from "./pages/InitialPage";
import NotFound from "./pages/NotFound";
import Header from "./pages/components/header/Header";
import Footer from "./pages/components/footer/Footer";
import Contato from "./pages/components/contato/Contato";
import PoliticaPrivacidade from "./pages/Politicas/PoliticaPrivacidade";
import TermosDeUso from "./pages/Politicas/TermosDeUso";

function App() {
	return (
		<AuthProvider>
			<Routes>
				{/* Login e recuperação de senha */}
				<Route path="/login" element={<Login />} />
				<Route path="/esqueci-senha" element={<EsqueciSenhaPage />} />
				<Route path="/trocar-senha" element={<TrocarSenhaPage />} />

				{/* Dashboard (protegido) */}
				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard" element={<DashboardLayout />}>
						<Route index element={<Navigate to="relatorios" replace />} />
						<Route path="relatorios" element={<RelatoriosPage />} />
						<Route path="usuarios" element={<UsuariosPage />} />
						<Route path="upload" element={<UploadRelatorioPage />} />
					</Route>
				</Route>

				{/* Site institucional: com Header e Footer */}
				<Route
					path="*"
					element={
						<div className="bg-[#f6f6f8] min-h-screen">
							<Header />
							<main className="mx-auto">
								<Routes>
									<Route path="/" element={<InitialPage />} />
									<Route path="/contato" element={<Contato />} />
									<Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
									<Route path="/termos-de-uso" element={<TermosDeUso />} />
									<Route path="*" element={<NotFound />} />
								</Routes>
							</main>
							<Footer />
						</div>
					}
				/>
			</Routes>
		</AuthProvider>
	);
}

export default App;
