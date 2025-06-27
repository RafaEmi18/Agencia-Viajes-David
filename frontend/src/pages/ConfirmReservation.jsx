import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

const ConfirmReservation = () => {
  const { state } = useLocation();

  console.log("STATE EN CONFIRM RESERVATION:", state);

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/travel" : "/api/travel"

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  const handleConfirm = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/bookings`, {
        destinationId: state.destination.id,
        hotelId: state.hotel.id,
        transportId: state.transportId,
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        guests: state.guests,
      }, {
        withCredentials: true
      });

      alert("✅ ¡Reserva confirmada!");
      navigate("/");
    } catch (err) {
      console.error("Error al crear reserva:", err);
      alert("❌ Error al confirmar reserva");
    }
  };

  if (!state) return null;

  const { hotel, destination, checkIn, checkOut, guests } = state;

  return (
    <div className="min-h-screen px-6 py-16 text-white bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="max-w-3xl p-6 mx-auto bg-gray-800 rounded-xl">
        <h2 className="mb-6 text-3xl font-bold">Confirmar Reserva</h2>
        <ul className="mb-8 space-y-2 text-lg">
          <li><strong>Destino:</strong> {destination.name}</li>
          <li><strong>Hotel:</strong> {hotel.name}</li>
          <li>
            <strong>Transporte:</strong>{" "}
          {state.transport
            ? `${state.transport.type} | Duración: ${state.transport.durationHours}h | Precio: $${state.transport.cost.toLocaleString()}${state.transport.hasTransfer ? " | Con escala" : ""}`
            : state.transportId}
          </li>
          <li><strong>Check-in:</strong> {checkIn}</li>
          <li><strong>Check-out:</strong> {checkOut}</li>
          <li><strong>Huéspedes:</strong> {guests}</li>
          <li><strong>Precio por noche:</strong> ${hotel.costPerNight.toLocaleString()}</li>
        </ul>

        <button
          onClick={handleConfirm}
          className="w-full px-4 py-3 text-lg font-bold text-white transition-all rounded-lg bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
        >
          Confirmar Reserva
        </button>
      </div>
    </div>
  );
};

export default ConfirmReservation;
