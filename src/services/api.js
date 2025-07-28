//const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
const API_URL = "http://localhost:3001";

export const fetchData = async () => {
  const res = await fetch(`${API_URL}/data`);
  return res.json();
};

export const login = async (credentials) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const getPrivateData = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/data/private`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const createData = async (data) => {
  const token = localStorage.getItem("token");
  await fetch(`${API_URL}/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const updateData = async (id, data) => {
  const token = localStorage.getItem("token");
  await fetch(`${API_URL}/data/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const deleteData = async (id) => {
  const token = localStorage.getItem("token");
  await fetch(`${API_URL}/data/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};
