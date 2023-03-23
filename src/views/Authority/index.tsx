import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { $AuthorityList } from "@/utils/api/authority";
import './index.less'
import AddAuthority from "./components/AddAuthority";

const columns = [
  {
    title: '用户id',
    dataIndex: 'uid',
    key: 'userId'
  },
  {
    title: '用户名称',
    dataIndex: 'userName',
    key: 'userName'
  }
];
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