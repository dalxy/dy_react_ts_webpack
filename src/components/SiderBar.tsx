import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import styled from "styled-components";
// import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Layout, Space } from "antd";
import {
    HomeOutlined,
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";

import type { MenuProps } from "antd"; //import type 是用来协助进行类型检查和声明的，在运行时是完全不存在的
const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    // getItem("Option 1", "1"),
    getItem("Option 1", "1", <HomeOutlined />),
    // getItem("Option 2", "2", <DesktopOutlined />),
    // getItem("User", "sub1", <UserOutlined />, [
    //     getItem("Tom", "3"),
    //     getItem("Bill", "4"),
    //     getItem("Alex", "5"),
    // ]),
    // getItem("Team", "sub2", <TeamOutlined />, [
    //     getItem("Team 1", "6"),
    //     getItem("Team 2", "8"),
    // ]),
    // getItem("Files", "9", <FileOutlined />),
];

const SiderBar = () => {
    // <HomeOutlined />
    return;
};

export default SiderBar;
