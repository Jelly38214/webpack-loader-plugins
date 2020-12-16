const Spritesmith = require("spritesmith");
const fs = require("fs");
const path = require("path");

module.exports = function (source) {
  console.log(__dirname, process.cwd());
  const callback = this.async();
  const reg = /url\(\S+?__sprite/g;
  const imgs = source.match(reg);
  const matchedImgs = [];

  for (let i = 0; i < imgs.length; i++) {
    matchedImgs.push(
      path.join(
        process.cwd(),
        "src",
        imgs[i].split('url("')[1].split("?__sprite")[0]
      )
    );
  }

  Spritesmith.run(
    {
      src: matchedImgs
    },
    (err, result) => {
      fs.writeFileSync(
        path.join(process.cwd(), "dist/sprite.jpg"),
        result.image
      );
      // 替换源码中引用图片的路径
      source = source.replace(reg, (match) => {
        return `url("dist/sprite.jpg")`;
      });

      fs.writeFileSync(path.join(process.cwd(), "dist/index.css"), source);
      callback(null, source);
    }
  );
};
