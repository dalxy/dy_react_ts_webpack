// import React from 'react';
import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface notiMsg{
  type: NotificationType,
  message: string
}

export default function notificate (notiMsg: notiMsg) {
  notification.open({
    type: notiMsg.type,
    message: '系统提示',
    description: notiMsg.message,
    duration: 3, // duration in seconds
  });
};

// import React, { useEffect } from 'react';
// import { notification } from 'antd';
// import {NotificationProps}from '@/typing/auth'

// const Notification: React.FC<NotificationProps> = ({type, message}) => {
//   const [api, contextHolder] = notification.useNotification();

//     if(type){
//       useEffect(() => {
//         api[type]({
//         message: '系统提示',
//         description:message,
//       })},[type])
//     }

//   return (
//     <>
//       {contextHolder}
//     </>
//   );
// };

// export default Notification;
// }