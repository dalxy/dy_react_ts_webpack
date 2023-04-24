import React from "react";
import { useSelector } from "react-redux";
import store from '@/redux'
import { adminProps } from "@/typing/rootState";

const UserInfo: React.FC = () => {
    const loginAdmin = useSelector((state: adminProps) => state.adminSlice);
    console.log(loginAdmin.admin);
    return(
        <>
            <div>userinfo</div>
        </>
    )
}
export default UserInfo; 