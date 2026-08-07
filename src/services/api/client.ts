import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {

    if (error.response) {

      switch(error.response.status){

        case 401:
          console.warn(
            "Authentication required"
          );
          break;

        case 403:
          console.warn(
            "Access denied"
          );
          break;

        default:
          console.error(
            "API Error:",
            error.response.status
          );
      }

    } else if(error.request){

      console.error(
        "Network error"
      );

    }

    return Promise.reject(error);
  }
);


export default apiClient;