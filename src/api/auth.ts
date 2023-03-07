import axios from "./index";

export const login = (data: any) => axios.post("/user/login", data);

export const addCategoriesAsync = (data: any) =>
    axios.post("/categroy/addCategroy", data);
