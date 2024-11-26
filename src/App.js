// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import SplashScreen from "./components/SplashScreen";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AllUsers from "./pages/AllUsers";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AddProduct from "./pages/AddProduct";
import Inventory from "./pages/Inventory";
import ProductDetails from "./pages/ProductDetails";
import EditProduct from "./pages/EditProduct";
import TopProducts from "./pages/TopProducts";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <UserProvider>
      {showSplash ? (
        <SplashScreen />
      ) : (
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
            <Route path="/users" element={<AllUsers />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="/top-products" element={<TopProducts />} />
          </Routes>
        </Router>
      )}
    </UserProvider>
  );
}

export default App;
