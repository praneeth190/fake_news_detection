import axios from "axios";

const api = axios.create({
  baseURL: "https://fake-news-detector-api-jh62.onrender.com", // backend
});

export default api;
