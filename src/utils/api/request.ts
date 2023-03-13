import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseURL } from "@/config";

const instance = axios.create({
    baseURL: baseURL,
    timeout: 1000,
});

// 添加请求拦截器
instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 在发送请求之前做些什么
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        return response;
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export default instance;
