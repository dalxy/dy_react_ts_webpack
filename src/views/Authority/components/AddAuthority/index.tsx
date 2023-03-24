import React, { useEffect } from "react"
import { Button, Drawer, Form, Input } from "antd";
import { $AddAuthority, $EditAuthority, $GetAuthority } from "@/utils/api/authority";
import notificate from '@/components/Notification'

interface AddAuthorityProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    loadAuthorityList: () => void;
    uid: number;
    setUid: (uid: number) => void
}

const AddAuthority: React.FC<AddAuthorityProps> = ({open, setOpen, loadAuthorityList, uid, setUid}) => {
    let [form] = Form.useForm()
    useEffect(()=>{
        if(uid !== 0){
            $GetAuthority({uid}).then(res => {
                let { userList } = res.data
                form.setFieldsValue(userList[0])
            })
        }
    }, [uid])
    const onFinish = async (values: any) => {
        if(uid){
            let {data: res} = await $EditAuthority({uid: uid,userName: values.userName})
            if(res.code === 0){
                notificate({type: 'success', message: res.message})
                loadAuthorityList()
            }else{
                notificate({type: 'error', message: res.message})
            }
        }else{
            let {data: res} = await $AddAuthority({uid: uid,userName: values.userName})
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
        setUid(0)
        clearForm()
    };
    const clearForm = () => {
        form.setFieldsValue({userName: ''});
    };
    return (
        <>
            <Drawer
                title={ uid ? "修改角色":"添加角色" }
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
                        name="uid"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="用户名称"
                        name="userName"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            { uid ? "修改":"添加" }
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