export class BasicPlugin {
  constructor(options) {
    this.options = options;
  }

  /**
   *
   * @param {*} compiler
   * compiler.plugin(event, callback)
   */
  apply(compiler) {
    compiler.plugin("compilation", (compilation) => {});
    compiler.plugin("emit", function (compilation, callback) {
      // compilation.chunks 存放所有代码块，是一个数组
      compilation.chunks.forEach(function (chunk) {
        // chunk表示一个代码块
        // 代码块由`多个模块`组成，通过chunk.forEachModule能读取到组成代码块的每个模块
        chunk.forEachModule(function (module) {
          // module 代表一个模块
          // module.fileDependencies 存放当前模块的所有依赖的文件路径,是一个数组
          module.fileDependencies.forEach(function (filepath) {});
        });

        // webpack 根据chunk去生成输出的文件资源，每个chunk都会对应一个及其以上的输出文件
        chunk.files.forEach(function (filename) {
          chunk.files.forEach(function (filename) {
            // compilation.assets 存放本次更新所有即将输出的资源, 是一个对象，key为文件名，值为文件对应的内容
            // 调用一个输出资源的`source`方法能获取到输出资源的内容
            const source = compilation.assets[filename].source();
          });
        });
      });

      //这是一个异步事件，要记得调用callback通知webpack本次事件监听处理结束
      //如果忘记调用callback，webpack将一直卡在这里而不会往后执行
      callback();
    });

    // 监听文件变化
    compiler.plugin("watch-run", (watching, callback) => {
      const changedFiles = watching.compiler.watchFileSystem.watcher.mtimes;

      const filePath = "filepath of the file you observe ";
      if (changedFiles[filePath]) {
      }

      callback();
    });

    // 添加文件到监听列表
    compiler.plugin("after-compiler", (compilation, callback) => {
      // 把HTML文件添加到文件依赖列表，好让webpack去监听HTML模块文件，在HTML模块发生变化时重新启动一个编译
      const filePath = "HTMLModuleFilePath";
      compilation.fileDependencies.push(filePath);
      callback();
    });

    // 修改输出资源
    // 每个asset的类型：{source: () => string | Buffer; size: () => number};
    compiler.plugin("emit", (compilation, callback) => {
      //设置名称为fileName的输出资源
      const fileName = "";
      compilation.assets[fileName] = {
        // 返回文件内容
        source: () => {
          // fileContent既可以是字符串，也可以是Buffer
          const fileContent = "";
          return fileContent;
        }
      };

      callback();
    });

    // 判断webpack使用了那些插件: compiler.options.plugins
  }
}
