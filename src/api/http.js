import axios from "axios";
import { logger } from "../logging/logger";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE
});

// log request
http.interceptors.request.use((config) => {
  config.meta = { start: Date.now() };
  logger.add("REQUEST", `${config.method?.toUpperCase()} ${config.url}`, config.data);
  return config;
});

// log response
http.interceptors.response.use(
  (res) => {
    const ms = Date.now() - res.config.meta.start;
    logger.add("RESPONSE", `${res.status} ${res.config.url} (${ms} ms)`, res.data);
    return res;
  },
  (err) => {
    const ms = Date.now() - (err.config?.meta?.start || Date.now());
    logger.add("ERROR", `${err.config?.url} failed (${ms} ms)`, err.message);
    return Promise.reject(err);
  }
);

export default http;
