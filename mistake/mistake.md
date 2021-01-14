### 错误一：路由切换的时候替换不干净，如下：

![](C:\Users\Administrator\Desktop\学习\task\mistake\image\01.png)

是因为前面代码的路径错误，导致路由不正确：

```
<el-menu-item index="categories/create">新增列表</el-menu-item>
<el-menu-item index="categories/list">分类列表</el-menu-item>
```

要填充好路由地址才会正确执行，如下：

```
<el-menu-item index="/categories/create">新增列表</el-menu-item>
<el-menu-item index="/categories/list">分类列表</el-menu-item>
          
```

错误总结：在写路由的时候，要特别注意路由的地址，如果路由的地址不正确，在使用时就会出现上面路由清除不干净无法跳转到相应的页面。



### 错误二：

 **Cast to ObjectId failed for value "id" at path "_id" for model "Category"**

同时浏览器会有报错（500），表示服务器出现问题。

出现问题是因为：



```
async fetch() {
				console.log(this.id)
				// 访问后端接口
				const res = await this.$http.get(`categories/${this.id}`) // eslint-disable-line no-unused-vars
				this.model = res.data;
			},
```

代码中的模板字符串不能这样写：`categories/${this.id}`      

而是应该转换为：‘ categories/ ‘ + this.id

```
async fetch() {
				console.log(this.id)
				// 访问后端接口
				const res = await this.$http.get(`categories/`+this.id) // eslint-disable-line no-unused-vars
				this.model = res.data;
			},
```



### 错误三：mongoose出现警告

DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.

**原因是因为:findOneAndUpdate()内部会使用findAndModify驱动，驱动即将被废弃，所以弹出警告**

只要在启动 monoose 数据库的时候加上：mongoose.set('useFindAndModify', false); 即可

```
const mongoose = require('mongoose');
    // 原因是因为:findOneAndUpdate()内部会使用findAndModify驱动，驱动即将被废弃，所以弹出警告！
    mongoose.set('useFindAndModify', false);
    const dataUrl = 'mongodb://127.0.0.1:27017/node-vue-moba';
    mongoose.connect(dataUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
```

### 错误四：

在下载密码加密包的时候出错：

```
npm ERR! code EBUSY
npm ERR! syscall rename
npm ERR! path C:\Users\Administrator\Desktop\学习\task\serve\node_modules\bcrypt
npm ERR! dest C:\Users\Administrator\Desktop\学习\task\serve\node_modules\.bcrypt.DELETE
npm ERR! errno -4082
npm ERR! EBUSY: resource busy or locked, rename 'C:\Users\Administrator\Desktop\学习\task\serve\node_modules\bcrypt' -> 'C:\Users\Administrator\Desktop\学习\task\serve\node_modules\.bcrypt.DELETE'

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\Administrator\AppData\Roaming\npm-cache\_logs\2020-12-16T09_59_40_361Z-debug.lo
```

**解决方案：**更新全局 npm

在命令行中执行如下代码：npm i npm -g

再执行 npm i bcrypt 即可



### 错误五：

```
message: "jwt must be provided"
```

这个错误表示要提供非空验证

在上面加上验证即可：

```
const token = String(req.headers.authorization || '').split(' ').pop();
// 验证语句，对下面的语句进行验证
assert(token, 401, '请提供 jwt token')
// 进行解密，得到 id 值
// 解密结果：{ id: '5fdab0f199f3ed09ac18c328', iat: 1608172910 }
const { id } = jwt.verify(token, app.get('secret'))
```



### 错误六：

```
This dependency was not found:

* swiper/dist/css/swiper.css in ./src/main.js

To install it, you can run: npm install --save swiper/dist/css/swiper.css

```

这个错误是因为在vue 中使用轮播插件，但是轮播插件中的 swiper 版本过高

npm install swiper vue-awesome-swiper --save

其中这两个包，"swiper": "^6.4.5",	  "vue-awesome-swiper": "^4.1.1",

**在npm中引入模板是：但是由于此时的 swiper 版本过高，node_models 中的 swiper 文件夹没有css文件夹**

```
import VueAwesomeSwiper from 'vue-awesome-swiper'
 
// import style
import 'swiper/css/swiper.css'
 
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
```

这是就要添加一条新的引入css 文件：当swiper版本高于^6.0.0时，新的引入 css 文件的方法。

```
import VueAwesomeSwiper from 'vue-awesome-swiper'
 
// import style
// import 'swiper/css/swiper.css'
import 'swiper/swiper-bundle.css'
 
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
```



### 错误七：莫名跨域错误

出现的跨域错误是因为，后端接口出错没少加了数据库数据应以json 形式输出。

```
const data = await Article.findById(req.params.id);
```

在语句最后加上 .lean() 即可

```
const data = await Article.findById(req.params.id).lean();
```







## 知识点一：

npm i inflection

可以将单词转化为类名，单复数转化，数字转化

## 知识点二：

关闭eslint 检查

在根目录下添加一个 vue.config.js 文件，即可关闭eslint 检查

```
module.exports = {
	//避免eslint报错
	lintOnSave:false 
}
```

添加后要重启服务器方可生效

## 知识点三：

使用 npm i multer 处理上传文件

## 知识点四：

// 显性赋值 第一个值是要赋值的对象，第二个是赋值的属性，第三个是把要赋值的值

​        // 如果要赋的值在data中没有，就要只用这种方法

​        this.$set(this.model, 'icon', totalName);

## 知识点五：base64保存图片

<img src="data:image/jpeg;base64,

把图片存在页面上，方便调用，但是导致页面庞大

## 知识点六：

npm i jsonwebtoken 下载包实现 token



## 知识点七：

```
// 启动服务器
const app = express();

    // 在 app 实例上加一个变量
app.set('secret');
	//获取到 app 实例上的值
app.get('secret')
```



## 知识点八：px to rem

这是 vscode 中的一个插件

alt + s 改变插件的比例，插件默认是以16px 为基准转换为rem的

alt + z 把 px 转化成rem



## 知识点九：精灵图

http://www.spritecow.com/

可以框中选取精灵图



## 知识点十：下拉多选框中可以输入内容识别

在select 中加上 filterable

```
<el-select filterable v-model="item.hero">
    <el-option
        v-for="hero in heroes"
        :key="hero._id"
        :value="hero._id"
        :label="hero.name"
    ></el-option>
</el-select>
```

