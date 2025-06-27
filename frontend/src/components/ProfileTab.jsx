import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileTab = ({ user, favorites }) => {
  const navigate = useNavigate()
  const isUserLoggedIn = !!user

  return (
    <motion.div
        key="profile"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="p-8 bg-gray-800 rounded-xl"
      >
        {isUserLoggedIn ? (
          <>
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`w-2 h-2 ${user.isVerified ? 'bg-green-500' : 'bg-yellow-500'} rounded-full`}></div>
                  <span className={`${user.isVerified ? 'text-green-400' : 'text-yellow-400'} text-sm`}>
                    {user.isVerified ? 'Usuario verificado' : 'Verificación pendiente'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="p-4 text-center bg-gray-700 rounded-lg">
                <div className="mb-1 text-3xl font-bold text-blue-400">0</div>
                <div className="text-gray-300">Reservas activas</div>
              </div>
              <div className="p-4 text-center bg-gray-700 rounded-lg">
                <div className="mb-1 text-3xl font-bold text-green-400">{favorites.length}</div>
                <div className="text-gray-300">Hoteles favoritos</div>
              </div>
              <div className="p-4 text-center bg-gray-700 rounded-lg">
                <div className="mb-1 text-3xl font-bold text-purple-400">0</div>
                <div className="text-gray-300">Viajes completados</div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="mb-4 text-6xl">🔒</div>
            <h3 className="mb-2 text-2xl font-bold text-white">Inicia sesión para ver tu perfil</h3>
            <p className="mb-6 text-gray-400">
              Aquí aparecerá tu información personal, historial de viajes y favoritos.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 font-semibold text-white transition-all rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Iniciar sesión
            </button>
          </div>
        )}
      </motion.div>
  );
};

export default ProfileTab;
