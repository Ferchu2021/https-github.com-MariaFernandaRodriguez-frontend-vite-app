import React from "react";
import "./loader.css";

export default function Loader({ text = "Cargando..." }) {
  return (
    <div className="loader-container" role="status" aria-live="polite">
      <div className="loader-spinner"></div>
      <span className="loader-text">{text}</span>
    </div>
  );
}
