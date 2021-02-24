### REACT开发环境的搭建

#### 1、需要的文件

- react.js 核心文件

- react-dom.js  渲染页面的DOM，当前文件依赖于react核心文件

  <!--react具有两个分支，一个Webapp(react-dom.js),一个原生app(native)-->

- babel.js   ES6转换成ES5     JSX语法转换成javascript 对浏览器的兼容

#### 2、下载

react 核心包            npm i react --save

react-dom               npm i react-dom --save

babel                        npm i babel-standalone   --save

在html文件里引用即可，注意顺序

```js
//创建根节点，一个页面中需要有一个根节点，这个节点下的内容就会被react所管理
<body>
<div id="demoReact"></div>
<script type="text/babel">   //这里type一定要写，不然可能渲染不出来
    //jsx =javascript xml   javascript的扩展语法
        //优点：
        //  1、执行的效率更快
        //  2、他是类型安全，在编译过程中就能发现错误
        //  3、在使用jsx的时候编写模板会更加快速
    let myDom=<h1>你好世界</h1>
    ReactDOm.render(myDom,document.querySelecter('#demoReact'))
</script>
</body>
```

react中小写是元素，大写是组件