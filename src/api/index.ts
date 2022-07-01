import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = "http://152.136.150.189:3000";
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = window.sessionStorage.getItem("token");
        if (token) {
            (config.headers = config.headers || {}).token = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (res: AxiosResponse) => res.data,
    (error) => Promise.reject(error)
);

export default axios;
