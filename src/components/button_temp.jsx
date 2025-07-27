import "./Button.css";
import React from "react";
import PropTypes from "prop-types";

/**
 * Botón reutilizable y accesible para la UI.
 * Props:
 * - children: texto o contenido dentro del botón
 * - onClick: función a ejecutar al hacer click
 * - type: tipo de botón ("button", "submit", "reset")
 * - disabled: estado de deshabilitado
 * - className: clases CSS adicionales para personalización
 */
export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`ui-button ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
