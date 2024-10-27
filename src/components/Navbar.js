import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clear user context
    navigate("/"); // Redirect to home page
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl">E-commerce Site</div>
        <div className="space-x-4">
          {user ? (
            <>
              {/* Common Links for logged-in users */}
              <Link to="/products" className="text-gray-300 hover:text-white">
                Products
              </Link>
              <Link to="/profile" className="text-gray-300 hover:text-white">
                Profile
              </Link>

              {user.role === "BUYER" ? (
                <>
                  <Link to="/cart" className="text-gray-300 hover:text-white">
                    My Cart
                  </Link>
                  <Link to="/orders" className="text-gray-300 hover:text-white">
                    My Orders
                  </Link>
                </>
              ) : user.role === "SELLER" ? (
                <>
                  <Link
                    to="/add-product"
                    className="text-gray-300 hover:text-white"
                  >
                    Add Product
                  </Link>
                  <Link
                    to="/inventory"
                    className="text-gray-300 hover:text-white"
                  >
                    Inventory
                  </Link>
                </>
              ) : (
                user.role === "ADMIN" && ( // Check for ADMIN role
                  <>
                    <Link
                      to="/users"
                      className="text-gray-300 hover:text-white"
                    >
                      All Users
                    </Link>
                    <Link
                      to="/categories"
                      className="text-gray-300 hover:text-white"
                    >
                      Categories
                    </Link>
                  </>
                )
              )}
              {/* Logout Link */}
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            // Links for not logged-in users
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
              <Link to="/signup" className="text-gray-300 hover:text-white">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
