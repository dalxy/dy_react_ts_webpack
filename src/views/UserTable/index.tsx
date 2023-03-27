import React, { useEffect, useState } from "react";
import { Button, Checkbox, Drawer, Form, Input, Popconfirm, Table } from "antd";
import { $UserTable, $DelUser } from "@/utils/api/userManagerApi";
import './index.less'
import AddUser from './AddUser'
import type { ColumnsType } from 'antd/es/table';
import { DataType } from '@/typing/userTable'
import notificate from "@/components/Notification";

const UsersTable: React.FC = () => {
  const [userTable, setUserTable] = useState([])
  const [open, setOpen] = useState(false);
  const [uid, setUid] = useState(0);
  const columns: ColumnsType<DataType> = [
    {
      title: '编号',
      dataIndex: 'uid',
    },
    {
      title: '用户id',
      dataIndex: 'userId',
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '姓名',
      dataIndex: 'userName',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '照片',
      dataIndex: 'photo',
    },
    {
      title: '角色',
      dataIndex: 'authorityId',
    },
    {
      title: '操作',
      key: 'tags',
      render: (data) => (
        <>
          <Button
            size="small"
            style= {{ borderColor: 'orange', color: 'orange' }}
            onClick={
              () => { edit(data) }}
            >编辑</Button>
          <Popconfirm
            title="提示"
            description="确定删除吗？"
            onConfirm={() => del(data)}
            okText="确定"
            cancelText="取消"
          >
            <Button style={{marginLeft: '5px'}} danger size="small">
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  const del = async (data: any) => {
    let {data: res} = await $DelUser({uid: data.uid})
    if(res.code === 0){
      notificate({type: 'success', message: res.message})
      loadUserTable()
    }else{
      notificate({type: 'error', message: res.message})
    }
  }
  
  const edit = async (data: any) => {
    setOpen(true)
    setUid(data.uid)
  }

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onClose = () => {
    setOpen(false);
  };
  const loadUserTable= async () => {
    $UserTable({pageIndex: 1, pageSize: 10}).then((res)=>{
      let { userList } = res.data
      console.log(userList)
      userList = userList.map((r: any)=>{
        return {
          ...r,
          key: r.uid
        }
      })
      setUserTable(userList)
    })
  }
  useEffect(()=>{
    loadUserTable()
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
      {/* <Drawer title="添加角色" width={500} placement="right" onClose={onClose} open={open}>
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
      </Drawer> */}
      <AddUser open={open} setOpen={setOpen} loadUserTable={loadUserTable} uid={uid} setUid={setUid}/>

    </> 
  )
}
export default UsersTable;