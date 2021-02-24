### REACT疑问汇总

#### 1、脚手架创建的项目js和html是怎么关联的？

#### 2、深拷贝和浅拷贝详解

```js
//浅拷贝使用场景：对象赋值给另一个对象，可以分别修改数据不相互影响
//深拷贝使用场景：对象嵌套对象
```



#### 3、ES6的Class语法详解

```js
//ES6新增的关键字  class
//本质是构造函数的 语法糖

class Student(){
    //constructor 是类的构造函数
    constructor(name,age){
        this.name =name;
        this.age =age;
    }
    //公有函数
    sayName(){
        console.log(this.name);
    }
    
    //公有属性
    PI =3.14;
    
    static className = 'h5-2006';
    //stu.className无法访问，静态的属性和方法 通过类名访问
}
var stu = new Student('zhangsan',20);
console.log(stu);
console.log(Student);
console.log(typeof Student);

###class的继承
class F {
    constructor(name){
        this.name=name;
    }
    sayName(){
        return this.name;
    }
}

class S extends F{    //extends 实现类的继承
    constructor(n){
        //在子类的构造函数中调用父类的构造函数，实现属性的继承
        super(n);   
    }
}
```



#### 4、bind、apply详解



#### 5、使用ref	

```js

class InputUnit extends Component {
    constructor(props){
        super(props);
        this.valuetext=React.createRef();
    }
    render() {
        return (
            <>
              <input type="text"
              onChange={this.props.handleChange.bind(this,this.valuetext.current.value)}
            //   value={this.props.comtext}
              ref={this.valuetext}
              value='5'
              />
              <button>添加</button>
            </>
        );
    }
}

#### current.value应该是渲染时获取的，不能作为传参进行传递，传递时应该只传this.valuetext(个人理解，具体运行原理不清楚)
```

#### 6、子传父组件怎么传，借用方法传参两边都bind不是两个函数了吗



#### 7、react里Bind传参如何将事件本身和其他函数一起上传

```js
事件：this.handleclick.bind(this，要传的参数)
函数：handleclick(传过来的参数，event)
```

#### 8、react的函数方法点击调用两次出现的原因？

代码更换电脑后好用了，目前没有发现问题原因。

百度后发现类似问题有事件冒泡和元素累加等原因

#### 9、面试（父子组件嵌套谁先render,谁先componentDidMount?）

render是父组件先，componentDidMount先

#### 10、面试（setState某些时候也可以是同步的）

```js
//1、在生命周期里使用setState  异步 
//2、在合成事件里使用setState  异步
//3、定时器里使用  同步
//4、原生事件绑定  同步
//在原生js里setState是同步的
```

#### 11、grid宫格上下的padding间距似乎到12.8px无法消除了，怎么搞？

CSS权重的问题，加个important就好了

#### 12、vscode运行报错：pack.json No lisence解决办法？

[博客](https://blog.csdn.net/weixin_42605169/article/details/105221389)

```js
"lisence":'MIT'
"lisence":'SIC'
//以上任意一种后重启

###MIT协议是许多软件授权条款中被广泛使用的其中一种，与其他条款相比是相对宽松的软件的授权条款
```

13、localstorage有声明周期嘛

14、封装promise.all()