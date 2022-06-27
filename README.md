# npm i react react-dom @types/react @types/react-dom react-router-dom @types/react-router-dom antd --save
## npm i webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev
## npm i typescript ts-loader style-loader css-loader less-loader less url-loader --save-dev





# antdesign form为什么会自动填充密码
# 现代浏览器实现了内建的密码管理功能：当⽤户在⼀个⽹站上输⼊了⽤户名和密码，浏览器会为⽤户提供记忆功能。当⽤户再次访问这个⽹站时，浏览器使⽤保存的值⾃动填写登录字段。
# 解决方法
<Form.Item label="Password" name='password'
    rules={[{ required: true, message: 'Please input your password!' }]}>
    <Input.Password
    readOnly
    placeholder="请输入密码"
    onFocus={ this.handleRemoveAttr }/>
</Form.Item>
# const handleRemoveAttr = (event: any) => {event.target.removeAttribute('readonly')}