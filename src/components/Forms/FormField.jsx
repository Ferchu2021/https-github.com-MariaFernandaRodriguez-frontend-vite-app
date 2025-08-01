import React from "react";
import PropTypes from "prop-types";
import "./FormField.css";

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = "",
  rows = 3,
  options = [],
  ...props
}) => {
  const getInputType = (type) => {
    if (type === "textarea") return "textarea";
    if (type === "select") return "select";
    return "input";
  };

  const renderField = () => {
    const inputType = getInputType(type);
    const commonProps = {
      id: name,
      name,
      value,
      onChange,
      placeholder,
      disabled,
      className: `form-field-input ${error ? "error" : ""}`,
      ...props
    };

    switch (inputType) {
      case "textarea":
        return (
          <textarea
            {...commonProps}
            rows={rows}
          />
        );
      
      case "select":
        return (
          <select {...commonProps}>
            <option value="">{placeholder || "Selecciona una opción"}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      default:
        return (
          <input
            {...commonProps}
            type={type}
          />
        );
    }
  };

  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label htmlFor={name} className="form-field-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      
      <div className="form-field-wrapper">
        {renderField()}
      </div>
      
      {error && (
        <div className="form-field-error">
          {error}
        </div>
      )}
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    "text", "email", "password", "number", "tel", "url", 
    "textarea", "select", "date", "time", "datetime-local"
  ]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  rows: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  )
};

export default FormField; 