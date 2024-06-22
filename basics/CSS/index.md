# 概述

虽然 CSS 可以美化我们的网页，但是在早期的 CSS 开发中充斥着大量的重复样式代码，这不仅会导致编程效率低下，而且使得扩展性和灵活性都大打折扣。

这个时候前端开发者们就在想，为什么 CSS 不能够像其他语言一样可以进行编程式的书写呢？能够像 JavaScript 那样可以对样式进行动态地输出和引入，有变量、运算符、函数等概念的话，那就可以大大提高我们的效率。因此经过不断发展，市面上出现了`三种 CSS 预处理器`，可以满足以上的一系列想法。

## 预处理器

CSS 预处理器是一种工具或语言，它拓展了原生 CSS 的功能并增添了额外的功能和语法，用于提高样式的编写效率、可读性和可维护性

其工作的`基本原理`是：编写使用预处理器的特定语法样式文件，然后将其编译为普通的 CSS 文件，供浏览器解析和渲染

目前前端前端领域常见的 CSS 预处理器有三个，分别是：

1. Sass
2. Less
3. Stylus

## Sass

Sass 是最早出现的 CSS 预处理器，出现的时间为 2006 年。Sass 提供了很多丰富的功能，例如有声明变量、嵌套、混合、继承、函数等，另外 Sass 还有强大的社区支持以及丰富的插件资源，因此 Sass 比较适合大型项目以及团队协作。

该预处理器有两种语法格式：分别是缩进式语法和类 CSS 语法

缩进式（2006 年）：

```scss
$primary-color: #4CAF50

.container
	background-color: $primary-color
	padding: 20px

  .title
    font-size: 24px
    color: white
```

类 CSS（2009 年）：

```scss
$primary-color: #4caf50;

.container {
  background-color: $primary-color;
  padding: 20px;

  .title {
    font-size: 24px;
    color: white;
  }
}
```

## Less

Less 也是一个比较流行的 CSS 预处理器，该预处理器是在 2009 年出现的，该预处理器借鉴了 Sass 的长处，并在此基础上兼容 CSS 语法，让开发者开发起来更加的得心应手

```less
@primary-color: #4caf50;

.container {
  background-color: @primary-color;
  padding: 20px;

  .title {
    font-size: 24px;
    color: white;
  }
}
```

:::tip
早期的 Sass 一开始只有缩进式语法，所以 Less 的出现降低了开发者的学习成本，因为 Less 兼容原生 CSS 语法，相较于 Sass，Less 学习曲线平滑、语法简单，但是编程功能相比 Sass 要弱一些，并且插件和社区也没有 Sass 那么强大，Less 的出现反而让 Sass 出现了第二版语法（类 CSS 语法）
:::

## Stylus

Stylus 是一种灵活且强大的 CSS 预处理器，其语法非常简洁，具有很高的自定义性。Stylus 支持多种语法风格，包括缩进式和类 CSS 语法。Stylus 提供了丰富的功能，如变量、嵌套、混合、条件语句、循环等。相较于 Sass 和 Less，Stylus 的社区规模较小，但仍有不少开发者喜欢其简洁灵活的特点。

```stylus
primary-color = #4CAF50

.container
  background-color primary-color
  padding 20px

  .title
    font-size 24px
    color white
```
