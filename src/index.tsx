import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './router/index'
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import '@/assets/common.less'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);