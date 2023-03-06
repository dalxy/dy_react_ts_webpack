import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './router/index'
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import '@/assets/common.less'

// import axios from './api/index'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);