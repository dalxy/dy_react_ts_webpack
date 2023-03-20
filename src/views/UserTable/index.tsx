import React, { useEffect, useState } from "react";
import { Button, Checkbox, Drawer, Form, Input, Table } from "antd";
import { $userTable } from "@/utils/api/userManagerApi";
import './index.less'

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];
const UsersTable: React.FC = () => {
  const [userTable, setUserTable] = useState()
  const [open, setOpen] = useState(false);
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(()=>{
    $userTable({id: '0'}).then(res=>{
      let { userTable: userTable } = res.data
      console.log(userTable)
      setUserTable(userTable)
    })
  }, [])
  return(
    <>
      <div className="search">
        <Button size="small"
          onClick={()=>{setOpen(true)}}
        >
          添加
        </Button>
      </div>
      <Table size="small" dataSource={userTable} columns={columns} />
      <Drawer title="添加角色" width={500} placement="right" onClose={onClose} open={open}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </> 
  )
}
export default UsersTable;