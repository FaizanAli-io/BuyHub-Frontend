import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { FaPowerOff } from "react-icons/fa"; // Importing power icon from react-icons
import { VscAccount } from "react-icons/vsc"; // Importing profile icon

function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clear user context
    navigate("/"); // Redirect to home page
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Buy Hub
        </div>

        {/* Centered Navigation Menu */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-10 items-center">
          {user ? (
            <>
              <Link
                to="/products"
                className="text-gray-300 hover:text-green-400 text-lg font-semibold tracking-wide transition-all duration-300"
              >
                Products
              </Link>
              {user.role === "BUYER" ? (
                <>
                  <Link
                    to="/cart"
                    className="text-gray-300 hover:text-green-400 text-lg font-semibold tracking-wide transition-all duration-300"
                  >
                    My Cart
                  </Link>
                  <Link
                    to="/orders"
                    className="text-gray-300 hover:text-green-400 text-lg font-semibold tracking-wide transition-all duration-300"
                  >
                    My Orders
                  </Link>
                </>
              ) : user.role === "SELLER" ? (
                <>
                  <Link
                    to="/add-product"
                    className="text-gray-300 hover:text-green-400 text-lg font-semibold tracking-wide transition-all duration-300"
                  >
                    Add Product
                  </Link>
                  <Link
                    to="/inventory"
                    className="text-gray-300 hover:text-green-400 text-lg font-semibold tracking-wide transition-all duration-300"
                  >
                    Inventory
                  </Link>
                </>
              ) : (
                user.role === "ADMIN" && (
                  <>
                    <Link
                      to="/users"
                      className="text-gray-300 hover:text-green-400 text-lg font-semibold tracking-wide transition-all duration-300"
                    >
                      All Users
                    </Link>
                    <Link
                      to="/categories"
                      className="text-gray-300 hover:text-green-400 text-lg font-semibold tracking-wide transition-all duration-300"
                    >
                      Categories
                    </Link>
                  </>
                )
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-green-400 text-lg font-semibold tracking-wide transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-300 hover:text-green-400 text-lg font-semibold tracking-wide transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Logout and Profile Section */}
        <div className="flex items-center space-x-4">
          {user && (
            <>
              {/* Profile Icon and Name */}
              <Link
                to="/profile"
                className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-all duration-300"
              >
                <VscAccount className="text-2xl" />
                <span className="text-lg font-medium">{user.name}</span>
              </Link>

              {/* Logout Icon */}
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 text-lg font-medium ml-4" // Added margin-left (ml-4)
                title="Logout"
              >
                <FaPowerOff className="text-2xl" />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
