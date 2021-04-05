const array = [1, '2', true, { field: 'demo' }]

// while循环使用比较简洁
// 同for循环一样，它使用上是非常灵活的

// while (满足这里的条件（为真）就执行代码块的内容) {
//   迭代内容
// }

// 正向迭代
{
  let index = 0
  while (index < array.length) {
    const item = array[index]
    index++
  }
}
// 反向迭代
{
  let index = array.length - 1
  while (index >= 0) {
    const item = array[index]
    index--
  }
}
// 同时迭代
{
  let i = 0
  let j = array.length - 1
  while (i <= j) {
    const itemOfBefore = array[i]
    const itemOfThen = array[j]
    i++
    j--
  }
}