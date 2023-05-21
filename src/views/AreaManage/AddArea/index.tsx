import React, { useEffect, useState } from "react"
import { Button, Drawer, Form, Input, Select } from "antd";
// import { $AddUser, $EditUser, $GetUser } from "@/utils/api/userManagerApi";
// import { $AuthorityList } from "@/utils/api/authority"; 
import { $AddArea, $AreaTypeList, $EditArea, $GetArea } from "@/utils/api/areaApi";
import notificate from '@/components/Notification'
import UploadImg from '@/components/UploadImg'

interface AddUserProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    loadAreaList: () => void;
    areaId: number;
    setAreaId: (areaId: number) => void
}

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

const AddArea: React.FC<AddUserProps> = ({open, setOpen, loadAreaList, areaId, setAreaId}) => {
    let [form] = Form.useForm()
    const [areaTypeId, setAreaTypeId] = useState(0)
    const [areaStatus, setAreaStatus] = useState(0)
    const [areaStatusList, setAreaStatusList] = useState([{key:0,value:1},{key:1,value:2}])
    const [areaTypeList, setAreaTypeList] = useState([])

    const onFinish = async (values: any) => {
        console.log(1);
        
        if(areaId){
            values.areaId = areaId
            let {data: res} = await $EditArea(values)
            if(res.code === 0){
                notificate({type: 'success', message: res.message})
                loadAreaList()
            }else{
                notificate({type: 'error', message: res.message})
            }
        }else{
            let {data: res} = await $AddArea({
                areaTypeId: values.areaTypeId,
                areaTypeName: values.areaTypeName, 
                areaPrice: values.areaPrice, 
                areaNum: values.areaNum,
                status: values.status
            })
            if(res.code === 0){
                notificate({type: 'success', message: res.message})
                loadAreaList()
            }else{
                notificate({type: 'error', message: res.message})
            }
        }
        onClose()
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const loadAreaTypeList = async () => {
        $AreaTypeList().then((res)=>{
            console.log(res.data);
            
            let { areaTypeList } = res.data
            areaTypeList = areaTypeList.map((r: any)=>{
                return {
                    value: r.areaTypeId,
                    label: r.areaTypeName,
                    key: r.areaTypeId,
                }
            })
            setAreaTypeList(areaTypeList)
        })
    }
    const onClose = () => {
        setOpen(false);
        setAreaId(0)
        clearForm()
    };
    const clearForm = () => {
        form.resetFields();
    };
    useEffect(()=>{
        loadAreaTypeList()
        console.log(areaId);
        if(areaId !== 0){
            $GetArea({areaId}).then(res => {
                console.log('GetUserInfo')
                let { areaInfo } = res.data
                console.log(areaInfo);
                
                form.setFieldsValue(areaInfo[0])
            })
        }
    }, [areaId])
    return (
        <>
            <Drawer
                title={ areaId ? "修改账户":"添加账户" }
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
                    // initialValues={{ remember: true }}
                    onFinish={ onFinish }
                    onFinishFailed={ onFinishFailed }
                    autoComplete="off"
                >
                    <Form.Item
                        label="编号"
                        name="areaId"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="类型"
                        name="areaTypeId"
                        rules={[{ required: true, message: 'Please input your userId!' }]}
                        hidden= { areaId ? true : false }
                    >
                        <Select
                            onChange={(value)=>{setAreaTypeId(Number(value))}}
                            options={areaTypeList}
                            style = {{width: '200px'}}
                        />
                    </Form.Item>
                    <Form.Item
                        label="名称"
                        name="areaTypeName"
                        rules={[{ required: true, message: 'Please input your userId!' }]}

                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="价格"
                        name="areaPrice"
                        rules={[{ required: true, message: 'Please input your userName!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="数量"
                        name="areaNum"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="状态"
                        name="status"
                        rules={[{ required: true, message: 'Please input your 手机号!' }]}
                    >
                        <Select
                            onChange={(value)=>{setAreaStatus(Number(value))}}
                            options={areaStatusList}
                            style = {{width: '200px'}}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            { areaId ? "修改":"添加" }
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

export default AddArea