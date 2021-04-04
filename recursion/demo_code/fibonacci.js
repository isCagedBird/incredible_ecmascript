/**  
 * 求斐波那契数列第 count 项的值
 */
const fib = count => {
  if (count <= 2) return 1
  const core = (l = 3, n1 = 1, n2 = 1) => {
    if (l > count) return n2
    return core(l + 1, n2, n1 + n2)
  }
  return core()
}

// fib(20)

// 1 1 2 3 5 8 13 21 34...
// 1 2 3 4 5 6 7  8  9 ...