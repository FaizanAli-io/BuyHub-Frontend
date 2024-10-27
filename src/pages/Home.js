import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import the useUser hook

function Home() {
  const { user } = useUser(); // Get the user from context

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-300">
      {user ? (
        <>
          <h1 className="text-5xl font-bold text-cyan-400">Welcome Back!</h1>
          <p className="mt-4 text-center">
            This is an e-commerce platform developed by:
            <br />
            <strong>Faizan Ali (22I-2496)</strong>
            <br />
            <strong>Zaid Vohra (22K-4195)</strong>
            <br />
            <strong>Hamail Rehman (22K-4443)</strong>
          </p>
        </>
      ) : (
        <>
          <h1 className="text-5xl font-bold text-cyan-400">
            Welcome to Our Website
          </h1>
          <p className="mt-4 text-gray-300">
            This is the best place to manage your account!
          </p>
          <Link to="/login">
            <button className="mt-6 px-4 py-2 font-semibold text-gray-900 bg-cyan-400 rounded hover:bg-cyan-300">
              Go to Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="mt-2 px-4 py-2 font-semibold text-gray-900 bg-cyan-400 rounded hover:bg-cyan-300">
              Sign Up
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Home;
