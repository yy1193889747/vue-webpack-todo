# vue-webpack-todo
慕课网学习笔记，包括每节课的各种依赖及知识点，项目使用Sublime编写，[演示地址](http://111.231.86.225:8080/)
## 目录
   * [第1章 课程介绍](#第1章)
   * 第2章 vue+webpack项目工程配置
	   * [2-1 vue-loader+webpack项目配置](#2-1)
	   * [2-2 webpack配置项目加载各种静态资源及css预处理器](#2-2)
	   * [2-3 webpack-dev-server的配置和使用](#2-3)
   * 第3章 vue介绍和项目实战
   	   * [3-1 vue2的核心知识介绍](#3-1)
   	   * [3-2 配置vue的jsx写法以及postcss](#3-2)
   	   * [3-3 实现todo应用的界面](#3-3)
   	   * [3-4 实现todo应用的业务逻辑](#3-4)
   * 第4章 webpack配置优化
   	   * [4-1 webpack配置css单独分离打包](#4-1)
   	   * [4-2 webpack区分打包类库代码及hash优化](#4-2)
   * [第5章 课程总结](#第5章)
## 目录结构
```
-- vue-webpack-todo
    |-- dist                          输出目录
    |   |-- app.75969742.js
    |   |-- bg-aaa.jpg
    |   |-- done-aaa.png
    |   |-- index.html
    |   |-- runtime.64546a9c.js
    |   |-- styles.bc300e26.css
    |   `-- vendor.cdaa858e.js
    |-- node_modules                  依赖包
    |-- src                           源码包
    |   |-- assets                    资源文件
    |   |   |-- images
    |   |   |   |-- bg.jpg
    |   |   |   |-- done.png
    |   |   |   `-- do.png
    |   |   `-- styles
    |   |       |-- footer.styl
    |   |       |-- global.styl       全局样式
    |   |       `-- test.css
    |   `-- todo  核心包
    |       |-- footer.jsx            底部
    |       |-- header.vue            头部
    |       |-- item.vue
    |       |-- tabs.vue
    |       `-- todo.vue
    |   |-- app.vue                   vue特殊的文件
    |   `-- index.js                  入口文件
    |-- .babelrc					  
    |-- package.json
    |-- postcss.config.js             增加css前缀
    |-- README.md
    `-- webpack.config.js             打包前段资源
```
## 第1章
* [webpack中文文档](https://doc.webpack-china.org/concepts/)
* [vue中文文档](https://cn.vuejs.org/v2/guide/)
## 第2章
### 2-1
1. 初始化项目 所以依赖安装都加 --save 保存到package.json

	```
	npm i webpack vue vue-loader --save 安装webpack 及 vue
	npm i css-loader vue-template-compiler --save vue的依赖包
	```

2. webpack配置文件
	* const path = require('path') 引入path包
	* path.join(__dirname, 'src/index.js') 入口文件地址
	* __dirname 表示文件根目录
	* 使用module rules: 配置各种加载器
3. package.json配置启动，确保使用的是本项目的webpack，而不是全局
    
	```
	"build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
	```
### 2-2
1. 图片加载器，小于1024的使用url-loader处理成base64代码，直接写到js代码中而不生成新的文件。

	```
	{
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 1024,
                name: '[name]-aaa.[ext]'
         }
 	   }]
	}
	```
2. 安装依赖
	
	```
	npm i style-loader url-loader file-loader --save
	npm i stylus-loader stylus --save
	```
3. css预处理器stylus-loader 写法随意
### 2-3
1. 安装依赖 webpack-dev-server用于开发环境

	```
	npm i webpack-dev-server --save
	npm i cross-env --save  环境变量，适用于不同平台
	npm i html-webpack-plugin --save 生成html页面
	```
2. 配置文件设置 process.env.NODE_ENV获取输入的环境变量
	* package.json

	```
	"build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"
	```
	* [webpack.config.js](./webpack.config.js)  知识点都在里面

## 第3章
### 3-1
* [vue中文文档](https://cn.vuejs.org/v2/guide/) 
### 3-2
1. 安装依赖

	```
	npm i postcss-loader autoprefixer babel-loader babel-core --save
	npm i babel-preset-env babel-transform-vue-jsx --save
	```
2. 创建postcss.config.js文件   增加css前缀，满足不同浏览器
3. 创建.babelrc文件， 满足vue中 jsx文件的解析
### 3-3
*  @keyup.enter = "方法名" 等同于  v-on:keyup.enter = "方法名"  
*  v-model = "todo.completed" 数据绑定
* @click = "deleteTodo" 点击事件
* :class"['todo-item',todo.completed ? 'completed' : '']" 动态class
* v-for="state in states"  for循环

### 3-4
* this.todo.unshift({}) 向前插入
* this.$emit('del',this.todo.id)  父主键会监听子主键的事件
* @del 父主键开启监听
* this.todos.splice(this.todos.findIndex(todo => todo.id === id),1) 删除节点
* computed 计算几点个数
## 第4章
### 4-1
* . 安装依赖，实现css分离。 

	```
	npm i extract-text-webpack-plugin --save
	```
*  静态资源加hash后缀，方便浏览器长缓存。
### 4-2
*  vue单独打包成vendor
*  hash为一次打包的值，chunkhash为不同模块的hash值
*  webpack单独打包成runtime，新模块加入放到后面
*  vendor放到runtime前
## 第5章
webpack功能强大