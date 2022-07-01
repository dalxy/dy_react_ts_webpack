/*
import { createStore } from "redux";
import todoApp from "./reducers";
let store = createStore(todoApp);

export default store;
*/
import { configureStore } from "@reduxjs/toolkit";
import todoApp from "./reducers";

function a() {
    console.log(1);
}

const store = configureStore({
    reducer: {
        //参数为一个函数
        todoApp,
    },
});

export default store;
