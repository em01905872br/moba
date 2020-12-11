

// 直接暴露出一个函数，接收到主页面中的 app
module.exports= app => {
    // 引入 express 使用其子路由，设置增删改查等
    const express = require('express');
    const router = express.Router();
    // 引入数据库的模型
    const Category = require('../../models/Category');

    router.post('/categories', async (req, res)=>{
        // 接收来自用户提交的数据
        const model = await Category.create(req.body);
        // 服务器向客户端发送一个结果，表示请求结束
        res.send(model);
    })

    // 最后把子路由挂载到 use 上面，形成一个api 向外暴露
    app.use('/admin/api', router);
}