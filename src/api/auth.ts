import axios from "./index";

export const login = () => axios.post("/user/login");

export const addCategoriesAsync = (data: any) =>
    axios.post("/categroy/addCategroy", data);
