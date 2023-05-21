import axios from "./request";

export const $AreaTypeList = async (data?: any) => {
    const res = await axios.post("/reactAdmin/areaType/list", data);
    return res;
};

export const $AddAreaType = async (data?: any) => {
    const res = await axios.post("/reactAdmin/addAreaType", data);
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

export const $GetAreaList = async (params?: any) => {
    const res = await axios.post("/reactAdmin/getAreaList", params);
    return res;
};

export const $AddArea = async (data?: any) => {
    const res = await axios.post("/reactAdmin/addArea", data);
    return res;
};

export const $GetArea = async (params?: any) => {
    const res = await axios.post("/reactAdmin/getArea", params);
    return res;
};

export const $EditArea = async (params?: any) => {
    const res = await axios.post("/reactAdmin/editArea", params);
    return res;
};

export const $DelArea = async (params?: any) => {
    const res = await axios.post("/reactAdmin/delArea", params);
    return res;
};
