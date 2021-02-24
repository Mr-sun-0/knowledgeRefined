### 进阶功能

#### 1、数据请求和json-server

```js
// json-server 模拟数据的     npm install json-server -g  等同于yarn json-server -g
//axios 数据请求 两个都需要下载 npm install axios --save

//1、根目录创建mock文件夹，里面建立data.json模拟数据
//2、启动json-server,cd到mock文件夹下   -> json-server {json数据的名字  --port 端口号} 接下来可以在项目对应端口请求到数据
//3、引入axios，

//在package.json里配置script可以快速启动
//之后npm run mock就可以启动+

//修改请求地址
//json-server ./src/mock/mock.js -r ./src/mock/mockRouter.json -p 9000 -watch
//可通过挂在改变请求路径
//./src/mock/mockRouter.json里{'/api/hotcate':'/hotcate'}

### 问题：这种方式改变的地址和代理中的reWrite有什么区别？
/api/hotcate是为了匹配代理，-r ./src/mock/mockRouter.json 里是为了重新指向真实的接口
```

#### 2、跨域处理

```js
#### 正向代理   --通常用于开发环境 一个位于客户端和目标服务器之间的代理服务器，为了获得目标服务器的内容，客户端向代理服务器发送一个请求，代理服务器帮助我们去目标服务器里面获取数据并且返回给我们

#### 反向代理   --可以通过代理服务器来接受网络上的请求连接，然后将这个请求连接转发给内部的网络服务器上，并且把请求到的数据返回给网络请求的客户端，这个时候代理服务器对外的表现就是一个反向代理

//模拟请求真实的网络接口 中国天气网的数据
//react-scripts->config->webpackDevServer->proxy:{
    '/api':{
        target:url,
        changeOrigin:true,
        "pathRewrite":{
            "^/api":"/"
        }
    }}
```

#### 3、HOC高阶组件

理解：组件加工厂，传入一个组件，通过属性传参和其他操作来为传入的组件添加属性和方法，可以批量实现功能的添加

```js
案例见杰哥的大纲
```

#### 4、portal

Portals 提供了一个最好的在父组件包含的DOM结构层级外的DOM节点渲染组件的方法。

```js
//解构出createPortal
import { createPortal } from 'react-dom';

//利用 createPortal语法，将组件挪到相关节点
const withPortal = (Comp) => {
  return class extends Component {
    render () {
      return createPortal(
        <Comp {...this.props}/>,
        document.querySelector('body')
      )
    }
  }
}
```

#### 5、react-redux

个人理解：redux相当于一个可编程的自动化工厂，用于接收defaultState和reducer生成定制化的仓库，配合工厂赠送的高阶组件服务，供需要的地方调用对本身组件进行强化，在Props里增加相应的状态和方法

PS:react-redux插件用来解决组件使用redux状态不能自动渲染、页面同步更新的问题

```js
### 使用方法
//1、根组件解构引入Provider
import {Provider} from 'react-redux';
<Provider store={store}></ Provider>

//2、关于store
//store是createStore()的返回对象,createStore()需要掌握的有两个参数，第一个参数是reducer,第二个是applyMiddleware(中间件)的返回对象

//3、reducer里的内容是redux功能的基础，下面给一个范例
const defaultState = {
    list: ['task1']
}

export default (state = defaultState,action) =>{
  action = action ||{type:''}
  switch(action.type){
    case 'PUSH_DATA':
        return{
        ...state,
        list:[
            ...state.list,
            action.task,
        ]
    }
    case 'REMOVE_DATA':
        return {
            ...state,
            list:state.list.filter((item,index)=>{
                return index!==action.index
            })
        }
    default:
        return state;
  }
}

//4、actionCreator里异步请求的函数，格式不固定，看个人水平

//5、在需要使用的地方引入react-redux的connect
//connect(f1,f2)执行出来的结果是一个高阶组件，有两个回调函数作为connect()的参数，第一个函数名为mapStateToProps,第二个函数名为mapDispathToProps
//映射store里的state或dispatch到当前组件的props
const mapStateToProps = state=>{
    return {
        list:state.list
    }
}

//映射store里面的dispatch到当前组件的props
const mapDispathToProps =dispatch =>{
    return {
        add(){
           dispatch(({
               type:'PUSH_DATA'
           })) 
        }
   
    }
}
connect(null,mapDispathToProps)()

```

纯函数：1）如果相同的入参，那么一定是相同的返回值

​               2）不能改变入参

#### 6、redux中间件做异步请求-redux-thunk

