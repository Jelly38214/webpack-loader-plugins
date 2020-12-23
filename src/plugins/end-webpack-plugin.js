/**
 * done 事件：在成功构建并且输出了文件后，webpack即将退出时发生
 * failed 事件：在构建出现异常导致构建失败，webpack即将退出时发生
 */

module.exports = class EndWebpackPlugins {
  constructor(doneCallback, failCallback) {
    this.doneCallback = doneCallback;
    this.failCallback = failCallback;
  }

  apply(compiler) {
    compiler.plugin("done", (stats) => {
      this.doneCallback(compiler.options);
    });

    compiler.plugin("failed", (err) => {
      this.failCallback(err);
    });
  }
};

window.addEvenlistern("done", function () {});

window.eventQueue = {};
window.addEventListern = (eventName, callback) => {
  window.eventQueue[eventName].push = callback;
};

window.eventQueue["done"].forEach((cb) => cb(compiler));
