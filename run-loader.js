const { runLoaders } = require("loader-runner");
const fs = require("fs");
const path = require("path");

runLoaders(
  {
    resource: "./src/index.css",
    loaders: [path.resolve(__dirname, "./src/loaders/sprite-loader.js")],
    readResource: fs.readFile.bind(fs)
  },
  (err, result) => (err ? console.log(err) : null)
);
