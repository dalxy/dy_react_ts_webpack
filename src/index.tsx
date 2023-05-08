import React from 'react';
import ReactDOM from 'react-dom/client';
import store from '@/redux/index'
import { Provider } from 'react-redux';
import App from './router/index'
import 'antd/dist/reset.css';
import '@/assets/common.less'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store = { store }>
    <App />
  </Provider>
);