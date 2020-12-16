/**
 * loader只是一个导出为函数的js模块
 * 多loader串行执行，顺序从后往前
 * 函数组合的两种情况： pipeline, compose
 */
module.exports = function (source) {
  console.log(this.hot);
  return source;
};

function compose(fn) {
  if (arguments.length === 1) return arguments[0];
  return Array.from(arguments).reduce((prev, next) => {
    return function () {
      prev(next(Array.from(arguments)));
    };
  });
}
