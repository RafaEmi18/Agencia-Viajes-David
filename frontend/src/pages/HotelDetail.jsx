import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Star, ArrowRight, Calendar, Users, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import TransportList from "../components/TransportList";

const HotelDetail = () => {
  const { hotelId } = useParams();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [destination, setDestination] = useState(null);
  const [transports, setTransports] = useState([]); // <-- Agrega este estado

  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");
  const destinationId = searchParams.get("destinationId");

  const API_URL = import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/travel"
    : "/api/travel";

  const [selectedTransportId, setSelectedTransportId] = useState(null);

  // Cargar hotel y destino
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get(`${API_URL}/hotels/${hotelId}`);
        setHotel(res.data.hotel);
        setDestination(res.data.destination);
      } catch (err) {
        console.error("Error cargando detalle del hotel:", err);
      }
    };

    fetchHotel();
  }, [hotelId]);

  // Cargar transportes
  useEffect(() => {
    if (!destinationId) return;
    const fetchTransports = async () => {
      try {
        const res = await axios.get(`${API_URL}/destinations/${destinationId}/transports`);
        setTransports(res.data);
      } catch (err) {
        console.error("Error cargando transportes:", err);
      }
    };
    fetchTransports();
  }, [destinationId]);

  const getTransportIcon = (type) => {
    // Devuelve el ícono según el tipo de transporte
    // Ejemplo:
    // if (type === "bus") return <BusIcon />;
    // if (type === "car") return <CarIcon />;
    // ...
    return "🚗";
  };

  const handleReserve = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/confirm-reservation", {
        state: {
          hotel,
          destination,
          checkIn,
          checkOut,
          guests,
          transportId: selectedTransportId,
          transport: transports.find(t => t.id === selectedTransportId),
        }
      });
    }
  };

  const handleReserve1 = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate(
        `/confirm-reservation?destinationId=${destinationId}&hotelId=${hotelId}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
      );
    }
  };

  if (!hotel || !destination) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Cargando detalles...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <div className="max-w-4xl mx-auto overflow-hidden bg-gray-800 shadow-xl rounded-xl">
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="object-cover w-full h-64"
        />
        <div className="p-6 text-white">
          <h2 className="mb-2 text-3xl font-bold">{hotel.name}</h2>
          <div className="flex items-center gap-2 mb-4 text-yellow-400">
            <Star className="w-5 h-5" />
            <span>{(4.2 + Math.random() * 0.8).toFixed(1)}</span>
          </div>
          <div className="flex flex-col gap-2 mb-6 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{destination.name} ({destination.region})</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Del {checkIn} al {checkOut}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{guests} huésped{guests > 1 ? 'es' : ''}</span>
            </div>
          </div>

          <TransportList
            transports={transports}
            getTransportIcon={getTransportIcon}
            selectedTransportId={selectedTransportId}
            setSelectedTransportId={setSelectedTransportId}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {handleReserve();}}
            className="flex items-center gap-2 px-4 py-2 text-white transition-all rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Reservar
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
