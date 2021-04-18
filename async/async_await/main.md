### async函数
如果要用一句话来概括js里的async函数的话，可以这样来说：async函数是 Generator函数 + 自动执行器 + Promise的融合。从表达形式上看，async函数可以以编写同步代码的形式来编写异步代码。语法的使用上是较为简单的，但也有一些需要特别注意的地方。  
[demo_code](../demo_code/async.js)
### 语法
async函数就是在普通函数的前面加上一个`async`关键词，告诉解释器，此函数内包裹着异步代码。
```javascript
{
  async function thisIsAsync(){}

  const thisIsAsync = async function(){}

  const thisIsAsync = async () => {}
}
```
async函数最终会返回一个Promise，这个最终返回的Promise可以是显示返回的，也可以是解释器隐式返回，通过使用`Promise.resolve(theReturnValue)`包裹。async函数内部接受`await`表达式，await关键字后面跟上一个Promise对象、含有then方法的对象（鸭子辨型？）或者一个非前面两种的普通数据，比如number字面量。
```javascript
{
  class HasThen{
    then(resolve, reject){
      // 其他逻辑包含在内
    }
  }
}
```
需要注意的是await 表达式只能在async函数内部使用。
### 执行机制
在执行一个内部含有多个await表达式的async函数时，从该函数顶部作用域执行到第一个await表达式的时候，async函数会执行await表达式右边的语句，然后暂停自身的执行，把执行权让渡到外界作用域去执行，等待到await表达式后面的异步操作执行完后，再回来从上一次暂停的地方继续执行，这样重复执行第2个、第3个、第n个await表达式；如果await表达式后面跟着的不是Promise对象，或者含有then方法对象，而是一个普通的表达式语句，async函数也会先执行await表达式右边的语句，然后还是暂停自身执行，让出控制权去执行外界逻辑，再返回从上一次停下的地方继续执行。  
**这一段话有些抽象，看下下面的代码块一、代码块二，翻译成Promise的形式就是代码块三：**
```javascript
{
  // 代码块一
  const returnPromiseByValue = value => new Promise(resolve => setTimeout(() => resolve(value), 3000))

  const test = async () => {
    let value = await returnPromiseByValue(1)
    console.info(value)
    value = await returnPromiseByValue(2)
    console.info(value)
    value = await returnPromiseByValue(3)
    console.info(value)
    return 4
  }

  test().then(value => console.info(value))
}
```
```javascript
{
  // 代码块二
  class HasThen{
    constructor(value){
      this.value = value
    }
    then(resolve){
      setTimeout(() => resolve(this.value), 3000)
    }
  }

  const test = async () => {
    let value = await new HasThen(1)
    console.info(value)
    value = await new HasThen(2)
    console.info(value)
    value = await new HasThen(3)
    console.info(value)
    return 4
  }

  test().then(value => console.info(value))
}
```
```javascript
{
  // 代码块三
  const returnPromiseByValue = value => new Promise(resolve => setTimeout(() => resolve(value), 3000))

  const test = async () => {
    return returnPromiseByValue(1)
      .then(value => {
        console.info(value)
        return returnPromiseByValue(2)
      })
      .then(value => {
        console.info(value)
        return returnPromiseByValue(3)
      })
      .then(value => {
        console.info(value)
        return 4
      })
  }

  test().then(value => console.info(value))
}
```
上面代码块一、二与代码块三的运行结果是相同的，3秒后打印1，3秒后打印2，3秒后打印3、4。这是个简单的串行异步执行，下一个异步的执行需要上一个异步任务完成。根据上文说的执行机制，看看下面这段代码执行情况：
```javascript
{
  // 代码块一
  const timeOutByValue = value => {
    setTimeout(() => console.info(value), 3000)
  }

  const test = async () => {
    let value = await timeOutByValue(1)
    console.info(value)
    value = await timeOutByValue(2)
    console.info(value)
    value = await timeOutByValue(3)
    console.info(value)
    return 4
  }

  test().then(value => console.info(value))
}
```
这段代码将会先打印 undefined * 3、4，然后间隔3秒，同时打印1、2、3。这是个简单的并发异步执行。
### 串行异步、并发异步
在日常开发中，串行异步还有并发异步这两种情景是经常出现的。针对这两种场景，我们需要好好地规划异步流程控制。
```javascript
{
  // 并发异步
  function hold(list){
    for(let item of list){
      setTimeout(() => console.info(item), 3000)
    }
  }

  hold([1, 2, 3, 4])
}
```
```javascript
{
  // async 函数实现串行异步
  async function hold(list){
    const returnPromiseByValue = value => new Promise(resolve => setTimeout(() => {
        console.info(value)
        resolve()
      }, 3000))

    for(let item of list){
      await returnPromiseByValue(item)
    }
  }

  hold([1, 2, 3, 4])
}
```
```javascript
{
  // promise 实现串行异步
  function hold(list){
    const returnPromiseByValue = value => new Promise(resolve => setTimeout(() => {
        console.info(value)
        resolve()
      }, 3000))

    let chain = Promise.resolve()
    list.forEach(item => {
      chain = chain.then(() => returnPromiseByValue(item))
    })
  }

  hold([1, 2, 3, 4])
}
```
从代码的语义化和可读性上来看，promise实现的串行异步无疑是比async函数实现的稍差了些。