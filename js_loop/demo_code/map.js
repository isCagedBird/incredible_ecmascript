{
  const array = [1, '2', true, { field: 'demo' }]

  // map 是数组原型链上的高阶函数迭代方法，字面上的自已就是“映射”
  // 把一组数组映射为另一组数组
  // break，continue无效
  // return 不能停止循环

  array.map((item, index, thisArray) => {
    // item 当前迭代项
    // index 当前下标
    // thisArray 当前迭代的数组
    console.info(item, index, thisArray)
    return 0
  })

  // 将 [1, '2', true, { field: 'demo' }]
  // 映射为
  // [0, 0, 0, 0]
}