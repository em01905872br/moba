const mongoose = require('mongoose');

// 创建数据库的格式
const schema = new mongoose.Schema({
    title: {type: String},
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref:'Category'}],
    body: {type: String},
},{
    timestamps: true
})

module.exports = mongoose.model('Article', schema);