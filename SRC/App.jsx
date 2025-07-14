import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicPage from "./routes/PublicPage";
import LoginPage from "./routes/LoginPage";
import PrivatePage from "./routes/PrivatePage";
import { useAuth } from "./hooks/useAuth";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/private"
          element={
            <PrivateRoute>
              <PrivatePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
