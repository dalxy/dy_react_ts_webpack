import React, { useEffect } from "react"
import { Button, Drawer, Form, Input } from "antd";
import { $AddAreaType, $EditAreaType } from "@/utils/api/areaApi";
import { $AreaTypeList } from "@/utils/api/areaApi";
import notificate from '@/components/Notification'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

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
        console.log(areaTypeId);
        
        if(areaTypeId !== 0){
            $AreaTypeList({areaTypeId}).then(res => {
                let { areaTypeList } = res.data
                form.setFieldsValue(areaTypeList[0])
            })
        }
    }, [areaTypeId])
    const onFinish = async (values: any) => {
        console.log(areaTypeId);
        if(areaTypeId){
            let {data: res} = await $EditAreaType({areaTypeId: areaTypeId,areaTypeName: values.areaTypeName,
                areaTypePrice: values.areaTypePrice,areaTypeNum: values.areaTypeNum,areaTypeMessage: values.areaTypeMessage
            })
            if(res.code === 0){
                notificate({type: 'success', message: res.message})
                loadAreaTypeList()
            }else{
                notificate({type: 'error', message: res.message})
            }
        }else{
            console.log(areaTypeId);
            
            let {data: res} = await $AddAreaType({areaTypeId: areaTypeId,areaTypeName: values.areaTypeName,
                areaTypePrice: values.areaTypePrice,areaTypeNum: values.areaTypeNum,areaTypeMessage: values.areaTypeMessage})
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
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={ onFinish }
                    onFinishFailed={ onFinishFailed }
                    autoComplete="off"
                >
                    <Form.Item
                        label="房屋编号"
                        name="areaTypeId"
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="房型名称"
                        name="areaTypeName"
                        rules={[{ required: true, message: 'Please input your areaTypeName!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="床位数量"
                        name="areaTypeNum"
                        rules={[{ required: true, message: 'Please input your areaTypeName!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="房屋价格"
                        name="areaTypePrice"
                        rules={[{ required: true, message: 'Please input your areaTypeName!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="房屋描述"
                        name="areaTypeMessage"
                        rules={[{ required: true, message: 'Please input your areaTypeName!' }]}
                    >
                        {/* <Input /> */}
                        <ReactQuill className="publish-quill" theme="snow" placeholder="请输入文章内容"/>
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