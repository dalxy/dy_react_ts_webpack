import axios from "./request";

export const $AreaTypeList = async (data?: any) => {
    const res = await axios.post("/reactAdmin/areaType/list", data);
    return res;
};

export const $AddAreaType = async (data?: any) => {
    const res = await axios.post("/reactAdmin/areaType/list", data);
    return res;
};

export const $DelAreaType = async (params?: any) => {
    const res = await axios.post("/reactAdmin/delAreaType", params);
    return res;
};

export const $EditAreaType = async (params?: any) => {
    const res = await axios.post("/reactAdmin/editAreaType", params);
    return res;
};
