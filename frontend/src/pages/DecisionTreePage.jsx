import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DecisionTreePage() {
  const [destination, setDestination] = useState("");
  const [transport, setTransport] = useState("");
  const [hotel, setHotel] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!destination || !transport || !hotel) {
      alert("Completa todas las opciones para continuar");
      return;
    }

    navigate("/summary", {
      state: { destination, transport, hotel },
    });
  };

  return (
    <div className="max-w-xl p-6 mx-auto mt-10 text-white bg-gray-900 border border-gray-800 rounded-lg shadow-xl">
      <h2 className="mb-6 text-2xl font-bold text-center text-emerald-400">Planifica tu viaje</h2>

      <label className="block mb-2">Destino:</label>
      <select
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="w-full p-2 mb-4 text-white bg-gray-800 rounded"
      >
        <option value="">-- Selecciona --</option>
        <option value="Cancún">Cancún</option>
        <option value="Los Cabos">Los Cabos</option>
      </select>

      <label className="block mb-2">Transporte:</label>
      <select
        value={transport}
        onChange={(e) => setTransport(e.target.value)}
        className="w-full p-2 mb-4 text-white bg-gray-800 rounded"
      >
        <option value="">-- Selecciona --</option>
        <option value="Avión">Avión</option>
        <option value="Autobús">Autobús</option>
        <option value="Tren">Tren</option>
        <option value="Ferry">Ferry</option>
      </select>

      <label className="block mb-2">Tipo de Hotel:</label>
      <select
        value={hotel}
        onChange={(e) => setHotel(e.target.value)}
        className="w-full p-2 mb-6 text-white bg-gray-800 rounded"
      >
        <option value="">-- Selecciona --</option>
        <option value="Gran Turismo">Gran Turismo</option>
        <option value="Boutique">Boutique</option>
        <option value="5 estrellas">5 estrellas</option>
        <option value="4 estrellas">4 estrellas</option>
        <option value="3 estrellas">3 estrellas</option>
      </select>

      <button
        onClick={handleContinue}
        className="w-full py-2 font-bold text-white rounded bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
      >
        Ver resumen
      </button>
    </div>
  );
}
