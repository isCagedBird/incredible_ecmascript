const array = [1, '2', true, { field: 'demo' }]

// do while循环的特点和while循环差不多

let i = 0
do {
  console.info(array[i])
  i++
} while (i < array.length)


// 打印一个 * 三角形

// **********
// *********
// ********
// *******
// ******
// *****
// ****
// ***
// **
// *

{
  const LEN = 10
  let i = 0

  do {
    let j = i
    let str = ''
    do {
      str += '*'
      j++
    } while (j < LEN)

    console.info(str)
    i++
  } while (i < LEN)
}