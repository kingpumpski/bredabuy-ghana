import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    try {
      const storedAuth = localStorage.getItem(
        "bredabuy-auth"
      );

      if (storedAuth) {
        const parsed = JSON.parse(storedAuth);

        const token =
          parsed?.state?.session?.accessToken;

        if (token) {
          config.headers.Authorization =
            `Bearer ${token}`;
        }
      }
    } catch {
      // Invalid persisted auth state should never
      // prevent an API request from being created.
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 403) {
        console.warn("Access denied");
      }

      if (
        error.response.status !== 401 &&
        error.response.status !== 403
      ) {
        console.error(
          "API Error:",
          error.response.status
        );
      }
    } else if (error.request) {
      console.error("Network error");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
