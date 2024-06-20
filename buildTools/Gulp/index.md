Gulp 是一个用于自动化工作流的工具包<br />

<img src="https://cdn.nlark.com/yuque/0/2024/png/28960762/1712460830444-6cc8441b-05ee-485e-9a03-756ac01b5aa6.png#averageHue=%23fcf6f6&clientId=uab471560-cd0f-4&from=paste&height=349&id=uebfee287&originHeight=698&originWidth=945&originalType=binary&ratio=1&rotation=0&showTitle=true&size=44165&status=done&style=shadow&taskId=u333c1514-fc37-46c4-87cd-3694b615fad&title=Glup%20%E7%A4%BA%E6%84%8F%E5%9B%BE&width=473 " />

<a name="P6YfC"></a>

## Gulp 与 Webpack

<a name="WYGLY"></a>

### Webpack

webpack 的核心是 module bundler，它是一个模块化打包工具，通过各种 loader 与 plugin 来加载不同的模块和在生命周期中处理任务
<a name="gZtWp"></a>

### Gulp

Gulp 的核心是 Tast Runner，即自定义一系列任务，然后通过 Gulp 执行。Gulp 基于文件 Stream 的构建流，然后通过 Gulp 的插件体系完成任务

Gulp 相比 webpack 要更简单、易用，适用于编写自动化任务。但对于大型项目，由于 Gulp 默认不支持模块化通常是不会使用的

```shell
pnpm add gulp -D
```

<a name="W6MtB"></a>

## Gulp 任务

每个 Gulp 任务都是异步的 JavaScript 函数，此函数接收一个 callback 作为参数，调用 callback 表示结束任务。并且 Gulp 任务分为 public 、private 和 default 类型：

- public 类型被称为公开任务，可直接被 gulp 命令执行，需要显示通过 exports 导出
- private 类型被称为私有任务，在内部使用，通常作为 series 或 parallel 组合的组成部分
- default 类型被称为默认任务，通过`module.exports.default = (callback) => {}`的形式组成

编写`gulpfile.js`文件，并在其中创建任务，然后过`npx gulp tastname`来执行任务

```javascript
const foo = (callback) => {
  console.log('Gulp 任务');
  callback(); // 用于指示任务完成
};

// 导出任务
module.exports = {
  foo,
};
```

