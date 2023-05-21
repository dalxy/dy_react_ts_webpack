import axios from "./request";

export const $TotalPriceList = async (params?: any) => {
    const res = await axios.get("/reactAdmin/totalPrice");
    return res;
};
