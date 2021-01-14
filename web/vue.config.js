module.exports = {
	outputDir: __dirname + '/../serve/web',
	publicPath: process.env.NODE_ENV === 'production'
	  ? '/'
	  : '/'
}


/* module.exports = {
	// 控制打包后文件生成的路径
	outputDir: __dirname + '/../serve/admin',
	publicPath: process.env.NODE_ENV === 'production'
		? '/admin/'
		: '/',
		//避免eslint报错
		lintOnSave:false 
	} */
