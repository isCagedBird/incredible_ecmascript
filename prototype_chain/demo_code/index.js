{
  const thisIsNumber = 1000
  const thisIsBoolean = true
  const thisIsString = 'funny'
  const thisIsSymbol = Symbol()
  const thisIsBigInt = 1000n
  const thisIsArray = []
  const thisIsFunction = () => { }
  const thisIsPromise = Promise.resolve()
  const thisIsAsyncFunction = async () => { }
  const thisIsGeneratorFunction = function* () { }
  const ThisIsRegExp = /^[\d]+[^\d]*/g

  const list = [
    thisIsNumber,
    thisIsBoolean,
    thisIsString,
    thisIsSymbol,
    thisIsBigInt,
    thisIsArray,
    thisIsFunction,
    thisIsPromise,
    thisIsAsyncFunction,
    thisIsGeneratorFunction,
    ThisIsRegExp,
  ]

  list.forEach(item => {
    // 查看上述各种类型的隐式指针
    console.info(
      item.__proto__
    )
  })
}


{
  // 内置函数构造函数
  console.info(
    Function.prototype
  )

  function Dog () { }

  // 自定义的 Dog 构造类
  console.info(
    Dog.prototype
  )
}

{
  // 自定义 Dog 构造函数
  function Dog () { }

  const list = [
    Object.__proto__ === Function.prototype,
    Object.prototype.__proto__ === null,
    Object.prototype.constructor === Object,

    Function.__proto__ === Function.prototype,
    Function.prototype.__proto__ === Object.prototype,
    Function.prototype.constructor === Function,

    Dog.prototype.__proto__ === Object.prototype,
    Dog.__proto__ === Function.prototype,
    (new Dog()).__proto__ === Dog.prototype
  ]

  console.info(list) // all item of list is true
}
