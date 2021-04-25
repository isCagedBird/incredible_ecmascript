### 开始之前
`js`在芸芸众编程语言中较为独树一帜的一点是它是一门单线程的语言。你可能会想，既然是单线程的语言，如何能做到异步编程这一点呢？不急我们可以先来看一个例子。

[从这里找到 `anima` 方法的代码](./demo_code/anima.js)  
[从这里找到 `ball` 方法的代码](./demo_code/ball.js)
```javascript
/** 
 * 动画方法，按照一定的时间间隔依次执行
 */
const anima = set => {
  ;[1, 2, 3, 4, 5, 6].reduce((p, i) => {
    return p.then(_ =>
      new Promise(resolve => {
        setTimeout(_ => {
          console.info(i)
          set(i * 100)
          resolve()
        }, 1000)
      }))
  }, Promise.resolve())
}
/**
 * 创建小球的方法
 */
const ball = () => {
  const ball = document.createElement('div')
  const style = { top: '0px' }

  const h = s => Object.entries(Object.assign(s, {
    position: 'fixed',
    right: 'calc(50% - 25px)',
    background: 'rgba(255, 0, 0, .5)',
    'border-radius': '50px',
    width: '50px',
    'z-index': 999999999n,
    height: '50px',
  })).reduce((p, [k, v]) => {
    p += `${k}:${v}!important;`
    return p
  }, '')

  ball.setAttribute('style', h(style))
  document.body.append(ball)
  return top => {
    ball.setAttribute('style', h({ top: `${top}px` }))
  }
}
// 将 anima，ball 方法以及下面的代码依次复制

let set = ball()
anima(set)

// 你可以打开一个新的空白浏览器 tab 页
// 打开控制台，粘贴代码，按下 enter 键
// 结果是：
// 你会看见一个红色的小球每间隔一秒下滑一段距离，同时控制台依次打印出 1, 2, 3, 4, 5, 6

```
上面的动画小例子说明了`js`作为单线程的语言，却可以方便的做到异步任务的代码结构控制。  
[先来了解一下js的事件循环机制](../event_loop/main.md)   
### js异步编程的发展
分为四个时期：
- 史前的`callback`时期，大量嵌套会造成callback hell
  - [callback]()
- 最主要解决callback hell的问题，由社区发展出的`Promise`方案
  - [Promise]()
- 可以中断函数执行的`Generator/yield`函数
  - [Generator/yield]()
- Generator与Promise的语法糖，可以像写同步代码一样书写异步逻辑的`async/await`函数
  - [async/await](./async_await/main.md)