![Gulp 执行](https://cdn.nlark.com/yuque/0/2024/png/28960762/1712462133925-38a4ef45-e1d9-46bd-b9df-062c6a41e41c.png#averageHue=%23f1f3f5&clientId=uab471560-cd0f-4&from=paste&height=112&id=oQuEA&originHeight=112&originWidth=845&originalType=binary&ratio=1&rotation=0&showTitle=true&size=44022&status=done&style=shadow&taskId=u0f6fa058-bca0-46d7-a5c0-ef43640a2ac&title=Gulp%20%E6%89%A7%E8%A1%8C&width=845 'Gulp 执行')<br />除开使用 callback 结束任务以外，还可以通过返回 Stream、Promise、Event Emitter、Child Process 或 Observable 类型的函数结束任务

**补充：**在 Gulp 4 之前，任务需通过`gulp.tast`的方式注册

```javascript
gulp.tast('bar', (callback) => {
  console.log('Gulp 任务');
  callback();
});
```

<a name="HX4kO"></a>

### 任务组合

通常一个函数中能完成的任务是有限的，同时也不易于维护，所以会将任务进行组合。Gulp 提供了两个组合方法，分别是：

- series：串行任务组合，任务会按照传入顺序，依次执行
- parallel：并行任务组合，所有任务并行执行，不会按照顺序依次执行

```javascript
const { series, parallel } = require('gulp');

const foo1 = (callback) => {
  setTimeout(() => {
    console.log('foo1');
    callback();
  }, 1000);
};

const foo2 = (callback) => {
  setTimeout(() => {
    console.log('foo2');
    callback();
  }, 2000);
};

const foo3 = (callback) => {
  setTimeout(() => {
    console.log('foo3');
    callback();
  }, 3000);
};

const seriesTask = series(foo1, foo2, foo3);
const parallelTask = parallel(foo1, foo2, foo3);

module.exports = {
  seriesTask,
  parallelTask,
};
```

**执行结果：**使用 series 串行执行的输出结果<br />![串行执行结果](https://cdn.nlark.com/yuque/0/2024/png/28960762/1712469108481-8b52d46f-8d81-49b4-9463-e2ae42722ddf.png#averageHue=%23eff2f5&clientId=uab471560-cd0f-4&from=paste&height=200&id=RvJS0&originHeight=266&originWidth=678&originalType=binary&ratio=1&rotation=0&showTitle=true&size=87928&status=done&style=shadow&taskId=u2228ab11-fc39-466e-80e1-ee6b826e418&title=%E4%B8%B2%E8%A1%8C%E6%89%A7%E8%A1%8C%E7%BB%93%E6%9E%9C&width=509 '串行执行结果')<br />使用 parallel 并行执行的输出结果<br />![并行执行结果](https://cdn.nlark.com/yuque/0/2024/png/28960762/1712469019335-942fee3d-12d2-4b24-883a-8510ae158446.png#averageHue=%23eff2f5&clientId=uab471560-cd0f-4&from=paste&height=206&id=fsNgi&originHeight=274&originWidth=700&originalType=binary&ratio=1&rotation=0&showTitle=true&size=91292&status=done&style=shadow&taskId=u3f9a2e00-f555-481b-8132-64786894250&title=%E5%B9%B6%E8%A1%8C%E6%89%A7%E8%A1%8C%E7%BB%93%E6%9E%9C&width=525 '并行执行结果')

<a name="qu6Pk"></a>

## Gulp 文件操作

Gulp 提供了 src 与 dest 两个方法用于读取文件，src 方法接收一个 glob 参数，用于匹配目标文件，返回一个可读流；dest 接收一个输出目录作为参数，返回一个可写流，通过该流将内容输出到文件中 ⚡

```javascript
const { src, dest } = require('gulp');

const copyFile = (callback) => {
  // 从可读流中读取文件，然后通过 pipe 放入可写流
  return src('./src/**/*.js').pipe(dest('./dist'));
};

module.exports = {
  copyFile,
};
```

⚡**补充：**pipe 方法用于将一个流从一个任务传递到另一个任务，在 Gulp 中几乎所有的任务都是通过 pipe 进行连接将任务串联，例如

```javascript
gulp
  .src('./src/**/*.scss')
  .less()
  .pipe(gulp.dest('./temp/'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('./dist/'));
```

<a name="ry7Yp"></a>

### 监听文件变化

Gulp 提供了 watch 方法用于监视文件系统中的文件变动，并在检查发生变动后自动执行相应的任务

```javascript
const { watch } = require('gulp');

watch('./src/**/*.js', JSTasK);
watch('./src/**/*.css', CSSTasK);
```

<a name="FTh66"></a>

## Gulp 开发与构建

<a name="F9i7C"></a>

### 代码处理

<a name="hfIcS"></a>

#### JavaScript 的转换与压缩

在 Gulp 读取、写入文件时可以对读取到的文件进行进一步处理，就比如通过 Babel 转换以及 Terser 压缩

```shell
pnpm add gulp-babel @babel/preset-env -D
pnpm add gulp-terser -D
```

通过 pipe 来将流进行传递：

```javascript
const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const BabelTerser = require('gulp-terser');

const JSTasK = () => {
  return src('./src/**/*.js')
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(BabelTerser({ mangle: { toplevel: true } }))
    .pipe(dest('./dist/js/'));
};

module.exports = { JSTasK };
```

<a name="YOcuM"></a>

#### HTML 的打包与压缩

与 webpack 类似，在 Gulp 中通过安装对应的插件就可以对 HTML 进行压缩处理

```shell
pnpm add gulp-htmlmin -D
```

```javascript
const { src, dest } = require('gulp');
const HTMLMin = require('gulp-htmlmin');

const htmlTask = () => {
  return src('./index.html')
    .pipe(
      HTMLMin({
        removeComments: true, // 清除 HTML 注释
        collapseWhitespace: true, // 移除多余的空格和换行符，但会保留必要的空格
      })
    )
    .pipe(dest('./dist/'));
};

module.exports = { htmlTask };
```

<a name="XEjba"></a>

#### CSS 的打包

安装处理 CSS 预处理工具的插件

```shell
pnpm add gulp-less -D
```

```javascript
const { src, dest } = require('gulp');
const Less = require('gulp-less');

const CSSTask = () => {
  return src('./src/**/*.less').pipe(Less()).pipe(dest('./dist/css/'));
};

module.exports = { CSSTask };
```

<a name="l4aXR"></a>

#### 注入打包后的文件

通过 Gulp 处理后的文件彼此都是相互独立的，因此需要通过插件来将打包后的资源注入到 HTML 中

```shell
pnpm add gulp-inject -D
```

```javascript
const { src, dest } = require('gulp');
const Inject = require('gulp-inject');

const injectTask = () => {
  return src('./dist/index.html')
    .pipe(Inject(src(['./dist/**/*.js', './dist/**/*.css'])))
    .pipe(dest('./dist/')); // 重新生成 dist
};

module.exports = { injectTask };
```

在被注入的 HTML 文件中，需要通过注释的方式告知 Gulp 打包后文件的位置

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Gulp</title>
    <!--  inject:css  -->
    <!--  endinject   -->
  </head>
  <body>
    <!--  inject:js   -->
    <!--  endinject   -->
  </body>
</html>
```

<a name="t83ol"></a>

#### 开启本地服务监听

在 webpack 中搭建服务器的方式是通过 webpack-dev-server 插件来实现，在 Gulp 中也可通过类似的插件实现本地服务

```shell
pnpm add browser-sync -D
```

```javascript
const BrowserSync = require('browser-sync');

const bs = BrowserSync.create();
const serverTask = () => {
  // 启动服务
  bs.init({
    port: 9527,
    open: true,
    files: './dist/*',
    server: {
      baseDir: './dist',
    },
  });
};
```

<a name="IULmL"></a>

### 构建任务

在打包、压缩、注入完所有的文件后，可通过 parallel 与 series 创建并行任务与串行任务来构建

```javascript
const { parallel, series } = require('gulp');

const buildTask = series(parallel(htmlTask, JSTasK, CSSTask), injectTask);
const serveTask = series(buildTask, serve);

module.exports = { buildTask, serveTask };
```

⚡ 路径报错问题：构建后，运行构建后的 HTML 会发现代码报错，原因是：通过`gulp-inject`插件注入后的 CSS 与 JS 默认会在路径前额外拼接打包后指定的目录，例如`/dist`。所以此时如果直接运行 HTML 文件，在解析 href 或 src 时会去寻找资源路径所对应的文件，而打包后的文件已经在 dist 目录下，因此无法找到该目录<br />![额外拼接的 /dist](https://cdn.nlark.com/yuque/0/2024/png/28960762/1712476633925-b186f14a-d800-4bf0-aced-d63a48dd9503.png#averageHue=%23e2eaea&clientId=uab471560-cd0f-4&from=paste&height=26&id=uWbUN&originHeight=26&originWidth=517&originalType=binary&ratio=1&rotation=0&showTitle=true&size=3271&status=done&style=shadow&taskId=ued209b74-d129-4a43-a677-065de0ee164&title=%E9%A2%9D%E5%A4%96%E6%8B%BC%E6%8E%A5%E7%9A%84%20%2Fdist&width=517 '额外拼接的 /dist')<br />解决方法：在 inject 注入时，需要额外标注相对路径

```javascript
const { src, dest } = require('gulp');
const Inject = require('gulp-inject');

const injectTask = () => {
  return src('./dist/index.html')
    .pipe(Inject(src(['./dist/**/*.js', './dist/**/*.css']), { relative: true }))
    .pipe(dest('./dist/')); // 重新生成 dist
};

module.exports = { injectTask };
```

修改为相对路径后：<br />![正确路径](https://cdn.nlark.com/yuque/0/2024/png/28960762/1712476827482-fc0c34cd-a447-4b86-b16f-dc17ea067a53.png#averageHue=%23e3eaeb&clientId=uab471560-cd0f-4&from=paste&height=28&id=AGdQZ&originHeight=28&originWidth=466&originalType=binary&ratio=1&rotation=0&showTitle=true&size=3142&status=done&style=shadow&taskId=ude5b1118-297a-42d0-9f62-4446fd57bcd&title=%E6%AD%A3%E7%A1%AE%E8%B7%AF%E5%BE%84&width=466 '正确路径')

完整代码：

```javascript
const { src, dest, parallel, series, watch } = require('gulp');

const Less = require('gulp-less');
const babel = require('gulp-babel');
const Inject = require('gulp-inject');
const HTMLMin = require('gulp-htmlmin');
const BabelTerser = require('gulp-terser');
const BrowserSync = require('browser-sync');

const bs = BrowserSync.create();

const JSTasK = () => {
  return src('./src/**/*.js')
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(
      BabelTerser({
        mangle: { toplevel: true },
      })
    )
    .pipe(dest('./dist/js'));
};
const CSSTask = () => {
  return src('./src/**/*.less').pipe(Less()).pipe(dest('./dist/css/'));
};
const htmlTask = () => {
  return src('./index.html')
    .pipe(HTMLMin({ collapseWhitespace: true }))
    .pipe(dest('./dist/'));
};

const injectTask = () => {
  return src('./dist/index.html')
    .pipe(Inject(src(['./dist/**/*.js', './dist/**/*.css']), { relative: true }))
    .pipe(dest('./dist/'));
};

const serve = () => {
  watch('./src/**', buildTask);
  // 启动服务
  bs.init({
    port: 9527,
    open: true,
    files: './dist/*',
    server: {
      baseDir: './dist',
    },
  });
};

const buildTask = series(parallel(htmlTask, JSTasK, CSSTask), injectTask);
const serveTask = series(buildTask, serve);

module.exports = { buildTask, serveTask };
```
