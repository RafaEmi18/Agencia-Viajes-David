import React from "react";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";  

const HeroSection = ({ user, onLogout }) => {
  
  const { logout, isAuthenticated, isCheckingAuth } = useAuthStore();
  const isUserLoggedIn = isAuthenticated && user;
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    if (onLogout) onLogout()
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative px-6 py-16 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 text-white"
        >
          <div className="flex-1 text-center">
            <h1 className="mb-4 text-5xl font-bold">
              ✈️ Bienvenido a Rutas MX{isUserLoggedIn ? `, ${user.name}` : ""}!
            </h1>
            <p className="text-xl opacity-90">
              Los mejores destinos de México te esperan
            </p>
          </div>

          {isUserLoggedIn ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 transition-colors bg-red-600 rounded-lg hover:bg-red-700"
            >
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-4 py-2 transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Iniciar sesión
            </motion.button>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default HeroSection;
