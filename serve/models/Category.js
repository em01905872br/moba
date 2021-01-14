const mongoose = require('mongoose');

// 创建数据库的格式
const schema = new mongoose.Schema({
    name: {type: String},
    // 这里要传递的值是数据库里面的 ID ，所以这里的类型要设置为数据库中的对象 ID 
    // ref 表示要关联的模型
    parent: {type: mongoose.SchemaTypes.ObjectId, ref:'Category'}
})

schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})
schema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})

module.exports = mongoose.model('Category', schema);