const array = [1, '2', true, { field: 'demo' }]

// some 是数组原型链上的高阶函数迭代方法
// 返回true，表示回调函数有一轮return是真值；如果没有一轮return真值，则返回false
// 接受的回调函数参数与forEach相同
// 一旦有一轮回调函数return的值是真值后就会终止循环迭代

{
  const is = array.some((item, index, thisArray) => {
    console.info(item, index, thisArray)
    return true
  })
  console.info(is)
}