import React from "react";
import PropTypes from "prop-types";
import "./StatusBadge.css";

const StatusBadge = ({
  status,
  variant = "default",
  size = "md",
  showIcon = false,
  className = ""
}) => {
  const getStatusConfig = (status) => {
    const statusMap = {
      // Estados generales
      active: { label: "Activo", color: "success", icon: "✅" },
      inactive: { label: "Inactivo", color: "danger", icon: "❌" },
      pending: { label: "Pendiente", color: "warning", icon: "⏳" },
      draft: { label: "Borrador", color: "secondary", icon: "📝" },
      published: { label: "Publicado", color: "success", icon: "📢" },
      archived: { label: "Archivado", color: "secondary", icon: "📁" },
      
      // Estados de proceso
      processing: { label: "Procesando", color: "info", icon: "⚙️" },
      completed: { label: "Completado", color: "success", icon: "✅" },
      failed: { label: "Fallido", color: "danger", icon: "❌" },
      cancelled: { label: "Cancelado", color: "secondary", icon: "🚫" },
      
      // Estados de usuario
      online: { label: "En línea", color: "success", icon: "🟢" },
      offline: { label: "Desconectado", color: "secondary", icon: "🔴" },
      busy: { label: "Ocupado", color: "warning", icon: "🟡" },
      
      // Estados de pago
      paid: { label: "Pagado", color: "success", icon: "💰" },
      unpaid: { label: "Sin pagar", color: "danger", icon: "💸" },
      refunded: { label: "Reembolsado", color: "info", icon: "↩️" },
      
      // Estados de envío
      shipped: { label: "Enviado", color: "success", icon: "📦" },
      delivered: { label: "Entregado", color: "success", icon: "🏠" },
      in_transit: { label: "En tránsito", color: "info", icon: "🚚" },
      returned: { label: "Devuelto", color: "warning", icon: "↩️" }
    };
    
    return statusMap[status] || { 
      label: status, 
      color: "default", 
      icon: "•" 
    };
  };

  const getSizeClass = (size) => {
    const sizeMap = {
      sm: "badge-sm",
      md: "badge-md",
      lg: "badge-lg"
    };
    return sizeMap[size] || "badge-md";
  };

  const getVariantClass = (variant) => {
    const variantMap = {
      default: "badge-default",
      solid: "badge-solid",
      outline: "badge-outline",
      soft: "badge-soft"
    };
    return variantMap[variant] || "badge-default";
  };

  const statusConfig = getStatusConfig(status);
  const colorClass = `badge-${statusConfig.color}`;
  const sizeClass = getSizeClass(size);
  const variantClass = getVariantClass(variant);

  return (
    <span 
      className={`status-badge ${colorClass} ${sizeClass} ${variantClass} ${className}`}
      title={statusConfig.label}
    >
      {showIcon && (
        <span className="badge-icon">
          {statusConfig.icon}
        </span>
      )}
      <span className="badge-text">
        {statusConfig.label}
      </span>
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["default", "solid", "outline", "soft"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  showIcon: PropTypes.bool,
  className: PropTypes.string
};

export default StatusBadge; 