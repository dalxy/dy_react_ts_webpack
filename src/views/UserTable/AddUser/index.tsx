import React, { useEffect, useState } from "react"
import { Button, Drawer, Form, Input, Select } from "antd";
import { $AddUser, $EditUser, $GetUser } from "@/utils/api/userManagerApi";
import { $AuthorityList } from "@/utils/api/authority"; 
import notificate from '@/components/Notification'
import UploadImg from '@/components/UploadImg'

interface AddUserProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    loadUserTable: () => void;
    uid: number;
    setUid: (uid: number) => void
}

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

const AddUser: React.FC<AddUserProps> = ({open, setOpen, loadUserTable, uid, setUid}) => {
    let [form] = Form.useForm()
    const [authorityList, setAuthorityTable] = useState()
    const onFinish = async (values: any) => {
        if(uid){
            values.uid = uid
            let {data: res} = await $EditUser(values)
            if(res.code === 0){
                notificate({type: 'success', message: res.message})
                loadUserTable()
            }else{
                notificate({type: 'error', message: res.message})
            }
        }else{
            let {data: res} = await $AddUser({
                uid: uid,
                userName: values.userName, 
                userId: values.userId, 
                password: values.password, 
                mobile: values.mobile,
                photo: values.photo,
                authorityId: values.authorityId
            })
            if(res.code === 0){
                notificate({type: 'success', message: res.message})
                loadUserTable()
            }else{
                notificate({type: 'error', message: res.message})
            }
        }
        onClose()
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const loadAuthorityList = async () => {
        $AuthorityList().then((res)=>{
            console.log(res.data);
            
            let { authorityList } = res.data
            authorityList = authorityList.map((r: any)=>{
            return {
                    value: r.authorityId,
                    label: r.authorityName
                }
            })
            setAuthorityTable(authorityList)
        })
    }
    const onClose = () => {
        setOpen(false);
        setUid(0)
        clearForm()
    };
    const clearForm = () => {
        form.resetFields();
    };
    useEffect(()=>{
        loadAuthorityList()
        console.log(uid);
        if(uid !== 0){
            $GetUser({uid}).then(res => {
                console.log('GetUserInfo')
                let { userList } = res.data
                console.log(userList);
                
                form.setFieldsValue(userList[0])
            })
        }
    }, [uid])
    return (
        <>
            <Drawer
                title={ uid ? "修改账户":"添加账户" }
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
                        label="账号"
                        name="userId"
                        rules={[{ required: true, message: 'Please input your userId!' }]}
                        hidden= { uid ? true : false }
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="名称"
                        name="userName"
                        rules={[{ required: true, message: 'Please input your userName!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        hidden= { uid ? true : false }
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="手机号"
                        name="mobile"
                        rules={[{ required: true, message: 'Please input your 手机号!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="头像"
                        name="photo"
                        rules={[{ required: true, message: '请选择头像' }]}
                    >
                        <UploadImg form ={ form } />
                    </Form.Item>
                    <Form.Item
                        label="角色"
                        name="authorityId"
                        rules={[{ required: true, message: 'Please input your authorityId!' }]}
                    >
                        <Select
                            onChange={handleChange}
                            options={authorityList}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            { uid ? "修改":"添加" }
                        </Button>
                        <Button style={{marginLeft: '10px'}} type="primary" htmlType="button" onClick={clearForm}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}

export default AddUser