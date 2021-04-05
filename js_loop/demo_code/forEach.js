const array = [1, '2', true, { field: 'demo' }]

// forEach 是数组原型链上的高阶函数迭代方法
// break，continue无效
// return 不能停止循环

array.forEach((item, index, thisArray) => {
  // item 当前迭代项
  // index 当前下标
  // thisArray 当前迭代的数组
  console.info(item, index, thisArray)
})