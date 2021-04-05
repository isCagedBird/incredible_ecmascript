const array = [1, '2', true, { field: 'demo' }]

// find 是数组原型链上的高阶函数查找迭代方法，返回的数据是找到的那一项（undefined没有找到）
// 接受的回调函数参数与forEach相同
// 一旦找到（return 的值是真值）后就会终止循环迭代

{
  const finder = array.find((item, index, thisArray) => {
    console.info(item, index, thisArray)
    return index === 1
  })
  console.info(finder)
}