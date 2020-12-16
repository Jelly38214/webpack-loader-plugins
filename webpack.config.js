const path = require("path");

module.exports = {
  mode: "development",
  entry: "/src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js"
  },
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
