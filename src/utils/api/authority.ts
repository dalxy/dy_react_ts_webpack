import axios from "./request";

export const $AuthorityList = async (data?: any) => {
    const res = await axios.post("/reactAdmin/authorityList", data);
    return res;
};

export const $AddAuthority = async (data?: any) => {
    const res = await axios.post("/reactAdmin/addAuthority", data);
    return res;
};

export const $DelAuthority = async (params?: any) => {
    const res = await axios.post("/reactAdmin/delAuthority", params);
    return res;
};

export const $EditAuthority = async (params?: any) => {
    const res = await axios.post("/reactAdmin/editAuthority", params);
    return res;
};

export const $GetUserAuthority = async (params?: any) => {
    const res = await axios.post("/reactAdmin/getUserAuthority", params);
    return res;
};
