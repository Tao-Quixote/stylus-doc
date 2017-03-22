# 富于表现力的, 动态的, 健壮的CSS

## CSS需要一个超级英雄

    body {
      font: 12px Helvetica, Arial, sans-serif;
    }
    a.button {
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
    }

### 可省略的花括号

    body
      font: 12px Helvetica, Arial, sans-serif;

    a.button
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;

### 可省略掉分号

    body
      font: 12px Helvetica, Arial, sans-serif

    a.button
      -webkit-border-radius: 5px
      -moz-border-radius: 5px
      border-radius: 5px
  
### 保持整洁

    border-radius()
      -webkit-border-radius: arguments
      -moz-border-radius: arguments
      border-radius: arguments

    body
      font: 12px Helvetica, Arial, sans-serif

    a.button
      border-radius(5px)

### 透明的mixins(可像原生css一样调用混入)

    border-radius()
      -webkit-border-radius: arguments
      -moz-border-radius: arguments
      border-radius: arguments

    body
      font: 12px Helvetica, Arial, sans-serif

    a.button
      border-radius: 5px

### 创造 & 分享

    @import 'vendor'

    body
      font: 12px Helvetica, Arial, sans-serif

    a.button
      border-radius: 5px

### 甚至有编程语言中的函数

    sum(nums...)
      sum = 0
      sum += n for n in nums

    sum(1 2 3 4)
    // => 10

### 如果所有项都是可选的

    fonts = helvetica, arial, sans-serif

    body {
      padding: 50px;
      font: 14px/1.4 fonts;
    }

### 使用Stylus书写样式

在有Node.js的情况下安装Stylus是一件非常简单的事情。下载安装适合你操作系统的安装包，并确保安装包包含Node的包管理工具--```npm```

在终端中输入：

```javascript
$ npm install stylus -g
```

如果想使用上面这种基于Node.js，特性丰富且富于表现力的css“语言”，前往[GitHub](http://github.com/stylus/stylus)获取更多信息。

