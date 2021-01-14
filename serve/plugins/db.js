module.exports = app => {
    const mongoose = require('mongoose');
    // 原因是因为:findOneAndUpdate()内部会使用findAndModify驱动，驱动即将被废弃，所以弹出警告！
    mongoose.set('useFindAndModify', false);
    const dataUrl = 'mongodb://127.0.0.1:27017/node-vue-moba';
    mongoose.connect(dataUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    // 引入所有数据库模块
    require('require-all')(__dirname + '/../models');
}