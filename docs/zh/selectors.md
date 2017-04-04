# 选择器(Selectors)

## 缩进

Stylus是“python式的”（PS：基于缩进）。空格是很重要的，所以我们使用_缩进_和_突出_来代替`{` 和 `}`，如下所示：

```stylus
body
  color white
```

编译后:

```css
body {
  color: #fff;
}
```

如果喜欢，可以使用魔啊好来分隔属性和值：

```stylus
body
  color: white
```

## 规则集

和CSS一样，Stylus允许通过逗号分隔一次为多个选择器定义属性。

```stylus
textarea, input
  border 1px solid #eee
```

也可以通过多行书写来实现：

```stylus
textarea
input
  border 1px solid #eee
```

编译后的结果：

```stylus
textarea,
input {
  border: 1px solid #eee;
}
```

**这条规则唯一的例外**是选择器看起来像属性。例如，下面的`foo bar baz`或许是一个属性**或者是**一个选择器：

```stylus
foo bar baz
> input
  border 1px solid
```

因此，我们可通过逗号分隔：

```stylus
foo bar baz,
form input,
> a
  border 1px solid
```

## 父级引用
 
符号`&`表示父级选择器的引用。下面的例子中，`textarea`和`input`两个选择器的伪类`:hover`都会改变颜色。

```stylus
textarea
input
  color #A7A7A7
  &:hover
    color #000
```
编译后:

```css
textarea,
input {
  color: #a7a7a7;
}
textarea:hover,
input:hover {
  color: #000;
}
```

下面的例子中，在`混入(mixin)`中使用父级引用为IE浏览器中的元素加了一个简单的`2px`的边框。

```stylus
box-shadow()
  -webkit-box-shadow arguments
  -moz-box-shadow arguments
  box-shadow arguments
  html.ie8 &,
  html.ie7 &,
  html.ie6 &
    border 2px solid arguments[length(arguments) - 1]

body
  #login
    box-shadow 1px 1px 3px #eee
```

编译后:

```css
body #login {
  -webkit-box-shadow: 1px 1px 3px #eee;
  -moz-box-shadow: 1px 1px 3px #eee;
  box-shadow: 1px 1px 3px #eee;
}
html.ie8 body #login,
html.ie7 body #login,
html.ie6 body #login {
  border: 2px solid #eee;
}
```

如果需要在选择器中单纯地使用`&`符，可以通过转义符`\`来转义，不适用Stylus中父级引用的功能。

```stylus
.foo[title*='\&']
// => .foo[title*='&']
```

## Partial Reference

`^[N]`可以出现在选择器中的任何地方，`N`是一个数字，代表一个部分引用。

部分引用的工作机制和父级引用类似，区别是父级引用包括整个选择器，而部分选择器只包括嵌套选择器中的第一个合并的第`N`层级，因此可以分别获取到嵌套的层级。

`^[0]`表示选择第一层选择器，`^[1]`表示第二层选择器，以此类推：

```stylus
.foo
  &__bar
    width: 10px
    
    ^[0]:hover &
      width: 20px
```

结果：

```css
.foo__bar {
  width: 10px;
}
.foo:hover .foo__bar {
  width: 20px;
}
```

如果是负数则会从最后开始计数，所以`^[-1]`代表`&`链前的最后一个选择器，即`&__bar`选择器：

```stylus
.foo
  &__bar
    .baz
      width: 10px

      ^[-1]:hover &
        width: 20px
```

结果：

```css
.foo__bar_baz {
  width: 10px;
}
.foo__bar:hover .foo__bar .baz {
  width: 20px;
}
```

当在mixins中使用部分引用但是不知道嵌套层级的时候，负数就显得特别有用。

* * *

注意，部分引用包括直到给定嵌套层级(`^[N]`指定的层级)的整个选择器链，而不是部分选择器。`^[N]`最后的`&`代表部分引用的父级选择器。

### 部分引用中指定范围

`^[N..M]`可以出现在选择器中任何地方，`N`和`M`都是数字，代表一个部分引用。

假设你需要获取一部分选择器，或者程序中需要获取一个范围，你可以在部分引用中指定范围。

如果范围从正数开始，则选取结果中将不包含之前的选择器，并且获取的结果部分的选择器层级像是在样式表的根(样式表的最左边)开始写的一样：

```stylus
.foo
  & .bar
    width: 10px

    ^[0]:hover ^[1..-1]
      width: 20px
