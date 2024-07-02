# Webpack

Webpack 是一个用于构建 JavaScript 应用程序的静态 **模块打包工具（module bundler）**，其能够以一种 **相对一致** 的开放处理方式去解析、应用所有资源文件，最终将其打包为浏览器兼容的 Web 资源文件。

对于模块打包，通俗的理解就是去找出模块之间的依赖关系，并按照一定的规则把这些模块组织、合并为一个 JavaScript

> [!IMPORTANT] 重点：
> Webpack 中任何的资源，包括图片、CSS、视频、代码等都被统一看做为`Module`对象，以相同的加载、解析、优化、合并流程从而实现打包

安装 Webpack 需要两个核心 npm 包，分别是`webpack`与`webpack-cli`。安装后，在项目根目录下，创建`webpack.config.js`文件，即可开始配置项目工程

```shell
pnpm add webpack webpack-cli -D
```

## 使用 Babel

Bable 是一个 JavaScript 转换编译器，它能将高版本 —— 如 ES6 代码等价转译为向后兼容，能直接在旧版 JavaScript 引擎运行的低版本代码，例如：

```js
// 使用 Babel 转译前
arr.map((item) => item + 1);

// 转译后
arr.map(function (item) {
	return item + 1;
});
```

:::details 内容补充：为什么需要 Babel
由于 ES6 版本补充了大量提升 JavaScript 开发效率的新特性，使得 JavaScript 可以真正被用于编写复杂的大型应用程序。但也同时也或多或少的存在一些兼容性问题，为此现代 Web 开发流程中通常会引入 Babel 等转译工具。

:::

### 安装依赖

在 Webpack 场景下，只需使用`babel-loader`即可接入 Babel 的转义功能

```shell
pnpm add @babel/core @babel/preset-env babel-loader -D
```

:::info 其中：

- `@babel/core`：Babel 的核心库，负责实际的代码转换工作
- `babel-loader`：是一个 Webpack 加载器，用于在 Webpack 构建过程中调用 Babel 来转换代码
- `@babel/preset-env`：是一种 Babel 预设规则集，能够能按需将一系列复杂、数量庞大的配置、插件、Polyfill 等打包成一个单一的资源包，从而简化 Babel 的应用、学习成本

:::

### 添加模块处理规则

在 Webpack 配置文件中，通过`module`属性来声明模块处理规则，`module.rules`子属性用于对文件类型与 Loader 的匹配

```js
module.exports = {
	/* ... */
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader'],
			},
		],
	},
};
```

:::info 小差一嘴：
通过上面的内容，就不难理解为什么在 Webpack 中使用这些配置项名称。就是因为 Webpack 将所有资源都视为模块（Module），因此使用 module 配置项来匹配不同类型的资源（例如上面的 test 配置项），以及通过 use 和 options 配置项，就可以指定如何解析和转换这些资源。
:::

### 执行编译

在执行编译前，还需配置 Babel 的预设规则集，其作用就是告诉 Babel 如何对如何代码进行转换

```js
module.exports = {
	/* ... */
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				],
			},
		],
	},
};
```

然后就可以执行 Webpack CLI 所提供的命令，进行编译转换

```shell
npx webpack
```

## 使用 TypeScript

在 Webpack 中有多种方式接入 TypeScript，包括：`ts-loader`、`awesome-ts-loader`、`babel-loader`等

### 安装依赖

通常使用`ts-loader`来构建 TS 代码

```shell
pnpm add ts-loader typescript -D
```

### 添加模块处理规则

在配置文件中添加模块处理规则

```js
module.exports = {
	/* ... */
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
			},
		],
	},
};
```

这样就可以对 Typescript 代码进行编译、执行

### 使用 Babel 的 TS 预设

如果项目中已经使用了`babel-loader`，那么也可以选用`@babel/preset-typescript`预设集，借助`babel-loader`来完成 JavaScript 与 TypeScript 的转码工作：

安装

```shell
pnpm add @babel/preset-typescript -D
```

配置

```js
module.exports = {
	/* ... */
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-typescript'],
						},
					},
				],
			},
		],
	},
};
```

:::details 注意
`@babel/preset-typescript`只是简单完成代码转换，并未做类似`ts-loader`的类型检查工作，可以根据具体的实际场景选择适当工具。如果想要`@babel/preset-typescript`具备类型检查的功能，可以在`package.json`文件中配置检测命令

```json
"scripts": {
    "ts-check": "tsc --no-Emit",
    "ts-check-watch": "tsc --no-Emit --watch"
}
```

:::

## 使用 ESLint

ESLint 是一种扩展性极佳的 JavaScript 代码风格检查工具，它能够自动识别违反风格规则的代码并予以修复

:::details 为什么要使用 ESLint
由于 JavaScript 是一种被设计为高度灵活的**动态**、**弱类型脚本语言**这使得语言本身的上手成本极低，开发者只需要经过短暂学习就可以开始构建简单应用。但与其它编译语言相比，<i>JavaScript 很难在编译过程发现语法、类型，或其它可能影响稳定性的错误，特别在多人协作的复杂项目下，语言本身的弱约束可能会开发效率与质量产生不小的影响</i>，ESLint 的出现正是为了解决这一问题。
:::

这里先忽略具体的规则配置

### 安装依赖

在 Webpack 下，可以使用`eslint-webpack-plugin`接入 ESLint 工具

```shell
pnpm add eslint eslint-webpack-plugin -D

# 简单起见，这里直接使用 standard 规范 （我这里为了美观，换了行）
pnpm add eslint-config-standard eslint-plugin-promise -D
pnpm add eslint-plugin-node eslint-plugin-import -D
```

在根目录添加`.eslintrc`配置文件

```json
{
	"extends": "standard"
}
```

:::tip
也可以选择创建`.cjs`、`.js`文件，但要符合相应的模块化规则
:::

### 添加插件

在`webpack.config.js`文件中，补充`eslint-webpack-plugin`插件的配置

```js
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
	entry: './src/index',
	mode: 'development',
	devtool: false,
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	// 添加 eslint-webpack-plugin 插件实例
	plugins: [new ESLintPlugin()],
};
```

配置完后，就可以在 Webpack 编译过程中实时看到代码风格的错误提示

:::details 插一:foot:
除常规 JavaScript 代码风格检查外，还可以使用适当的 ESLint 插件、配置集实现更丰富的检查、格式化功能，例如

- [`eslint-plugin-vue`](https://link.juejin.cn/?target=https%3A%2F%2Feslint.vuejs.org%2F)：实现对 Vue SFC 文件的代码风格检查
- [`eslint-plugin-react`](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Feslint-plugin-react)：实现对 React 代码风格检查
- [`eslint-config-airbnb`](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fairbnb%2Fjavascript%2Ftree%2Fmaster%2Fpackages%2Feslint-config-airbnb)：Airbnb 提供的代码风格规则集
- [`eslint-plugin-sonarjs`](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FSonarSource%2Feslint-plugin-sonarjs)：基于 `Sonar` 的代码质量检查工具，提供圈复杂度、代码重复率等功能
- [`eslint-config-standard`](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fstandard%2Feslint-config-standard)：[Standard.js](https://link.juejin.cn/?target=https%3A%2F%2Fstandardjs.com%2F) 代码风格规则集，史上最便捷的统一代码风格的方式
- [`@typescript-eslint/eslint-plugin`](https://link.juejin.cn/?target=https%3A%2F%2Ftypescript-eslint.io%2Fdocs%2Fdevelopment%2Farchitecture%2Fpackages%2F)：实现对 TypeScript 代码风格检查

:::
