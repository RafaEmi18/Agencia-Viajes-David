import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const TransportList = ({
  transports,
  getTransportIcon,
  selectedTransportId,
  setSelectedTransportId
}) => {
  return (
    <div className="p-6 mb-8 bg-gray-800 rounded-xl">
      <h2 className="flex items-center gap-3 mb-6 text-2xl font-bold text-white">
        🚗 Opciones de Transporte
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {transports.map((transport) => (
          <motion.div
            key={transport.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedTransportId(transport.id)}
            className={`p-4 transition-all rounded-lg cursor-pointer ${
              selectedTransportId === transport.id ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3 text-white">
                <span>{getTransportIcon(transport.type)}</span>
                <span className="font-medium capitalize">{transport.type}</span>
              </div>
              <span className="font-bold text-green-400">
                ${transport.cost.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {transport.durationHours}h
              </div>
              {transport.hasTransfer && (
                <span className="px-2 py-1 text-xs text-white bg-orange-500 rounded">
                  Con escala
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TransportList;