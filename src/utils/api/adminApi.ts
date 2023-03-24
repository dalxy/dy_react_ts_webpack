import axios from "./request";
import md5 from "md5";

export const $register = (data: any) =>
    axios.post("/reactAdmin/register", data);

export const $login = async (params: any) => {
    params.password = md5(md5(params.password).split("").reverse().join(""));
    let { data: res } = await axios.post("/reactAdmin/login", { params });
    if (res.code === 0) {
        sessionStorage.setItem("token", res.token);
    }
    return res;
};

export const $addCategoriesAsync = (data: any) =>
    axios.post("/categroy/addCategroy", data);
