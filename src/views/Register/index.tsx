import React from "react";
import { Button, Form, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { Link } from "react-router-dom";

import './index.less'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class Register extends React.Component {
  formRef = React.createRef<FormInstance>();

  onFinish = (values: any) => {
    console.log(values);
  };

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
      <div>
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
            注册
          </Button>
          <Link to = '/login'>
            <Button htmlType="button" 
            >
              登陆
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

export default Register;

<Form.Item
  label="Username"
  name="username"
  rules={[{ required: true, message: 'Please input your username!' }]}
>
  <Input />
</Form.Item>