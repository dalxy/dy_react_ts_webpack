import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';

import './index.less'
import  { $login } from '@/utils/api/adminApi'
import { LoginParams } from "@/typing/auth";
import notificate from '@/components/Notification'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// function Login() {
const Login: React.FC = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      navigate('/layout')
    }
  }, [])
  const formRef = React.createRef<FormInstance>();
  const onFinish = async (values: LoginParams) => {
    values.userid = '1492379424'
    const res= await $login(values);
    console.log(res)
    if(res.code === 0){
      // window.location.href = '/home'
      notificate('success', res.message, res.description)
      navigate('/layout')
    }else{
      notificate('error', res.message, res.description)
    }
  };
  // 自动填充用户名和密码
  const onFill = () => {
    formRef.current!.setFieldsValue({
      username: 'admin',
      password: 123456,
    });
  };
  const handleRemoveAttr = (event: any) => {
    event.target.removeAttribute('readonly')
  }

  return (
    <div className="login">
      <div className="title">人类观察所</div>
      <Form {...layout} ref={formRef} name="control-ref" onFinish={onFinish} className="form">
        <Form.Item label="Username" name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="Password" name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password
          readOnly
          placeholder="请输入密码" 
          onFocus={ handleRemoveAttr }/>
        </Form.Item>
        <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
        <Link to = '/register'>
          <Button htmlType="button">
          注册
          </Button>
        </Link>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
      </Form>
    </div>
  );
}

export default Login;