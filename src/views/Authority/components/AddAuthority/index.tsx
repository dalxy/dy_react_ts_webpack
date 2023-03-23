import React, { useState } from "react"
import { Button, Drawer, Form, Input } from "antd";
import { $AddUser } from "@/utils/api/authority";
import notificate from '@/components/Notification'

interface AddAuthorityProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    loadAuthorityList: () => void;
}

const AddAuthority: React.FC<AddAuthorityProps> = ({open, setOpen}) => {
    let [form] = Form.useForm()
    const onFinish = async (values: any) => {
        let {data: res} = await $AddUser({userName: values.userName})
        if(res.code === 0){
            notificate({type: 'success', message: res.message})
        }else{
            notificate({type: 'error', message: res.message})
        }
        clearForm()
        setOpen(false);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onClose = () => {
        setOpen(false);
        clearForm()
    };
    const clearForm = () => {
        console.log(111);
        form.setFieldsValue({userName: ''});
    };
    return (
        <>
            <Drawer title="添加角色" width={500} placement="right" onClose={onClose} open={open}>
                <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={ onFinish }
                onFinishFailed={ onFinishFailed }
                autoComplete="off"
                >
                <Form.Item
                    label="用户名称"
                    name="userName"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                    <Button style={{marginLeft: '10px'}} type="primary" htmlType="button" onClick={clearForm}>
                    Cancel
                    </Button>
                </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}

export default AddAuthority