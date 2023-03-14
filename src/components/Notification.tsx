import React from 'react';
import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function notificate (type: NotificationType, message='系统提示', description:any) {
  notification.open({
    type: type,
    message: message,
    description: description,
    duration: 3, // duration in seconds
  });
};

// interface NotificationProps {
//   type: 'success' | 'info' | 'warning' | 'error';
//   message: string;
//   description?: string;
// }

// const Notification: React.FC<NotificationProps> = ({ type, message, description }) => {
//   const openNotification = () => {
//     notification[type]({
//       message: message,
//       description: description,
//       duration: 3, // duration in seconds
//     });
//   };
//   return (
//     <>
//       <div>
//         <button onClick={openNotification}>Show Notification</button>
//       </div>
//     </>
//   );
// }

// export default Notification

{
//   import React, { useEffect } from 'react';
// import { notification } from 'antd';
// type NotificationType = 'success' | 'info' | 'warning' | 'error';
// const notificate: React.FC = ({type,description}) => {
//   const [api, contextHolder] = notification.useNotification();
//   useEffect(()=>{
//     api[type]({
//       message: 'Notification Title',
//       description:
//         'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
//     });
//   }, [type])
//   return (
//     <>
//       {contextHolder}
//     </>
//   );
// };
// export default notificate;
}