const express = require('express');
const path = require('path')


// 启动服务器
const app = express();


    // 在 app 实例上加一个变量
app.set('secret', 'xing');

// 引入跨域模块
app.use(require('cors')());
// 可以使用异步 async await 
app.use(express.json());
// 对于上传的 文件使用静态托管，让 uploads 文件夹在 /uploads 下实现静态托管
app.use('/admin', express.static(__dirname + '/admin'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/', express.static(__dirname + '/web'));


// 引入数据库文件
require('./plugins/db')(app);
// 这个引用过来是一个函数，所以要执行这个引用的结果，并传递一个参数
require('./router/admin')(app);
require('./router/web')(app);

// 监听端口号
app.listen(3000, ()=>{
    console.log('http://localhost:3000');
})