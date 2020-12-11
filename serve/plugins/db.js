module.exports = app => {
    const mongoose = require('mongoose');

    const dataUrl = 'mongodb://127.0.0.1:27017/node-vue-moba';
    mongoose.connect(dataUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}