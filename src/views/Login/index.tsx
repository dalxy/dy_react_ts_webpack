import React from "react";
import { Button, Form, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { Link } from "react-router-dom";

import './index.less'
import  { login } from '@/utils/api'
import { UserInfo } from "@/typing/auth";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class Login extends React.Component {
  formRef = React.createRef<FormInstance>();

  onFinish = async (values: any) => {
    // console.log(values);
    const {data:res} = await login(values);
    if(res.code === 0){
      console.log(res)
      window.location.href = '/home'
    }
  };
  // 自动填充用户名和密码
  onFill = () => {
    this.formRef.current!.setFieldsValue({
      username: 'admin',
      password: 123456,
    });
  };

  handleRemoveAttr = (event: any) => {
    event.target.removeAttribute('readonly')
  }
  render() {
    return (
      <div className="login">
        <div className="title">人类观察所</div>
        <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish} className="form">
          <Form.Item label="Username" name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item label="Password" name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password
            readOnly
            placeholder="请输入密码" 
            onFocus={ this.handleRemoveAttr }/>
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
          <Button type="link" htmlType="button" onClick={this.onFill}>
            Fill form
          </Button>
        </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Login;

<Form.Item
  className="form"
  label="Username"
  name="username"
  rules={[{ required: true, message: 'Please input your username!' }]}
>
  <Input />
</Form.Item>