import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
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
import { Layout, Menu, Modal } from 'antd';
import './index.less'

const { Header, Sider, Content } = Layout;
const navItem: MenuProps['items'] = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: '首页',
  },
  {
    key: 'users',
    icon: <VideoCameraOutlined />,
    label: '用户',
    children: [
      {
        key: 'userTable',
        icon: <VideoCameraOutlined />,
        label: '用户列表',
      },
      {
        key: 'userManager',
        icon: <VideoCameraOutlined />,
        label: '用户管理',
      },
    ]
  },
  {
    key: 'authority',
    icon: <VideoCameraOutlined />,
    label: '权限',
  },
  {
    key: 'rule',
    icon: <UploadOutlined />,
    label: '规则',
  },
  {
    key: 'areaManage',
    icon: <VideoCameraOutlined />,
    label: '区域管理',
    children: [
      {
        key: 'areaType',
        icon: <VideoCameraOutlined />,
        label: '区域类型',
      },
    ]
  },
]
const items: MenuProps['items'] = [
  {
    label: '新闻',
    key: 'news',
    icon: <HomeOutlined />,
  },
  {
    label: '关于',
    // key: 'news',
    key: 'about',
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
  let routeKey:any = sessionStorage.getItem('routeKey')
  if(!routeKey){
    routeKey = 'home'
  }
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState(routeKey);
  const navigate = useNavigate()
  const onClick: MenuProps['onClick'] = (e) => {
    if(routeKey !== 'exit'){
      sessionStorage.setItem('routeKey', e.key)
    }
    setCurrent(e.key);
    if(e.key === 'exit'){
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
        },
      })
    }else{
      navigate(`/layout/${e.key}`)
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
          selectedKeys={[current]}
          items={navItem}
          onClick={onClick}
        />
      </Sider>
      <Layout className='right'>
        <Header className='header'>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <Menu theme='dark' onClick={onClick} className='menu headerMenu' selectedKeys={[current]} mode="horizontal" items={items} />;
        </Header>
        <Content className='content'>
          {/* Content */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;