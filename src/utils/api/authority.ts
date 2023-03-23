import axios from "./request";

export const $AuthorityList = async (data?: any) => {
    const res = await axios.post("/reactAdmin/authorityList", data);
    return res;
};

export const $AddUser = async (data?: any) => {
    const res = await axios.post("/reactAdmin/addUser", data);
    console.log(res);
    return res;
};
