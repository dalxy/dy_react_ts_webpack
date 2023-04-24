import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './router/index'
import 'antd/dist/reset.css';
import '@/assets/common.less'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <App />
);