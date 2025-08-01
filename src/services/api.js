//const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
const API_URL = "http://localhost:3001";

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Authentication endpoints
export const login = async (credentials) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return handleResponse(res);
};

export const register = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
};

export const logout = async () => {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

export const refreshToken = async () => {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

// Dashboard statistics
export const getDashboardStats = async () => {
  const res = await fetch(`${API_URL}/dashboard/stats`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

export const getChartData = async (chartType, period = 'week') => {
  const res = await fetch(`${API_URL}/dashboard/charts/${chartType}?period=${period}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

// Data CRUD operations
export const fetchData = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/data${queryString ? `?${queryString}` : ''}`);
  return handleResponse(res);
};

export const getPrivateData = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/data/private${queryString ? `?${queryString}` : ''}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

export const getDataById = async (id) => {
  const res = await fetch(`${API_URL}/data/${id}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

export const createData = async (data) => {
  const res = await fetch(`${API_URL}/data`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const updateData = async (id, data) => {
  const res = await fetch(`${API_URL}/data/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const deleteData = async (id) => {
  const res = await fetch(`${API_URL}/data/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

// User management
export const getUsers = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/users${queryString ? `?${queryString}` : ''}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

export const getUserById = async (id) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

export const updateUser = async (id, userData) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
};

export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

// File upload
export const uploadFile = async (file, type = 'general') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return handleResponse(res);
};

// Notifications
export const getNotifications = async () => {
  const res = await fetch(`${API_URL}/notifications`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

export const markNotificationAsRead = async (id) => {
  const res = await fetch(`${API_URL}/notifications/${id}/read`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

export const deleteNotification = async (id) => {
  const res = await fetch(`${API_URL}/notifications/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

// Search functionality
export const searchData = async (query, filters = {}) => {
  const searchParams = new URLSearchParams({
    q: query,
    ...filters,
  });
  
  const res = await fetch(`${API_URL}/search?${searchParams}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

// Export data
export const exportData = async (format = 'csv', filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_URL}/export/${format}${queryString ? `?${queryString}` : ''}`, {
    headers: getAuthHeaders(),
  });
  
  if (!res.ok) {
    throw new Error(`Export failed: ${res.status}`);
  }
  
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `export-${new Date().toISOString().split('T')[0]}.${format}`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