```

结果：
```css
.foo .bar {
  width: 10px;
}
.foo:hover .bar {
  width: 20px;
}
```

范围中的第一个数字为起始下标，第二个为结束下标。注意数字的顺序无所谓，因为选择器总是从第一层向最后一层渲染，所以`^[1..-1]`和`^[-1..1]`是相等的。

当两个数字相等时，结果只是选择器中的一个层级，所以你可以用前面例子中的`^[-1..-1]`来代替`^[1..-1]`，它也表示最后一个选择器，但是当用在mixins中时更可靠。

## 初始化引用

选择器开头的`~/`可以用来指向第一层选择器，可以认为是`^[0]`的简写。唯一的缺点是你只能在一个选择器的开始使用初始化引用。

```stylus
.block
  &__element
    ~/:hover &
      color: red
```

结果：

```css
.block:hover .block__element {
  color: #f00;
}
```

## Relative Reference

The `../` characters at the start of a selector mark a relative reference, which points to the previous to the `&` compiled selector. You can nest relative reference: `../../` to get deeper levels, but note that it can be used only at the start of the selector.

    .foo
      .bar
        width: 10px

        &,
        ../ .baz
          height: 10px

would be rendered as

    .foo .bar {
      width: 10px;
    }
    .foo .bar,
    .foo .baz {
      height: 10px;
    }

Relative references can be considered as shortcuts to the partial references with ranges like `^[0..-(N + 1)]` where the `N` is the number of relative references used.

## Root Reference

The `/` character at the start of a selector is a root reference. It references the root context and this means the selector won't prepend the parent's selector to it (unless you would use it with `&`). It is helpful when you need to write some styles both to some nested selector and to another one, not in the current scope.

    textarea
    input
      color #A7A7A7
      &:hover,
      /.is-hovered
        color #000

Compiles to:

    textarea,
    input {
      color: #a7a7a7;
    }
    textarea:hover,
    input:hover,
    .is-hovered {
      color: #000;
    }

## selector() bif

You can use the built-in `selector()` to get the current compiled selector. Could be used inside mixins for checks or other clever things.

    .foo
      selector()
    // => '.foo'

    .foo
      &:hover
        selector()
    // '.foo:hover'

This bif could also accept an optional string argument, in this case it would return the compiled selector. Note that it wouldn't prepend the selector of the current scope in case it don't have any `&` symbols.

    .foo
      selector('.bar')
    // => '.bar'

    .foo
      selector('&:hover')
    // '.foo:hover'

### Multiple values for `selector()` bif

`selector()` bif can accept multiple values or a comma-separated list in order to create a nested selector structure easier.

    {selector('.a', '.b', '.c, .d')}
      color: red

would be equal to the

    .a
      .b
        .c,
        .d
          color: red

and would be rendered as

    .a .b .c,
    .a .b .d {
      color: #f00;
    }

## selectors() bif

This bif returns a comma-separated list of nested selectors for the current level:

    .a
      .b
        &__c
          content: selectors()

would be rendered as

    .a .b__c {
      content: '.a', '& .b', '&__c';
    }


## Disambiguation

Expressions such as `margin - n` could be interpreted both as a subtraction operation, as well as a property with an unary minus. To disambiguate, wrap the expression with parens:

    pad(n)
      margin (- n)

    body
      pad(5px)

Compiles to:

    body {
      margin: -5px;
    }

However, this is only true in functions (since functions act both as mixins, or calls with return values). 

For example, the following is fine (and yields the same results as above):

    body
      margin -5px

Have weird property values that Stylus can't process? `unquote()` can help you out:

    filter unquote('progid:DXImageTransform.Microsoft.BasicImage(rotation=1)')

Yields:

    filter progid:DXImageTransform.Microsoft.BasicImage(rotation=1)
