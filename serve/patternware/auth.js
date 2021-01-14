
module.exports = () => {
    const AdminUser = require('../models/AdminUser');
    //引入包实现 token 
    const jwt = require('jsonwebtoken')
    // 错误验证
    const assert = require('http-assert');

    return async( req, res, next) => {
            // 校验用户是否登录
        const token = String(req.headers.authorization || '').split(' ').pop();
            // assert(token, 401, '请提供 jwt token');
        assert(token, 401, '请先登录');
            // 进行解密，得到 id 值
            // 解密结果：{ id: '5fdab0f199f3ed09ac18c328', iat: 1608172910 }
        const { id } = jwt.verify(token, req.app.get('secret'))
            // assert(id, 401, '无效的 jwt token');
        assert(id, 401, '请先登录');
        req.user = await AdminUser.findById(id);
        assert(req.user, 401, '请先登录');
        await next();
    }
}