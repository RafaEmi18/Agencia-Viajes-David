import React from "react";
import { motion } from "framer-motion";
import { Heart, Star, ArrowRight, Filter } from "lucide-react";

const HotelList = ({ hotels, favorites, toggleFavorite }) => {
  return (
    <div className="p-6 bg-gray-800 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
          🏨 Hoteles Disponibles
        </h2>
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <select className="px-3 py-2 text-white bg-gray-700 rounded-lg">
            <option>Precio: Menor a mayor</option>
            <option>Precio: Mayor a menor</option>
            <option>Calificación</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {hotels.map((hotel) => (
          <motion.div
            key={hotel.id}
            whileHover={{ scale: 1.02 }}
            className="overflow-hidden transition-all bg-gray-700 rounded-xl hover:bg-gray-600"
          >
            <div className="relative">
              <img
                src={hotel.imageUrl}
                alt={hotel.name}
                className="object-cover w-full h-48"
              />
              <button
                onClick={() => toggleFavorite(hotel.id)}
                className="absolute p-2 transition-all bg-black bg-opacity-50 rounded-full top-3 right-3 hover:bg-opacity-70"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.includes(hotel.id)
                      ? "text-red-500 fill-current"
                      : "text-white"
                  }`}
                />
              </button>
              <div className="absolute px-2 py-1 text-sm text-white bg-black rounded bottom-3 left-3 bg-opacity-70">
                {hotel.category}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">{hotel.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-white">{hotel.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {hotel.amenities?.slice(0, 3).map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs text-white bg-blue-600 rounded"
                  >
                    {amenity}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-400">Desde</span>
                  <div className="text-xl font-bold text-white">
                    ${hotel.costPerNight.toLocaleString()}
                    <span className="text-sm text-gray-400">/noche</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 text-white transition-all rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Reservar
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;