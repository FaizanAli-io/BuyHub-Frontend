import axios from "axios";
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        formData
      );
      if (response.data) {
        setUser(response.data);
        navigate("/profile");
      } else {
        setErrorMessage("Incorrect credentials");
      }
    } catch (error) {
      setErrorMessage("Incorrect credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-lg rounded-lg"
      >
        <h2 className="text-3xl font-bold text-center text-cyan-400">Log In</h2>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
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
        <Button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-gray-900 bg-cyan-400 rounded hover:bg-cyan-300"
        >
          Log In
        </Button>
      </form>
    </div>
  );
}

export default Login;
