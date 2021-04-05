const array = [1, '2', true, { field: 'demo' }]

// every 是数组原型链上的高阶函数迭代方法
// 返回true，表示回调函数每一轮return都是真值，否则返回false
// 接受的回调函数参数与forEach相同
// 一旦有一轮回调函数return的值是假值后就会终止循环迭代

{
  const is = array.every((item, index, thisArray) => {
    console.info(item, index, thisArray)
    return true
  })
  console.info(is)
}