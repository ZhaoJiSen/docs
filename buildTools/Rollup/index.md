# Rollup

Rollup 是一个用于 JavaScript 的模块打包工具，它将小的代码片段编译成更大、更复杂的代码。它使用 JavaScript 的 `ESM` 模块化标准，而不是 CommonJS 或 AMD 等特殊解决方案。

## 安装

本地安装 Rollup 只需通过 `yarn`、`pnpm`、`npm` 直接安装即可

```shell
pnpm install rollup -D
```

:::details 全局安装：
若想将 Rollup 作为全局命令行工具使用，则可添加 `-g` 参数，以表示全局安装

```shell
pnpm add rollup -g
```

:::

## 快速开始

### 初始化项目

```shell
pnpm init

pnpm add rollup -D
```

### 创建目录结构

创建 `src` 文件夹以及入口文件 `index.js` 一个工具函数 `utils.js`，结构如下：

```txt
.
├── node_modules
│   └── rollup -> .pnpm/rollup@4.18.0/node_modules/rollup
├── package.json
├── pnpm-lock.yaml
└── src
    ├── index.js
    └── utils.js
```

:::details 工具函数内容：

```js
/**
 * @param min 最小值
 * @param max 最大值
 * @returns {number}
 */

export const randomNumber = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * @param obj 需要深拷贝对象
 * @description 深拷贝
 * @returns {*|*[]|{}}
 */
export const deepClone = (obj) => {
	if (typeof obj === 'object' && obj !== null) {
		return obj;
	}

	const result = Array.isArray(obj) ? [] : {};

	for (let objKey in obj) {
		if (obj?.hasOwnProperty(objKey)) {
			result[objKey] = deepClone(obj[objKey]);
		}
	}

	return result;
};

export default { randomNumber, deepClone };
```

:::

然后在 `index.js` 文件中随意引入

```js
import { randomNumber } from './utils';

const result = randomNumber(1, 10);

console.log(result);
```

### 打包构建

最后通过 Rollup 提供的命令，手动指定入口文件以及最终的产物

```shell
npx rollup src/index.js --file dist/bundle.js
```

:::details 编译格式的选择：

- 对于浏览器：

```shell
# 编译为包含自执行函数（'iife'）的 <script>。
npx rollup src/index.js --file dist/bundle.js --format iife
```

- 对于 Node.js

```shell
# 编译为一个 CommonJS 模块 ('cjs')
npx rollup src/index.js --file dist/bundle.js --format cjs
```

- 对于浏览器和 Node.js

```shell
# UMD
npx rollup src/index.js --file dist/bundle.js --format umd
```

:::

### 打包产物分析

执行上述命令后，可以发现，最终的打包产物无非就是将入口文件中所使用的函数，以及使用了该函数后续的操作，全部放到一个文件而已，与源文件差异并不大，只是自动做了 Tree Shaking 优化

```js
/**
 * @param min 最小值
 * @param max 最大值
 * @returns {number}
 */

const randomNumber = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min)) + min;
};

const result = randomNumber(1, 10);

console.log(result);
```

> [!IMPORTANT] Rollup 与 Webpack 的对比:
>
> - 打包产物：Rollup 更适合库的打包，Tree Shaking 更加有效；Webpack 更适合复杂应用的打包，拥有丰富的插件和配置选项。
> - 配置简洁：Rollup 的配置相对简洁，易于上手；Webpack 配置复杂，但功能更强大。
> - 模块化标准：Rollup 使用 ESM，而 Webpack 支持多种模块化标准（ESM、CommonJS、AMD 等）。

## Tree Shaking

## 常用配置

## 插件
