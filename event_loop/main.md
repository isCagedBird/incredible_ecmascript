js是一门单线程的语言。简单来说，在浏览器中，每新打开一个网页，浏览器就会新打开一个工作进程，该进程下绘制`dom`及样式的线程与js执行线程是互斥的，同一时间段只能有其中一个在CPU执行，该进程里面js引擎执行线程就是一个单线程；在node.js中，我们通过`node index.js`开始执行脚本，同样js引擎执行线程也是单线程的。

- 为什么设计之初，js就是一门单线程的语言呢？  
原因之一：js多线程进行`dom`操作会带来不可预测性。举个例子，我们在A线程创建了一个div元素，把它追加到body上；然后在B线程因为某种if逻辑把它remove掉，此时A线程对div做其它的操作，比如给它设置样式，然而div已经被remove了，会报异常。  
原因之二：js从诞生之初就被设计为一门简单的脚本语言，不应该加上复杂的多线程同步（现在浏览器的`web worker`、node.js的`worker_threads`是两个运行时的新增特性，支持多线程），早期的设计是把它作为一门单线程的语言。

- 事件循环
  - 执行栈，异步任务队列  
  js执行代码有同步执行和挂起延后执行两种，同步任务会在执行栈中直接执行，而一个个的异步任务都会被push进任务队列里，执行时刻到了，会先进先出地push进执行栈中执行完。这个过程会一轮轮地执行，直到执行栈、任务队列都被清空了，这是事件循环的一个简化的描述。
  ![事件循环](../asset/event_loop.png)
  - 宏任务队列、微任务队列
  异步任务分为很多种，他们的执行的优先权重也有不同。在每一轮的事件循环中，微任务会优先宏任务push进执行栈。`Promise`的`then`、`catch`、`finally`，`MutationObserver`、`process.nextTick`等都属于微任务；`requestAnimationFrame`，`setImmediate`，`setTimeout`，`setInterval`等是宏任务

- demo
  举个例子加深理解吧
  ```javascript
  console.info(1) // 任务1

  setTimeout(_ => console.info(2), 100) // 任务2

  setTimeout(_ => console.info(3)) // 任务3

  new Promise(resolve => {
    setTimeout(_ => console.info(4)) // 任务4
    console.info(5) // 任务5
    resolve()
    async function asy () {
      await setTimeout(_ => console.info(6)) // 任务6
    }
    asy()
  })
    .then(_ => console.info(7)) // 任务7
    .finally(_ => console.info(8)) // 任务8

  console.info(9) // 任务9
  ```
  看看上面这段代码从上到下执行依次打印出来的数字是啥  
  [demo_code](./demo_code/index.js)  
  - 解析  
    根据之前说的事件循环模型，上面这段代码从上到下执行会先完成同步任务，而遇见微任务就push进微任务队列，遇见宏任务就push进宏任务队列。  
    第一步：任务1、任务5、任务9是同步任务，会先执行，即打印1、5、9  
    第二部：代码自上而下执行中，resolve对应then回调、asy、finally是微任务，他们会优先宏任务执行，即打印7、任务6推入宏任务队列、打印8  
    第三部：代码自上而下执行中，任务2、任务3、任务4会依次推入宏任务队列，微任务执行，又将任务6推入宏任务队列，任务2指定了延时时间200毫秒。即打印3、4、6、2  
- 影响  
  事件循环带来的影响是积极的，通过这种模型，即使是js这种单线程语言也能高效地编排执行异步任务。在node.js运行时上，得益于事件循环的执行机制，其在`I/O密集型`场景具有可观的性能表现。