```js
//1、中间件装在store的Index.js里，实际为createStore所在文件里
//2、从redux里解构出applyMiddleware
//3、redux-thunk作为参数传给applyMiddleware,将返回的对象作为createStore的第二个参数暴露

### 重点：actionCreator里通过中间件使dispatch得到的返回函数自动执行，返回函数就是做的异步请求
```



#### 7、React Router

- 包含了四个包：react-router | react-router-dom |react-router-native | react-router-config,主要使用react-router-dom ,[官网](<https://reacttraining.com/react-router/web/guides/quick-start>)

- react是包容性路由（可使用exact精准匹配，使用Switch分支匹配使其具有排他性），vue是排他性路由

- 路由模式：

  1）hash  HashRouter (hash模式 带#号  刷新的时候页面不会丢失)

  2）browser BrowserRouter (历史记录模式 没有#号 他是通过历史记录api来进行路由切换的，刷新会丢失，本地模式不会)

  ```js
  ### 使用方法
  // 1、下载 npm install --save react-router-dom
  // 2、index.js引用路由模块
  // 3、路由模式包裹根组件
  // 4、引用 import {Route} from 'react-router-dom'
  // 5、配置 Route
  
  //路由导航    Link to="去哪里"
  //           NavLink可以动态设置active的类名
  
  // 重定向   Redirect  from=""  to=""
             this.props.history.push('/')可以实现路由跳转
  
  ### 示例用法
  //1、动态路由
  // <Route path:'/:id'> 和vue类似，parameters可同通过this.props.match.params
  
  //2、nesting路由嵌套
  // 在子组件里继续写路由
  
  //3、query方式传参
  //1、不需要在路由规则中进行传递参数的配置
  //2、直接发送数据
  //3、使用this.props.location.query.xxx
  示例：<Link to={{pathname:'/',query:{name:'xiaoming'}}}><Link>
  
  
  
  ### Route组件加载方法
  1、<Route path='/' component={Home}></Route>
  2、<Route path='/'><Home></Home></Route>
  3、<Route path='/' render={Home}></Route>
  4、<Route path='/' children={Home}></Route>
  
  ####异同
  1) render属性不能渲染类组件,强行使用类组件可以采用下面的方式：<Route path='/' render={(props)=><Home {...props}></Home>}></Route>
      //这里的props实际为Route组件的props，是带有路由信息的
      
  2)children无论路径有没有被匹配都会被渲染，也不能用类组件，
  可通过this.props.match判断其是否被路由匹配
  
  3）嵌套方式取不到路由信息
  
  ##withRouter是从creact-router-dom里解构出来的高阶组件，可以监控<Route></Route>之外的组件路由信息，<Route></Route>、children之外的组件this.props里是没有路由信息的
  
  ```


#### 8、hook(16.7新增)

- 主要是让函数组件拥有类组件的功能

- 使用react Hook中的useState来进行实现

  ```js
  import {useState} from 'react';
  //useState是定义一个状态的，它与类组件的状态不同，函数组件的状态可以实对象也可以是基础数据类型
  //useState返回的是一个数组，第一个是当前的状态值，第二个是对象，表明用于更改状态的函数(类似于setState)
  const App =()=>{
      let{val,setVal}=useState(0)
      return (
      <div>
        使用数据：{val}
        <button onClick={()=>{setVal(val+1)}}>点我加一</button>
      </div>
      )
  }
  
  
  #### 如果有多种方式怎么办？
  //1、声明对象类型的状态
  //2、多次声明
  const App =()=>{
      //声明对象类型的状态
      let{val,setVal}=useState({
          vala:0,
          valb:1,
      })
      return (
      <div>
        使用数据：{val.vala}---{val.valb}
        <button onClick={()=>{setVal(val+1)}}>点我加一</button>
  //如果有多个状态使用其他方法修改
      </div>
      )
  }
  ```

- useEffect  处理副作用(重复的功能开发者要在多个生命周期中重复编写)

  ```js
  //1、从react引入useEffect
  //useEffect类似于componentDidMount和componentDidUpdata
  //2、useEffect 第一个参数接收一个函数，可以用来做一些副作用比如异步请求，修改外部参数等行为，而第二个参数称之为dependencies，是一个数组，如果数组中的值变化才会触发 执行useEffect 第一个参数中的函数。返回值(如果有)则在组件销毁或者调用函数前调用
  //1）.比如第一个 useEffect 中，理解起来就是一旦 count 值发生改变，则修改 documen.title 值；
  //2）而第二个 useEffect 中传递了一个空数组[]，这种情况下只有在组件初始化或销毁的时候才会触发，用来代替 componentDidMount 和 componentWillUnmount，慎用；
  //3） 还有另外一个情况，就是不传递第二个参数，也就是useEffect只接收了第一个函数参数，代表不监听任何参数变化。每次渲染DOM之后，都会执行useEffect中的函数。
  //useEffect(()=>{
    return ()=>{
        console.log('unmount')
    }
  })
  //这样的写法只有销毁时才会执行
  
  #### 做异步请求需要使用自执行函数隔离作用域，否则会和componentUpMount的return冲突
  
  ```

- ##### useContent 减少组件层级(利用useContent可以是provider和consumer一一对应)

  ```js
  import React,{Component,createContent,useContent} from 'react'
  const ExcempleContext =createContent();
  //用ExcempleCOntext.Provider包裹上层组件
  const excemple=useContent(ExcempleContext);
  return <div>{value}</div>
  //上面的方式等于
   <Consumer>
      (value)=>{return <div>{value}</div>}     
   </Consumer>
  ```

- ##### useReducer  这个 Hooks 在使用上几乎跟 Redux/React-Redux 一模一样，唯一缺少的就是无法使用 redux 提供的中间件。

  ```js
  import React,{useReducer} from 'react';
  //组件内 使用下列语句
  const [state,dispath]=useReducer(reducer,defaultData);
  此方法不需要从react里解构Provider
  ```

  

- ##### useCallback 记忆函数   可以优化性能(组件重新渲染会刷新引用)

  ```js
  import React,{useReducer，useCallback} from 'react';
  function App() {
    const memoizedHandleClick = useCallback(() => {
      console.log('Click happened')
    }, []); // 空数组代表无论什么情况下该函数都不会发生改变
    return <SomeComponent onClick={memoizedHandleClick}>Click Me</SomeComponent>;
  }
  
  ### 要配合pureComponent使用，也可以从react中结构出memo,这是一个HOC,也能保证数据不改变就不渲染
  ```

- ##### useMemo记忆组件  更强大

  useCallback(fn, inputs) is equivalent to useMemo(() => fn, inputs).

  区别：useCallback 不会执行第一个参数函数，而是将它返回给你，而 useMemo 会执行第一个函数并且将函数执行结果返回给你

  所以 useCallback 常用记忆事件函数，生成记忆后的事件函数并传递给子组件使用。而 useMemo 更适合经过函数计算得到一个确定的值，比如记忆组件

  ```js
  function Parent({ a, b }) {
    // Only re-rendered if `a` changes:
    const child1 = useMemo(() => <Child1 a={a} />, [a]);
    // Only re-rendered if `b` changes:
    const child2 = useMemo(() => <Child2 b={b} />, [b]);
    return (
      <>
        {child1}
        {child2}
      </>
    )
  }
  ```

- ##### prop更改时重新计算某些数据，使用memoization helper

  ##### [官方文档](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization)

  ```js
  import memoize from 'memoize-one';
  ```

  

#### 9、React项目目录

- src

  - 页面/模块文件夹

    - container 文件夹    放置容器组件(数据获取、状态更新)
    - ui文件夹     放置展示组件(描述如何展现(骨架、样式))
    - actionCreator.js(放置异步请求)
    - actionTypes.js(放置dispatch的type，通过路径命名避免重复)
    - reducer.js(页面/模块独享reducer，定制化方法和数据)
    - index.js 对外的接口 ，用于暴露reducer和整个模块/页面

  - store 文件夹

    - reducer.js   通过redux中结构出的combineReducers整合所有模块的reducer,使用方法如下

      ```js
      const reducer =combineReducers({
          cooksReducer,
      })
      ```

    - index.js 对外的接口，暴露出的reducer可作为createStore的第一个参数

- |                | 展示组件                   | 容器组件                           |
  | -------------: | :------------------------- | :--------------------------------- |
  |           作用 | 描述如何展现（骨架、样式） | 描述如何运行（数据获取、状态更新） |
  | 直接使用 Redux | 否                         | 是                                 |
  |       数据来源 | props                      | 监听 Redux state                   |
  |       数据修改 | 从 props 调用回调函数      | 向 Redux 派发 actions              |
  |       调用方式 | 手动                       | 通常由 React Redux 生成            |

- 这种方式取得的数据是按照未合并的reducer名进行划分的(在组件内使用时即connect方法自动添加，获取数据时是没有的)，使用时需要注意，同时也是保证不同开发者数据不冲突的方法.

#### 10、给路由切换添加动画

[封装](https://www.zhangshengrong.com/p/281omYrgNw/)

[模式](https://zhuanlan.zhihu.com/p/260748979)

使用过程中，页面切换需要前一个页面先离开后一个页面才能进入，这是要使用模式里的方案

PS:实际应用中，一般主页面不动，跳转的页面划入。这个时候就需要 用route的children加载，而children加载类组件又需要以<Route children={(Props)=><组件名 {...Props} />}></Route>



