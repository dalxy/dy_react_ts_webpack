import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table  } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { $AuthorityList, $DelAuthority } from "@/utils/api/authority";
import './index.less'
import AddAuthority from "./components/AddAuthority";
import notificate from "@/components/Notification";

interface DataType {
  dataIndex: string;
  title: string;
  tags?: string[];
}

const AuthorityTable: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [authorityList, setAuthorityTable] = useState()
  const [uid, setUid] = useState(0);

  const columns:ColumnsType<DataType> = [
    {
      title: '用户id',
      dataIndex: 'uid',
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
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
    let {data: res} = await $DelAuthority({uid: data.uid})
    if(res.code === 0){
      notificate({type: 'success', message: res.message})
      loadAuthorityList()
    }else{
      notificate({type: 'error', message: res.message})
    }
  }

  const edit = async (data: any) => {
    setOpen(true)
    setUid(data.uid)
  }
  
  const loadAuthorityList = async () => {
    $AuthorityList().then((res)=>{
      let { authorityList } = res.data
      authorityList = authorityList.map((r: any)=>{
        return {
          ...r,
          key: r.uid
        }
      })
      setAuthorityTable(authorityList)
    })
  }

  useEffect(()=>{
    loadAuthorityList()
  }, [])

  return(
    <>
      <div className="search">
        <Button size="small"
          onClick={
            () => { 
              setOpen(true);
              // setUid(0) 
            }
          }
        >
          添加
        </Button>
      </div>
      <Table size="small" dataSource={authorityList} columns={columns} />
      <AddAuthority open={open} setOpen={setOpen} loadAuthorityList={loadAuthorityList} uid={uid} setUid={setUid}/>
    </> 
  )
}
export default AuthorityTable;