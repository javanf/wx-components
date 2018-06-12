`wx-components主要管理微信小程序组件`

# Specification

## 命名规范

### 文件和文件夹命名
* 文件夹和文件名采用英文小写字母命名，多个英语单词用 “-” 分割，不使用驼峰命名，如：hello-world
* 编写组件使用 “c-” 打头，如：编写一个select组件，文件夹或者文件名定义[**c-select(点击可查看)**](http://gitlab.ziztour.loc/tmc/tmc-h5-flight/tree/dev/client/vue/components/c-select)

### 样式表命名
* 样式表命名采用英文小写字母命名，多个英语单词用 “-” 分割，不使用驼峰命名，如：hello-world
* autoprefixer自动补全适配浏览器的前缀，因此可以不用写兼容代码
* ./client/css/utils下面的function和mixin可以直接使用，如：px2rem

### JS命名
* js变量使用驼峰命名，不使用-号分割

```JS
// 不推荐
let foo_bar = 'hello eleme';

// 推荐
let fooBar = 'hello eleme';
```

* 常量要大写

```JS
// 不推荐
let prefix = 'http://service.ziztour.net/api/';
let Prefix = 'http://service.ziztour.net/api/'

// 推荐
const PREFIX = 'http://service.ziztour.net/api/';
```

* 定义dispatch或者commit的请求类型时，按照A_打头代表action，M_打头代表mutation的方式区分请求类型

### 注释命名
* 在stylus和js文件中添加注释时，在“//”后面加入空格再添加文字

```bash
/*不推荐*/
//不推荐
; // 不推荐

/* 推荐 */
// 推荐
;
```

* 在写pug模板时，在“//”后面最好加上-再空格，因为“//”会被转义成<!---->，“//-”不会被转义成任何东西

## 统一代码风格

### Stylus代码风格
* 2个空格缩进，UTF-8 编码
* 如果你的代码中包含大括号，确保大括号与选择器之间留空，冒号后面留空，注释内外前后留空

```CSS
/* 我是注释 */
div { /* 我是注释 */ }
span {
  color: red; /* 我是注释 */
}
```

* 一个选择器中有多个样式声明时每条写一行
* 多个选择器使用逗号隔开时写在不同的行，修改时不容易漏掉逗号后面的选择器

```CSS
div,
span
  color: red
  font-size: 12px

```

* 用逗号分隔的多个样式值写成多行，便于阅读与编辑

```CSS
.block 
  box-shadow: 0 0 0 rgba(#000, 0.1),
              1px 1px 0 rgba(#000, 0.2),
              2px 2px 0 rgba(#000, 0.3),
              3px 3px 0 rgba(#000, 0.4),
              4px 4px 0 rgba(#000, 0.5)
```

* 避免使用 ID 选择器，权重太高，不易维护
* @require和@import支持引入css文件，避免首页产生过多HTTP请求，可以使用这两个关键字合并css文件
* 0 值的单位建议省略，但不强制，因为大部分 0 值的单位是没用的
* 类名中的字母一律小写，只使用字母、数字以及“-”，因为解析样式表时不区分大小写

### JS代码风格
* 2个空格缩进，UTF-8 编码
* 打开严格模式

```JS
'use strict'; // 写在文件顶端
```

* 使用单引号，这样可以跟 HTML 的双引号更好的一起工作
* 在语句（Statement）的结尾加分号

```JS
// 不建议
const fn = function() {
  // Long code
} // 没有分号

// 建议
const fn = function() {
  // Long code
}; // 这里有分号

/* 踩坑 */
const f1 = function ff1() {
  return function() {
    return 1;
  };
} // 此处漏写分号
(function() { // 此处调用了上面的ff1，WHAT THE FUCK
})();
console.log(f1); // 1

const f2 = function ff2() {
  return function() {
    return 1;
  };
} // 此处漏写分号
// IIFE
;(function() { // 注意前面的分号
})();
console.log(f2); // function
```

* 在二元和三元运算符的符号与操作数之间添加空格，在非行末的 , ; } 后添加空格，在 { 前添加空格。并在每个逻辑块中间添加空白行。 特别的，在 if、while 等关键字后加空格，与函数调用做区分

```JS
// 不推荐
let foo='bar',hello=foo+2,test=true;
function hi(){
  // ...
}
if(foo&&hello){
  // ...
}else if(foo){
  // ...
}else if(! test){
  // ...
}

// 推荐
let foo = 'bar';
let hello = foo + 2;
let test = true;

function hi(arg1, arg2) {
  // ...
}

if (foo && hello) {
  // ...
} else if (foo) {
  // ...
} else if (!test) {
  // ...
}
```

* 不要为大括号另写一行

```JS
// 不推荐
if (foo)
{
  // ...
}

// 推荐
if (foo) {
  // ...
}

// 不允许
return
{
  a: 1
};

// 一定要
return {
  a: 1
};
```

* 写 else 时不要另起一行

```JS
// 不推荐
if (test) {
  things1();
  things2();
}
else {
  things3();
}

// 推荐
if (test) {
  things1();
  things2();
} else {
  things3();
}
```

* 使用变量之前必须先定义，不要定义全局变量

```JS
// 变量 undefinedVar 从未定义过
undefinedVar = 1; // 严格模式中报错
console.log(global.undefinedVar); // 1

// 不推荐
let hello = 1, world = 2;

// 推荐
let hello = 1;
let world = 2;
let foo, fee, fxx;

/* 变量和闭包遇到的坑 */
void function () {
  for (let i = 0; i < arr.length; ++i) {
    (function () {
      console.log(i); // undefined i不在闭包范围内

      for (let i = 0; i < 10; ++i) {
        // Do some other things
      }
    })();
  }
}();

const elements = [ div1, div2, div3 ];
for (let i = 0; i < elements.length; ++i) {
  elements[i].addEventListener('event', function() {
    console.log(i); // 3
  });
}
```

* 使用字面量

```JS
// 不建议
const obj = new Object();
const array = new Array();

// 推荐
const obj = {};
const array = [];

// 鉴于 Array 构造函数的特殊性，不建议
const arr1 = new Array(4, 5, 6); // [4, 5, 6]

// 以免与下面混淆
const arr2 = new Array(4); // [ undefined * 4 ]
// 等价于（不推荐）
const arr3 = [];
arr3.length = 4;
// 等价于（不推荐）
const arr4 = [,,,,];
console.log('0' in arr2, '0' in arr3, '0' in arr4); // false, false, false

// 不推荐
let str = new String('str');
console.log(str === 'str'); // false

let bool = new Boolean(false);
if (bool) {
  console.log('wat'); // wat
}

// 当真需要使用字面量包装类时，使用显式强制转换（请先三思）
let strObject = Object('str');
strObject.customProperty = someValue;
```

* 建议使用 ===/!== 而非 ==/!=，== 的规则比较复杂，大家可能记不住

```JS
// 不推荐
function foo(a) {
  if (a == 123) {
    // ...
  }
}

// 推荐
function foo(a) {
  a = Number(a);
  if (a === 123) {
    // ...
  }
}

// 隐式转换
let a = '';

// false
if (a === 0);

// true
if (a == 0);
```

* 对于可能不存在的全局引用可以先做如此判断

```JS
if (typeof localStorage !== 'undefined') {
  // 此时访问 localStorage 绝对不会出现引用错误
}

// Or
if ('localStorage' in self) {
  // 此时访问 localStorage 绝对不会出现引用错误
}

/* 区分 undefined */
let a = undefined;

// 判断一个全局变量是否有声明
'a' in self; // true

// 判断一个变量是否为 undefined 并将未声明的引用作为 undefined 处理
typeof a !== 'undefined'; // false

```

* 避免无必要的 if 语句、三元运算符

```JS
const arr = [1, 2, 3];

// 不推荐
let flag1 = arr.length > 0 ? true : false;

// 不推荐
let flag2;
if (arr.length > 0) {
  flag2 = true;
} else {
  flag2 = false;
}

// 推荐
let flag3 = arr.length > 0;
```

* 合理的格式化三元运算符

```JS
// 不推荐
let flag1 = veryLooooooooooonnnnggggggCondition ? resultWhenTruth : resultWhenFalsy;

// 推荐
let flag2 = veryLooooooooooonnnnggggggCondition
              ? resultWhenTruth
              : resultWhenFalsy;
```

* 复杂逻辑中建议使用显式转换

```JS
+num === Number(num);
!!bool === Boolean(bool);
str + '' === String(str);

// 特别的
if (bool)
// 等价于
if (Boolean(bool))
// 故
if ([]) {
  console.log('true'); // true
}
// 而
if ([] === true) {
  console.log('true'); // 无输出
}

// 另外
if (Boolean(String(false))) {
  console.log('true'); // true
}
```

* 不要使用 parseInt 做整数转换，如需使用 parseInt，请给它传入第二个参数 10，在IE上有BUG，WHAT THE FUCK

```JS
let floatValue = 123.456;

// 不要
let intValue = parseInt(floatValue);

// 可以用
let intValue2 = floatValue | 0;

// 更显然的
let intValue3 = Math.floor(floatValue);
```

* 特殊的数字处理使用 parseFloat 作转换

```JS
// 例如有：
// <div id="div" style="width: 10px"></div>

let divWidth = getComputedStyle(document.getElementById('div')).width; // '10px'

console.log(parseFloat(divWidth)); // 10
console.log(Number(divWidth)); // NaN
console.log(+divWidth); // NaN
```

* 如果想自定义的函数按照从上至下的顺序被执行，那你需要使用表达式来定义函数，而不是函数语句

```JS
// 不推荐
function fee() {
  // ...
}

// 推荐
const foo = function() {
  // ...
};

/* confused */
void function() {
  // 此处可以正常使用函数，但逻辑不清晰
  foo();

  return null;

  function foo() {};
}();
```

* 只引用一次的函数建议匿名定义，因为名称存在主观因素

```JS
// 不推荐
const foo = function() {
  // ...
};
element.onclick = foo;

// 推荐
element.onclick = function() {
  // ...
};
```

* 自执行函数

```JS
// 不推荐
(function() {
  // ...
})();

+function() {
  // ...
}();

// 推荐
!function() {
  // ...
}();

// 推荐
void function() {
  // ...
}();

/* 踩坑 */
let a = 1 // 此处无分号

+function() {
  return 2
}();

// 此处 a 的值为 3
```

* 使用Promise解决嵌套问题

```JS
// 不推荐
async1(function() {
  // TODO 1
  async2(function() {
    // TODO 2
    async3(function() {
      // TODO 3
    });
  });
});

// 推荐
Promise.resolve()
  .then(function() {
    return new Promise(function(resolve) {
      async1(resolve);
    });
  })
  .then(function() {
    // TODO 1
    return new Promise(function(resolve) {
      async2(resolve);
    });
  })
  .then(function() {
    // TODO 2
    return new Promise(function(resolve) {
      async3(resolve);
    });
  })
  .then(function() {
    // TODO 3
  });
```

* 禁止使用未定义的变量
* 禁止使用 eval，非用不可时可以使用 Function 构造器替代
* 禁止使用 with 语句
* 禁止在块作用域中使用函数声明语句

```JS
if (true) {
  // 禁止
  function func1() {
    // ...
  }
  // 允许
  const func2 = function() {
    // ...
  };
}
```

* 禁止使用 arguments 映射

```JS
void function(a) {
  arguments[0]++;
  // 此处 a 为 2
}(1);
```

* 禁止使用保留字做变量名如 interface 等