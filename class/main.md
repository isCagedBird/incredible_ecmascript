自从es6引进了class后，在js中书写面向对象的代码终于不再像古早时期那样繁复杂乱了，本文就来对比一下分别使用es5语法、es6语法的差异点。需要注意的一点是，在js中并没有真正引入了类的概念，依旧是利用原型链来实现的面向对象。在es6中，class就是原先的构造函数，typeof 后的结果也是一个function，类其实就是es6提供的语法糖。
```javascript
// 1. 首先来构建一个Test类，包含类静态属性、实例公开属性、实例私有属性、实例自身方法、原型链方法、访问器属性
// 2. 构建一个TestFather类，包含实例公开属性、原型链方法
// 3. Test类继承TestFather类
// 4. new 一个Test类的实例对象
```
先来看看es6简洁方便的写法：
```javascript
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
```
```javascript
// 通过 # 符号，我们可以声明实例的私有属性，这个属性只能在类的内部访问
// 通过 static 关键字，我们可以定义静态属性，原理实际就是 Test.xxx = '...'
// 在类的构造器函数内，存在继承的情况下，一定要使用 super 来将父类的实例属性定义到自身上面来
// 类的外部生成实例后，如果想访问私有属性，我们可以通过访问器属性来实现，这里就是实现了一个 private 的私有属性访问器
// 通过箭头函数来声明一个方法时，这个方法不会被挂载到原型链上，会被挂载到实例自身上
```
然后再来看看es5的写法：
```javascript
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
```
```javascript
// es5 实现面向对象的继承方法很多，这里使用的是原型链（继承原型链属性及方法）+借用父类构造函数的方式（继承自身的属性）
// 通过 Object.create(obj) 可以获得一个以obj为原型的对象
// 通过变量 privateProperty 实现了私有属性的功能，这个变量只能在构造函数的内部访问
// 通过Object.defineProperties设定数据存取符，将 privateProperty 变量与外界沟通，达成闭包
// Test的实例可以通过 .private 的方式来读写私有属性
```
对比之下，es6的写法其实内聚程度更高，相关的逻辑可以整合在一起，es5的写法兼容性会更好一些。  
[demo_code](./demo_code/index.js)