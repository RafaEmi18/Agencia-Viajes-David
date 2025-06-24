import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/date";

const DashboardPage = () => {
	const { user, logout, isAuthenticated } = useAuthStore();
	const navigate = useNavigate();

	const handlePlanTrip = () => {
		if (!isAuthenticated) {
			navigate("/login");
		} else {
			navigate("/travel");
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.4 }}
			className="max-w-5xl p-6 mx-auto mt-10 text-white bg-gray-900 border border-gray-800 shadow-2xl bg-opacity-80 rounded-xl"
		>
			<h1 className="mb-6 text-3xl font-bold text-center text-emerald-400">Agencia de Viajes - Ciudad de México 🌴</h1>

			<div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
				{["Cancún", "Los Cabos"].map((dest, i) => (
					<motion.div
						key={dest}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: i * 0.2 }}
						className="p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg"
					>
						<h3 className="mb-2 text-xl font-semibold text-green-400">{dest}</h3>
						<p className="mb-4 text-gray-300">Explora este destino increíble desde CDMX.</p>
						<button
							onClick={handlePlanTrip}
							className="w-full py-2 font-bold text-white rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
						>
							Reservar viaje
						</button>
					</motion.div>
				))}
			</div>

			{isAuthenticated && user && (
				<div className="p-6 bg-gray-800 border border-gray-700 rounded-lg shadow">
					<h2 className="mb-3 text-xl font-semibold text-cyan-400">Tu perfil</h2>
					<p className="text-gray-300">Nombre: {user.name}</p>
					<p className="text-gray-300">Email: {user.email}</p>
					<p className="text-gray-300">Último ingreso: {formatDate(user.lastLogin)}</p>

					<button
						onClick={logout}
						className="px-4 py-2 mt-4 text-white bg-red-600 rounded hover:bg-red-700"
					>
						Cerrar sesión
					</button>
				</div>
			)}
		</motion.div>
	);
};

export default DashboardPage;
