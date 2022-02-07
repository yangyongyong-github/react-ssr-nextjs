# 登录接口

services / request.js
这里由于库本身bug的原因，不再使用代理
不再使用 api文件夹
浏览器保存登录信息：

pages / login.jsx

services / loginService.js 设置登录
主要解决的有：
 方式一cookie，
方式二：Response Header : authorzation 中 不限于浏览器，可以是移动端等
以及保存登录状态到local story中，为token属性

# nextjs 组件之间，共享数据 
不支持redux，但是我们需要自行的处理一下，自己想了一个解决办法，比较的绕
`npm i redux react-redux redux-thunk`


`movie / _app.js` 


## 1. store/ index.js
```js
/**
 * 创建仓库的函数 makeStore() 便于后面的每次函数创建一个新的仓库
 * -    该函数保证，如果是服务器端，每一次调用产生一个新的仓库
 * -    如果是客户端，每一次调用返回同一个仓库
 * @param {*} initialState 仓库的初始值
 */
export default function(initialState) {
  if (isBrowser()) {
    //客户端
    if (!store) {
      store = create(initialState);
    }
    return store; //返回已有仓库
  }
  return create(initialState);
}

function create(initialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
}
```
## 2. pages / redux.jsx 测试一些我们写的store

> 分析
我们先在_app.js宏

这里需要解决的问题有：
页面组件渲染之前，输入数据时怎么办？新建一个无状态的仓库
**组件渲染之前，新建一个无状态的仓库**


// 在服务器端运行 组件渲染之前，
// 这时候，我们需要向仓库中注入数据的时候
redux.jsx
```js
export async function getServerSideProps() {
  const store = makeStore();
//   触发action，修改仓库
  await store.dispatch(actions.asyncIncrease());
//   仓库有数据了
return{
    // 返回一个特殊的属性，同步仓库中的数据 
    props:{
        _initialState: store.getState();
    }
}
}
```
<!-- 不管运行多少遍，client端只创建一个store -->

页面要保留状态，或者 每一个页面需要创建一个自己的仓库

# 登录页面 实现
前面由于这里内置使用 流的方式，使得我们误认为不能使用代理服务器。
`bodyParser: false`,  不要解析，当成流来处理

【浏览器】　-----body------ (body-parser)【nextjs 代理服务器 http-proxy-mid】 ---------body---------- 【 数据服务器】

> 使用代理服务器
api / 

## 浏览器端请求服务器
【浏览器】　------cookie------【nextjs 代理服务器 http-proxy-mid】 ---------header-----(面向较广，需要实现多对一)----- 【 数据服务器】
代理服务器下，浏览器最好使用cookie

loginService.js

两种方式：
【浏览器】　-----请求页面------ 【nextjs 】 ---------header---------- 【 数据服务器】
【浏览器】　-----ajax------ 【代理服务器 http-proxy-mid】 ---------header---------- 【 数据服务器】
