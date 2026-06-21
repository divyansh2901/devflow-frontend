import axios from "axios";

const api = axios.create({
  baseURL: "https://devflow-backend-sajt.onrender.com/api",
});

export default api;