import axios from "axios";

const api = axios.create({
  baseURL: "https://webapp-workconnect-gs-2025.azurewebsites.net",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
