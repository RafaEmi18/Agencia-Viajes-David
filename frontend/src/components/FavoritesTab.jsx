import React from "react";
import { motion } from "framer-motion";

const FavoritesTab = ({ favorites }) => {
  return (
    <motion.div
      key="favorites"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-8 text-center bg-gray-800 rounded-xl"
    >
      <div className="mb-4 text-6xl">❤️</div>
      <h3 className="mb-2 text-2xl font-bold text-white">Tus Favoritos</h3>
      <p className="text-gray-400">
        {favorites.length === 0
          ? "Aún no tienes hoteles favoritos. ¡Explora y guarda los que más te gusten!"
          : `Tienes ${favorites.length} hotel${favorites.length !== 1 ? "es" : ""} favorito${favorites.length !== 1 ? "s" : ""}`}
      </p>
    </motion.div>
  );
};

export default FavoritesTab;
