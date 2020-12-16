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
