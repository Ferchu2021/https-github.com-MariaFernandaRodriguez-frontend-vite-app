import React from "react";
import PropTypes from "prop-types";
import "./input.css";

/**
 * Componente Input reutilizable para la UI.
 * Props:
 * - label: texto de la etiqueta.
 * - type: tipo de input (text, email, password, etc.).
 * - value: valor del input (controlado).
 * - onChange: función para manejar cambios.
 * - placeholder: texto guiado.
 * - name: identificador.
 * - error: mensaje de error.
 * - disabled: deshabilita el input.
 * - className: clases CSS adicionales.
 */
export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  name,
  error = "",
  disabled = false,
  className = "",
  ...rest
}) {
  return (
    <div className={`input-container ${className}`}> 
      {label && <label htmlFor={name} className="input-label">{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-field ${error ? "input-error" : ""}`}
        {...rest}
      />
      {error && <div className="input-error-message">{error}</div>}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
