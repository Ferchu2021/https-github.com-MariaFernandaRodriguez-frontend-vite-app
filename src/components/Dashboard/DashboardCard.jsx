import React from "react";
import PropTypes from "prop-types";
import "./DashboardCard.css";

const DashboardCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  color = "blue", 
  onClick,
  className = "" 
}) => {
  const getTrendColor = (trend) => {
    if (!trend) return "";
    return trend.startsWith("+") ? "positive" : "negative";
  };

  const getColorClass = (color) => {
    const colorMap = {
      blue: "card-blue",
      green: "card-green", 
      purple: "card-purple",
      orange: "card-orange",
      red: "card-red"
    };
    return colorMap[color] || "card-blue";
  };

  return (
    <div 
      className={`dashboard-card ${getColorClass(color)} ${className}`}
      onClick={onClick}
    >
      <div className="card-header">
        <div className="card-icon">
          <span className="icon-text">{icon}</span>
        </div>
        {trend && (
          <div className={`card-trend ${getTrendColor(trend)}`}>
            {trend}
          </div>
        )}
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <div className="card-value">{value}</div>
      </div>
    </div>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string,
  trend: PropTypes.string,
  color: PropTypes.oneOf(["blue", "green", "purple", "orange", "red"]),
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default DashboardCard; 