import { useLocation, useNavigate } from "react-router-dom";

const prices = {
  destinations: {
    "Cancún": 4500,
    "Los Cabos": 5000,
  },
  transport: {
    "Avión": 3500,
    "Autobús": 1800,
    "Tren": 2500,
    "Ferry": 2200,
  },
  hotels: {
    "Gran Turismo": 6000,
    "Boutique": 4500,
    "5 estrellas": 5000,
    "4 estrellas": 4000,
    "3 estrellas": 3000,
  },
};

export default function SummaryPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="p-6 text-white">
        No hay datos disponibles. <button onClick={() => navigate("/travel")} className="text-blue-400 underline">Volver</button>
      </div>
    );
  }

  const { destination, transport, hotel } = state;

  const total =
    (prices.destinations[destination] || 0) +
    (prices.transport[transport] || 0) +
    (prices.hotels[hotel] || 0);

  return (
    <div className="max-w-xl p-6 mx-auto mt-10 text-white bg-gray-900 border border-gray-800 rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-center text-emerald-400">Resumen del Viaje</h2>

      <ul className="mb-6 space-y-2">
        <li>📍 <strong>Destino:</strong> {destination}</li>
        <li>🚌 <strong>Transporte:</strong> {transport}</li>
        <li>🏨 <strong>Hotel:</strong> {hotel}</li>
      </ul>

      <h3 className="text-xl font-semibold">Costo total estimado: <span className="text-green-400">${total}</span></h3>

      <button
        onClick={() => navigate("/")}
        className="w-full py-2 mt-6 bg-blue-600 rounded hover:bg-blue-700"
      >
        Volver al inicio
      </button>
    </div>
  );
}
