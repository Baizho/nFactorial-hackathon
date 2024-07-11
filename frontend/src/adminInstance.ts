import axios from "axios";

const BACKEND_URL = "http://157.230.239.9:3000"

const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("admin_token");

        if (accessToken) {
            if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
            localStorage.removeItem("admin_token");
        }

        return Promise.reject(error)
    }
);

export default axiosInstance;