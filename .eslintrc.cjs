module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    quotes: [2, 'single'], // 引号类型 `` "" ''
    'space-before-function-paren': [0, 'always'], //函数定义时括号前面要不要有空格
    'no-spaced-func': 2, //函数调用时 函数名与()之间不能有空格
    'no-alert': 2, //禁止使用alert confirm prompt
    'no-array-constructor': 2, //禁止使用数组构造器
    'no-bitwise': 0, //禁止使用按位运算符
    'no-caller': 1, //禁止使用arguments.caller或arguments.callee
    'no-catch-shadow': 2, //禁止catch子句参数与外部作用域变量同名
    'no-class-assign': 2, //禁止给类赋值
    'no-cond-assign': 2, //禁止在条件表达式中使用赋值语句
    'no-const-assign': 2, //禁止修改const声明的变量
    'no-constant-condition': 2, //禁止在条件中使用常量表达式 if(true) if(1)
    'no-continue': 0, //禁止使用continue
    'no-control-regex': 2, //禁止在正则表达式中使用控制字符
    'no-delete-var': 2, //不能对var声明的变量使用delete操作符
    'no-div-regex': 1, //不能使用看起来像除法的正则表达式/=foo/
    'no-dupe-keys': 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-dupe-args': 2, //函数参数不能重复
    'no-duplicate-case': 2, //switch中的case标签不能重复
    'no-empty': 2, //块语句中的内容不能为空
    'no-fallthrough': 1, //禁止switch穿透
    'no-floating-decimal': 2, //禁止省略浮点数中的0 .5 3.
    'no-func-assign': 2, //禁止重复的函数声明
    'no-multiple-empty-lines': [2, { max: 2 }], //空行最多不能超过2行
    'id-match': 0, //命名检测
    'quote-props': [2, 'as-needed'], //对象字面量中的属性名是否强制双引号
    'no-self-compare': 2, //不能比较自身
    'no-sequences': 0, //禁止使用逗号运算符
    'no-ex-assign': 2, //禁止给catch语句中的异常参数赋值
    'no-empty-character-class': 2, //正则表达式中的[]内容不能为空
    yoda: [2, 'never'], //禁止尤达条件
    'no-prototype-builtins': 0,
    'no-explicit-any': 0,
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: true,
        allowedNames: ['vm'],
      },
    ],
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-empty-function': 0,
  },
}
