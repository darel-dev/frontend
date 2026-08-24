import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    console.log(`📡 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    console.error("❌ API Error:", message);
    return Promise.reject(error);
  }
);

// API functions
export const itemAPI = {
  // Get all items
  getAll: () => API.get("/items"),

  // Get single item
  getOne: (id) => API.get(`/items/${id}`),

  // Create item
  create: (data) => API.post("/items", data),

  // Update item
  update: (id, data) => API.put(`/items/${id}`, data),

  // Delete item
  delete: (id) => API.delete(`/items/${id}`),
};

export default API;