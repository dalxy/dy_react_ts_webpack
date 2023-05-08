import React from "react";
import { useSelector } from "react-redux";
import { adminProps } from "@/typing/rootState";
import { baseURL } from "@/config";

const UserInfo: React.FC = () => {
    const loginAdmin = useSelector((state: adminProps) => state.adminSlice.admin);
    console.log(loginAdmin);
    return(
        <>
            <div className="userInfo" style={{display: 'flex'}}>
                <img src={ baseURL + "headSculpture/" + loginAdmin.photo } style={{width:'200px'}}/>
                <div className="desc" style={{marginLeft: '10px',fontSize: '20px'}}>
                    <p>账号：{loginAdmin.userId}</p>
                    <p>姓名：{loginAdmin.userName}</p>
                    <p>电话：{loginAdmin.mobile}</p>
                    <p>角色：{loginAdmin.authorityName}</p>
                </div>
            </div>
        </>
    )
}
export default UserInfo; 