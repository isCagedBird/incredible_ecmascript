// 与reduce相比，reduceRight是逆序迭代的，其它特性是相同的

{
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  array.reduceRight((prev, item, index, thisArray) => {
    console.info(prev, item, index, thisArray)
  })

  array.reduce((prev, item, index, thisArray) => {
    console.info(prev, item, index, thisArray)
  })
}