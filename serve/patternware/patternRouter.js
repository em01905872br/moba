module.exports = options => {
    return async(req, res, next) => {
        // 将获取到的单词转化为类名
        const modelName = require('inflection').classify(req.params.resource);
        // 动态获取路由，进行匹配，直接将 Model 挂载到 req 上面，以供后续直接调用
        req.Model = require(`../models/` + modelName);
        next();
    };
}