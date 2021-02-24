# Webpack

## 一、市面上有哪些类似于Webpack的前端工程化工具【 自动化工具 】

>  比较使用量比较多的有5种
>
> - gulp 4.x
> - webpack 4.x 
> - rollup
> - parcel 
> - FIS3
>
> 经验给到你
>
> - 先掌握构建工具其中一个  gulp  /  webpack  
> - 学会去读文档 
> - 如果文档不行 -> 视频资源  -> 联系老师 -> 远程讲解 ->  Teamviwer【 远程软件 】

1. grunt   【 已经不用了 】
2. gulp ( 4.x ) 【 老项目还在用 】- Node.js 的流式操作
3. Browserify ( Webpack 前身 )   - 处理的AMD模块化    - 功能有限
4. Webpack 【 主流行 】 -> webpack 4.x 版本
5. rollup.js   <https://www.rollupjs.com/guide/zh> 【 小众 】
   1. 特点
      - 将小块代码编译为大块复杂的代码  -> 拼图
        - 分层比较多，调用链比较长时，比较耗性能、
        - rollup可以将这种分层比较多的模块化给它进行组合编译成分层比较少的，节省性能
      - 针对es6模块化的编译
   2. 阿里项目中使用了
6. [parcel](<https://parceljs.org/>)  【 小众 】、
   1. 特点： 
      - 多线程编译，极致速度
7. FIS <https://fis.baidu.com/>  【 小众 】
   1. 特点： 解决前端开发中自动化工具、性能优化、模块化框架、开发规范、代码部署、开发流程等问题
      - 类似码云， 可以进行团队开发、代码部署
   2. 百度产品比较多

## 二、 Webpack版本的发展过程

​    官网: <https://webpack.js.org/>

​    中文: <https://www.webpackjs.com/>

 **webpack1**

​		支持CMD和AMD，同时拥有丰富的plugin和loader，webpack逐渐得到广泛应用。

​		loader： 将某一个类型文件转换为其他类型文件

​		plugin： 插件 

					-  服务器
					-  图片处理
					-  。。。

 **webpack2** 

​		支持ES Module，分析ESModule之间的依赖关系，

​		webpack1必须将ES，Module转换成CommonJS模块，2支持tree sharking

 **webpack3** 

​		新的特性大都围绕ES Module提出，如Scope Hoisting和Magic Comment；

​                webpack3以上基本上都可以解决es6提出的模块化

**webpack4**

​        	可以解决es6模块化【 export default / export          import 】

​		更多个功能性 pulgin【 插件 】  和  loader 【 转换器 】	

​		前端框架中广泛使用： Angular  Vue  React  的脚手架都是由webpack来进行开发、管理



学习目标： 

​	- 通过webpack自主构建一个项目 【 手动构建一个项目 】

 - webpack基本配置
 - webpack高级配置		

## 三、 Webpack涉及到的前端环境问题

1. Webpack底层是由 Node.js 来开发的，也就是说Webpack的配置文件都是 Node.js 文件
2. Webpack的模块化书写的规范是Common.js规范
3. 环境支持： Node.js  8+
4. **前端环境：** 【 重点 】
   - 开发环境 -  无法直接在服务器中去运行
   - 生产环境 - 将开发环境下的代码经过  打包  压缩   编译  之后的文件
   - 测试环境 - 将开发环境的代码经过  打包  压缩   编译  之后的文件，放在测试环境服务器中运行
     - unit test 单元测试 【 mocha  Jest 】
     - e2e 端到端测试
   - 预上线环境：  将开发环境的代码经过  打包  压缩   编译  之后的文件，放到一个局域网中去运行
   - 上线环境：将开发环境的代码经过  打包  压缩   编译  之后的文件，放到云服务器或是服务器主机中，可以供任何人访问，使用的一个环境（ 这个环境的上线要经过国家审核 ）

5.  核心关注点在： 
   - 开发环境
   - 生产环境

## 五、Webpack的安装

> 安装可以使用任何一个包管理器： npm  yarn   cnpm 
>
> yarn   >  cnpm  >  npm 
>
> 举例： 我使用npm安装了一个叫做 node-sass 的包 ，但是出错了 ，这时，我们想卸载，发现卸载报错
>
> 解决： 覆盖安装
>
> cnpm || yarn 进行覆盖安装
>
> cnpm  和 yarn  优先级没有那么绝对



### 1.全局安装(  选择以下一种即可  )

`$ npm install webpack webpack-cli -g`

`$ cnpm install webpack webpack-cli -g`

`$ yarn add webpack webpack-cli global`

### 2.局部安装

`$ npm install webpack webpack-cli -D`

`$ cnpm install webpack webpack-cli -D`

`$ yarn add webpack webpack-cli -D`

**局部优先级 > 全局** 

## 六、Webpack的概念

* webpack* 是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*（ 分块束 ）

  > 理解： 
  >
  > ​	举例： 我们又两个模块，A模块引用B模块，我们现在使用webpack打包A模块，webpack会自动寻找A和B之间的关系，进而打包B模块

## 七、Webpack 使用

> 默认源代码开发目录为： src
>
> 默认的入口文件名称为： src/index.js
>
> 默认出口目录为： dist
>
> 默认出口打包文件名称为： main.js
>
> 通过mode来设置是那个环境下打包使用
>
> 开发环境打包： 代码不经过压缩、注释不会被删除
>
> eval 这个方法时用来解析字符串，这个字符串里面有js代码 【 性能不太好 】

### 1.终端命令行使用

 - 终端运行  webpack  

     - 当我们局部安装了webpack  webpack-cli后，发现运行webpack报错命名找不到

         - 解决： 全局安装webpack webpack-cli

    - 默认生成环境打包

        

 - webpack --mode development/production      开发环境/生产环境打包

### 2.配置文件使用

- 默认webpack配置性文件名称为   webpack.config.js，这个文件是在根目录下运行的
- 运行  webpack  命令就会自动的去寻找这个 文件 
- webpack.config.js文件中我们配置的就是 webpack的参数

### 3.配置webpack.config.js文件

>    我们接下来对这个文件进行配置，主要从以下几个方面来着手
>
>    	1. 基础功能 ：  入口   出口 文件配置
>    	2. 转换器： loader 
>    	3. 插件: plugin
>    	
>    	单页面配置  vs  多页面配置 
>    		单页面配置指的只有一个入口一个出口的项目  【 推荐 】
>    		多页面配置指的是有多个入口多个出口的项目

#### 1.单页面配置

##### 1.1 基础功能

```javascript
/* 
  webpack配置文件
  也是Node.js文件
  这个文件也是一个独立的 Common.js 模块
*/

const path = require('path')

// 1. 创建模块

const webpackConfig = {
  entry: './src/index.js', //网络路径（ 相对路径 ）
  output: { //出口目录、文件的配置
    path: path.join( __dirname,'dist'), // 磁盘路径
    filename: 'js/app.js' // 入口文件将来打包到出口目录中的文件的路径和名称
  },
  mode: 'development'//确定是生产环境还是开发环境的打包
}

// 2. 导出模块

module.exports = webpackConfig




```

##### 1.2 问题： 验证webpack是否能自动解决模块化依赖问题      可以

##### 1.3 loader 转换器  可以将其他类型文件转换为我们想要的类型文件

​	举例： 实现css的使用

```javascript
  /* ------------------------------- 转换器 ------------------------------ */
  // 在webpack.config.js中做如下配置：
  module: { //这里用来存放转换器的配置
    rules: [
      // {} //每一个对象就是一个转换器的配置
      {//css的处理
        test: /\.css$/, // 整个项目下匹配 .css结尾的文件
        use: ['style-loader','css-loader'] //两个顺序是不写反的
        // 我们需要使用css-loader将css文件编译为js,然后通过style-loader将js处理插入到html文件中【 style 嵌入模式 】
      }
    ]
  },
```



##### 1.4 配置前端静态服务器

```
	//需要自动刷新： webServer 搭建前端开发服务器
    cnpm install webpack-dev-server -g | -D
    参数:
        命令行
        webpack-dev-server --port 8088 --open --mode development

        写到webpack.config.js配置文件:

        devServer: {//和module同级
            port: 8088,
            open:true,
            contentBase: 'dist的路径',
            hot: true 
        }

        终端运行方式2: webpack-dev-server
    
    把运行命令放到package.json文件:    devServer可以不要了
        "scripts":{
            "dev": "webpack-dev-server  --config config/webpack.config.dev.js"
        }

        终端: npm run dev
```

##### 1.5 优雅降级配置

 - 先安装转换器需要的包

   `$ cnpm install babel-loader@8.0.4 @babel/core @babel/preset-env -D`

- 配置webpack.config.js

  ```javascript
  	// 在webpack.config.js的module.rules中进行配置
          {// 配置优雅降级
              test: /\.js$/,
              exclude: /node_modules/, // 排除node_models中的js文件
              use: [{
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }]
  
            }
  ```

##### 1.6 html产出 - 依赖的是插件

- 安装插件需要的第三方包

  `$ cnpm i html-webpack-plugin -D`

  ```javascript
  	const HtmlWebpackPlugin = require('html-webpack-plugin')
  	
      //添加一个配置项
      plugins:[
              new HtmlWebpackPlugin({
                  template: './public/index.html',
                  filename: './index.html',//默认到output目录
                  hash:true,//防止缓存,会给文件后面加入hash
                  minify:{
                      removeAttributeQuotes:true//压缩 去掉引号
                  }
              })
      ]
  ```

##### 1.7 css抽离 - 依赖的是插件

> 将webpack编译过得css文件以 css外部引用的形式引入

- 安装插件

  `$ cnpm i mini-css-extract-plugin -D`

  ```javascript
  
      const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  
      //loader配置：
      use: [MiniCssExtractPlugin.loader, 'css-loader'] //不再需要style-loader
  
      //pulgin配置
      new MiniCssExtractPlugin({
        filename: 'css/index.css'
      })
  ```

##### 1.8 图片打包

```javascript
yarn add url-loader file-loader --dev

npm i url-loader file-loader --save-dev

    //url-loader 存base64  file-loader存文件（woff mp3）
    {
        test:/\.(png|jpg|gif)/,
        use:[{
          loader: 'url-loader',
          options: {
            limit: 5000,//字节少于5000 ——》 base64  超过5000  file
            outputPath: 'images/', //5000意思存到images
          }
        }]
      }

//css中引入 | js动态(模块化) 引入
```

##### 1.9 静态资源拷贝

```javascript
  npm i copy-webpack-plugin -D

    const CopyWebpackPlugin = require('copy-webpack-plugin')
//plugin配置
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname,'static'), to: 				path.resolve(__dirname,'build/static') }
    ])
```


​	

​	

​	

​	



