### JSX

#### JSX基础

##### 1、注释

```js
let myDom = <div>
          {/*我是注释内容*/}
          hello
    </div>
//如果想在jsx里写表达式，需要将表达式放入一对{}中
```

##### 2、多行标签

```js
let myDom = <div>
          <div>我是第一个内容</div>
          <div>我是第二个内容</div>
    </div>
//如果多行标签，需要有一个父元素包裹
```

##### 3、计算

```js
直接在{}里计算就可以了
```

##### 5、函数的使用

```js
function fun(obj){
   return '姓名是'+obj.name+'年龄是'+obj.age;
    //推荐使用模板语法
}
let obj={
  name:'小明',
  age:19,
}
let myDom =(
  <div>{fun(obj)}</div>
);
ReactDOM.render(
  myDom,
  document.getElementById('root')
);
```

##### 6、样式等属性设置

```js
//注意在jsx不能使用class 这个属性 因为class是js的关键字
//如果想设置需要将class 改成className
let myStyle ={color:'red',fontSize:'250px'};

let myDom = (
  <div style={myStyle}>你好</div>
)
ReactDOM.render(
  myDom,
  document.getElementById('root')
);
```

##### 7、tips

```js
//数组列表遍历时，如果换行结果就不会显示，需要加()才能显示
//所以为了确保不出问题，在标签外顺手就把()加上
```

##### 8、点击事件

```js
//react中点击事件是onClick,其中C必须大写
let arr=['吃饭','睡觉','打豆豆'];
let myDom = 
   arr.map((item,index)=>{
      return (<p key={index} onClick={console.log('你好')}>{item}
       //上面onClick里的表达式会直接运行3次
       //需要改成()=>{console.log('你好')}
</p>)
   })
   //tips:这里的myDom等定义的数据发生改变，render并不会重新渲染
```

##### 9、遍历对象

```js
Object.keys() //返回一个数组类型的数据 他的值是对象中的键key
let obj={
    name:'小明',
    age:18
};
console.log(Object.keys(obj));
console.log(Object.value(obj));//返回的值是数组的值
### 对于对象来说，obj.name和obj['name']都可以取值，
###    但是当遍历的是变量时，只能使用[]这种方式

let myDom=<div>
    Object.keys(obj).map((v,i)=>{
        return <p key={i}>遍历的属性是：{v}----遍历出的值是{obj[v]}</p>
    })
    </div>
####  object.entries可以将键值对改成数组

```

