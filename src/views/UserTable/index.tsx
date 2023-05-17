import React, { useEffect, useState } from "react";
import { Button, Pagination , Popconfirm, Select, Table } from "antd";
import { $UserTable, $DelUser } from "@/utils/api/userManagerApi";
import { $AuthorityList } from "@/utils/api/authority";
import './index.less'
import AddUser from './AddUser'
import type { ColumnsType } from 'antd/es/table';
import { DataType } from '@/typing/userTable'
import notificate from "@/components/Notification";
import { baseURL } from "@/config";

const UsersTable: React.FC = () => {
  const [userTable, setUserTable] = useState([])
  const [open, setOpen] = useState(false);
  const [uid, setUid] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [count, setCount] = useState(0);
  const [authorityId, setAuthorityId] = useState(0);
  const [authorityList, setAuthorityTable] = useState([])
  const columns: ColumnsType<DataType> = [
    {
      title: '编号',
      dataIndex: 'uid',
    },
    {
      title: '账号',
      dataIndex: 'userId',
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      width: '150px'
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '头像',
      dataIndex: 'photo',
      render: (imgUrl) => (
        <>
          <img style={{width: '50px'}} src={`${baseURL}headSculpture/${imgUrl} `} alt="" />
        </>
      )
    },
    {
      title: '角色',
      dataIndex: 'authorityName',
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
    let {data: res} = await $DelUser({uid: data.uid, photo: data.photo})
    if(res.code === 0){
      notificate({type: 'success', message: res.message})
      loadUserTable()
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
        value: r.authorityId,
        label: r.authorityName
      }
    })
    authorityList.unshift({value: '0', label: '请选择角色'})
    setAuthorityTable(authorityList)
  })
  }
  const loadUserTable= async () => {
    $UserTable({authorityId: authorityId, pageIndex: pageIndex, pageSize: 10}).then((res)=>{
      let { total, userList } = res.data
      console.log(res.data)
      userList = userList.map((r: any)=>{
        return {
          ...r,
          key: r.uid,
          authorityName: r.authority.authorityName
        }
      })
      console.log(total);
      
      setCount(total)
      setUserTable(userList)
    })
  }
  useEffect(()=>{
    loadAuthorityList()
    loadUserTable()
  }, [pageIndex])
  return(
    <>
      <div className="search">
        <span>角色: </span>
        <Select
          onChange={(value)=>{setAuthorityId(Number(value))}}
          options={authorityList}
          defaultValue = { '0' }
          style = {{width: '200px'}}
        />
        <Button type="primary" style={{marginLeft: '5px'}} onClick = {() => {loadUserTable()}}
        >查询</Button>
        <Button size="small"
        style={{marginLeft: '5px'}}
          onClick={()=>{setOpen(true)}}
        >
          添加
        </Button>
      </div>
      <Table size="small" dataSource={userTable} columns={columns} pagination={false} />
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
      <AddUser open={open} setOpen={setOpen} loadUserTable={loadUserTable} uid={uid} setUid={setUid}/>
    </> 
  )
}
export default UsersTable;