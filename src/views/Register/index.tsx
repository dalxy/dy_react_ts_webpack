import React from "react";
import { AutoComplete, Button, Form, Input, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';

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

  onReset = () => {
    this.formRef.current!.resetFields();
  };

  onFill = () => {
    this.formRef.current!.setFieldsValue({
      username: 'admin',
      password: 'admin',
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
            Submit
          </Button>
          <Button htmlType="button" onClick={this.onReset}>
            Reset
          </Button>
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