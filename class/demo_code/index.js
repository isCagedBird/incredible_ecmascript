{
  /**
   * es6 de class 用法
   */
  class TestFather {
    constructor() {
      this.publicPropertyFromFather = 'publicPropertyFromFather'
    }
    consoleLog() {
      console.info('this function come from TestFather')
    }
  }

  class Test extends TestFather {
    static staticProperty = 'staticProperty' // Test 类的静态属性
    #privateProperty = 'privateProperty' // 实例的私有属性，只能在类的内部访问
    publicProperty = 'publicProperty' // 实例的公开属性
    constructor(props) {
      console.info(props)
      super(props)
      this.publicPropertyWhichIsNumber = 123455n // 实例的公开属性
    }
    propertyFunctionWhichInOwn = () => { } // 挂载在实例自身上面的方法
    propertyFunctionWhichInPrototype() { } // 挂载在实例原型链上的方法
    // 实例的访问器属性
    get private() {
      return this.#privateProperty
    }
    set private(value) {
      this.#privateProperty = value
    }
  }

  const test = new Test()

  console.info(
    test,
    Test.staticProperty,
    test.private = 'reset new value'
  )
}

{
  /**
   * es5 的构造函数用法
   */
  var TestFather = function () {
    this.publicPropertyFromFather = 'publicPropertyFromFather'
  }
  TestFather.prototype.consoleLog = function () {
    console.info('this function come from TestFather')
  }

  var Test = function () {
    TestFather.call(this)
    this.publicProperty = 'publicProperty' // 实例公开属性
    this.publicPropertyWhichIsNumber = 123455n // 实例公开属性
    this.propertyFunctionWhichInOwn = function () { } // 挂载到实例上的方法
    var privateProperty = 'privateProperty' // 实例的私有属性，外部不能访问
    Object.defineProperties(this, {
      private: { // 为实例定义private属性的访问器
        enumerable: true,
        get() {
          return privateProperty
        },
        set(value) {
          privateProperty = value
        }
      }
    })
  }
  Test.staticProperty = 'staticProperty' // Test构造函数的静态属性
  Test.prototype = Object.create(TestFather.prototype)
  Test.prototype.propertyFunctionWhichInPrototype = function () { } // 挂载到Test构造函数上面的方法

  var test = new Test()

  console.info(
    test,
    Test.staticProperty,
    test.private = 'reset new value'
  )
  console.info(test.private)
}