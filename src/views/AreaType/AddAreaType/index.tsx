import React, { useEffect } from "react"
import { Button, Drawer, Form, Input } from "antd";
import { $AddAreaType, $EditAreaType } from "@/utils/api/areaApi";
import { $GetUserAuthority } from "@/utils/api/authority";
import notificate from '@/components/Notification'

interface AddAreaTypeProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    loadAreaTypeList: () => void;
    areaTypeId: number;
    setAreaTypeId: (areaTypeId: number) => void
}

const AddAreaType: React.FC<AddAreaTypeProps> = ({open, setOpen, loadAreaTypeList, areaTypeId, setAreaTypeId}) => {
    let [form] = Form.useForm()
    useEffect(()=>{
        if(areaTypeId !== 0){
            $GetUserAuthority({areaTypeId}).then(res => {
                let { userList } = res.data
                console.log(userList)
                form.setFieldsValue(userList[0])
            })
        }
    }, [areaTypeId])
    const onFinish = async (values: any) => {
        if(areaTypeId){
            let {data: res} = await $EditAreaType({areaTypeId: areaTypeId,areaTypeName: values.areaTypeName})
            if(res.code === 0){
                notificate({type: 'success', message: res.message})
                loadAreaTypeList()
            }else{
                notificate({type: 'error', message: res.message})
            }
        }else{
            let {data: res} = await $AddAreaType({areaTypeId: areaTypeId,authorityName: values.authorityName})
            if(res.code === 0){
                notificate({type: 'success', message: res.message})
                loadAreaTypeList()
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
        setAreaTypeId(0)
        clearForm()
    };
    const clearForm = () => {
        form.resetFields();
    };
    return (
        <>
            <Drawer
                title={ areaTypeId ? "修改角色":"添加角色" }
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
                        name="areaTypeId"
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
                            { areaTypeId ? "修改":"添加" }
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

export default AddAreaType