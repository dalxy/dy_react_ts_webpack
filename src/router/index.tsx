import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// 导入提供器组件
import { useDispatch } from 'react-redux';

// 导入store
import { adminSlice } from '@/redux/index'
import { Redirect } from '@/hook/Redirect';
import { $GetUser } from "@/utils/api/userManagerApi";

const Register = lazy(() => import('@/views/Register'));
const Login = lazy(() => import('@/views/Login'));
const Home = lazy(() => import('@/views/Home'));
const About = lazy(() => import('@/views/About'));
const Layout = lazy(() => import('@/layout/index'));
const UserManger = lazy(() => import('@/views/UserManager'));
const Rule = lazy(() => import('@/views/Rule'));
const UserTable = lazy(() => import('@/views/UserTable'));
const Authority = lazy(() => import('@/views/Authority'));
const UserInfo = lazy(() => import('@/views/UserInfo'));
const UpdatePwd = lazy(() => import('@/views/UpdatePwd'));

const App: React.FC = () => {
  const dispatch = useDispatch()
  const  { setAdmin } = adminSlice.actions
  useEffect(()=>{
    // 判断是否是登录状态
    console.log(sessionStorage.getItem('userId'));
    if(sessionStorage.getItem('userId')){
      // 获取登录账号
      let userId = sessionStorage.getItem('userId')
      console.log(userId);
      $GetUser({userid: userId}).then(res=>{
        console.log(res);
        dispatch(setAdmin(res.data.userList[0]))
      })      
    }
  },[])
  return(
      <Router>
        <Suspense fallback={<div>Loading。。。</div>}>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/layout" element={<Layout />}>
              <Route path="home" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="userManager" element={<UserManger />} />
              <Route path="userTable" element={<UserTable />} />
              <Route path="authority" element={<Authority />} />
              <Route path="rule" element={<Rule />} />
              <Route path="userInfo" element={<UserInfo />} />
              <Route path="updatePwd" element={<UpdatePwd />} />
            </Route>
            <Route path="/" element={<Redirect to='/login' replace />} />
          </Routes>
        </Suspense>
      </Router>
  );
}
export default App;