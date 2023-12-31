import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <BrowserRouter className="App">
      {currentUser && <Navbar user={currentUser} />}
      <Routes>
        <Route path="/" element={currentUser ? <Home /> : <LoginPage />} />
        <Route
          path="/profile/:id"
          element={currentUser ? <Profile /> : <LoginPage />}
        />
        <Route
          path="/edit/:id"
          element={currentUser ? <Edit /> : <LoginPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
