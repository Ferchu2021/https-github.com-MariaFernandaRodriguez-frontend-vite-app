import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = "button",
  className = "",
  icon,
  iconPosition = "left",
  ...props
}) => {
  const getVariantClass = (variant) => {
    const variantMap = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      success: "btn-success",
      danger: "btn-danger",
      warning: "btn-warning",
      outline: "btn-outline",
      ghost: "btn-ghost"
    };
    return variantMap[variant] || "btn-primary";
  };

  const getSizeClass = (size) => {
    const sizeMap = {
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg"
    };
    return sizeMap[size] || "btn-md";
  };

  const getIconPositionClass = (position) => {
    return position === "right" ? "btn-icon-right" : "btn-icon-left";
  };

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={`
        btn 
        ${getVariantClass(variant)} 
        ${getSizeClass(size)}
        ${fullWidth ? "btn-full-width" : ""}
        ${disabled ? "btn-disabled" : ""}
        ${loading ? "btn-loading" : ""}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="btn-spinner">
          <svg
            className="spinner"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12a9 9 0 11-6.219-8.56" />
          </svg>
        </span>
      )}
      
      {!loading && icon && iconPosition === "left" && (
        <span className={`btn-icon ${getIconPositionClass(iconPosition)}`}>
          {icon}
        </span>
      )}
      
      <span className="btn-content">{children}</span>
      
      {!loading && icon && iconPosition === "right" && (
        <span className={`btn-icon ${getIconPositionClass(iconPosition)}`}>
          {icon}
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "primary", "secondary", "success", "danger", "warning", "outline", "ghost"
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"])
};

export default Button; 