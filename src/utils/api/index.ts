import axios from "./request";

export const register = (data: any) => axios.post("/user/register", data);
export const login = (data: any) => axios.post("/user/login", data);

export const addCategoriesAsync = (data: any) =>
    axios.post("/categroy/addCategroy", data);
