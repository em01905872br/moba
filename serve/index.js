const express = require('express');



// 启动服务器
const app = express();

// 引入跨域模块
app.use(require('cors')());
// 可以使用异步 async await 
app.use(express.json());


// 引入数据库文件
require('./plugins/db')(app);
// 这个引用过来是一个函数，所以要执行这个引用的结果，并传递一个参数
require('./router/admin')(app);

// 监听端口号
app.listen(3000, ()=>{
    console.log('http://localhost:3000');
})