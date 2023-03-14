import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.less'

const { Header, Sider, Content } = Layout;

const LayoutPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className='layout'>
      <Sider className='sider' trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">{ collapsed ? '人' : '人类观察所' }</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout className='right'>
        <Header className='header'>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content className='content'>
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;