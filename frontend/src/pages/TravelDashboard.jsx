import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import HeroSection from "../components/HeroSection";
import SearchBox from "../components/SearchBox";
import Tabs from "../components/Tabs";
import HotelList from "../components/HotelList";
import FavoritesTab from "../components/FavoritesTab";
import ProfileTab from "../components/ProfileTab";

import TransportList from "../components/TransportList";

const TravelDashboard = () => {
  const { user, logout, isAuthenticated, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [hotels, setHotels] = useState([]);
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    checkIn: "",
    checkOut: "",
    guests: 2,
    priceRange: [0, 10000],
    category: "all",
  });
  const [activeTab, setActiveTab] = useState("search");
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/travel"
    : "/api/travel";

  useEffect(() => {
    fetchDestinations();
  }, []);
  
  const fetchDestinations = async () => {
    try {
      setError(null);
      const response = await axios.get(`${API_URL}/destinations`);
      setDestinations(response.data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
      setError("Error al cargar destinos");
    }
  };

  const handleDestinationSelect = async (destinationId) => {
    if (!destinationId) return;
    setLoading(true);
    setSelectedDestination(destinationId);
    setError(null);

    try {
      const [hotelsResponse, transportsResponse] = await Promise.all([
        axios.get(`${API_URL}/destinations/${destinationId}/hotels`),
        axios.get(`${API_URL}/destinations/${destinationId}/transports`)
      ]);

      const hotelsWithExtras = hotelsResponse.data.map((hotel, index) => ({
        ...hotel,
        rating: (4.2 + Math.random() * 0.8).toFixed(1),
        image: `https://images.unsplash.com/photo-${
          index % 2 === 0 ? '1566073771259-6a8506099945' : '1571896349842-33c89424de2d'
        }?w=400&q=80`,
        amenities: ["WiFi", "Piscina", "Restaurante", "Spa", "Gimnasio"].slice(0, 3 + Math.floor(Math.random() * 2))
      }));

      setHotels(hotelsWithExtras);
      setTransports(transportsResponse.data);
    } catch (error) {
      console.error("Error fetching destination data:", error);
      setError("Error al cargar información del destino");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getTransportIcon = (type) => {
    const icons = {
      avion: "✈️",
      autobus: "🚍",
      tren: "🚆",
      ferry: "⛴️"
    };
    return icons[type] || "🚗";
  };

  const toggleFavorite = (hotelId) => {
    setFavorites((prev) =>
      prev.includes(hotelId) ? prev.filter((id) => id !== hotelId) : [...prev, hotelId]
    );
  };

  if (isCheckingAuth) {
    return <div className="flex items-center justify-center min-h-screen bg-black"><div className="w-16 h-16 border-b-2 border-white rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <HeroSection user={user} onLogout={handleLogout} />
      <SearchBox
        destinations={destinations}
        selectedDestination={selectedDestination}
        searchFilters={searchFilters}
        setSearchFilters={setSearchFilters}
        onDestinationSelect={handleDestinationSelect}
      />
      <div className="px-6 py-12 mx-auto max-w-7xl">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <AnimatePresence mode="wait">
          {activeTab === 'search' && (
            <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {loading ? <div className="text-white">Cargando...</div> : (
                selectedDestination ? (
                  <>
                    <TransportList transports={transports} getTransportIcon={getTransportIcon} />
                    <HotelList hotels={hotels} favorites={favorites} toggleFavorite={toggleFavorite} />
                  </>
                ) : (
                  <div className="py-20 text-center text-white">Selecciona un destino</div>
                )
              )}
            </motion.div>
          )}
          {activeTab === 'favorites' && (
            <FavoritesTab favorites={favorites} />
          )}
          {activeTab === 'profile' && (
            <ProfileTab user={user} favorites={favorites} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TravelDashboard;
