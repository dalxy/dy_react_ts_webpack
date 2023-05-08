import React, {useEffect} from "react";
import { Button, Form, Input } from "antd";
import { adminProps } from "@/typing/rootState";
import { useSelector } from "react-redux";
import { $ResetPwd } from "@/utils/api/userManagerApi";

const UpdatePwd: React.FC = () => {

    const loginAdmin = useSelector((state: adminProps) => state.adminSlice.admin);    const [form] = Form.useForm()
    // console.log(loginAdmin);
    const onFinish = async (values: any) => {
        console.log(values);
        const res= await $ResetPwd(values);
        
        let {data} = res
        console.log(data);
        // if(res.code === 0){
        //   sessionStorage.setItem('userId', values.userId)
        //   let userInfo = await $GetUser({userid: values.userId})
        //   // 将当前登录账户信息存储到redux
        //   dispatch(setAdmin(userInfo.data.userList[0]))
        //   notificate({type: 'success', message: res.message})
        //   navigate('/layout/home')
        // }else{
        //   notificate({type: 'error', message: res.message})
        // }
    };
    const onClose = () => {
        clearForm()
    };
    const clearForm = () => {
        form.resetFields();
    };
    useEffect(()=>{
        form.setFieldValue('userId', loginAdmin.userId)
    },[loginAdmin.userId])
    return(
        <>
            <Form
                form={form}
                name="basic"
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={ onFinish }
                autoComplete="off"
            >
                <Form.Item
                        label="用户编号"
                        name="userId"
                        hidden
                    >
                        <Input />
                    </Form.Item>
                <Form.Item
                    label="原始密码"
                    name="oldPwd"
                    rules={[{ required: true, message: 'Please input your oldPwd!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="最新密码"
                    name="newPwd"
                    rules={[{ required: true, message: 'Please input your newPwd!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="确认密码"
                    name="isPwd"
                    dependencies={['newPwd']}
                    rules={[{ required: true, message: 'Please input your isPwd!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('newPwd') === value) {
                        return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        修改
                    </Button>
                    <Button style={{marginLeft: '10px'}} type="primary" htmlType="button" onClick={onClose}>
                        取消
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default UpdatePwd; 