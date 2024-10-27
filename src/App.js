// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AllUsers from "./pages/AllUsers"; // Import AllUsers page
import Categories from "./pages/Categories"; // Import Categories page
import Products from "./pages/Products"; // Import Products page
import Cart from "./pages/Cart"; // Import Cart page
import Orders from "./pages/Orders"; // Import Orders page
import AddProduct from "./pages/AddProduct"; // Import AddProduct page
import Inventory from "./pages/Inventory"; // Import Inventory page

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/users" element={<AllUsers />} />{" "}
          <Route path="/categories" element={<Categories />} />{" "}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
