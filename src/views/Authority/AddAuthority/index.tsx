import React, { useEffect } from "react"
import { Button, Drawer, Form, Input } from "antd";
import { $AddAuthority, $EditAuthority } from "@/utils/api/authority";
import { $GetUserAuthority } from "@/utils/api/authority";
import notificate from '@/components/Notification'

interface AddAuthorityProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    loadAuthorityList: () => void;
    authorityId: number;
    setAuthorityId: (authorityId: number) => void
}

const AddAuthority: React.FC<AddAuthorityProps> = ({open, setOpen, loadAuthorityList, authorityId, setAuthorityId}) => {
    let [form] = Form.useForm()
    useEffect(()=>{
        console.log(authorityId);
        if(authorityId !== 0){
            $GetUserAuthority({authorityId}).then(res => {
                let { userList } = res.data
                console.log(userList)
                form.setFieldsValue(userList[0])
            })
        }
    }, [authorityId])
    const onFinish = async (values: any) => {
        if(authorityId){
            let {data: res} = await $EditAuthority({authorityId: authorityId,authorityName: values.authorityName})
            if(res.code === 0){
                notificate({type: 'success', message: res.message})
                loadAuthorityList()
            }else{
                notificate({type: 'error', message: res.message})
            }
        }else{
            let {data: res} = await $AddAuthority({authorityId: authorityId,authorityName: values.authorityName})
            if(res.code === 0){
                notificate({type: 'success', message: res.message})
                loadAuthorityList()
            }else{
                notificate({type: 'error', message: res.message})
            }
        }
        onClose()
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onClose = () => {
        setOpen(false);
        setAuthorityId(0)
        clearForm()
    };
    const clearForm = () => {
        form.resetFields();
    };
    return (
        <>
            <Drawer
                title={ authorityId ? "修改角色":"添加角色" }
                width={500}
                placement="right"
                onClose={onClose}
                open={open}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    // initialValues={{ remember: true }}
                    onFinish={ onFinish }
                    onFinishFailed={ onFinishFailed }
                    autoComplete="off"
                >
                    <Form.Item
                        label="用户编号"
                        name="authorityId"
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="用户名称"
                        name="authorityName"
                        rules={[{ required: true, message: 'Please input your authorityName!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            { authorityId ? "修改":"添加" }
                        </Button>
                        <Button style={{marginLeft: '10px'}} type="primary" htmlType="button" onClick={onClose}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}

export default AddAuthority