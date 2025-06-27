import React from "react";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 

const SearchBox = ({
  destinations,
  selectedDestination,
  searchFilters,
  setSearchFilters,
  onDestinationSelect
}) => {

  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="max-w-4xl p-8 mx-auto mt-8 bg-white shadow-2xl rounded-2xl"
    >
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Destino</label>
          <div className="relative">
            <MapPin className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
            <select
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedDestination}
              onChange={(e) => onDestinationSelect(e.target.value)}
            >
              <option value="">Selecciona destino</option>
              {destinations.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {dest.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Check-in</label>
          <div className="relative">
            <Calendar className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
            <input
              type="date"
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchFilters.checkIn}
              onChange={(e) =>
                setSearchFilters({ ...searchFilters, checkIn: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Check-out</label>
          <div className="relative">
            <Calendar className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
            <input
              type="date"
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchFilters.checkOut}
              onChange={(e) =>
                setSearchFilters({ ...searchFilters, checkOut: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Huéspedes</label>
          <div className="relative">
            <Users className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
            <select
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchFilters.guests}
              onChange={(e) =>
                setSearchFilters({
                  ...searchFilters,
                  guests: parseInt(e.target.value)
                })
              }
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "huésped" : "huéspedes"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center w-full gap-2 py-4 text-lg font-semibold text-white transition-all rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        onClick={() => {
          if (!selectedDestination) return;
          navigate(
            `/hotels?destinationId=${selectedDestination}` +
            `&checkIn=${searchFilters.checkIn}` +
            `&checkOut=${searchFilters.checkOut}` +
            `&guests=${searchFilters.guests}`
          );
        }}
      >
        <Search className="w-5 h-5" />
        Buscar viajes
      </motion.button>

    </motion.div>
  );
};

export default SearchBox;