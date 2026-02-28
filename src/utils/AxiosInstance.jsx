import axios from 'axios';

let logoutHandler = null;
export const setLogoutHandler = (handler) => {
    logoutHandler = handler;
};

// Function Helper Axios

const ENV = import.meta.env.VITE_ENV || "local";

const axiosInstance = (additionalConfig = {}) => {

    const baseURL = import.meta.env[`VITE_BASE_URL_${ENV}`];
    if (!baseURL) {
        throw new Error(`BASE_URL not found for env "${ENV}"`);
    }

    const instance = axios.create({
        baseURL,
        withCredentials: true,
        ...additionalConfig,
    });

    // 🔥 TAMBAHKAN INTERCEPTOR DI SINI
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                logoutHandler?.();
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export default axiosInstance;