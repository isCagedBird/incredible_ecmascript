/**
 * 从 1 累加到 n
 * 返回结果
 */
var add = (n, sum = 0) => {
  if (!n) return sum
  return add(n - 1, sum + n)
}