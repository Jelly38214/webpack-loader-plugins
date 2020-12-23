const path = require("path");
const EndWebpackPlugin = require("./src/plugins/end-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "/src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    // 为动态加载的chunk配置输出文件的名称
    chunkFilename: "[name].js"
  },
  plugins: [
    new EndWebpackPlugin(
      (stats) => {
        // webpack 构建成功，并且构建好的资源输出后会执行到这里，在这里可以做发布文件操作
        console.log(stats);
      },
      (err) => {
        console.error(err);
      }
    )
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          path.resolve("./src/loaders/a-loader"),
          path.resolve("./src/loaders/comment-require-loader.js")
        ]
      }
    ]
  }
};
