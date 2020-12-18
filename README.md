Loader 只是一个导出为函数的 js 模块

this.callback 是 webpack 给 Loader 注入的 API，以方便 Loader 和 Webpack 之间通信。
通过 this.callback 告诉 webpack 当前 Loader 返回的结果
当使用 this.callback 返回内容时，该 Loader 必须返回 undefined，以让 webpack 知道该 Loader 的返回结果在 this.callback 中而不是 return 中

```ts
  this.callback(
    err: Error | null;
    content: string | Buffer;
    sourceMap?: SourceMap,
    abstractSyntaxTree?: AST
  )
```

this.sourceMap API 告诉 Loader 当前构建环境下用户是否需要 Source Map。
SourceMap 的生成很耗时

```js
const callback = this.async(); // 获得异步回调
```

> module.exports.raw = true; // 告知 webpack 该 Loader 需要的内容是二进制数据

Plugin 就是一个有这`apply`方法的类型

在开发 Plugin 时最常用的两个对象就是 Compiler 和 compilation

- compiler: webpack 启动时实例化一次，全局唯一，包含 webpack 环境所有的配置信息(options, loaders, plugins)
- compilation: 包含`本次编译`的资源模块，编译生成的资源，变化的文件等。

compiler 和 compilation 的区别：compiler 代表了整个 webpack 从启动到关闭的生命周期，而 compilation 只代表一个新的编译

compiler 和 compilation 都继承 Tapable, 因此具备监听和广播事件的能力

```js
compiler.apply("event-name", params); //  广播出事件
compiler.plugin("event-name", function (params) {}); // 监听事件
```

有些事件是异步的，这些异步的事件会附带两个参数，第二个参数为回调函数，在插件处理完成任务时需要调用回调函数通知 webpack，webpack 才会进入到下一个处理流程.

```js
// emit事件发生时，代表源文件的转换和组装已经完成，在这里可以读取到最终输出的资源，代码块，模块及其依赖，并且可以修改输出资源的内容
compiler.plugin("emit", function (compilation, callback) {
  // 类似中间件的next，必须执行才能进入下一个中间件
  // 如果不执行callback，运行流程将会一直卡在这不往下执行
  callback();
});
```
