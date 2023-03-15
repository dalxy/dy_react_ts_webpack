import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  ExclamationCircleFilled 
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, message, Button, Modal, Space } from 'antd';
import './index.less'

const { Header, Sider, Content } = Layout;
const navItem: MenuProps['items'] = [
  {
    key: '1',
    icon: <HomeOutlined />,
    label: '首页',
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: '账户管理',
    children: [
      {
        key: '2-1',
        icon: <VideoCameraOutlined />,
        label: '账户管理1',
      },
      {
        key: '2-2',
        icon: <VideoCameraOutlined />,
        label: '账户管理2',
      },
    ]
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: '客户管理',
  },
]
const items: MenuProps['items'] = [
  {
    label: '首页',
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: '新闻',
    key: 'news',
    icon: <MailOutlined />,
  },
  {
    label: '邮件',
    key: 'mail',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        通知
      </a>
    ),
    key: 'noticate',
  },
  {
    label: '个人中心',
    key: 'user',
    icon: <UserOutlined />,
    children: [
      {
        label: '个人信息',
        key: 'userInfo',
        icon: <SettingOutlined />,
      },
      {
        label: '修改密码',
        key: 'updatePwd',
        icon: <SettingOutlined />,
      },
      {
        label: '退出登录',
        key: 'exit',
        icon: <SettingOutlined />,
      },
    ],
  },
];
const { confirm } = Modal;

const LayoutPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('home');
  const navigate = useNavigate()
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    switch (e.key){
      case 'exit':
        confirm({
          title: '确定退出系统吗？',
          icon: <ExclamationCircleFilled />,
          content: 'Some descriptions',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            sessionStorage.clear()
            localStorage.clear()
            navigate('/')
          },
          onCancel() {
            console.log('Cancel');
          },
        });
        break
    }
  };
  return (
    <Layout className='layout'>
      <Sider className='sider' trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">{ collapsed ? '人' : '人类观察所' }</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={navItem}
        />
      </Sider>
      <Layout className='right'>
        <Header className='header'>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <Menu theme='dark' onClick={onClick} className='menu' selectedKeys={[current]} mode="horizontal" items={items} />;
        </Header>
        <Content className='content'>
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;