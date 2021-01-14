const mongoose = require('mongoose');

// 创建数据库的格式
const schema = new mongoose.Schema({
    name: {type: String},
    icon: {type: String}
})

module.exports = mongoose.model('Item', schema);