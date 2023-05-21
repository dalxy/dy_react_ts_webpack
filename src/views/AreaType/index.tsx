import React, { useState, useEffect } from "react";
import { $AreaTypeList, $DelAreaType } from "@/utils/api/areaApi";
import { Button, Pagination , Popconfirm, Select, Table } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { DataType } from '@/typing/userTable'
import AddAreaType from './AddAreaType'
import notificate from "@/components/Notification";
const AreaType: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [areaTypeId, setAreaTypeId] = useState(0);
    const [areaTypeList, setAreaTypeList] = useState([]);

    const columns: ColumnsType<DataType> = [
        {
            title: '编号',
            dataIndex: 'areaTypeId',
        },
        {
            title: '姓名',
            dataIndex: 'areaTypeName',
            width: '150px'
        },
        {
            title: '价格',
            dataIndex: 'areaTypePrice',
        },
        {
            title: '数量',
            dataIndex: 'areaTypeNum',
        },
        {
            title: '信息',
            dataIndex: 'areaTypeMessage',
            width: '200px'
        },
        {
            title: '操作',
            key: 'tags',
            render: (data) => (
            <>
                <Button
                size="small"
                style= {{ borderColor: 'orange', color: 'orange' }}
                onClick={
                    () => { edit(data) }}
                >编辑</Button>
                <Popconfirm
                title="提示"
                description="确定删除吗？"
                onConfirm={() => del(data)}
                okText="确定"
                cancelText="取消"
                >
                <Button style={{marginLeft: '5px'}} danger size="small">
                    删除
                </Button>
                </Popconfirm>
            </>
            ),
        },
    ];
    const edit = async (data: any) => {
        setOpen(true)
        setAreaTypeId(data.areaTypeId)
    }
    const del = async (data: any) => {
        let {data: res} = await $DelAreaType({areaTypeId: data.areaTypeId})
        if(res.code === 0){
            notificate({type: 'success', message: res.message})
            loadAreaTypeList()
        }else{
            notificate({type: 'error', message: res.message})
        }
    }

    const loadAreaTypeList = async () => {
        $AreaTypeList().then((res)=>{
            let { total, areaTypeList } = res.data
            // console.log(res.data)
            areaTypeList = areaTypeList.map((r: any)=>{
                return {
                    ...r,
                    key: r.areaTypeId,
                    areaTypeName: r.areaTypeName
                }
            })
            console.log(areaTypeList);
            
            setAreaTypeList(areaTypeList)
        })
    }

    useEffect(() => {
        loadAreaTypeList()
    }, []);

    return(
        <>
            <div className="search" style={{marginBottom: '5px'}}>
                <Button size="small"
                    onClick={
                        () => { 
                            setOpen(true);
                            // setAuthorityId(0) 
                        }
                    }
                >
                    添加
                </Button>
            </div>
            <Table size="small" dataSource={areaTypeList} columns={columns} pagination={false} />
            <Pagination size="small"
                total={0}
                defaultCurrent={0} 
                current={0} 
                hideOnSinglePage={false} 
                onChange = {(pageIndex) => {
                    // setPageIndex(pageIndex)
                }}
                pageSize = {10}
            />
            <AddAreaType open={open} setOpen={setOpen} loadAreaTypeList={loadAreaTypeList} areaTypeId={areaTypeId} setAreaTypeId={setAreaTypeId}/>
        </>
    )
}

export default AreaType; 