// src/pages/HotelResults.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";

const HotelResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const queryParams = new URLSearchParams(location.search);
  const destinationId = queryParams.get("destinationId");
  const checkIn = queryParams.get("checkIn");
  const checkOut = queryParams.get("checkOut");
  const guests = queryParams.get("guests");

  const [hotels, setHotels] = useState([]);
  const [destinationName, setDestinationName] = useState("");

  const API_URL = import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/travel"
    : "/api/travel";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hotelRes, destRes] = await Promise.all([
          axios.get(`${API_URL}/destinations/${destinationId}/hotels`),
          axios.get(`${API_URL}/destinations`)
        ]);
        const allDestinations = destRes.data;
        const matched = allDestinations.find(d => d.id === destinationId);
        setDestinationName(matched?.name || "Destino");
        
        const enhancedHotels = hotelRes.data.map((hotel, i) => ({
          ...hotel,
          rating: (4.2 + Math.random() * 0.8).toFixed(1),
          image: `https://images.unsplash.com/photo-${i % 2 === 0
            ? '1566073771259-6a8506099945'
            : '1571896349842-33c89424de2d'}?w=400&q=80`
        }));

        setHotels(enhancedHotels);
      } catch (err) {
        console.error("Error al cargar hoteles", err);
      }
    };

    if (destinationId) {
      fetchData();
    }
  }, [destinationId]);

  const handleClickHotel = (hotelId) => {
    navigate(`/hotels/${hotelId}?destinationId=${destinationId}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-white">
          Resultados en {destinationName}
        </h1>

        {hotels.length === 0 ? (
          <p className="text-white">No se encontraron hoteles</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <motion.div
                key={hotel.id}
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden bg-gray-800 rounded-lg shadow-lg cursor-pointer"
                onClick={() => handleClickHotel(hotel.id)}
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="object-cover w-full h-48"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-white">{hotel.name}</h2>
                  <div className="flex items-center gap-2 mt-1 text-yellow-400">
                    <Star className="w-4 h-4" />
                    <span>{hotel.rating}</span>
                  </div>
                  <div className="mt-2 text-white">
                    <span className="text-sm text-gray-300">Desde</span>
                    <div className="text-xl font-bold">
                      ${hotel.costPerNight.toLocaleString()} <span className="text-sm text-gray-400">/noche</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <button className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
                      Ver detalles
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelResults;
