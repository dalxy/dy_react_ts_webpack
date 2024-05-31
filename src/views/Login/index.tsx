import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useDispatch } from "react-redux";

import './index.less'
import  { $login } from '@/utils/api/adminApi'
import { $GetUser } from "@/utils/api/userManagerApi";
import { LoginParams } from "@/typing/auth";
import notificate from '@/components/Notification'
import { adminSlice } from "@/redux";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 24 },
};

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const  { setAdmin } = adminSlice.actions
  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      navigate('/layout/home')
    }
  }, [])
  const formRef = React.createRef<FormInstance>();
  const onFinish = async (values: LoginParams) => {
    // console.log(values);
    const res= await $login(values);
    if(res.code === 0){
      sessionStorage.setItem('userId', values.userId)
      let userInfo = await $GetUser({userid: values.userId})
      // 将当前登录账户信息存储到redux
      dispatch(setAdmin(userInfo.data.userList[0]))
      notificate({type: 'success', message: res.message})
      navigate('/layout/home')
    }else{
      notificate({type: 'error', message: res.message})
    }
  };
  // 自动填充用户名和密码
  const onFill = () => {
    formRef.current!.setFieldsValue({
      userId: 'admin',
      password: 'admin',
    });
  };
  const handleRemoveAttr = (event: any) => {
    event.target.removeAttribute('readonly')
  }

  return (
    <div className="login">
      <div className="loginBox">
        <div className="title">人类观察所</div>
        <Form {...layout} ref={formRef} style={{width: '100%'}} name="control-ref" onFinish={onFinish}>
          <Form.Item name="userId" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input placeholder="请输入用户名"  />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password
              readOnly
              placeholder="请输入密码" 
              onFocus={ handleRemoveAttr }/>
          </Form.Item>
          <Form.Item >
            {/* {...tailLayout} */}
            <div className="btns_box">
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
            </div>
        </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;