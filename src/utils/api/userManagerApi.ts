import axios from "./request";

export const $userTable = async (data?: any) => {
    const res = await axios.post("/reactAdmin/userTable", data);
    // console.log(res);
    return res;
};
