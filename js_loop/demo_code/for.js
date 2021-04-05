const array = [1, '2', true, { field: 'demo' }]

// for循环是js中使用较多的一种循环迭代控制方法
// 1.它的使用是非常灵活的，我们可以自由的控制其迭代方向、方式
// 2.如果循环的代码块包裹在函数内，使用return可以终止循环，我们可以使用continue跳过此次循环，使用break跳出循环

// for (迭代初始执行语句; 满足这里的条件迭代就一直执行（为真）; 每轮迭代都会执行语句) {
//   迭代内容
// }


// 正向迭代
for (let i = 0; i < array.length; i++) {
  const item = array[i]
}
// 反向迭代
for (let i = array.length - 1; i >= 0; i--) {
  const item = array[i]
}
// 同时迭代
for (let i = 0, j = array.length - 1; i <= j; i++, j--) {
  const itemOfBefore = array[i]
  const itemOfThen = array[j]
}