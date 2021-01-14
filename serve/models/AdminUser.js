const mongoose = require('mongoose');

// 创建数据库的格式
const schema = new mongoose.Schema({
    username: {type: String},
    password: {
        type: String, 
        // 保存后再编辑，密码栏会清空，这样就不会对密码进行二次加密；默认查询，不会查询这一项
        select: false,
        // val 是用户输入的密码，在函数里进行散列加密
        set(val) {
            // hashSync 返回加密值，第一个是返回值，第二个是加密指数，越大加密指数越高
            // 相同加密数据，加密结果不同且无逻辑关系
            // 保存后，查看其内容已变成加密形式不同
            return require('bcrypt').hashSync(val, 12);
        }
    },
})

module.exports = mongoose.model('AdminUser', schema);