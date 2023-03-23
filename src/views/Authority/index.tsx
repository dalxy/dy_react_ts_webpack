import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { $AuthorityList, $DelUser } from "@/utils/api/authority";
import './index.less'
import AddAuthority from "./components/AddAuthority";
import notificate from "@/components/Notification";

interface DataType {
  dataIndex: string;
  title: string;
  tags?: string[];
}

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
      <Button danger size="small" onClick={() => del(data)}>
        删除
      </Button>
    ),
  },
];

const del = async (data: any) => {
  let {data: res} = await $DelUser({uid: data.uid})
  console.log(res)
  if(res.code === 0){
    notificate({type: 'success', message: res.message})
}else{
    notificate({type: 'error', message: res.message})
}
}

const AuthorityTable: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [authorityList, setAuthorityTable] = useState()

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
          onClick={()=>{setOpen(true)}}
        >
          添加
        </Button>
      </div>
      <Table size="small" dataSource={authorityList} columns={columns} />
      <AddAuthority open={open} setOpen={setOpen} loadAuthorityList={loadAuthorityList}/>
    </> 
  )
}
export default AuthorityTable;