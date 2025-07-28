import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Ping from "./components/ping";

function App() {
  return (
    <routes>
      <Route path="/" element={<home />} />
      <Route path="/login" element={<login />} />
      <Route path="/dashboard" element={<dashboard />} />
      <Route path="/ping" element={<oing />} />
      {/* Redirección de rutas no encontradas */}
      <Route path="*" element={<navigate to="/" />} />
    </routes>
  );
}

export default App;
