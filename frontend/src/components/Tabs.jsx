import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex p-1 mb-8 space-x-1 bg-gray-800 rounded-lg w-fit">
      {["search", "favorites", "profile"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeTab === tab
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
        >
          {tab === "search" && "🔍 Búsqueda"}
          {tab === "favorites" && "❤️ Favoritos"}
          {tab === "profile" && "👤 Perfil"}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
