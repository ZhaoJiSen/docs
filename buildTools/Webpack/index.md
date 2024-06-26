# Webpack

Webpack 是一个用于构建 JavaScript 应用程序的静态模块打包工具，其能够以一种**相对一致**的开放处理方式去解析、应用所有资源文件，最终将其打包为浏览器兼容的 Web 资源文件。

:::info
在 Webpack 中任何的资源，包括图片、CSS、视频、代码等都被统一看做为`Module`对象，以相同的加载、解析、优化、合并流程从而实现打包

:::

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
    ...
    modules: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader']
            }
        ]
    }
}
```

:::info 小差一嘴：
通过上面的内容，就不难理解为什么在 Webpack 中使用这些配置项名称。就是因为 Webpack 将所有资源都视为模块（Module），因此使用 module 配置项来匹配不同类型的资源（例如上面的 test 配置项），以及通过 use 和 options 配置项，就可以指定如何解析和转换这些资源。
:::

### 执行编译

在执行编译前，还需配置 Babel 的预设规则集，其作用就是告诉 Babel 如何对如何代码进行转换

```
module.exports = {
    modules: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        ]
    }
}
```

然后就可以执行 Webpack CLI 所提供的命令，进行编译转换

```shell
npx webpack
```

## 使用 TypeScript



## 使用 ESLint
