import React from "react";
import { FaShoppingCart, FaStore, FaUserShield } from "react-icons/fa";

function ProfileHeader({ role }) {
  const color = {
    ADMIN: "green",
    SELLER: "orange",
    BUYER: "blue",
  }[role];

  const colorClasses = {
    blue: {
      primary: "#1e3a8a",
      secondary: "#2563eb",
      tertiary: "#60a5fa",
    },
    orange: {
      primary: "#b45309",
      secondary: "#f97316",
      tertiary: "#fdba74",
    },
    green: {
      primary: "#166534",
      secondary: "#22c55e",
      tertiary: "#86efac",
    },
  }[color];

  const roleIcons = {
    BUYER: <FaShoppingCart className={`text-${color}-400 text-5xl`} />,
    SELLER: <FaStore className={`text-${color}-400 text-5xl`} />,
    ADMIN: <FaUserShield className={`text-${color}-400 text-5xl`} />,
  };

  return (
    <div className="relative h-64 overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <polygon
            points="0,160 400,80 800,160 1200,80 1440,160 1440,320 0,320"
            fill={colorClasses.primary}
          />
          <polygon
            points="0,200 400,120 800,200 1200,120 1440,200 1440,320 0,320"
            fill={colorClasses.secondary}
            fillOpacity="0.7"
          />
          <polygon
            points="0,240 400,160 800,240 1200,160 1440,240 1440,320 0,320"
            fill={colorClasses.tertiary}
            fillOpacity="0.5"
          />
        </svg>
      </div>
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-32 h-32 bg-gray-800 rounded-full border-4 border-gray-700 flex items-center justify-center shadow-lg">
          {roleIcons[role]}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
