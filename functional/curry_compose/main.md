### 函数柯里化
隶属于函数式编程的一种做法，柯里化可以把接受多个参数的函数转换成接受单一参数、并且返回接受剩余参数，return结果的新函数。具体可以这样来做：  
[demo_code](../demo_code/curry_compose.js)
```javascript
const curry = cb => {
  if(typeof cb !== 'function') throw new TypeError('argument is not function')
  const f = (...list) => {
    if(list.length < cb.length){
      return (...args) => f(...list,...args)
    }else{
      return cb(...list)
    }
  }
  return f
}


let test = curry((a,b,c,d,e) => console.info(a,b,c,d,e)) 
test()()(1)()(2, 3)()(4)(5)
// 打印 1 2 3 4 5

let sum = curry((a, b, c, d, e) => a + b + c + d + e)
sum()()(1)()(2, 3)()(4)(5)
// 返回 15
```
上面的demo里面，curry函数将接受到的一个回调函数形参柯里化，当返回的函数接受的参数不足回调函数的原始参数数目时，会一直返回闭包函数，直到参数数目相等，才会执行这个回调函数。
### compose 函数
柯里化函数和组合函数内部实现都依赖于JavaScript的闭包，我们来看看怎样实现一个组合函数：
```javascript
const compose = (...list) => {
  if(!list.length) return
  return list.reduce((p, item) => (...args) => p(item(...args)))
}

let test = compose(
  x => x - 1,
  x => x ** 2,
  x => x + 1
)

test(2) // 返回值是 8
```
上面的compose函数把一系列的形如数学函数的纯函数从后往前依次执行，对2这个传入的参数，先加一，再求平方，最后结果减一。