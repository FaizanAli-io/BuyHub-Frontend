import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useUser } from "../context/UserContext";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "BUYER",
  });
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        formData
      );
      setUser(response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-lg rounded-lg"
      >
        <h2 className="text-3xl font-bold text-center text-cyan-400">
          Sign Up
        </h2>
        <FormInput
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-gray-300 border-none rounded outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <FormInput
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-gray-300 border-none rounded outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-gray-300 border-none rounded outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-gray-300 border-none rounded outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="BUYER">Buyer</option>
          <option value="SELLER">Seller</option>
        </select>
        <Button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-gray-900 bg-cyan-400 rounded hover:bg-cyan-300"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default Signup;
