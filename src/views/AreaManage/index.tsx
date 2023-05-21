import React, { useEffect, useState } from "react";
import { Button, Pagination , Popconfirm, Select, Table, Tag } from "antd";
import { $GetAreaList, $AreaTypeList, $DelArea } from "@/utils/api/areaApi";
// import './index.less'
import AddArea from './AddArea'
import type { ColumnsType } from 'antd/es/table';
import { AreaDataType } from '@/typing/userTable'
import notificate from "@/components/Notification";
import { baseURL } from "@/config";

const AreaManage: React.FC = () => {
    const [AreaList, setAreaList] = useState([])
    const [open, setOpen] = useState(false);
    const [areaId, setAreaId] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [count, setCount] = useState(0);
    const [areaTypeId, setAreaTypeId] = useState(0);
    const [areaTypeList, setAreaTypeList] = useState([])
    const [areaStatus, setAreaStatus] = useState([])
    const columns: ColumnsType<AreaDataType> = [
        {
        title: '编号',
        dataIndex: 'areaId',
        },
        {
        title: '类型',
        dataIndex: 'areaTypeId',
        },
        {
        title: '价格',
        dataIndex: 'areaPrice',
        width: '150px'
        },
        {
        title: '数量',
        dataIndex: 'areaNum',
        },
        {
        title: '状态',
        dataIndex: 'status',
        render: (status ) => (
            <>
                {/* return ( */}
                    <Tag color={status ==='1'?'blue':'red'}>
                        {status}
                    </Tag>
                 {/* ); */}
            </>
            )
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

    const del = async (data: any) => {
    let {data: res} = await $DelArea({areaId: data.areaId})
    if(res.code === 0){
        notificate({type: 'success', message: res.message})
        loadAreaList()
    }else{
        notificate({type: 'error', message: res.message})
    }
    }
    
    const edit = async (data: any) => {
        setOpen(true)
        setAreaId(data.areaId)
    }
    const loadAreaTypeList = async () => {
    $AreaTypeList().then((res)=>{
        let { areaTypeList } = res.data
        areaTypeList = areaTypeList.map((r: any)=>{
            return {
                value: r.areaTypeId,
                label: r.areaTypeName,
                key: r.areaTypeId,
            }
        })
        areaTypeList.unshift({value: '0', label: '请选择类型', key: 0, })
        console.log(areaTypeList);
        setAreaTypeList(areaTypeList)
    })
    }
    const loadAreaList= async () => {
        $GetAreaList({areaTypeId: areaTypeId, pageIndex: pageIndex, pageSize: 10}).then((res)=>{
            let { total, areaList } = res.data
            console.log(res.data)
            // console.log(areaTypeList);
            areaList = areaList.map((r: any)=>{
                return {
                    key: r.areaId,
                    areaId: r.areaId,
                    areaName: r.areaName,
                    areaPrice: r.areaPrice,
                    areaNum:r.areaNum,
                    areaMessage: r.areaMessage,
                    status: r.status,
                    areaTypeId: r.areaTypeId,
                }
            })
            console.log(total);
            
            setCount(total)
            setAreaList(areaList)
        })
    }
    useEffect(()=>{
        loadAreaTypeList()
        loadAreaList()
    }, [pageIndex])
    return(
        <>
        <div className="search">
            <span>类型: </span>
            <Select
                onChange={(value)=>{setAreaTypeId(Number(value))}}
                options={areaTypeList}
                defaultValue = { '0' }
                style = {{width: '200px'}}
            />
            <span style={{marginLeft: '20px'}}>类型: </span>
            <Select
                onChange={(value)=>{
                    // setAreaTypeId(Number(value))
                }}
                options={areaStatus}
                defaultValue = { '0' }
                style = {{width: '200px'}}
            />
            <Button type="primary" style={{marginLeft: '5px'}} onClick = {() => {loadAreaList()}}
            >查询</Button>
            <Button size="small"
            style={{marginLeft: '5px'}}
            onClick={()=>{setOpen(true)}}
            >
                添加
            </Button>
        </div>
        <Table size="small" dataSource={AreaList} columns={columns} pagination={false} />
        <Pagination size="small"
            total={count}
            defaultCurrent={pageIndex} 
            current={pageIndex} 
            hideOnSinglePage={false} 
            onChange = {(pageIndex) => {
                setPageIndex(pageIndex)
            }}
            pageSize = {10}
        />
        <AddArea open={open} setOpen={setOpen} loadAreaList={loadAreaList} areaId={areaId} setAreaId={setAreaId}/>
        </> 
    )
}
export default AreaManage;