// src/components/RutasPrivadas.jsx
import { Navigate } from "react-router-dom";

export default function RutasPrivadas({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to='/login' />;
}
