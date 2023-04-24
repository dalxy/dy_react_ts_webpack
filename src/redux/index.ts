import { createSlice, configureStore } from "@reduxjs/toolkit";

import { adminProps } from "@/typing/rootState";

const admin: adminProps = {
    userId: "",
    userName: "",
    photo: "",
    mobile: 0,
    authorityId: 0,
};
// 创建子模块
export const adminSlice = createSlice({
    name: "adminSlice",
    initialState: { admin },
    // 整合器
    reducers: {
        setAdmin(state, action) {
            console.log(action);
            state.admin = action.payload;
        },
    },
});

// 创建store，合并所有子模块
const store = configureStore({
    reducer: {
        adminSlice: adminSlice.reducer,
    },
});

export default store;
