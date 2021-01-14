

// 直接暴露出一个函数，接收到主页面中的 app
module.exports= app => {
    const path = require('path');
    // 引入 express 使用其子路由，设置增删改查等
    const express = require('express');
    const router = express.Router({
        // 表示合并参数
        mergeParams: true
    });
    const AdminUser = require('../../models/AdminUser');
    //引入包实现 token 
    // const jwt = require('jsonwebtoken');
    const jwt = require('jsonwebtoken')
    // 错误验证
    const assert = require('http-assert');


    // 创建资源
    router.post('/', async (req, res)=>{
        // 发送来自用户提交的数据
        const model = await req.Model.create(req.body);
        // 服务器向客户端发送一个结果，表示请求结束
        res.send(model);
    })

    // 更新资源
    router.put('/:id', async (req, res)=>{
        // 通过 id 寻找信息，并进行更新
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        // 服务器向客户端发送一个结果，表示请求结束
        res.send(model);
    });

    // 删除资源
    router.delete('/:id', async (req, res)=>{
        // 通过 id 寻找信息，并进行更新
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body);
        // 服务器向客户端发送一个结果，表示请求结束
        res.send({
            success: true
        });
    })

    // 资源列表
    router.get('/', async (req, res)=>{
        console.log(req.user);
        let queryOptions = {};
        if(req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent';
        }
        // 接收来自用户提交的数据，最多一页10条
        // populate 可以将关联字段 填充到原位置，以便调用字段中的属性
        const items = await req.Model.find().setOptions(queryOptions).limit(100);
        // 服务器向客户端发送一个结果，表示请求结束
        res.send(items);
    })

    // 资源详情页的接口
    router.get('/:id', async (req, res)=>{
            // 通过 id 查找数据
            const model = await req.Model.findById(req.params.id);
            // 服务器向客户端发送一个结果，表示请求结束
            res.send(model);
    })

    // 登录校验中间件
    const patternCheckUser =  require('../../patternware/auth'); 

    // 路由模型中间件
    const patternRouter = require('../../patternware/patternRouter')

    // 最后把子路由挂载到 use 上面，形成一个api 向外暴露
    app.use('/admin/api/rest/:resource', patternCheckUser(), patternRouter(), router);

    // 优化接口，由于实现增删改查繁杂，所以只要一个增、删、改、查，即可
    // 对每一个请求的路径进行更改简化，把路径名 categories 改成一个动态参数
    // 使用动态资源 resource 匹配 categories，这样上面的接口就可以匹配任意的数据操作
    // 对 app.use('/admin/api', router); 添加一个前缀

    
	
	// 图片上传接口
    // 引入插件处理上传文件
    const multer = require('multer');
    // const upload = multer({dest: path.join(__dirname + '/../../uploads')})
    const upload = multer({dest: __dirname +'/../../uploads'})
    // single 表示单文件上传，通过上面的中间件，把file 挂载到 req 上面
    app.post('/admin/api/upload', patternCheckUser(), upload.single('file'), async(req, res) =>{
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    });
	
	
	
	// 登录接口
	app.post('/admin/api/login', async (req, res) => {
		// req.body 是用户传来的全部数据
		const {username, password} = req.body;
		// 1、根据用户名找用户
			// 由于密码进行散列加密，不能通过密码进行查询用户
		
		const user = await AdminUser.findOne({username: username}).select('+password');
            // 如果用户不存在，向客户端发送状态码 422，并发送一个错误消息
        assert(user, 422, '用户不存在');
		// 2、校验密码
        const isValid =  require('bcrypt').compareSync(password, user.password);
        assert(isValid, 422, '用户或密码错误');
        // 3、返回 token
        
            // sign 进行加密，在浏览器上面不会明文显示密码
            // sign({要加密的数据}, 密钥, )
        const token = jwt.sign({id: user._id}, app.get('secret'));
        res.send({token, username});
    })
    
    // 错误处理
    app.use(async (err, req, res, next) => {
        console.log(err)
        res.status(err.statusCode || 500).send({
          message: err.message
        })
      })
}