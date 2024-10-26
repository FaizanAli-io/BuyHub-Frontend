import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home"; // Import Home
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home Route */}
          <Route path="/login" element={<Login />} /> {/* Login Route */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
