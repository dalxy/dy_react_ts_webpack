import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
// import styled from "styled-components";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import {
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
    children?: MenuItem[],
    link?: React.ReactNode
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        link
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem("Option 1", "1", <PieChartOutlined />,),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem("User", "sub1", <UserOutlined />, [
        getItem("Tom", "3"),
        getItem("Bill", "4"),
        getItem("Alex", "5"),
    ]),
    getItem("Team", "sub2", <TeamOutlined />, [
        getItem("Team 1", "6"),
        getItem("Team 2", "8"),
    ]),
    getItem("Files", "9", <FileOutlined />),
];

const SiderBar: React.FC = () => {
    const [ collapsed, setCollapsed ] = useState(false)
    
    const { token: { colorBgContainer } } = theme.useToken()
    return (
        <Layout style={{minHeight:'100vh'}}>
            <Sider collapsed={collapsed} collapsible onCollapse={(value)=>setCollapsed(value)}>
                <div style={{color: "white", height: 32, margin: 16, display: "flex", alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,.2)'}}>人类观察所</div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                <Breadcrumb
                    style={{ margin: '16px 0' }} 
                    items={[
                        {title: 'User'},
                        {title: <a href="/">Bill</a>}
                    ]}>
                </Breadcrumb>
                <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                    Bill is a cat.
                </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
};

export default SiderBar;
