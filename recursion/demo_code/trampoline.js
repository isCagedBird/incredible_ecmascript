/**  
 * 永不爆栈的递归函数 add
 */

var add = count => {
  const add = (n, sum = 0) => !n ? sum : () => add(n - 1, sum + n)
  let result = add(count)
  while (typeof result === 'function') result = result()
  return result
}

