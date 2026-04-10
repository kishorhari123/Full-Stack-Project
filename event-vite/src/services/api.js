import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (name, email, password) =>
    api.post("/auth/register", { name, email, password }),
  getUsers: () => api.get("/auth/users"),
};

export const eventAPI = {
  getAll: () => api.get("/events"),
  create: (eventData) => api.post("/events", eventData),
  update: (id, eventData) => api.put(`/events/${id}`, eventData),
  delete: (id) => api.delete(`/events/${id}`),
};

export const registrationAPI = {
  create: (data) => api.post("/registrations", data),
  getAll: () => api.get("/registrations"),
  getByEvent: (eventId) => api.get(`/registrations/event/${eventId}`),
};

export default api;
