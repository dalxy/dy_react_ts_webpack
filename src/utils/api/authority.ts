import axios from "./request";

export const $AuthorityList = async (data?: any) => {
    const res = await axios.post("/reactAdmin/authorityList", data);
    return res;
};

export const $AddUser = async (data?: any) => {
    const res = await axios.post("/reactAdmin/addUser", data);
    return res;
};

export const $DelUser = async (params?: any) => {
    const res = await axios.post("/reactAdmin/delUser", params);
    return res;
};
