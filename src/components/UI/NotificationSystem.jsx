import React, { useState, useEffect, createContext, useContext } from "react";
import PropTypes from "prop-types";
import "./NotificationSystem.css";

// Notification Context
const NotificationContext = createContext();

// Notification Provider
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: "info",
      duration: 5000,
      ...notification,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto remove notification after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const success = (message, options = {}) => {
    return addNotification({ type: "success", message, ...options });
  };

  const error = (message, options = {}) => {
    return addNotification({ type: "error", message, ...options });
  };

  const warning = (message, options = {}) => {
    return addNotification({ type: "warning", message, ...options });
  };

  const info = (message, options = {}) => {
    return addNotification({ type: "info", message, ...options });
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    success,
    error,
    warning,
    info,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
}

// Notification Container
function NotificationContainer() {
  const { notifications, removeNotification } = useContext(NotificationContext);

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
}

// Individual Notification Item
function NotificationItem({ notification, onRemove }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(notification.id), 300);
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22,4 12,14.01 9,11.01"></polyline>
          </svg>
        );
      case "error":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        );
      case "warning":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
    }
  };

  return (
    <div
      className={`notification-item notification-${notification.type} ${isVisible ? 'visible' : ''}`}
      onClick={notification.onClick}
    >
      <div className="notification-icon">
        {getIcon(notification.type)}
      </div>
      <div className="notification-content">
        {notification.title && (
          <h4 className="notification-title">{notification.title}</h4>
        )}
        <p className="notification-message">{notification.message}</p>
      </div>
      <button
        className="notification-close"
        onClick={(e) => {
          e.stopPropagation();
          handleRemove();
        }}
        aria-label="Cerrar notificación"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["success", "error", "warning", "info"]).isRequired,
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    duration: PropTypes.number,
    onClick: PropTypes.func,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

// Custom hook to use notifications
export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
} 