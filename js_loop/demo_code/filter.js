{
  const array = [1, '2', true, { field: 'demo' }]

  // filter 是数组原型链上的高阶函数迭代方法，字面上的自已就是“过滤”
  // 把回调函数return为真值的项保留下来，为假值的项过滤掉
  // break，continue无效
  // return 不能停止循环

  array.filter((item, index, thisArray) => {
    // item 当前迭代项
    // index 当前下标
    // thisArray 当前迭代的数组
    console.info(item, index, thisArray)
    return index === 2 || index === 3
  })
}