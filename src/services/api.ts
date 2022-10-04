import axios from "axios";
export const URL_API = import.meta.env.VITE_APP_API_URL;

export const api = axios.create({
  baseURL: URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});
