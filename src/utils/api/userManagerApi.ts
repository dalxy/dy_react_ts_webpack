import axios from "./request";

export const $UserTable = async (data: any) => {
    const res = await axios.post("/reactAdmin/getUserList", data);
    return res;
};

interface UserInfo {
    uid: number;
    userId: string;
    password: string;
    userName: string;
    mobile: number;
    photo: string;
    authorityId: number;
}

export const $AddUser = async (data?: UserInfo) => {
    const res = await axios.post("/reactAdmin/addUser", data);
    return res;
};

export const $EditUser = async (params?: any) => {
    const res = await axios.post("/reactAdmin/editUser", params);
    return res;
};

export const $DelUser = async (params?: any) => {
    const res = await axios.post("/reactAdmin/delUser", params);
    return res;
};

export const $GetUser = async (params?: any) => {
    const res = await axios.post("/reactAdmin/getUser", params);
    return res;
};

// 修改密码
export const $ResetPwd = async (params?: any) => {
    const res = await axios.post("/reactAdmin/resetPwd", params);
    return res;
};
